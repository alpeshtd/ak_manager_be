import * as actionTypes from './actions';

export const initialState = {
  userRoles: null
};

// ==============================|| ELEMENTS REDUCER ||============================== //

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ROLE_FETCH_SUCCEEDED:
      return {
        ...state,
        userRoles: action.userRoles
      };
    case actionTypes.USERS_FETCH_SUCCEEDED:
      return {
        ...state,
        users: action.users
      };
    case actionTypes.VENDORS_FETCH_SUCCEEDED:
      return {
        ...state,
        vendors: action.vendors
      };
    case actionTypes.CUSTOMERS_FETCH_SUCCEEDED:
      return {
        ...state,
        customers: action.customers
      };
    case actionTypes.STOCKS_FETCH_SUCCEEDED:
      return {
        ...state,
        stocks: action.stocks
      };
    case actionTypes.EMPLOYEES_FETCH_SUCCEEDED:
      return {
        ...state,
        employees: action.employees
      };
    default:
      return state;
  }
};

export default elementsReducer;
