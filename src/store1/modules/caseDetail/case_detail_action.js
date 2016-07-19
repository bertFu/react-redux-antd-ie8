import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';

/**
 * 获取case类型详情
 * 
 * @export
 * @param {any} caseId
 * @returns
 */
export function getCaseInfo(caseId) {
  return {
    type: types.GET_CASE_INFO,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/reminder_task',
        method: 'get',
        type: 'json',
        data: [
          { name: 'id', value: caseId },
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID }]
      })
    }
  }
}

/**
 * 设置加载效果
 * 
 * @export
 * @param {any} loading
 * @returns
 */
export function updLoad(loading) {
  return {
    type: types.UPDATE_LOAD,
    payload: {
      loading: loading
    }
  }
}

/**
 * 提交评论
 * 
 * 1、提交评论数据
 * 2、判断返回结果，成功则刷新详情信息
 * 
 * @export
 * @param {any} caseId
 * @param {any} comment
 * @returns
 */
export function addComment(caseId, comment) {
  return dispath => {
    dispath({
      type: types.ADD_COMMENT,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/comment?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          method: 'post',
          type: 'json',
          data: {
            caseId: caseId,
            comment: comment,
            operatorId: OPERATOR_INFO.operatorId,
            operator: OPERATOR_INFO.operator
          }
        }).then(function(data) {
          if (data.code == 0) {
            dispath(getCaseInfo(caseId))
          }
          return data
        })
      }
    })
  }
}

/**
 * 修改case状态为关闭
 * 
 * 1、修改case状态
 * 2、判断返回结果，成功则刷新信息
 * 
 * @export
 * @param {any} case_id
 * @returns
 */
export function updStatusClose(case_id) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_CLOSE,
      payload: {
        promise: api.post('case/close', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getCaseInfo(case_id))
          }
        }),
      }
    })

  }
}

/**
 * 修改case状态为确认完成
 * 
 * 1、提交请求
 * 2、判断成功刷新信息
 * 
 * @export
 * @param {any} case_id
 * @returns
 */
export function updStatusConfirmFinish(case_id) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_CONFIRM_FINISH,
      payload: {
        promise: api.post('case/create_finish', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getCaseInfo(case_id))
          }
        }),
      }
    })
  }
}

/**
 * 修改case状态为完成 
 * 
 * 1、提交请求
 * 2、判断成功，刷新信息
 * 
 * @export
 * @param {any} case_id
 * @returns
 */
export function updStatusFinish(case_id) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_STATUS_FINISH,
      payload: {
        promise: api.post('case/execte_finish', { params: { id: case_id } }).then(function(result) {
          if (result.code == '0') {
            dispatch(getCaseInfo(case_id))
          }
        }),
      }
    })
  }
}

/**
 * 修改 `UpdModel` 的状态 
 * 
 * @export
 * @param {any} visible
 * @returns
 */
export function updModelVisible(visible) {
  return {
    type: types.UPDATE_MODEL_VISIBLE,
    params: {
      visible: visible
    }
  }
}

/**
 * 修改 `state` 
 * 
 * @export
 * @param {any} state_value
 * @returns
 */
export function updState(state_value) {
  return {
    type: types.UPDATE_CASE_DETAIL_VISIBLE,
    params: {
      state_value: state_value
    }
  }
}

/**
 * 修改 执行人 
 * 
 * 1、提交请求
 * 2、判断成功，刷新信息
 * 
 * @export
 * @param {any} reqParams
 * @returns
 */
export function updExec(reqParams) {
  reqParams.newExecutorName = reqParams.newExecutorName.substring(0, reqParams.newExecutorName.indexOf('-') > 0 ? reqParams.newExecutorName.indexOf('-') : reqParams.newExecutorName.length),
    console.log('reqParams', reqParams);
  return dispatch => {
    dispatch({
      type: types.UPDATE_EXEC,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/executor?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          method: 'put',
          type: 'json',
          data: reqParams
        }).then(function(data) {
          if (data.code == '0') {
            dispatch(getCaseInfo(reqParams.caseId))
          }
        })
      }
    })
  }
}

/**
 * 修改 发布人 
 * 
 * 1、提交请求
 * 2、判断成功，刷新信息
 * 
 * @export
 * @param {any} reqParams
 * @returns
 */
export function updCreateUser(reqParams) {
  reqParams.newCreaterName = reqParams.newCreaterName.substring(0, reqParams.newCreaterName.indexOf('-') > 0 ? reqParams.newCreaterName.indexOf('-') : reqParams.newCreaterName.length),
    console.log('reqParams', reqParams);
  return dispatch => {
    dispatch({
      type: types.UPDATE_CREATE_USER,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/modify_creater?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          method: 'put',
          type: 'json',
          data: reqParams
        }).then(function(data) {
          if (data.code == '0') {
            dispatch(getCaseInfo(reqParams.caseId))
          }
        })
      }
    })
  }
}

/**
 * 修改 分组 
 * 
 * 1、提交请求
 * 2、判断成功，刷新信息
 * 
 * @export
 * @param {any} reqParams
 * @returns
 */
export function updGroup(reqParams) {
  console.log('reqParams...', reqParams);
  return dispath => {
    dispath({
      type: types.UPDATE_EXEC,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/group?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          method: 'put',
          type: 'json',
          data: reqParams
        }).then(function(data) {
          console.log('data', data);
          if (data.code == '0') {
            dispath(getCaseInfo(reqParams.caseId))
          }
        })
      }
    })
  }
}

/**
 * 修改关注人
 * 
 * 1、处理数据
 * 2、提交请求
 * 3、判断成功，刷新信息 
 * 
 * @export
 * @param {any} reqParams
 * @returns
 */
export function updFocusUser(reqParams) {
  reqParams.focusOnPeopleList = JSON.stringify(reqParams.focusOnPeopleList.map((item) => {
    return {
      userId: item.key,
      userName: item.label.substring(0, item.label.indexOf('-') > 0 ? item.label.indexOf('-') : item.label.length)
    }
  }))
  console.log('reqParams...', reqParams);
  return dispath => {
    dispath({
      type: types.UPDATE_FOCUS,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/focus_on_people?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          method: 'put',
          type: 'json',
          data: reqParams
        }).then(function(data) {
          console.log('data', data);
          if (data.code == '0') {
            dispath(getCaseInfo(reqParams.caseId))
          }
        })
      }
    })
  }
}

/**
 * 根据Id获取子节点 
 * 
 * @export
 * @param {any} query_param
 * @param {any} data
 * @returns
 */
export function getOrgsById(query_param, data) {
  return {
    type: types.GET_DETAIL_ORGS_BY_ID,
    params: {
      key: query_param,
      data: data
    }
  }
}

/**
 * 获取根节点 
 * 
 * @export
 * @param {any} query_param
 * @returns
 */
export function getRootOrgs(query_param) {

  return {
    type: types.GET_DETAIL_ROOT_ORGS,
    payload: {
      // content: OPERATOR_INFO.rootTree
      promise: reqwest({
        url: AG_CONF.agUrl + 'orgs',
        method: 'get',
        type: 'json',
        data: [
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID },
          { name: 'pid', value: 0 }
        ]
      })
    },
  }
}

/**
 * 选中子节点 
 * 
 * @export
 * @param {any} org_name
 * @param {any} org_id
 * @returns
 */
export function updOrgValue(org_name, org_id) {
  return {
    type: types.UPD_DETAIL_ORG_VALUE,
    params: {
      orgName: org_name,
      orgId: org_id,
    }
  }
}

/**
 * 提交case
 * 
 * 1、提交信息
 * 2、判断成功，刷新信息
 * 
 * @export
 * @param {any} subParam
 * @returns
 */
export function submitUpdateCase(subParam) {
  console.log('upd case subParam', subParam);
  /*
   * 获取操作用户信息（TODO）
   * 1、目前没有登录机制，用户通过服务端在页面上将用户信息绑定在 `window` 对象下
   * 2、之后需要通过动态获取用户信息，没有用户信息则需要做特定处理。
   */
  subParam.operator = OPERATOR_INFO.operator;
  subParam.operatorId = OPERATOR_INFO.operatorId;

  return dispatch => {
    dispatch({
      type: types.SUBMIT_UPDATE_CASE,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/reminder_task?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          type: 'json',
          method: 'put',
          data: subParam
        }).then(function(data) {
          if (data.code == '0') {
            dispatch(getCaseInfo(subParam.id))
          }
          return data
        })
      }
    })
  }
}

/**
 * 关联case
 * 
 * @export
 * @param {any} param
 * @returns
 */
export function subRelationCase(param) {
  param.operator = OPERATOR_INFO.operator;
  param.operatorId = OPERATOR_INFO.operatorId;
  console.log('param', param);

  return dispatch => {
    dispatch({
      type: types.SUBMIT_RELATION_CASE,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/relation?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          type: 'json',
          method: 'post',
          data: param
        }).then(function(data) {
          console.log('data', data);
          if (data.code == '0') {
            dispatch(getCaseInfo(param.caseId))
          }
          return data
        })
      }
    })
  }
}


/**
 * 删除关联case
 * 
 * @export
 * @param {any} param
 * @returns
 */
export function delRelationCase(param) {
  param.operator = OPERATOR_INFO.operator;
  param.operatorId = OPERATOR_INFO.operatorId;
  console.log('param', param);

  return dispatch => {
    dispatch({
      type: types.SUBMIT_RELATION_CASE,
      payload: {
        promise: reqwest({
          url: AG_CONF.agUrl + 'case2/relation?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
          type: 'json',
          method: 'delete',
          data: param
        }).then(function(data) {
          console.log('data', data);
          if (data.code == '0') {
            dispatch(getCaseInfo(param.caseId))
          }
          return data
        })
      }
    })
  }
}