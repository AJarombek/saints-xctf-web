/**
 * Build and configure the redux store, which holds the application state and handles
 * all state updates.
 * @author Andrew Jarombek
 * @since 5/1/2020
 */

import { createBrowserHistory } from 'history';
import {createStore, applyMiddleware, Store} from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './modules/reducers';

export const history = createBrowserHistory();

export default function configureStore(): Store {
  const loggerMiddleware = createLogger();
  const middleware = [routerMiddleware(history), loggerMiddleware, thunkMiddleware];

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  const store = createStoreWithMiddleware(reducer(history));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./modules/reducers', () => store.replaceReducer(reducer))
  }

  return store;
}
