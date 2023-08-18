import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import elementsReducer from './elementsReducer';
import overviewReducer from './overviewReducer';
import appReducer from './appReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  elements: elementsReducer,
  overview: overviewReducer,
  app: appReducer
});

export default reducer;
