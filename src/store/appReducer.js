import * as actionTypes from './actions';

export const initialState = {};

// ==============================|| ELEMENTS REDUCER ||============================== //

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_FETCH_SUCCEEDED:
      return {
        ...state,
        notifications: action.notifications
      };
    case actionTypes.USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        user: action.login
      };
    case actionTypes.SET_LOGGED_USERROLE:
      return {
        ...state,
        loggedUserRole: action.payload
      }
    case actionTypes.UTILIZATIONS_STATS_FETCH_SUCCEEDED:
      return {
        ...state,
        utilizationsStats: action.utilizationsStats
      }
    default:
      return state;
  }
};

export default appReducer;
