import {combineReducers, Reducer} from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import registration from './registration';
import logs from './logs';
import memberships from './memberships';
import notifications from './notifications';
import profile from './profile';
import rangeView from './rangeView';

const createRootReducer = (history): Reducer => combineReducers({
  router: connectRouter(history),
  auth,
  registration,
  logs,
  memberships,
  notifications,
  profile,
  rangeView
});

export default createRootReducer;
