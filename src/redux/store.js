/**
 * Build and configure the redux store, which holds the application state and handles
 * all state updates.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createLogger from 'redux-logger';
import reducer from './modules/reducers';

const history = createBrowserHistory();

const configureStore = (data) => {
  const loggerMiddleware = createLogger();
  const middleware = [loggerMiddleware, routerMiddleware(history)];

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(reducer, data);
};

export { history };
export default configureStore;
