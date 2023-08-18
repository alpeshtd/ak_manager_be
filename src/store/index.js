import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';

// ==============================|| REDUX - MAIN STORE ||============================== //

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const persister = 'Free';

sagaMiddleware.run(mySaga);

export { store, persister };
