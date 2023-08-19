import { getEmployee } from "api/api";
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
  name
  address
  mobile
  joiningT
  position
  perDay
  performedById {
    id
    firstName
  }
  performedT
  changeLog
}`

const ADD_EMPLOYEE_DATA = {
  mainCardTitle: 'All Employees',
  tableTitle: 'Employees',
  slug: 'elements/employee',
  dbKey: 'employee',
  storePath: ['elements', 'employees'],
  label: 'Employee',
  fields: {
    name: {
      type: 'text',
      placeHolder: 'Name',
      label: 'Name*',
      required: true,
      value: ''
    },
    address: {
      type: 'text',
      placeHolder: 'Address',
      label: 'Address*',
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
    joiningT: {
      type: 'date',
      placeHolder: 'Joining Date',
      label: 'Joinig Date*',
      required: true,
      value: '' + new Date().getTime()
    },
    position: {
      type: 'text',
      placeHolder: 'Position',
      label: 'Position*',
      required: true,
      value: ''
    },
    perDay: {
      type: 'number',
      placeHolder: 'Per Day',
      label: 'Per Day*',
      required: true,
      value: null
    }
  },
  tableHeading: createData([
    ['name', 'Name', 'name', { paddingLeft: '24px' }],
    ['address', 'address', 'address'],
    ['position', 'Position', 'position'],
    ['joiningT', 'Joining Date', 'joiningT',{},'left',formatTimestampToDate],
    ['perDay', 'Per Day', 'perDay'],
    ['mobile', 'Mobile', 'mobile'],
    ['actions', 'Actions', 'actions', {}, 'center']
  ]),
  getDispatchType: 'EMPLOYEES_FETCH_REQUESTED',
  getQuery: `query Employees {
    employees ${getDataString}
  }`,
  getSingleReq: (payload) => getEmployee(payload),
  getSingleQuery: `query Employee($id: ID!){
    employee(id: $id) ${getDataString}
  }`,
  addNewQuery: `mutation AddEmployee($name: String, $address: String, $mobile: String, $joiningT: String, $position: String, $perDay: Int, $performedById: String, $performedT: String, $changeLog: [String]) {
    addEmployee(name: $name, address: $address, mobile: $mobile, joiningT: $joiningT, position: $position, perDay: $perDay, performedById: $performedById, performedT: $performedT, changeLog: $changeLog) {
      id
      name
    }
  }`,
  updateQuery: `mutation UpdateEmployee($name: String, $id: ID, $address: String, $mobile: String, $joiningT: String, $position: String, $perDay: Int, $performedById: String, $performedT: String, $changeLog: [String]) {
    updateEmployee(name: $name, id: $id, address: $address, mobile: $mobile, joiningT: $joiningT, position: $position, perDay: $perDay, performedById: $performedById, performedT: $performedT, changeLog: $changeLog) {
      id
      name
    }
  }`,
  deleteQuery: `mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
    }
  }`,
};

export default ADD_EMPLOYEE_DATA;
