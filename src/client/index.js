/**
 * The Entry point for the React.js application
 * @author Andrew Jarombek
 * @since 12/25/2018
 */

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";

const RoutedApp = () =>
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Home} />
        </Switch>
    </Router>;

render(
    <RoutedApp />,
    document.getElementById('react-container')
);

export default RoutedApp;
