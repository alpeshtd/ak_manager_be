import * as actionTypes from './actions';

export const initialState = {
  orders: null
};

// ==============================|| ELEMENTS REDUCER ||============================== //

const overviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UTILIZATIONS_FETCH_SUCCEEDED:
      return {
        ...state,
        utilizations: action.utilizations
      };
    case actionTypes.PURCHASES_FETCH_SUCCEEDED:
      return {
        ...state,
        purchases: action.purchases
      };
    case actionTypes.INCOME_FETCH_SUCCEEDED:
      return {
        ...state,
        incomes: action.incomes
      };
    case actionTypes.ORDERS_FETCH_SUCCEEDED:
      return {
        ...state,
        orders: action.orders
      };
    default:
      return state;
  }
};

export default overviewReducer;
