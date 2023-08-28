import { commonApiRequest, getOrder } from 'api/api';
import { formatTimestampToDate, getStatusComp } from 'utils/utils';
import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

function createData(arr) {
  let tempData = {};
  arr.forEach((arrItem) => {
    tempData = {
      ...tempData,
      [arrItem[0]]: {
        label: arrItem[1],
        dataKey: arrItem[2],
        sx: arrItem[6],
        align: arrItem[4],
        valFunc: arrItem[5],
        hideIn: arrItem[3]
      }
    };
  });
  return tempData;
}

const getDataString = `{
  id
  name
  estimated
  customer {
    id
    name
  }
  orderT
  performedById {
    id
    firstName
  }
  performedT
  changeLog
  description
  status {
    label
    id
    value
  }
}`;

const ADD_ORDER_DATA = {
  mainCardTitle: 'All Order',
  tableTitle: 'Orders',
  slug: 'overview/order',
  dbKey: 'order',
  storePath: ['overview', 'orders'],
  label: 'Order',
  fields: {
    name: {
      type: 'text',
      placeHolder: 'Name',
      label: 'Name*',
      required: true,
      value: ''
    },
    customer: {
      type: 'select',
      placeHolder: 'Select Customer',
      label: 'Customer Name',
      value: null,
      options: [],
      setOptions: (store) => {
        const loadedOptions = store.elements.customers;
        return loadedOptions.map((opt) => {
          return { label: opt.name, id: opt.id, value: opt.id };
        });
      },
      setValue: (val) => {
        return { label: val.name, id: val.id, value: val.id };
      }
    },
    estimated: {
      type: 'number',
      placeHolder: 'Estimated',
      label: 'Estimated*',
      required: true,
      value: ''
    },
    orderT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Start Date',
      value: '' + new Date().getTime()
    },
    description: {
      type: 'textArea',
      placeHolder: 'Some details',
      label: 'Description',
      required: true,
      value: ''
    },
    status: {
      type: 'select',
      placeHolder: 'Select status*',
      label: 'Select status*',
      value: null,
      options: [
        { label: 'In pipeline', id: 'inPipeline', value: 'inPipeline' },
        { label: 'In progress', id: 'inProgress', value: 'inProgress' },
        { label: 'Pending', id: 'pending', value: 'pending' },
        { label: 'Complete', id: 'complete', value: 'complete' },
        { label: 'Rejected', id: 'rejected', value: 'rejected' }
      ]
    }
  },
  tableHeading: createData([
    // ['orderNo', 'Order No', 'id', { paddingLeft: '24px' }],
    ['name', 'Order', 'name', null, 'left', null, { paddingLeft: '24px' }],
    ['customer', 'Customer', ['customer', 'name']],
    ['estimated', 'Estimated', 'estimated'],
    ['status', 'Status', ['status', 'label'], null, 'left', getStatusComp],
    ['orderT', 'Start Date', 'orderT', null, 'left', formatTimestampToDate],
    ['description', 'Description', 'description', 'table'],
    ['actions', 'Actions', 'actions', 'details', 'center']
  ]),
  getDispatchType: 'ORDERS_FETCH_REQUESTED',
  getQuery: `query Orders {
    orders ${getDataString}
  }`,
  getSingleReq: (payload) => getOrder(payload),
  getSingleQuery: `query Order($id: ID!){
    order(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddOrder($name: String!, $estimated: Float, $customer: String, $orderT: String, $performedById: String, $performedT: String, $changeLog: [String], $description: String, $status: AccessInput) {
    addOrder(name: $name, estimated: $estimated, customer: $customer, orderT: $orderT, performedById: $performedById, performedT: $performedT, changeLog: $changeLog, description: $description, status: $status) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateOrder($id: ID!, $name: String, $estimated: Float, $customer: String, $orderT: String, $performedById: String, $performedT: String, $changeLog: [String], $description: String, $status: AccessInput) {
    updateOrder(id: $id, name: $name, estimated: $estimated, customer: $customer, orderT: $orderT, performedById: $performedById, performedT: $performedT, changeLog: $changeLog, description: $description, status: $status) {
      id
      name
    }
  }`,
  deleteQuery: `mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      name
    }
  }`,
  extractValues: {
    customer: ['id']
  },
  detailsTableQuery: `query OrderTransactions($id: ID) {
    orderTransactions(id: $id) {
      id
      estimated
      name
      description
      orderUtilizations {
        id
        item
        quantity
        rate
        utilizationT
        description
      }
      orderIncomes {
        id
        amount
        transactionType
        incomeT
        description
        paymentMode {
          label
          id
          value
        }
      }
    }
  }`,
  detailsTableReq: (payload) => commonApiRequest(payload),
  formatDetailsTableData: ({ orderTransactions }) => {
    const total = {
      income: 0,
      expense: 0
    };
    const tempIncome = orderTransactions[0].orderIncomes.map((income) => {
      total.income += +income.amount;
      return {
        type: 'income',
        details: income.description,
        // description:income.description,
        incomeAmount: income.amount,
        expenseAmount: null,
        time: income.incomeT
      };
    });
    const tempUti = orderTransactions[0].orderUtilizations.map((uti) => {
      total.expense += uti.quantity * uti.rate;
      return {
        type: 'utilization',
        details: uti.item,
        // description: uti.description,
        incomeAmount: null,
        expenseAmount: uti.quantity * uti.rate,
        time: uti.utilizationT
      };
    });
    const concatArray = [...tempIncome, ...tempUti].sort((a, b) => {
      return b.time - a.time;
    });
    const render = (
      <Grid container spacing={gridSpacing}>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Total Income</div>
          <div>{total.income}</div>
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Total Expense</div>
          <div>{total.expense}</div>
        </Grid>
        <Grid item lg={3} md={3} sm={4} xs={6}>
          <div style={{ fontWeight: 700 }}>Total Profit</div>
          <div>{total.income - total.expense}</div>
        </Grid>
      </Grid>
    );
    const columns = ['Date', 'Details', 'Income', 'Expense'];
    const rows = concatArray.map((ca) => [formatTimestampToDate(ca.time), ca.details, ca.incomeAmount, ca.expenseAmount]);
    return { rows, columns, render };
  }
};

export default ADD_ORDER_DATA;
