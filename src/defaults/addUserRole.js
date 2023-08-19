// import { addUserRole } from "api/api";

import { getUserRole } from "api/api";

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
  performedT
  access {
    label
    id
    value
  }
  changeLog
  performedById {
    id
    userName
    firstName
  }
}`;

const ADD_USER_ROLE_DATA = {
  mainCardTitle: 'All User Roles',
  tableTitle: 'User Roles',
  label: 'User Role',
  dbKey: 'userRole',
  slug: 'elements/userRole',
  storePath: ['elements', 'userRoles'],
  fields: {
    name: {
      type: 'text',
      placeHolder: 'Name',
      label: 'Name*',
      required: true,
      value: ''
    },
    access: {
      type: 'select',
      multiple: true,
      placeHolder: 'Select access*',
      label: 'Select access*',
      value: [],
      options: [
        { label: 'Super User', id: 'superUser', value: 'superUser' },
        { label: 'View More', id: 'viewMore', value: 'viewMore' },
        { label: 'Add', id: 'add', value: 'add' },
        { label: 'Edit', id: 'edit', value: 'edit' },
        { label: 'Delete', id: 'delete', value: 'delete' }
      ]
    }
  },
  tableHeading: createData([
    ['name', 'Name', 'name', { paddingLeft: '24px' }],
    ['access', 'Access', ['access', ['label']]],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'USER_ROLE_FETCH_REQUESTED',
  getQuery: `query {
    userRoles ${getDataString}
  }`,
  getSingleReq: (payload) => getUserRole(payload),
  getSingleQuery: `query UserRole($id: ID!){
    userRole(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation Mutation($name: String!, $access: [AccessInput], $performedById: String, $performedT: String) {
    addUserRole(name: $name, access: $access, performedById: $performedById, performedT: $performedT) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateUserRole($id: ID!, $name: String, $access: [AccessInput], $performedById: String, $performedT: String, $changeLog: [String]) {
    updateUserRole(id: $id, name: $name, access: $access, performedById: $performedById, performedT: $performedT, changeLog: $changeLog) {
      id
      name
    }
  }`,
  // addNewAPI: (payload) => addUserRole(payload),
  deleteQuery: `mutation DeleteUserRole($id: ID!) {
    deleteUserRole(id: $id) {
      id
      name
    }
  }`,
  // addNew: (keyValObj) => {
  //   console.log(keyValObj);
  //   const payload = {
  //     query: `mutation AddUserRole($name: String!, $access: [String]) {
  //       addUserRole(name: $name, access: $access) {
  //         id
  //         name
  //         access
  //       }
  //     }`,
  //     variables: {}
  //   };
  // }
};

export default ADD_USER_ROLE_DATA;
