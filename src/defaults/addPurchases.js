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
        sx: arrItem[3],
        align: arrItem[4],
        valFunc: arrItem[5]
      }
    };
  });
  return tempData;
}

const getDataString = `{
  id
  quantity
  purchaseRate
  totalAmount
  vendorId {
    id
    name
  }
  purchaseById {
    id
    name
  }
  purchaseT
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
  purchaseTypeId {
    id
    type
  }
  purchaseStatus {
    id
    label
    value
  }
  performedById {
    id
    firstName
  }
  performedT
  transactionType
  purchaseConfirmedById {
    id
    firstName
  }
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
    purchaseTypeId: {
      type: 'select',
      placeHolder: 'Stock',
      label: 'Stock*',
      value: null,
      options: [],
      dependant: ['quantity', 'purchaseRate'],
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
      dependant: ['totalAmount'],
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          purchaseTypeId: () => {
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
    purchaseRate: {
      type: 'number',
      placeHolder: 'Rate',
      label: 'Rate*',
      required: true,
      value: '',
      helperText: "",
      dependant: ['totalAmount'],
      dependancyFunc: (allFields, curKey, triggererKey) => {
        const funSet = {
          purchaseTypeId: () =>{
            return {
              ...allFields[curKey],
              value: allFields[triggererKey].value ? +allFields[triggererKey].value.rate : null,
            }
          }
        }
        return funSet[triggererKey]();
      }
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
    purchaseById: {
      type: 'select',
      placeHolder: 'Purchase By',
      label: 'Purchase By*',
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
    totalAmount: {
      type: 'number',
      disabled: true,
      placeHolder: 'Total Amount',
      label: 'Total Amount*',
      required: true,
      value: '',
      dependant: ['remainingAmount'],
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
          totalAmount: () => {
            return {
              ...allFields[curKey],
              value: allFields.totalAmount.value - allFields.paidAmount.value
            }
          },
          paidAmount: () => {
            return {
              ...allFields[curKey],
              value: allFields.totalAmount.value - allFields.paidAmount.value
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
    purchaseStatus: {
      type: 'select',
      placeHolder: 'Status*',
      label: 'Status*',
      value: null,
      options: [
        { label: 'requested', id: 'Requested', value: 'requested' },
        { label: 'pending', id: 'Pending', value: 'pending' },
        { label: 'approved', id: 'Approved', value: 'approved' },
        { label: 'rejected', id: 'Rejected', value: 'rejected' }
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
    ['purchaseTypeId', 'Stock', ['purchaseTypeId','type'], { paddingLeft: '24px' }],
    ['quantity', 'Quantity', 'quantity'],
    ['purchaseRate', 'Rate', 'purchaseRate'],
    ['totalAmount', 'Total', 'totalAmount'],
    ['purchaseT', 'Date', 'purchaseT',{},'left',formatTimestampToDate],
    ['description', 'Description', 'description'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'PURCHASES_FETCH_REQUESTED',
  getQuery: `query Purchases {
    purchases ${getDataString}
  }`,
  getSingleReq: (payload) => getPurchaseSingle(payload),
  getSingleQuery: `query Purchase($id: ID!){
    purchase(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddPurchase($quantity: Float!, $purchaseRate: Float!, $totalAmount: Float!, $vendorId: String, $purchaseById: String, $purchaseT: String, $paidAmount: Float, $orderId: String, $remainingAmount: Float, $paymentMode: AccessInput, $description: String, $purchaseTypeId: String, $purchaseStatus: AccessInput, $performedById: String, $performedT: String, $transactionType: String, $purchaseConfirmedById: String, $changeLog: [String]) {
    addPurchase(quantity: $quantity, purchaseRate: $purchaseRate, totalAmount: $totalAmount, vendorId: $vendorId, purchaseById: $purchaseById, purchaseT: $purchaseT, paidAmount: $paidAmount, orderId: $orderId, remainingAmount: $remainingAmount, paymentMode: $paymentMode, description: $description, purchaseTypeId: $purchaseTypeId, purchaseStatus: $purchaseStatus, performedById: $performedById, performedT: $performedT, transactionType: $transactionType, purchaseConfirmedById: $purchaseConfirmedById, changeLog: $changeLog) {
      id
    }
  }`,
  updateQuery: `mutation UpdatePurchase($id: ID!, $quantity: Float, $purchaseRate: Float, $totalAmount: Float, $vendorId: String, $purchaseById: String, $purchaseT: String, $paidAmount: Float, $orderId: String, $remainingAmount: Float, $paymentMode: AccessInput, $description: String, $purchaseTypeId: String, $purchaseStatus: AccessInput, $performedById: String, $performedT: String, $transactionType: String, $purchaseConfirmedById: String, $changeLog: [String]) {
    updatePurchase(id: $id, quantity: $quantity, purchaseRate: $purchaseRate, totalAmount: $totalAmount, vendorId: $vendorId, purchaseById: $purchaseById, purchaseT: $purchaseT, paidAmount: $paidAmount, orderId: $orderId, remainingAmount: $remainingAmount, paymentMode: $paymentMode, description: $description, purchaseTypeId: $purchaseTypeId, purchaseStatus: $purchaseStatus, performedById: $performedById, performedT: $performedT, transactionType: $transactionType, purchaseConfirmedById: $purchaseConfirmedById, changeLog: $changeLog) {
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
    purchaseById: ['id'],
    orderId: ['id'],
    purchaseTypeId: ['id'],
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
