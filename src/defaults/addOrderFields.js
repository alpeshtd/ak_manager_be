import { getOrder } from "api/api";
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
  name
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
    orderT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Start Date',
      value: '' + new Date().getTime(),
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
    ['name', 'Order', 'name', null, 'left', null,{ paddingLeft: '24px' }],
    ['customer', 'Customer', ['customer', 'name']],
    ['status', 'Status', ['status','label'],null,'left', getStatusComp],
    ['orderT', 'Start Date', 'orderT', null, 'left',formatTimestampToDate],
    ['description', 'Description', 'description','table'],
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
  addNewQuery: `mutation AddOrder($name: String!, $customer: String, $orderT: String, $performedById: String, $performedT: String, $changeLog: [String], $description: String, $status: AccessInput) {
    addOrder(name: $name, customer: $customer, orderT: $orderT, performedById: $performedById, performedT: $performedT, changeLog: $changeLog, description: $description, status: $status) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateOrder($id: ID!, $name: String, $customer: String, $orderT: String, $performedById: String, $performedT: String, $changeLog: [String], $description: String, $status: AccessInput) {
    updateOrder(id: $id, name: $name, customer: $customer, orderT: $orderT, performedById: $performedById, performedT: $performedT, changeLog: $changeLog, description: $description, status: $status) {
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
  }
};

export default ADD_ORDER_DATA;
