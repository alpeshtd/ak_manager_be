import { getVendor } from "api/api";

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

const getDataString = `{
  id
  name
  mobile
  mail
  address
  purchases {
    id
  }
  changeLog
  performedById {
    id
    firstName
  }
  performedT
}`

const ADD_VENDOR_DATA = {
  mainCardTitle: 'All Vendors',
  tableTitle: 'Vendors',
  slug: 'elements/vendor',
  dbKey: 'vendor',
  storePath: ['elements', 'vendors'],
  label: 'Vendor',
  fields: {
    name: {
      type: 'text',
      placeHolder: 'Name',
      label: 'Name*',
      required: true,
      value: ''
    },
    mobile: {
      type: 'text',
      placeHolder: 'mobile',
      label: 'Mobile*',
      required: true,
      value: ''
    },
    mail: {
      type: 'text',
      placeHolder: 'Mail',
      label: 'Mail*',
      required: true,
      value: ''
    },
    address: {
      type: 'text',
      placeHolder: 'Address',
      label: 'Address*',
      required: true,
      value: ''
    }
  },
  tableHeading: createData([
    ['name', 'Name', 'name', { paddingLeft: '24px' }],
    ['address', 'Address', 'address'],
    ['mail', 'Mail', 'mail'],
    ['mobile', 'Mobile', 'mobile'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'VENDORS_FETCH_REQUESTED',
  getQuery: `query Vendors {
    vendors ${getDataString}
  }`,
  getSingleReq: (payload) => getVendor(payload),
  getSingleQuery: `query Vendor($id: ID!){
    vendor(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddVendor($name: String!, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    addVendor(name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateVendor($id: ID!, $name: String, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    updateVendor(id: $id, name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  deleteQuery: `mutation DeleteVendor($id: ID!) {
    deleteVendor(id: $id) {
      id
      name
    }
  }`,
};

export default ADD_VENDOR_DATA;
