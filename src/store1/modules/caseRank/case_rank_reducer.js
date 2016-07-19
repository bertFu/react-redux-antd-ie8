import _ from 'lodash';
import { message } from 'antd';
import { createReducer, getNewPager } from '../../../util';
import types from '../../types';
import InitState from './case_rank_state';

export default createReducer(new InitState, {

  [`${types.GET_CASE_RANK_LIST}_SUCCESS`]: (state, data, params) => {

    let result = data.content;
    result.map((item, index) => {
      item.key = item.caseNo;
    })

    return state.set('loading', false)
      .set('pager', getNewPager(data.pager, state.pager))
      .set('caseRankList', result)
      .set('caseNo', params.reqParams.caseNo)
      .set('taskType', params.reqParams.taskType)
      .set('sortType', params.reqParams.sortType)
      .set('create_time', params.reqParams.create_time)
      .set('status', params.reqParams.status)
      .set('isDesc', params.reqParams.isDesc)
  },

  [`${types.GET_CASE_RANK_LIST}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.GET_CASE_RANK}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.UPDATE_CASE_RANK_ROOT_KEY}`]: (state, data, params) => {

    console.log('params', params);
    return state.set('rootKey', params.rootKey)
  },

  [`${types.GET_CASE_RANK_SCREENING_TYPE}_SUCCESS`]: (state, data, params) => {
    const typeList = _.map(data.content, type => {
      return {
        text: type.case_type,
        value: type.id,
      }
    });
    return state.set('typeList', typeList)
  },

  [`${types.UPDATE_CASE_RANK_SHOW_SEARCH}`]: (state, data, params) => {

    return state.set('showSearch', params.showSearch)
  },

  [`${types.CLEAR_CASE_RANK_SEARCH}`]: (state, data, params) => {

    //let result = data.content;
    //result.map((item, index) => {
    //  item.key = item.caseNo;
    //})

    return state
      .set('loading', false)
      //.set('pager', getNewPager(data.pager, state.pager))
      //.set('caseRankList', result)
      .set('keyword_value', '')
      .set('caseNo', '')
      .set('taskType', '')
      .set('sortType', '')
      .set('create_time', '')
      .set('isDesc', 0)

      .set('sourceType', '')
      .set('sourceUser', {})
      .set('searchType', '')
      .set('startTime', '')
      .set('endTime', '')
      .set('isTimeout', '')

  },

  [`${types.UPDATE_CASE_RANK_STATE_VALUE}`]: (state, data, params) => {
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
      .set('isTimeout', params.state_value.isTimeout !== undefined ? params.state_value.isTimeout : state.isTimeout)
  },

  [`${types.GET_RANKUSER_LIST_BY_KEYWORD}_SUCCESS`]: (state, data) => {
    const execList = _.compact(_.map(data.content, (account, index) => {
      if (account.disable == 0) {
        return account
      }
    }))
    return state.set('execList', execList)
  },
})
