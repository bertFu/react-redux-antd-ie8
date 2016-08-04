import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Test from '../views/Test';
import Feature1 from '../feature/Feature1';
import Feature1_1 from '../feature/Feature1-1';
import Feature1_3 from '../feature/Feature1-3';
import NotFound from '../components/NotFound';
import Loding from '../components/Loding';

function validate() {
  // 在路由群载入时做 filter 处理
}

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/login" component={Login}/>
    <Route path="/" onEnter={validate}>
      <IndexRedirect to="home" />
      <Route component={App}>
        <Route path="home" component={Home}/>
        <Route path="app" component={App}/>
        <Route path="test" component={Test}/>
        <Route path="loding" component={Loding}/>
        <Route path="feature1" component={Feature1}/>
        <Route path="feature1_1" component={Feature1_1}/>
        <Route path="feature1_3" component={Feature1_3}/>
      </Route>
    </Route>

    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
