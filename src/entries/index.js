import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import App from '../components/App';
import Routes from '../routes/index';
const Provider = require('react-redux').Provider;
const configureStore = require('../store/configureStore');
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
