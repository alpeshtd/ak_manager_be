function createData(arr) {
  let tempData = {};
  arr.forEach((arrItem) => {
    tempData = {
      ...tempData,
      [arrItem[0]]: {
        label: arrItem[1],
        dataKey: arrItem[2],
        sx: arrItem[3],
        align: arrItem[4]
      }
    };
  });
  return tempData;
}

const ADD_STOCK_DATA = {
  mainCardTitle: 'All Stock',
  tableTitle: 'Stocks',
  slug: 'elements/stock',
  storePath: ['elements', 'stocks'],
  label: 'Stock',
  fields: {
    type: {
      type: 'text',
      placeHolder: 'Type',
      label: 'Type*',
      required: true,
      value: ''
    },
    quantity: {
      type: 'number',
      placeHolder: 'Quantity',
      label: 'Quantity*',
      required: true,
      value: ''
    },
    unit: {
      type: 'text',
      placeHolder: 'Unit',
      label: 'Unit*',
      required: true,
      value: ''
    },
    rate: {
      type: 'number',
      placeHolder: 'Rate',
      label: 'Rate*',
      required: true,
      value: ''
    }
  },
  tableHeading: createData([
    ['type', 'Type', 'type', { paddingLeft: '24px' }],
    ['quantity', 'Quantity', 'quantity'],
    ['unit', 'Unit', 'unit'],
    ['rate', 'Rate', 'rate'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'STOCKS_FETCH_REQUESTED',
  getQuery: `query Stocks {
    stocks {
      id
      type
      quantity
      rate
      unit
      changeLog
      performedById {
        id
      }
      performedT
    }
  }`,
  addNewQuery: `mutation Mutation($type: String, $quantity: Float, $unit: String, $rate: Float, $changeLog: [String], $performedById: String, $performedT: String) {
    addStock(type: $type, quantity: $quantity, unit: $unit, rate: $rate, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      type
    }
  }`,
  updateQuery: `mutation Mutation($id: ID!, $type: String, $quantity: Float, $unit: String, $rate: Float, $changeLog: [String], $performedById: String, $performedT: String) {
    updateStock(id: $id, type: $type, quantity: $quantity, unit: $unit, rate: $rate, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      type
    }
  }`,
  deleteQuery: `mutation Mutation($id: ID!) {
    deleteStock(id: $id) {
      id
      type
    }
  }`,
};

export default ADD_STOCK_DATA;
