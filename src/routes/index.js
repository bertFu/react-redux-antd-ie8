import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Test from '../views/Test';
import NotFound from '../components/NotFound';

function validate() {
  // 在路由群载入时做 filter 处理
}

const Routes = ({ history }) =>
  <Router history={history}>
    
    <Route path="/" onEnter={validate}>
      <IndexRedirect to="home" />
      <Route component={App}>
        <Route path="home" component={Home}/>
        <Route path="app" component={App}/>
        <Route path="test" component={Test}/>
      </Route>
    </Route>

    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
