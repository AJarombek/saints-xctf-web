import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import registration from './registration';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  registration
});

export default createRootReducer;
