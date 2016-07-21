import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import Appp from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Test from '../views/Test';
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/actived" component={App} />
    <Route path="/login" component={Login} />
    <Route component={Appp}>
      <Route path="home" component={Home}/>
      <Route path="app" component={App}/>
      <Route path="test" component={Test}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
