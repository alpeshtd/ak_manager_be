import { formatTimestampToDate } from "utils/utils";

function createData(arr) {
  let tempData = {};
  arr.forEach((arrItem) => {
    tempData = {
      ...tempData,
      [arrItem[0]]: {
        label: arrItem[1],
        dataKey: arrItem[2],
        sx: arrItem[3],
        align: arrItem[4],
        valFunc: arrItem[5]
      }
    };
  });
  return tempData;
}

const ADD_ORDER_DATA = {
  mainCardTitle: 'All Order',
  tableTitle: 'Orders',
  slug: 'overview/order',
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
    ['name', 'Name', 'name'],
    ['customer', 'Customer', ['customer', 'name']],
    ['orderT', 'Start Date', 'orderT',{},'left',formatTimestampToDate],
    ['status', 'Status', ['status','label']],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'ORDERS_FETCH_REQUESTED',
  getQuery: `query Orders {
    orders {
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
    }
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
