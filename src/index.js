/**
 * The Entry point for the React.js application
 * @author Andrew Jarombek
 * @since 12/25/2018
 */

import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './redux/store';
import Home from './components/home/Home';
import SignIn from './components/sign-in/SignIn';
import { Provider } from 'react-redux';
import reducer from './redux/modules/reducers';

const store = configureStore();

const RoutedApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route component={Home}/>
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>;

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => store.replaceReducer(reducer))
}

render(
  <RoutedApp/>,
  document.getElementById('react-container')
);

export default hot(RoutedApp);
