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

const ADD_CUSTOMER_DATA = {
  mainCardTitle: 'All Customer',
  tableTitle: 'Customers',
  slug: 'elements/customer',
  storePath: ['elements', 'customers'],
  label: 'Customer',
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
  getDispatchType: 'CUSTOMERS_FETCH_REQUESTED',
  getQuery: `query Customers {
    customers {
      id
      name
      mobile
      mail
      address
      orders {
        id
      }
      changeLog
      performedById {
        id
      }
      performedT
    }
  }`,
  addNewQuery: `mutation AddCustomer($name: String!, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    addCustomer(name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateCustomer($id: ID!, $name: String, $mobile: String, $mail: String, $address: String, $changeLog: [String], $performedById: String, $performedT: String) {
    updateCustomer(id: $id, name: $name, mobile: $mobile, mail: $mail, address: $address, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  deleteQuery: `mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
    }
  }`,
};

export default ADD_CUSTOMER_DATA;
