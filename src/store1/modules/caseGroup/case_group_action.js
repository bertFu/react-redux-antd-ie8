import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';
import { caseMenu } from '../../../../fake/leftMenu';

/**
 * 获取case_group列表 
 * 
 * @export
 * @param {any} reqParams
 * @param {any} queryType
 * @returns
 */
export function getCaseGroupList(reqParams, queryType) {
  console.log('case group reqParams', reqParams);
  return {
    type: types.GET_CASE_GROUP_LIST,
    payload: {
      promise: api.get('case/group', { params: reqParams })
      // promise: reqwest({
      //               url     : AG_CONF.agUrl + 'case2/tasklist_group', 
      //               method  : 'get', 
      //               type    : 'json', 
      //               data    : [ 
      //                 { name: 'sign',           value: AG_CONF.sign }, 
      //                 { name: 'ts',             value: AG_CONF.ts }, 
      //                 { name: 'appID',          value: AG_CONF.appID } ,

      //                 { name: 'caseNo',         value: reqParams.caseNo },
      //                 { name: 'searchMessage',  value: reqParams.searchMessage },
      //                 { name: 'taskType',       value: reqParams.taskType },
      //                 { name: 'sortType',       value: reqParams.sortType },
      //                 { name: 'status',         value: reqParams.status },
      //                 { name: 'groupId',        value: reqParams.groupId },
      //                 { name: 'isShowAll',      value: reqParams.isShowAll },
      //               ]
      //           })
    },
    params: {
      reqParams: reqParams,
      queryType: queryType
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
export function updGroupStateValue(state_value) {
  return {
    type: types.UPDATE_CASE_GROUP_STATE,
    params: {
      state_value: state_value
    }
  }
}

/**
 * 获取根节点 
 * 
 * @export
 * @param {any} reqParams
 * @returns
 */
export function getRootOrgs(reqParams) {
  return dispatch => {
    dispatch({
      type: types.GET_ROOT_ORGS,
      payload: {
        content: OPERATOR_INFO.rootTree
      },
    })
    // 在初始化后，加载case列表数据
    if (OPERATOR_INFO.rootTree && OPERATOR_INFO.rootTree.length > 0) {
      const groupId = OPERATOR_INFO.rootTree[0].org_id;

      dispatch(getCaseGroupList({
        ...reqParams,
        groupId: groupId
      }))
      dispatch(getGroupStatistics(groupId))
    } else {
      // 在初始化后，初始化侧栏菜单数据
      dispatch({
        type: types.INIT_MENU,
        params: {
          leftMenu: caseMenu
        }
      })
    }
  }
}

/**
 *  根据Id获取子节点
 * 
 * @export
 * @param {any} reqParams
 * @param {any} data
 * @returns
 */
export function getOrgsById(reqParams, data) {
  return {
    type: types.GET_ORGS_BY_ID,
    params: {
      key: reqParams,
      data: data
    }
  }
}

/**
 * 选中子节点，查询case列表 
 * 修改 `case group` 中的树控件的值
 * 
 * @export
 * @param {any} org_value
 * @param {any} reqParams
 * @returns
 */
export function updOrgValue(org_value, reqParams) {
  return dispatch => {
    dispatch({
      type: types.UPD_ORG_VALUE,
      params: {
        orgValue: org_value,
        orgId: reqParams.groupId
      }
    })
    // 在修改树控件值的同时加载对应的case信息
    dispatch(getCaseGroupList(reqParams))
    // 设置id
    dispatch(getGroupStatistics(reqParams.groupId))
  }
}

/**
 * 获取case_group列表 
 * 获取初始化的 `Group` 统计数据
 * @export
 * @param {any} groupId
 * @param {any} isShowAll
 * @returns
 */
export function getGroupStatistics(groupId, isShowAll) {
  return {
    type: types.GET_GROUP_STATISTICS,
    payload: {
      promise: reqwest({
        url: AG_CONF.agUrl + 'case2/statistics_group',
        method: 'get',
        type: 'json',
        data: [
          { name: 'sign', value: AG_CONF.sign },
          { name: 'ts', value: AG_CONF.ts },
          { name: 'appID', value: AG_CONF.appID },

          { name: 'groupId', value: groupId },
          { name: 'isShowAll', value: isShowAll },
        ]
      })
    },
    params: {
      leftMenu: caseMenu
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
export function updCaseGroupRootKey(rootKey) {
  return {
    type: types.UPDATE_CASE_GROUP_ROOT_KEY,
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
    type: types.GET_CASE_GROUP_SCREENING_TYPE,
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
export function updGroupShowSearch(showSearch) {
  return {
    type: types.UPDATE_CASE_GROUP_SHOW_SEARCH,
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
export function clearCaseGroupSearch(state) {
  const reqParams = {
    pageId: 1,
    recPerPage: 10,
    groupId: state.groupId,
    status: state.status
  }
  return {
    type: types.CLEAR_CASE_GROUP_SEARCH,
    payload: {
      promise: api.get('case/group', { params: reqParams })
    }
  }
}