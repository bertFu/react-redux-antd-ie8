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
export function getCaseList(reqParams, queryType) {
  reqParams.taskMatch = 1; // TODO 侧栏菜单查询时没有带 `taskMatch` 先在 `Action` 中固定该值，之后想法办处理
  console.log('my case reqParams', reqParams);
  return {
    type: types.GET_MY_CASE_LIST,
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
 * 修改case状态为关闭 
 * 
 * @export
 * @param {any} case_id
 * @param {any} reqParams
 * @returns
 */
export function updStatusClose(case_id, reqParams) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_CLOSE,
      payload: {
        promise: api.post('case/close', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getCaseList(reqParams))
          }
        }),
      }
    })

  }
}

/**
 * 修改case状态为确认完成
 * 
 * @export
 * @param {any} case_id
 * @param {any} reqParams
 * @returns
 */
export function updStatusConfirmFinish(case_id, reqParams) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_CONFIRM_FINISH,
      payload: {
        promise: api.post('case/create_finish', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getCaseList(reqParams))
          }
        }),
      }
    })
  }
}

/**
 * 修改state 
 * 
 * @export
 * @param {any} state_value
 * @returns
 */
export function updMyCaseStateValue(state_value) {
  return {
    type: types.UPDATE_MY_CASE_STATE_VALUE,
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
export function updMyCaseRootKey(rootKey) {
  return {
    type: types.UPDATE_MY_CASE_ROOT_KEY,
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
    type: types.GET_MY_CASE_SCREENING_TYPE,
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
 * 清除 state 中搜索项的 Value 
 * 
 * @export
 * @param {any} state
 * @returns
 */
export function clearMyCaseSearch(state) {
  const reqParams = {
    pageId: 1,
    recPerPage: 10,
    taskMatch: 1,
    status: state.status
  }
  return {
    type: types.CLEAR_MY_CASE_SEARCH,
    payload: {
      promise: api.get('case/my', { params: reqParams })
    }
  }
}