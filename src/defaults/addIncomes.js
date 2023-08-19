import { getIncomeSingle } from "api/api";
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
  customerId {
    id
    name
  }
  transactionType
  orderId {
    id
    name
  }
  incomeT
  receivedById {
    id
    name
  }
  performedById {
    id
    firstName
  }
  performedT
  description
  paymentMode {
    id
    label
    value
  }
  changeLog
}`;

const ADD_INCOME_DATA = {
  mainCardTitle: 'All Incomes',
  tableTitle: 'Incomes',
  slug: 'overview/income',
  dbKey: 'income',
  storePath: ['overview', 'incomes'],
  label: 'Income',
  fields: {
    amount: {
      type: 'number',
      placeHolder: 'Amount',
      label: 'Amount*',
      required: true,
      value: ''
    },
    customerId: {
      type: 'select',
      placeHolder: 'Select Customer',
      label: 'Select Customer*',
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
    receivedById: {
      type: 'select',
      placeHolder: 'Recieved By',
      label: 'Recieved By*',
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
    },
  },
  tableHeading: createData([
    ['customerId', 'Customer', ['customerId', 'name'],null,'left',null,{ paddingLeft: '24px' }],
    ['amount', 'Amount', 'amount'],
    ['receivedById', 'Recieved By', ['receivedById', 'name']],
    ['paymentMode', 'Payment Mode', ['paymentMode', 'label']],
    ['actions', 'Actions', 'actions', 'details', 'center'],
    ['description', 'Description', 'description','table'],
    ['incomeT', 'Date', 'incomeT','table','left',formatTimestampToDate],
    ['orderId', 'Order', ['orderId', 'name'],'table'],
  ]),
  getDispatchType: 'INCOMES_FETCH_REQUESTED',
  getQuery: `query Incomes {
    incomes ${getDataString}
  }`,
  getSingleReq: (payload) => getIncomeSingle(payload),
  getSingleQuery: `query Income($id: ID!){
    income(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddIncome($amount: Float!, $transactionType: String, $receivedById: String!, $customerId: String, $orderId: String, $incomeT: String, $performedById: String, $performedT: String, $description: String, $paymentMode: AccessInput, $changeLog: [String]) {
    addIncome(amount: $amount, transactionType: $transactionType, receivedById: $receivedById, customerId: $customerId, orderId: $orderId, incomeT: $incomeT, performedById: $performedById, performedT: $performedT, description: $description, paymentMode: $paymentMode, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdateIncome($id: ID!, $amount: Float, $customerId: String, $transactionType: String, $orderId: String, $incomeT: String, $receivedById: String, $performedById: String, $performedT: String, $description: String, $paymentMode: AccessInput, $changeLog: [String]) {
    updateIncome(id: $id, amount: $amount, customerId: $customerId, transactionType: $transactionType, orderId: $orderId, incomeT: $incomeT, receivedById: $receivedById, performedById: $performedById, performedT: $performedT, description: $description, paymentMode: $paymentMode, changeLog: $changeLog) {
      id
    }
  }`,
  deleteQuery: `mutation DeleteIncome($id: ID!) {
    deleteIncome(id: $id) {
      id
    }
  }`,
  extractValues: {
    customerId: ['id'],
    orderId: ['id'],
    receivedById: ['id'],
  }
};

export default ADD_INCOME_DATA;
