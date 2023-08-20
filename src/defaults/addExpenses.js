import { getExpense } from "api/api";
import { formatTimestampToDate, getStatusComp } from "utils/utils";

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
        hideIn: arrItem[3],
      }
    };
  });
  return tempData;
}

const getDataString = `{
  id
  amount
  expenseById {
    id
    name
  }
  expenseT
  paidAmount
  orderId {
    id
    name
  }
  remainingAmount
  paymentMode {
    id
    label
    value
  }
  description
  expenseStatus {
    id
    label
    value
  }
  performedById {
    id
    firstName
  }
  performedT
  expenseConfirmedById {
    id
    firstName
  }
  changeLog
}`;

const ADD_EXPENSE_DATA = {
  mainCardTitle: 'All Expenses',
  tableTitle: 'Expenses',
  slug: 'overview/expense',
  dbKey: 'expense',
  storePath: ['overview', 'expenses'],
  label: 'Expense',
  fields: {
    expenseT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Date',
      value: '' + new Date().getTime(),
    },
    amount: {
      type: 'number',
      placeHolder: 'Amount',
      label: 'Amount*',
      required: true,
      value: '',
      dependant: ['remainingAmount']
    },
    orderId: {
      type: 'select',
      placeHolder: 'Order',
      label: 'Order*',
      value: null,
      options: [],
      setOptions: (store) => {
        const loadedOptions = store.overview.orders;
        return loadedOptions.map((opt) => {
          return { label: opt.name, id: opt.id, value: opt.id };
        });
      },
      setValue: (val) => {
        return { label: val.name, id: val.id, value: val.id };
      }
    },
    expenseById: {
      type: 'select',
      placeHolder: 'Expense By',
      label: 'Expense By*',
      value: null,
      options: [],
      setOptions: (store) => {
        const loadedOptions = store.elements.employees;
        return loadedOptions.map((opt) => {
          return { label: opt.name, id: opt.id, value: opt.id };
        });
      },
      setValue: (val) => {
        return { label: val.name, id: val.id, value: val.id };
      }
    },
    paidAmount: {
      type: 'number',
      placeHolder: 'Paid Amount',
      label: 'Paid Amount*',
      required: true,
      value: '',
      dependant: ['remainingAmount']
    },
    remainingAmount: {
      type: 'number',
      placeHolder: 'Remaining Amount',
      label: 'Remaining Amount*',
      required: true,
      value: '',
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          amount: () => {
            return {
              ...allFields[curKey],
              value: allFields.amount.value - allFields.paidAmount.value
            }
          },
          paidAmount: () => {
            return {
              ...allFields[curKey],
              value: allFields.amount.value - allFields.paidAmount.value
            }
          }
        }
        return funSet[triggererKey]();
      }
    },
    paymentMode: {
      type: 'select',
      placeHolder: 'Payment Mode*',
      label: 'Payment Mode*',
      value: null,
      options: [
        { label: 'Cash', id: 'cash', value: 'cash' },
        { label: 'Online', id: 'online', value: 'online' },
        { label: 'Gpay', id: 'gpay', value: 'gpay' },
        { label: 'Phonepay', id: 'phonepay', value: 'phonepay' }
      ]
    },
    expenseStatus: {
      type: 'select',
      placeHolder: 'Status*',
      label: 'Status*',
      value: null,
      options: [
        { id: 'requested', label: 'Requested', value: 'requested' },
        { id: 'pending', label: 'Pending', value: 'pending' },
        { id: 'approved', label: 'Approved', value: 'approved' },
        { id: 'rejected', label: 'Rejected', value: 'rejected' }
      ]
    },
    description: {
      type: 'textArea',
      placeHolder: 'Some details',
      label: 'Description',
      required: true,
      value: ''
    }
  },
  tableHeading: createData([
    ['expenseT', 'Date', 'expenseT',null,'left',formatTimestampToDate, { paddingLeft: '24px' }],
    ['amount', 'Amount', 'amount'],
    ['expenseStatus', 'Status', ['expenseStatus','label'], null,'left', getStatusComp],
    ['remainingAmount', 'Remaining Amount', 'remainingAmount'],
    ['paymentMode', 'Payment Mode', ['paymentMode','label'], 'table'],
    ['actions', 'Actions', 'actions', 'details', 'center'],
    ['expenseById', 'Purchase By', ['expenseById','name'], 'table'],
    ['expenseConfirmedById', 'Confirmed By', ['expenseConfirmedById','firstName'], 'table'],
    ['description', 'Description', 'description','table']
  ]),
  getDispatchType: 'EXPENSES_FETCH_REQUESTED',
  getQuery: `query Expenses {
    expenses ${getDataString}
  }`,
  getSingleReq: (payload) => getExpense(payload),
  getSingleQuery: `query Expense($id: ID!){
    expense(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddExpense($amount: Float, $expenseById: String, $expenseT: String, $paidAmount: Float, $orderId: String, $remainingAmount: Float, $paymentMode: AccessInput, $description: String, $expenseStatus: AccessInput, $performedById: String, $performedT: String, $changeLog: [String], $expenseConfirmedById: String) {
    addExpense(amount: $amount, expenseById: $expenseById, expenseT: $expenseT, paidAmount: $paidAmount, orderId: $orderId, remainingAmount: $remainingAmount, paymentMode: $paymentMode, description: $description, expenseStatus: $expenseStatus, performedById: $performedById, performedT: $performedT, changeLog: $changeLog, expenseConfirmedById: $expenseConfirmedById) {
      id
      amount
    }
  }`,
  updateQuery: `mutation UpdateExpense($id: ID!, $amount: Float, $expenseById: String, $expenseT: String, $paidAmount: Float, $orderId: String, $remainingAmount: Float, $paymentMode: AccessInput, $description: String, $expenseStatus: AccessInput, $performedById: String, $performedT: String, $expenseConfirmedById: String, $changeLog: [String]) {
    updateExpense(id: $id, amount: $amount, expenseById: $expenseById, expenseT: $expenseT, paidAmount: $paidAmount, orderId: $orderId, remainingAmount: $remainingAmount, paymentMode: $paymentMode, description: $description, expenseStatus: $expenseStatus, performedById: $performedById, performedT: $performedT, expenseConfirmedById: $expenseConfirmedById, changeLog: $changeLog) {
      id
      amount
    }
  }`,
  deleteQuery: `mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      id
      amount
    }
  }`,
  extractValues: {
    expenseById: ['id'],
    orderId: ['id'],
  },
  updateStatus: (action, data, userId) => {
    const updatedData = {};
    updatedData.expenseStatus = action === 'rejected' ? {label: "rejected", id: "Rejected", value: "rejected"} : {label: "approved", id: "Approved", value: "approved"}
    updatedData.id = data._id;
    updatedData.expenseConfirmedById = userId;
    return updatedData;
  }
};

export default ADD_EXPENSE_DATA;
