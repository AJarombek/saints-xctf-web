import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import registration from './registration';
import logs from './logs';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  registration,
  logs
});

export default createRootReducer;
