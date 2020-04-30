/**
 * The Entry point for the React.js application
 * @author Andrew Jarombek
 * @since 12/25/2018
 */

import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import SignIn from './components/sign-in/SignIn';

const RoutedApp = () =>
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route component={Home}/>
    </Switch>
  </Router>;

render(
  <RoutedApp/>,
  document.getElementById('react-container')
);

export default hot(RoutedApp);
