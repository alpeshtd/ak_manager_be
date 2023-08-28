import { getUtilization } from "api/api";
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
  item
  quantity
  rate
  utilizationT
  orderId {
    id
    name
  }
  performedById {
    id
  }
  performedT
  description
  changeLog
}`;

const ADD_UTILIZATION_DATA = {
  mainCardTitle: 'All Utilizations',
  tableTitle: 'Utilizations',
  slug: 'overview/utilization',
  dbKey: 'utilization',
  storePath: ['overview', 'utilizations'],
  label: 'Utilization',
  fields: {
    item: {
      type: 'text',
      placeHolder: 'Item',
      label: 'Item*',
      required: true,
      value: '',
    },
    quantity: {
      type: 'number',
      placeHolder: 'Quantity',
      label: 'Quantity*',
      required: true,
      value: '',
      // endAdornment: '-',
      // helperText: "",
    },
    rate: {
      type: 'number',
      placeHolder: 'Rate',
      label: 'Rate*',
      required: true,
      value: '',
    },
    // utilizationById: {
    //   type: 'select',
    //   placeHolder: 'Utilization By',
    //   label: 'Utilization By*',
    //   value: null,
    //   options: [],
    //   setOptions: (store) => {
    //     const loadedOptions = store.elements.employees;
    //     return loadedOptions.map((opt) => {
    //       return { label: opt.name, id: opt.id, value: opt.id };
    //     });
    //   },
    //   setValue: (val) => {
    //     return { label: val.name, id: val.id, value: val.id };
    //   }
    // },
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
    utilizationT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Date',
      value: '' + new Date().getTime(),
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
    ['item', 'Item', 'item',null,'left',null,{ paddingLeft: '24px' }],
    ['quantity', 'Quantity', 'quantity'],
    ['rate', 'Rate', 'rate'],
    ['orderId', 'Order', ['orderId','name']],
    ['actions', 'Actions', 'actions', 'details', 'center'],
    ['utilizationT', 'Utilization Time', 'utilizationT', 'table','left',formatTimestampToDate],
    ['description', 'Description', 'description','table'],
  ]),
  getDispatchType: 'UTILIZATIONS_FETCH_REQUESTED',
  getQuery: `query Utilizations {
    utilizations ${getDataString}
  }`,
  getSingleReq: (payload) => getUtilization(payload),
  getSingleQuery: `query Utilization($id: ID!){
    utilization(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddUtilization($item: String, $quantity: Float, $rate: Float, $utilizationT: String, $orderId: String, $performedById: String, $performedT: String, $description: String, $changeLog: [String]) {
    addUtilization(item: $item, quantity: $quantity, rate: $rate, utilizationT: $utilizationT, orderId: $orderId, performedById: $performedById, performedT: $performedT, description: $description, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdateUtilization($id: ID!, $item: String, $quantity: Float, $rate: Float, $utilizationT: String, $orderId: String, $performedById: String, $performedT: String, $description: String, $changeLog: [String]) {
    updateUtilization(id: $id, item: $item, quantity: $quantity, rate: $rate, utilizationT: $utilizationT, orderId: $orderId, performedById: $performedById, performedT: $performedT, description: $description, changeLog: $changeLog) {
      id
    }
  }`,
  deleteQuery: `mutation DeleteUtilization($id: ID!) {
    deleteUtilization(id: $id) {
      id
    }
  }`,
  extractValues: {
    orderId: ['id']
  }
};

export default ADD_UTILIZATION_DATA;
