import _ from 'lodash';
import { message } from 'antd';
import { createReducer, getNewPager } from '../../../util';
import types from '../../types';
import InitState from './case_group_state';

import { fromJS, List } from 'immutable';

export default createReducer(new InitState, {
  [`${types.GET_CASE_GROUP_LIST}_SUCCESS`]: (state, data, params) => {

    let result = data.content;
    result && result.map((item, index) => {
      item.key = item.caseNo;
    })

    return state.set('loading', false)
      .set('pager', getNewPager(data.pager, state.pager))
      .set('caseGroupList', result)
      .set('caseNo', params.reqParams.caseNo || '')
      .set('taskType', params.reqParams.taskType || '')
      .set('sortType', params.reqParams.sortType || '')
      .set('create_time', params.reqParams.create_time || '')
      .set('status', params.reqParams.status || 1)
      .set('isDesc', params.reqParams.isDesc || 0)
  },
  [`${types.GET_CASE_GROUP_LIST}_ERROR`]: (state, data, params) => {
    return state.set('loading', false)
  },

  [`${types.GET_CASE_GROUP_LIST}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.GET_CASE_GROUP}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.GET_ROOT_ORGS}`]: (state, data, params) => {

    const result = data.content && data.content.map(org => {
      return {
        key: org.org_id,
        name: org.org_name,
        isLeaf: org.is_all && org.is_all === '0' ? true : false,
      }
    })

    // state.reqParams.groupId = result && result.length>0 ? result[0].key : null;

    return state.set('orgList', result)
      .set('orgValue', result && result.length > 0 ? result[0].name : '请联系管理员配置组权限')
      .set('orgId', result && result.length > 0 ? result[0].key : null)
  },

  [`${types.GET_ORGS_BY_ID}`]: (state, data, params) => {

    const result = params.data && params.data.content.map(org => {
      return {
        key: org.uuid,
        name: org.name,
        isLeaf: false,
      }
    })
    /**
     * 通过Id获取到子节点信息
     * 
     * 遍历整个 `tree` 数据，将获取到的子节点信息加到匹配的Id的节点下
     * 返回新的节点数据
     * 
     */
    const orgList = Object.assign([], state.orgList, [])

    getNewTreeData(orgList, params.key, result, 10);

    return state.set('orgList', orgList)
  },

  [`${types.UPD_ORG_VALUE}`]: (state, data, params) => {
    // state.reqParams.groupId = params.orgId;
    return state.set('orgValue', params.orgValue)
      .set('orgId', params.orgId)
  },

  [`${types.UPDATE_CASE_GROUP_ROOT_KEY}`]: (state, data, params) => {
    return state.set('rootKey', params.rootKey)
  },

  [`${types.GET_CASE_GROUP_SCREENING_TYPE}_SUCCESS`]: (state, data, params) => {
    const typeList = _.map(data.content, type => {
      return {
        text: type.case_type,
        value: type.id,
      }
    });
    return state.set('typeList', typeList)
  },

  [`${types.UPDATE_CASE_GROUP_SHOW_SEARCH}`]: (state, data, params) => {

    return state.set('showSearch', params.showSearch)
  },

  [`${types.CLEAR_CASE_GROUP_SEARCH}_SUCCESS`]: (state, data, params) => {

    let result = data.content;
    result && result.map((item, index) => {
      item.key = item.caseNo;
    })

    return state
      .set('loading', false)
      .set('pager', getNewPager(data.pager, state.pager))
      .set('caseGroupList', result)
      .set('keyword_value', '')
      .set('caseNo', '')
      .set('taskType', '')
      .set('sortType', '')
      .set('create_time', '')
      .set('isDesc', 0)

      .set('sourceType', '')
      .set('sourceUser', '')
      .set('searchType', '')
      .set('startTime', '')
      .set('endTime', '')
  },

  [`${types.CLEAR_CASE_GROUP_SEARCH}_ERROR`]: (state, data, params) => {
    console.log('group erroe');

    return state
      .set('loading', false)
      .set('pager', 10)
      .set('caseGroupList', [])
      .set('keyword_value', '')
      .set('caseNo', '')
      .set('taskType', '')
      .set('sortType', '')
      .set('create_time', '')
      .set('isDesc', 0)

      .set('sourceType', '')
      .set('sourceUser', '')
      .set('searchType', '')
      .set('startTime', '')
      .set('endTime', '')
  },

  [`${types.UPDATE_CASE_GROUP_STATE}`]: (state, data, params) => {
    return state
      .set('keyword_value', params.state_value.keyword_value !== undefined ? params.state_value.keyword_value : state.keyword_value)
      .set('caseNo', params.state_value.caseNo !== undefined ? params.state_value.caseNo : state.caseNo)
      .set('taskType', params.state_value.taskType !== undefined ? params.state_value.taskType : state.taskType)
      .set('sortType', params.state_value.sortType !== undefined ? params.state_value.sortType : state.sortType)
      .set('create_time', params.state_value.create_time !== undefined ? params.state_value.create_time : state.create_time)
      .set('isDesc', params.state_value.isDesc !== undefined ? params.state_value.isDesc : state.isDesc)
      .set('sourceType', params.state_value.sourceType !== undefined ? params.state_value.sourceType : state.sourceType)
      .set('sourceUser', params.state_value.sourceUser !== undefined ? params.state_value.sourceUser : state.sourceUser)
      .set('searchType', params.state_value.searchType !== undefined ? params.state_value.searchType : state.searchType)
      .set('startTime', params.state_value.startTime !== undefined ? params.state_value.startTime : state.startTime)
      .set('endTime', params.state_value.endTime !== undefined ? params.state_value.endTime : state.endTime)
  }

})



// 构建新的树结构
function getNewTreeData(treeData, curKey, child, level) {
  /**
   * getNewTreeData(treeData, curKey, child, level)
   * 
   * 参数：
   * 1、 `treeData` 🌲树控件数据
   * 2、 `curKey` 选中的 `key`
   * 3、 `child` 子节点
   * 4、 `level` 层级
   * 
   * desc：
   * 将子节点加入对应的节点中
   * 
   * 判断🌲树控件层级不符合标准则退出
   * 
   * 遍历节点，如果有子节点，则递归判断子节点
   * 没有则将节点加入子节点中
   * 
   */
  const loop = (data) => {
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (child.length == 0) {
          // message.info('提示：没有数据了！');
          item.isLeaf = true;
        } else {
          item.children = child;
        }
      } else {
        if (item.children) {
          loop(item.children);
        }
      }
    });
  };
  loop(treeData);

  return treeData;
}