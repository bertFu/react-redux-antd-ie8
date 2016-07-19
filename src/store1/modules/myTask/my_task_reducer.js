import _ from 'lodash';
import { message } from 'antd';
import { createReducer, getNewPager } from '../../../util';
import types from '../../types';
import InitState from './my_task_state';

export default createReducer(new InitState, {
  [`${types.GET_MY_TASK_LIST}_SUCCESS`]: (state, data, params) => {

    let result = data.content;
    result.map((item, index) => {
      item.key = item.caseNo;
    })

    return state.set('loading', false)
      .set('pager', getNewPager(data.pager, state.pager))
      .set('caseList', result)
      .set('caseNo', params.reqParams.caseNo)
      .set('taskType', params.reqParams.taskType)
      .set('sortType', params.reqParams.sortType)
      .set('create_time', params.reqParams.create_time)
      .set('status', params.reqParams.status)
      .set('isDesc', params.reqParams.isDesc)
  },

  [`${types.GET_MY_TASK_LIST}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.GET_MY_TASK}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.UPDATE_STATUS_FINISH}_SUCCESS`]: (state, data) => {
    message.success('操作成功');
    return state
  },

  // [`${types.UPDATE_STATUS_FINISH}_ERROR`]: (state, data) => {
  //   /**
  //    * 如果 `util` 里无法全局处理 `ERROR` 时启动该 `reducer`
  //    */
  //   message.error('操作失败');
  //   return state
  // },

  [`${types.UPDATE_MY_TASK_ROOT_KEY}`]: (state, data, params) => {
    return state.set('rootKey', params.rootKey)
  },

  [`${types.GET_MY_TASK_SCREENING_TYPE}_SUCCESS`]: (state, data, params) => {
    const typeList = _.map(data.content, type => {
      return {
        text: type.case_type,
        value: type.id,
      }
    });
    return state.set('typeList', typeList)
  },

  [`${types.CLEAR_MY_TASK_SEARCH}_SUCCESS`]: (state, data, params) => {

    let result = data.content;
    result.map((item, index) => {
      item.key = item.caseNo;
    })

    return state
      .set('loading', false)
      .set('pager', getNewPager(data.pager, state.pager))
      .set('caseList', result)
      .set('keyword_value', '')
      .set('caseNo', '')
      .set('taskType', '')
      .set('sortType', '')
      .set('create_time', '')
      .set('isDesc', 0)

  },

  [`${types.UPDATE_MY_TASK_STATE_VALUE}`]: (state, data, params) => {
    return state
      .set('keyword_value', params.state_value.keyword_value !== undefined ? params.state_value.keyword_value : state.keyword_value)
      .set('caseNo', params.state_value.caseNo !== undefined ? params.state_value.caseNo : state.caseNo)
      .set('taskType', params.state_value.taskType !== undefined ? params.state_value.taskType : state.taskType)
      .set('sortType', params.state_value.sortType !== undefined ? params.state_value.sortType : state.sortType)
      .set('create_time', params.state_value.create_time !== undefined ? params.state_value.create_time : state.create_time)
      .set('isDesc', params.state_value.isDesc !== undefined ? params.state_value.isDesc : state.isDesc)
  }
})