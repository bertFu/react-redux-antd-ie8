import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';


/**
 * 获取case列表 
 * 
 * @export
 * @param {any} reqParams
 * @param {any} queryType
 * @returns
 */
export function getMyFocusList(reqParams, queryType) {
  reqParams.taskMatch = 3; // TODO 侧栏菜单查询时没有带 `taskMatch` 先在 `Action` 中固定该值，之后想法办处理
  console.log('my focus case_param', reqParams);
  return {
    type: types.GET_MY_FOCUS_LIST,
    payload: {
      promise: api.get('case/my', { params: reqParams })
    },
    params: {
      reqParams: reqParams,
      queryType: queryType
    }
  }
}

/**
 * 修改 rootKey 值 
 * 
 * @export
 * @param {any} rootKey
 * @returns
 */
export function updMyFocusRootKey(rootKey) {
  return {
    type: types.UPDATE_MY_FOCUS_ROOT_KEY,
    params: {
      rootKey: rootKey
    }
  }
}

/**
 * 获取case类型列表 
 * 
 * @export
 * @returns
 */
export function getCaseTypeList() {
  return {
    type: types.GET_MY_FOCUS_SCREENING_TYPE,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/type',
        method: 'get',
        type: 'json',
        data: [
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID }
        ]
      })
    }
  }
}

/**
 * 修改state 
 * 
 * @export
 * @param {any} state_value
 * @returns
 */
export function updMyFocusStateValue(state_value) {
  return {
    type: types.UPDATE_MY_FOCUS_STATE_VALUE,
    params: {
      state_value: state_value
    }
  }
}

/**
 * 清除 state 中搜索项的 Value 
 * 
 * @export
 * @param {any} state
 * @returns
 */
export function clearMyFocusSearch(state) {
  const reqParams = {
    pageId: 1,
    recPerPage: 10,
    taskMatch: 3,
    status: state.status
  }
  return {
    type: types.CLEAR_MY_FOCUS_SEARCH,
    payload: {
      promise: api.get('case/my', { params: reqParams })
    }
  }
}
