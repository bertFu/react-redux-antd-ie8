import {getCookie} from '../../../util';
import types from '../../types';

import reqwest from 'reqwest';
// import AG_CONF from '../../../constants/AgCode';
// import OPERATOR_INFO from '../../../constants/OperatorInfo';

/**
 * 判断 `cookis` 中是否有 `uid` 没有触发没有发现 `uid` 的 `Action`
 * 
 * 如果有 `uid` 通过 `uid` 向服务端获取用户信息
 * 
 */
export function fetchProfile() {
  let uid = getCookie('uid');

  if (uid === undefined) {
    return { type: types.UID_NOT_FOUND };
  }

  return {
    type: types.FETCH_PROFILE,
    payload: {
      // promise: api.post('my')
      user: 'admin'
    }
  }
}

/**
 * 登录
 * 
 * 通过 `用户账号/密码` 获取用户信息
 */
export function login(user, password) {
  return {
    type: types.LOGIN,
    // payload: {
    //   promise: api.put('/login', {
    //     data: {
    //       user: user,
    //       password: password
    //     }
    //   })
    // }
    payload: {
      user: 'admin'
    }
  }
}

/**
 * 退出功能：
 * 
 * 如果是服务端维护退出状态则发送退出请求
 * 如果是在本地维护登录状态，则清空本地 `cookis` 与 `state` 中缓存的用户信息
 * 
 */
export function logout() {
  return {
    type: types.LOGOUT,
    payload: {
      // promise: api.post('logout')
    }
  }
}
