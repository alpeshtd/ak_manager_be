const mongoose = require("mongoose");
const Expense = require("./models/Expense");
const Income = require("./models/Income");
const Order = require("./models/Order");
const Vendor = require("./models/Vendor");
const Utilization = require("./models/Utilization");

const statsResolver = {
  orderProfitStats: async (parent, args) => {
    const { fromT, toT } = args;
    const getOrders = await Order.find({
      orderT: { $gte: fromT, $lte: toT },
    }).populate("customer");

    if (!getOrders) {
      return {};
    }

    const orderProfitStats = {
      ordersData: [],
    };

    getOrders.forEach(async (order) => {
      const temp = {
        id: order._id,
        name: order.name,
        totalUtilization: 0,
        totalIncome: 0,
      };
      const getUtilizations = await Utilization.find({ orderId: order._id }); // expense
      const getIncomes = await Income.find({ orderId: order._id }); // Income
      if (getUtilizations) {
        getUtilizations.forEach((uti) => {
          temp.totalUtilization += uti.quantity * uti.rate;
        });
      }
      if (getIncomes) {
        getIncomes.forEach((income) => {
          temp.totalIncome += income.amount;
        });
      }
      orderProfitStats.ordersData.push(temp);
    });

    return {
      ...orderProfitStats,
    };
  },
  orderStats: async (parent, args) => {
    const { fromT, toT } = args;
    const getOrders = await Order.find({
      orderT: { $gte: fromT, $lte: toT },
    }).populate("customer");
    if (!getOrders) {
      return {};
    }
    const tempData = {
      completed: 0,
      inProgress: 0,
      inPipeline: 0,
      pending: 0,
      rejected: 0,
    };
    getOrders.forEach((order) => {
      tempData[order.status.value] += 1;
    });
    const orderStats = {
      total: getOrders.length,
      ...tempData,
    };
    return orderStats;
  },
  incomeExpenseStats: async (parent, args) => {
    const { fromT, toT } = args;
    const getOrders = await Order.find({}); // Estimated
    const getUtilizations = await Utilization.find({}); // expense
    const getIncomes = await Income.find({}); // Income

    if (getOrders && getUtilizations && getIncomes) {
      const temp = {
        totalIncome: 0,
        totalExpense: 0,
        estimatedIncome: 0,
      };

      getOrders.forEach((order) => {
        temp.estimatedIncome += order.estimated;
      });
      getUtilizations.forEach((utilizations) => {
        temp.totalExpense += utilizations.quantity * utilizations.rate;
      });
      getIncomes.forEach((income) => {
        temp.totalIncome += income.amount;
      });
      return temp;
    }

    return {};
  },
  orderTransactions: async (parent, args) => {
    const { id } = args;

    const getOrders = await Order.aggregate([
      {$match: { _id: new mongoose.Types.ObjectId(id)}},
      {
        $lookup: {
          from: "utilizations",
          localField: "_id",
          foreignField: "orderId",
          pipeline: [
            {
              $sort: {
                utilizationT: 1,
              },
            },
          ],
          as: "orderUtilizations",
        },
      },
      {
        $lookup: {
          from: "incomes",
          localField: "_id",
          foreignField: "orderId",
          pipeline: [
            {
              $sort: {
                incomeT: 1,
              },
            },
          ],
          as: "orderIncomes",
        },
      }
    ]);
    return getOrders;
  },
  vendorTransactions: async (parent, args) => {
    const { id } = args;

    const getVendors = await Vendor.aggregate([
      {$match: { _id: new mongoose.Types.ObjectId(id)}},
      {
        $lookup: {
          from: "purchases",
          localField: "_id",
          foreignField: "vendorId",
          pipeline: [
            {
              $sort: {
                purchaseT: 1,
              },
            },
          ],
          as: "vendorPurchases",
        },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "vendorId",
          pipeline: [
            {
              $sort: {
                expenseT: 1,
              },
            },
          ],
          as: "vendorExpenses",
        },
      }
    ]);
    return getVendors;
  },
};

module.exports = { statsResolver };
