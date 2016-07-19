import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../../../util';
import types from '../../types';
import InitState from './user_state';

export default createReducer(new InitState, {

  [`${types.LOGIN}_PENDING`]: (state, data) => {
    return state.set('loggingIn', true)
  },

  [`${types.LOGIN}_ERROR`]: (state, data) => {
    return state.set('loggingIn', false)
      .set('user', null)
      .set('loginErrors', data.message)
  },

  [`${types.LOGIN}_SUCCESS`]: (state, data) => {
    return state.set('loggingIn', true)
      .set('user', data.conten.user)
      .set('loginErrors', null)
  },

  [`${types.LOGOUT}_SUCCESS`]: (state, data) => {
    return state.set('loggingOut', true)
      .set('user', null)
      .set('loginErrors', null)
  },

  [`${types.FETCH_PROFILE}_SUCCESS`]: (state, data) => {
    return state.set('loggingIn', false)
      .set('user', data.conten.user)
      .set('loginErrors', null)
  },
})