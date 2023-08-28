import { getPurchaseSingle } from "api/api";
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
  purchaseRate
  totalAmount
  vendorId {
    id
    name
  }
  purchaseT
  description
  performedById {
    id
    firstName
  }
  performedT
  transactionType
  changeLog
}`;

const ADD_PURCHASE_DATA = {
  mainCardTitle: 'All Purchases',
  tableTitle: 'Purchases',
  slug: 'overview/purchase',
  dbKey: 'purchase',
  storePath: ['overview', 'purchases'],
  label: 'Purchase',
  fields: {
    purchaseT: {
      type: 'date',
      placeHolder: 'DD/MM/YYYY',
      label: 'Date',
      value: '' + new Date().getTime(),
    },
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
      dependant: ['totalAmount']
    },
    purchaseRate: {
      type: 'number',
      placeHolder: 'Rate',
      label: 'Rate*',
      required: true,
      value: '',
      dependant: ['totalAmount']
    },
    vendorId: {
      type: 'select',
      placeHolder: 'Select Vendor',
      label: 'Select Vendor*',
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
    totalAmount: {
      type: 'number',
      disabled: true,
      placeHolder: 'Total Amount',
      label: 'Total Amount*',
      required: true,
      value: '',
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          quantity: () => {
            return {
              ...allFields[curKey],
              value: allFields.quantity.value * allFields.purchaseRate.value
            }
          },
          purchaseRate: () => {
            return {
              ...allFields[curKey],
              value: allFields.quantity.value * allFields.purchaseRate.value
            }
          },
        }
        return funSet[triggererKey]();
      }
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
    ['vendorId', 'Vendor', ['vendorId', 'name']],
    ['item', 'Item', 'item'],
    ['quantity', 'Quantity', 'quantity'],
    ['purchaseRate', 'Rate', 'purchaseRate'],
    ['totalAmount', 'Total', 'totalAmount'],
    ['purchaseT', 'Date', 'purchaseT','table','left',formatTimestampToDate],
    ['actions', 'Actions', 'actions', 'details', 'center'],
    ['description', 'Description', 'description','table']
  ]),
  getDispatchType: 'PURCHASES_FETCH_REQUESTED',
  getQuery: `query Purchases {
    purchases ${getDataString}
  }`,
  getSingleReq: (payload) => getPurchaseSingle(payload),
  getSingleQuery: `query Purchase($id: ID!){
    purchase(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddPurchase($quantity: Float!, $item: String, $purchaseRate: Float!, $totalAmount: Float!, $vendorId: String, $purchaseT: String, $description: String, $performedById: String, $performedT: String, $transactionType: String, $changeLog: [String]) {
    addPurchase(quantity: $quantity, item: $item, purchaseRate: $purchaseRate, totalAmount: $totalAmount, vendorId: $vendorId, purchaseT: $purchaseT, description: $description, performedById: $performedById, performedT: $performedT, transactionType: $transactionType, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdatePurchase($id: ID!, $item: String, $quantity: Float, $purchaseRate: Float, $totalAmount: Float, $vendorId: String, $purchaseT: String, $description: String, $performedById: String, $performedT: String, $transactionType: String, $changeLog: [String]) {
    updatePurchase(id: $id, item: $item, quantity: $quantity, purchaseRate: $purchaseRate, totalAmount: $totalAmount, vendorId: $vendorId, purchaseT: $purchaseT, description: $description, performedById: $performedById, performedT: $performedT, transactionType: $transactionType, changeLog: $changeLog) {
      id
    }
  }`,
  deleteQuery: `mutation UpdatePurchase($id: ID!) {
    deletePurchase(id: $id) {
      id
    }
  }`,
  extractValues: {
    vendorId: ['id'],
  },
  updateStatus: (action, data, userId) => {
    const updatedData = {};
    updatedData.purchaseStatus = action === 'rejected' ? {label: "rejected", id: "Rejected", value: "rejected"} : {label: "approved", id: "Approved", value: "approved"}
    updatedData.id = data._id;
    updatedData.purchaseConfirmedById = userId;
    return updatedData;
  }
};

export default ADD_PURCHASE_DATA;
