// import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../../../util';
import types from '../../types';
import initialState from './user_state';
import objectAssign from 'object-assign';

export default createReducer(initialState, {

  [`${types.LOGIN}_PENDING`]: (state, data) => {
    
    return objectAssign({}, state, {
      loggingIn : true
    })
  },

  [`${types.LOGIN}_ERROR`]: (state, data) => {
    
    return objectAssign({}, state, {
      loggingIn : false,
      user: null,
      loginErrors: data.message
    })
  },

  [`${types.LOGIN}_SUCCESS`]: (state, data) => {
    
    return objectAssign({}, state, {
      loggingIn : true,
      user: data.conten.user,
      loginErrors: null
    })
  },

  [`${types.LOGOUT}_SUCCESS`]: (state, data) => {
    
    return objectAssign({}, state, {
      loggingOut : true,
      user: null,
      loginErrors: null
    })
  },

  [`${types.FETCH_PROFILE}_SUCCESS`]: (state, data) => {
    
    return objectAssign({}, state, {
      loggingIn : false,
      user: data.conten.user,
      loginErrors: null
    })
  },
})