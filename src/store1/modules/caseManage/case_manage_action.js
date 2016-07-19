import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';

/**
 * 获取case_manage列表 
 * 
 * @export
 * @param {any} reqParams
 * @param {any} queryType
 * @returns
 */
export function getCaseManageList(reqParams, queryType) {
  console.log('case manage reqParams', reqParams);
  return {
    type: types.GET_CASE_MANAGE_LIST,
    payload: {
      promise: api.get('case/all_page', { params: reqParams })
    },
    params: {
      reqParams: reqParams,
      queryType: queryType
    }
  }
}

/**
 * 修改state值
 * 
 * @export
 * @param {any} state_value
 * @returns
 */
export function updManageStateValue(state_value) {
  return {
    type: types.UPDATE_CASE_MANAGE_STATE_VALUE,
    params: {
      state_value: state_value
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
export function updManageRootKey(rootKey) {
  return {
    type: types.UPDATE_CASE_MANAGE_ROOT_KEY,
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
    type: types.GET_CASE_MANAGE_SCREENING_TYPE,
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
 * 修改 showSearch 值 
 * 
 * @export
 * @param {any} showSearch
 * @returns
 */
export function updManageShowSearch(showSearch) {
  return {
    type: types.UPDATE_CASE_MANAGE_SHOW_SEARCH,
    params: {
      showSearch: !showSearch
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
export function clearCaseManageSearch(state) {
  const reqParams = {
    pageId: 1,
    recPerPage: 10,
    status: state.status
  }
  return {
    type: types.CLEAR_CASE_MANAGE_SEARCH,
    payload: {
      promise: api.get('case/all_page', { params: reqParams })
    }
  }
}
