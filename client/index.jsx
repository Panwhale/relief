import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';

import './sass/styles.scss';

import Login from './components/Login';
import App from './App';


render(
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={App} />
      </Switch>
    </Router>
  </div>, document.getElementById('root')
);
