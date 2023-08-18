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

const ADD_UTILIZATION_DATA = {
  mainCardTitle: 'All Utilizations',
  tableTitle: 'Utilizations',
  slug: 'overview/utilization',
  storePath: ['overview', 'utilizations'],
  label: 'Utilization',
  fields: {
    stockId: {
      type: 'select',
      placeHolder: 'Select Stock',
      label: 'Select Stock*',
      value: null,
      options: [],
      dependant: ['quantity', 'rate'],
      setOptions: (store) => {
        const loadedOptions = store.elements.stocks;
        return loadedOptions.map((opt) => {
          return { label: opt.type, id: opt.id, value: opt.id, ...opt };
        });
      },
      setValue: (val) => {
        return { label: val.type, id: val.id, value: val.id, ...val };
      }
    },
    quantity: {
      type: 'number',
      placeHolder: 'Quantity',
      label: 'Quantity*',
      required: true,
      value: '',
      endAdornment: '-',
      helperText: "",
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          stockId: () => {
            return {
              ...allFields[curKey],
              endAdornment: allFields[triggererKey]?.value?.unit || '',
              helperText: 'Available quantity - ' + allFields[triggererKey]?.value?.quantity || '',
              // error: +allFields[curKey].value > (allFields[triggererKey]?.value?.quantity || 0)
            }
          }
        }
        return funSet[triggererKey]();
      }
    },
    rate: {
      type: 'number',
      placeHolder: 'Rate',
      label: 'Rate*',
      required: true,
      value: '',
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          stockId: () =>{
            return {
              ...allFields[curKey],
              value: allFields[triggererKey].value ? +allFields[triggererKey].value.rate : null,
            }
          }
        }
        return funSet[triggererKey]();
      }
    },
    utilizationById: {
      type: 'select',
      placeHolder: 'Utilization By',
      label: 'Utilization By*',
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
    ['stockId', 'Stock', ['stockId','type'], { paddingLeft: '24px' }],
    ['quantity', 'Quantity', 'quantity'],
    ['rate', 'Rate', 'rate'],
    ['utilizationById', 'Utilized By', ['utilizationById','name']],
    ['orderId', 'Order', ['orderId','name']],
    ['description', 'Description', 'description'],
    ['actions', 'Actions', 'actions', {}, 'center'],
    ['viewMore', 'Actions1', 'viewMore', {}, 'center']
  ]),
  getDispatchType: 'UTILIZATIONS_FETCH_REQUESTED',
  getQuery: `query Utilizations {
    utilizations {
      id
      stockId {
        id
        type
        unit
        quantity
        rate
      }
      quantity
      rate
      utilizationById {
        id
        name
      }
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
    }
  }`,
  addNewQuery: `mutation AddUtilization($stockId: String, $quantity: Float, $rate: Float, $utilizationById: String, $utilizationT: String, $orderId: String, $performedById: String, $performedT: String, $description: String, $changeLog: [String]) {
    addUtilization(stockId: $stockId, quantity: $quantity, rate: $rate, utilizationById: $utilizationById, utilizationT: $utilizationT, orderId: $orderId, performedById: $performedById, performedT: $performedT, description: $description, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdateUtilization($id: ID!, $stockId: String, $quantity: Float, $rate: Float, $utilizationById: String, $utilizationT: String, $orderId: String, $performedById: String, $performedT: String, $description: String, $changeLog: [String]) {
    updateUtilization(id: $id, stockId: $stockId, quantity: $quantity, rate: $rate, utilizationById: $utilizationById, utilizationT: $utilizationT, orderId: $orderId, performedById: $performedById, performedT: $performedT, description: $description, changeLog: $changeLog) {
      id
    }
  }`,
  deleteQuery: `mutation DeleteUtilization($id: ID!) {
    deleteUtilization(id: $id) {
      id
    }
  }`,
  extractValues: {
    stockId: ['id'],
    utilizationById: ['id'],
    orderId: ['id']
  }
};

export default ADD_UTILIZATION_DATA;
