import { getExpense } from "api/api";
import { formatTimestampToDate } from "utils/utils";

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
  expenseT
  vendorId {
    id
    name
  }
  paymentMode {
    id
    label
    value
  }
  description
  performedById {
    id
    firstName
  }
  performedT
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
    },
    vendorId: {
      type: 'select',
      placeHolder: 'Vendor',
      label: 'Vendor*',
      value: null,
      options: [],
      setOptions: (store) => {
        const loadedOptions = store.elements.vendors;
        return loadedOptions.map((opt) => {
          return { label: opt.name, id: opt.id, value: opt.id };
        });
      },
      setValue: (val) => {
        return { label: val.name, id: val.id, value: val.id };
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
    ['paymentMode', 'Payment Mode', ['paymentMode','label']],
    ['description', 'Description', 'description'],
    ['actions', 'Actions', 'actions', 'details', 'center'],
  ]),
  getDispatchType: 'EXPENSES_FETCH_REQUESTED',
  getQuery: `query Expenses {
    expenses ${getDataString}
  }`,
  getSingleReq: (payload) => getExpense(payload),
  getSingleQuery: `query Expense($id: ID!){
    expense(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddExpense($amount: Float, $expenseT: String, $vendorId: String, $paymentMode: AccessInput, $description: String, $performedById: String, $performedT: String, $changeLog: [String]) {
    addExpense(amount: $amount, expenseT: $expenseT, vendorId: $vendorId, paymentMode: $paymentMode, description: $description, performedById: $performedById, performedT: $performedT, changeLog: $changeLog) {
      id
      amount
    }
  }`,
  updateQuery: `mutation UpdateExpense($id: ID!, $amount: Float, $expenseT: String, $vendorId: String, $paymentMode: AccessInput, $description: String, $performedById: String, $performedT: String, $changeLog: [String]) {
    updateExpense(id: $id, amount: $amount, expenseT: $expenseT, vendorId: $vendorId, paymentMode: $paymentMode, description: $description, performedById: $performedById, performedT: $performedT, changeLog: $changeLog) {
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
    vendorId: ['id'],
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
