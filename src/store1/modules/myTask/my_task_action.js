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
export function getMyTaskList(reqParams, queryType) {
  reqParams.taskMatch = 2; // TODO 侧栏菜单查询时没有带 `taskMatch` 先在 `Action` 中固定该值，之后想法办处理
  console.log('my task case_param', reqParams);
  return {
    type: types.GET_MY_TASK_LIST,
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
 * 设置case状态 -> 完成
 * 
 * desc：
 * 先将case发送将case状态设置为完成 `Action`，如果设置成功则在发送查询case列表的 `Action`
 * 
 * 这里用到了 `dispatch` 的触发机制，猜想是用递归的方式调用 `Action` 方法，
 * 有时间需要深入研究
 * 
 */
export function updStatusFinish(case_id, reqParams) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_FINISH,
      payload: {
        promise: api.post('case/execte_finish', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getMyTaskList(reqParams))
          }
        }),
      }
    })
  }
}

/**
 * 修改 rootKey 值
 * 
 * @export
 * @param {any} rootKey
 * @returns
 */
export function updMyTaskRootKey(rootKey) {
  return {
    type: types.UPDATE_MY_TASK_ROOT_KEY,
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
    type: types.GET_MY_TASK_SCREENING_TYPE,
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
export function updMyTaskStateValue(state_value) {
  return {
    type: types.UPDATE_MY_TASK_STATE_VALUE,
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
export function clearMyTaskSearch(state) {
  const reqParams = {
    pageId: 1,
    recPerPage: 10,
    taskMatch: 2,
    status: state.status
  }
  return {
    type: types.CLEAR_MY_TASK_SEARCH,
    payload: {
      promise: api.get('case/my', { params: reqParams })
    }
  }
}