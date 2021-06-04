/**
 * The Entry point for the React.js application
 * @author Andrew Jarombek
 * @since 12/25/2018
 */

import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/store';
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
import Admin from './containers/Admin';
import GroupAdmin from './containers/GroupAdmin';
import ForgotPasswordReset from './containers/ForgotPasswordReset';
import Log from './containers/Log';
import { useTokenExpiration } from './hooks/shared';

dotenv.config();
const store = configureStore();
interceptor(store);

const RoutedApp = (): JSX.Element => {
  return (
    <Provider store={store}>
      <FeatureFlagProvider values={getFeatureFlags()}>
        <Router>
          <RoutesApp />
        </Router>
      </FeatureFlagProvider>
    </Provider>
  );
};

const RoutesApp = (): JSX.Element => {
  useTokenExpiration();

  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/group/:id" element={<GroupAdmin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="forgotpassword/reset" element={<ForgotPasswordReset />} />
        <Route path="group/:id" element={<Group />} />
        <Route path="log/view/:id" element={<Log />} />
        <Route path="log/new" element={<NewLog />} />
        <Route path="log/edit/:id" element={<EditLog />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="teams" element={<Teams />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

render(<RoutedApp />, document.getElementById('react-container'));

export default hot(RoutedApp);
