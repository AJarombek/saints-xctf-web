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
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import { interceptor } from './datasources/apiRequest';

import Home from './containers/Home/Home';
import SignIn from './containers/SignIn';
import Dashboard from './containers/Dashboard';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import Register from './containers/Register/Register';
import EditLog from './containers/EditLog';
import { FeatureFlagProvider } from './components/shared/FeatureFlag';
import { getFeatureFlags } from './utils/features';
import NewLog from './containers/NewLog/NewLog';
import Profile from './containers/Profile/Profile';
import Teams from './containers/Teams';
import Group from './containers/Group';

dotenv.config();
const store = configureStore();
interceptor(store);

const RoutedApp = (): JSX.Element => (
  <Provider store={store}>
    <FeatureFlagProvider values={getFeatureFlags()}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/forgotpassword/email" component={ForgotPassword} />
            <Route exact path="/forgotpassword/reset" component={ForgotPassword} />
            <Route exact path="/group/:id" component={Group} />
            <Route exact path="/log/new" component={NewLog} />
            <Route exact path="/log/edit/:id" component={EditLog} />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/teams" component={Teams} />
            <Route component={Home} />
          </Switch>
        </>
      </ConnectedRouter>
    </FeatureFlagProvider>
  </Provider>
);

render(<RoutedApp />, document.getElementById('react-container'));

export default hot(RoutedApp);
