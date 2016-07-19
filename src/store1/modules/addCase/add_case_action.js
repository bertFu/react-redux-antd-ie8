/**
 * 全局的一些数据
 */
import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';

/**
 * 获取case类型列表
 * 
 * @export
 * @returns
 */
export function getCaseTypeList() {
  return {
    type: types.GET_CASE_TYPE,
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
 * 获取执行人收藏列表
 * 
 * 通过关键字 `refresh` 判断是否刷新执行人列表
 * 点击收藏时不会改变当前显示列表状态
 * 
 * @export
 * @param {boolean} [refresh=false] 
 * @returns
 */
export function getExecutorList(refresh = false) {
  return {
    type: types.GET_EXEC_COLLECTION_LIST,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/executor_collection',
        method: 'get',
        type: 'json',
        data: [
          { name: 'userId', value: window.globalConfig.operatorId },
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID }
        ]
      })
    },
    params: {
      refresh: refresh
    }
  }
}

/**
 * 获取关注人收藏列表 
 * 
 * 通过关键字 `refresh` 判断是否刷新执行人列表
 * 点击收藏时不会改变当前显示列表状态
 * 
 * @export
 * @param {boolean} [refresh=false] 
 * @returns
 */
export function getFocusList(refresh = false) {
  return {
    type: types.GET_FOCUS_COLLECTION_LIST,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/focus_collection',
        method: 'get',
        type: 'json',
        data: [
          { name: 'userId', value: window.globalConfig.operatorId },
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID }
        ]
      })
    },
    params: {
      refresh: refresh
    }
  }
}

/**
 * 按关键字获取关注人列表 
 * 
 * TODO：可以添加关键字过滤
 * 
 * @export
 * @param {any} keyword
 * @returns
 */
export function getFocusKeywordList(keyword) {
  return {
    type: types.GET_FOCUS_LIST_BY_KEYWORD,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'account/search?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
        type: 'json',
        method: 'post',
        data: {
          page: '1',
          pageSize: '15',
          keyword: keyword
        }
      })
    }
  }
}

/**
 * 按关键字获取执行人列表 
 * 
 * @export
 * @param {any} keyword
 * @returns
 */
export function getExecutorKeywordList(keyword) {
  return {
    type: types.GET_EXEC_LIST_BY_KEYWORD,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'account/search?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
        type: 'json',
        method: 'post',
        data: {
          page: '1',
          pageSize: '15',
          keyword: keyword
        }
      })
    }
  }
}

/**
 * 提交case
 * 
 * @export
 * @param {any} subParam
 * @returns
 */
export function submitCase(subParam) {
  console.log('add case subParam', subParam);
  /*
    处理执行人列表参数：
    从控件中取到的值是 `{key: xx, label: xx}` 形式, 服务端需要 `{userId: xx, userName: xx}` 形式，并且数据要转化成 `Json` 格式
    1、将 `key` 值复制给 `userId`
    2、处理 `label` 因为 `label` 的值在之前做成 `名称-职位` 形式，现在只需要提供名称，使用字符串截取方式获取名称 
  */
  subParam.executorList = JSON.stringify([{
    userId: subParam.executorList.key,
    userName: subParam.executorList.label.substring(0, subParam.executorList.label.indexOf('-') > 0 ? subParam.executorList.label.indexOf('-') : subParam.executorList.length),
  }])

  //  处理关注人列表参数： 同 `执行人` 一致。
  subParam.focusOnPeopleList = JSON.stringify(subParam.focusOnPeopleList.map((item) => {
    return {
      userId: item.key,
      userName: item.label.substring(0, item.label.indexOf('-') > 0 ? item.label.indexOf('-') : item.label.length)
    }
  }))

  /**
   * 获取操作用户信息（todo）
   * 1、目前没有登录机制，用户通过服务端在页面上将用户信息绑定在 `window` 对象下
   * 2、之后需要通过动态获取用户信息，没有用户信息则需要做特定处理。
   */
  subParam.operator = OPERATOR_INFO.operator;
  subParam.operatorId = OPERATOR_INFO.operatorId;

  return {
    type: types.SUBMIT_CASE,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/reminder_task?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
        type: 'json',
        method: 'post',
        data: subParam
      })
    }
  }
}

/**
 * 保存文件列表
 * 
 * 传入一个文件列表，替换当前的文件列表
 * 因为 `ant.design` 的文件空间会将上传的文件保存在 `fileList` 变量中
 * 直接将该 `fileList` 替换到 `State` 的 `fileList`
 * 
 * 当前我们显示的预览图是服务端提供的
 * 所以需要处理 `fileList` 中的 `thumbUrl` 字段的值为服务端提供的地址 `filePreUrl`
 * 服务端的请求结果，空间帮我们封装在 `file` 对象的 `response` 中了
 * 目前对 `fileList` 统一处理
 * 
 * 优化：
 * 后续可以考虑处理单个 `file` 对象，push到 `fileList` 中，当前先简单处理
 * 
 */
export function setDefaultFileList(file_arr) {
  return {
    type: types.UPD_DEFAULT_FILE_LIST,
    params: { fileList: file_arr }
  }
}

/**
 * 获取组织树根节点 
 * 
 * @export
 * @param {any} query_param
 * @returns
 */
export function getRootOrgs(query_param) {

  return {
    type: types.GET_ADD_ROOT_ORGS,
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
 * 获取组织树收藏节点 
 * 
 * @export
 * @param {any} refresh = false
 * @returns
 */
export function getCollectionOrgs(refresh = false) {

  return {
    type: types.GET_ADD_COLLECTION_ORGS,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/group_collection',
        method: 'get',
        type: 'json',
        data: [
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID },
          { name: 'userId', value: OPERATOR_INFO.operatorId }
        ]
      })
    },
    params: {
      refresh: refresh
    }
  }
}

/**
 * 获取组织树收藏节点 
 * 
 * @export
 * @param {any} query_param
 * @returns
 */
export function getOrgsListByKeyword(query_param) {

  return {
    type: types.GET__ORGS_LIST_BY_KEYWORD,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'org/page',
        method: 'get',
        type: 'json',
        data: [
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID },
          { name: 'keyword', value: query_param.keyword },
          { name: 'size', value: 15 }
        ]
      })
    },
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
    type: types.GET_ADD_ORGS_BY_ID,
    params: {
      key: query_param,
      data: data
    }
  }
}

/**
 * 选中子节点
 * 
 * 修改 `case group` 中的树控件的值
 * 
 * ```
 * dispatch(getCaseGroupList(query_param))
 * ```
 * 
 * 在修改树控件值的同时加载对应的case信息
 * 
 */
export function updOrgValue(org_name, org_id) {
  return dispatch => {
    dispatch({
      type: types.UPD_ADD_ORG_VALUE,
      params: {
        orgName: org_name,
        orgId: org_id,
      }
    })
  }
}

/**
 * 选中子节点，查询case列表
 * 修改 `case group` 中的树控件的值
 * 
 * ```
 * dispatch(getCaseGroupList(query_param))
 * ```
 * 
 * 在修改树控件值的同时加载对应的case信息
 * 
 */
export function setState(caseInfo) {
  const state = {
    orgName: caseInfo.caseGroupList.length > 0 ? caseInfo.caseGroupList[0].groupName : '',
    orgId: caseInfo.caseGroupList.length > 0 ? caseInfo.caseGroupList[0].groupId : ''
  }
  return {
    type: types.SET_STATE,
    params: state
  }
}

/**
 * 修改state
 * 
 * @export
 * @param {any} state_value
 * @returns
 */
export function updAddCaseStateValue(state_value) {
  return {
    type: types.UPDATE_ADD_CASE_STATE_VALUE,
    params: {
      state_value: state_value
    }
  }
}

/**
 * 执行人收藏
 * 
 * @export
 * @param {any} executorObj
 * @returns
 */
export function execStar(executorObj) {
  console.log('executorObj', executorObj);
  let reqFun;
  const operator = OPERATOR_INFO.operator;
  const operatorId = OPERATOR_INFO.operatorId;
  
  // 判断选择联系人状态，请求收藏/取消收藏
  if (executorObj.starStatus) {
    const id = executorObj.id;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/executor_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'delete',
      data: {
        id: id,
        operator: operator,
        operatorId: operatorId
      }
    });
  } else {
    const userId = operatorId;
    const userName = operator;
    const executorId = executorObj.executorId;
    const executorName = executorObj.executorName;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/executor_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'post',
      data: {
        userId: operatorId,
        userName: operator,
        executorId: executorId,
        executorName: executorName,
        operator: operator,
        operatorId: operatorId
      }
    });
  }

  return dispatch => {
    dispatch({
      type: types.EXEC_STAR,
      payload: {
        promise: reqFun.then(function(data) {
          if (data.code == '0') {
            dispatch(getExecutorList(true));
          }
          return data;
        })
      },
      params: {
        starStatus: executorObj.starStatus,
        collectId: executorObj.id,
        executorId: executorObj.executorId,
        executorName: executorObj.executorName
      }
    })
  }
}


/**
 * 关注人收藏
 * 
 * @export
 * @param {any} focusObj
 * @returns
 */
export function focusStar(focusObj) {
  console.log('focusObj', focusObj);
  let reqFun;
  const operator = OPERATOR_INFO.operator;
  const operatorId = OPERATOR_INFO.operatorId;
  
  // 判断选择联系人状态，请求收藏/取消收藏
  if (focusObj.starStatus) {
    const id = focusObj.id;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/focus_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'delete',
      data: {
        id: id,
        operator: operator,
        operatorId: operatorId
      }
    });
  } else {
    const userId = operatorId;
    const userName = operator;
    const focusId = focusObj.focusId;
    const focusName = focusObj.focusName;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/focus_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'post',
      data: {
        userId: operatorId,
        userName: operator,
        focusId: focusId,
        focusName: focusName,
        operator: operator,
        operatorId: operatorId
      }
    });
  }

  return dispatch => {
    dispatch({
      type: types.FOCUS_STAR,
      payload: {
        promise: reqFun.then(function(data) {
          if (data.code == '0') {
            dispatch(getFocusList(true));
          }
          return data;
        })
      },
      params: {
        starStatus: focusObj.starStatus,
        collectId: focusObj.id,
        focusId: focusObj.focusId,
        focusName: focusObj.focusName
      }
    })
  }
}

/**
 * 组织架构收藏
 * 
 * 1、判断状态，处理不同请求
 * 2、请求成功后刷新收藏列表
 * 
 * @export
 * @param {any} executorObj
 * @returns
 */
export function orgStar(orgObj) {
  console.log('orgObj', orgObj);
  let reqFun;
  const operator = OPERATOR_INFO.operator;
  const operatorId = OPERATOR_INFO.operatorId;
  
  // 判断选择联系人状态，请求收藏/取消收藏
  if (orgObj.starStatus) {
    const id = orgObj.id;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/group_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'delete',
      data: {
        id: id,
        operator: operator,
        operatorId: operatorId
      }
    });
  } else {
    const userId = operatorId;
    const userName = operator;
    const groupId = orgObj.groupId;
    const groupName = orgObj.groupName;

    reqFun = reqwest({
      url: AG_CONF.agUrl + 'case2/group_collection?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      type: 'json',
      method: 'post',
      data: {
        userId: operatorId,
        userName: operator,
        groupId: groupId,
        groupName: groupName,
        operator: operator,
        operatorId: operatorId
      }
    });
  }
  return dispatch => {
    dispatch({
      type: types.ORG_STAR,
      payload: {
        promise: reqFun.then(function(data) {
          if (data.code == '0') {
            dispatch(getCollectionOrgs(true));
          }
          return data;
        })
      },
      params: {
        starStatus: orgObj.starStatus,
        collectId: orgObj.id,
        orgId: orgObj.groupId,
        orgName: orgObj.groupName
      }
    })
  }
}