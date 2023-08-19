import { getUser } from "api/api";

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
  userName
  password
  firstName
  lastName
  mail
  mobile
  userRoleId {
    id
    name
  }
  changeLog
  performedT
  performedById {
    id
    userName
    firstName
  }
}`

const ADD_USER_DATA = {
  mainCardTitle: 'All Users',
  tableTitle: 'Users',
  slug: 'elements/user',
  dbKey: 'user',
  storePath: ['elements', 'users'],
  label: 'User',
  fields: {
    userName: {
      type: 'text',
      placeHolder: 'User Name',
      label: 'User Name*',
      required: true,
      value: ''
    },
    password: {
      type: 'text',
      placeHolder: 'Password',
      label: 'Password*',
      required: true,
      value: ''
    },
    firstName: {
      type: 'text',
      placeHolder: 'First Name',
      label: 'First Name*',
      required: true,
      value: ''
    },
    lastName: {
      type: 'text',
      placeHolder: 'Last Name',
      label: 'Last Name*',
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
    mobile: {
      type: 'text',
      placeHolder: 'mobile',
      label: 'Mobile*',
      required: true,
      value: ''
    },
    userRoleId: {
      type: 'select',
      placeHolder: 'User Role*',
      label: 'User Role*',
      value: null,
      options: [],
      setOptions: (store) => {
        const loadedOptions = store.elements.userRoles;
        return loadedOptions.map((opt) => {
          return { label: opt.name, id: opt.id, value: opt.id };
        });
      },
      setValue: (val) => {
        return { label: val.name, id: val.id, value: val.id };
      }
    }
  },
  tableHeading: createData([
    ['userName', 'User Name', 'userName', { paddingLeft: '24px' }],
    ['firstName', 'Name', 'firstName'],
    ['lastName', 'Suname', 'lastName'],
    ['userRoleId', 'Role', ['userRoleId', 'name']],
    ['mail', 'Mail', 'mail'],
    ['mobile', 'Mobile', 'mobile'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'USERS_FETCH_REQUESTED',
  getQuery: `query {
    users ${getDataString}
  }`,
  getSingleReq: (payload) => getUser(payload),
  getSingleQuery: `query User($id: ID!){
    user(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddUser($userName: String!, $password: String!, $firstName: String!, $lastName: String!, $userRoleId: String!, $mail: String, $mobile: String, $changeLog: [String], $performedById: String, $performedT: String) {
    addUser(userName: $userName, password: $password, firstName: $firstName, lastName: $lastName, userRoleId: $userRoleId, mail: $mail, mobile: $mobile, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      userName
    }
  }`,
  updateQuery: `mutation UpdateUser($id: ID!, $userName: String, $password: String, $firstName: String, $lastName: String, $mail: String, $mobile: String, $userRoleId: String, $changeLog: [String], $performedById: String, $performedT: String) {
    updateUser(id: $id, userName: $userName, password: $password, firstName: $firstName, lastName: $lastName, mail: $mail, mobile: $mobile, userRoleId: $userRoleId, changeLog: $changeLog, performedById: $performedById, performedT: $performedT) {
      id
      userName
    }
  }`,
  deleteQuery: `mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      userName
    }
  }`,
  extractValues: {
    userRoleId: ['id']
  }
};

export default ADD_USER_DATA;
