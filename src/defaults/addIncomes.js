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
  transactionType
  orderId {
    id
    name
  }
  incomeT
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
    incomeT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Date',
      value: '' + new Date().getTime(),
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
    ['incomeT', 'Date', 'incomeT','table','left',formatTimestampToDate, { paddingLeft: '24px' }],
    ['orderId', 'Order', ['orderId', 'name']],
    ['amount', 'Amount', 'amount'],
    ['paymentMode', 'Payment Mode', ['paymentMode', 'label']],
    ['description', 'Description', 'description','table'],
    ['actions', 'Actions', 'actions', 'details', 'center'],
  ]),
  getDispatchType: 'INCOMES_FETCH_REQUESTED',
  getQuery: `query Incomes {
    incomes ${getDataString}
  }`,
  getSingleReq: (payload) => getIncomeSingle(payload),
  getSingleQuery: `query Income($id: ID!){
    income(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddIncome($amount: Float!, $transactionType: String, $orderId: String, $incomeT: String, $performedById: String, $performedT: String, $description: String, $paymentMode: AccessInput, $changeLog: [String]) {
    addIncome(amount: $amount, transactionType: $transactionType, orderId: $orderId, incomeT: $incomeT, performedById: $performedById, performedT: $performedT, description: $description, paymentMode: $paymentMode, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdateIncome($id: ID!, $amount: Float, $transactionType: String, $orderId: String, $incomeT: String, $performedById: String, $performedT: String, $description: String, $paymentMode: AccessInput, $changeLog: [String]) {
    updateIncome(id: $id, amount: $amount, transactionType: $transactionType, orderId: $orderId, incomeT: $incomeT, performedById: $performedById, performedT: $performedT, description: $description, paymentMode: $paymentMode, changeLog: $changeLog) {
      id
    }
  }`,
  deleteQuery: `mutation DeleteIncome($id: ID!) {
    deleteIncome(id: $id) {
      id
    }
  }`,
  extractValues: {
    orderId: ['id'],
  }
};

export default ADD_INCOME_DATA;
