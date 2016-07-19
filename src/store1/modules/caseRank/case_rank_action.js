import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';

// 获取case_rank列表
export function getCaseRankList(reqParams, queryType) {
  console.log('case rank reqParams', reqParams);
  return {
    type: types.GET_CASE_RANK_LIST,
    payload: {
      //promise: reqwest({
      //  url: AG_CONF.agUrl + 'case2/statistics_rank?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      //  type: 'json',
      //  method: 'get',
      //  data    : [
      //    { name: 'sourceType', value:reqParams.sourceType },
      //    { name: 'sourceUser', value:reqParams.sourceUser },
      //    { name: 'startTime', value:reqParams.startTime },
      //    { name: 'endTime', value:reqParams.endTime },
      //    { name: 'isDesc', value:reqParams.isDesc },
      //    { name: 'pageNum', value:reqParams.pageId },
      //    { name: 'pageSize', value:reqParams.recPerPage }
      //  ]
      //})
      promise: api.get('case2/statistics_rank', {params: reqParams})
    },
    params: {
      reqParams: reqParams,
      queryType: queryType
    }
  }
}

export function updRankStateValue(state_value) {
  /**
   * 修改值可以做统一处理
   * 这里是统一修改 `State` 的值
   * 分开过多状态会显得更乱
   *
   */
  return {
    type: types.UPDATE_CASE_RANK_STATE_VALUE,
    params: {
      state_value: state_value
    }
  }
}
// 修改 rootKey 值
export function updRankRootKey(rootKey) {
  return {
    type: types.UPDATE_CASE_RANK_ROOT_KEY,
    params: {
      rootKey: rootKey
    }
  }
}
// 获取case类型列表
export function getCaseTypeList() {
  return {
    type: types.GET_CASE_RANK_SCREENING_TYPE,
    payload: {
      promise: reqwest({
                    url     : AG_CONF.agUrl + 'case2/type',
                    method  : 'get',
                    type    : 'json',
                    data    : [
                      { name: 'sign', value: AG_CONF.sign },
                      { name: 'ts', value: AG_CONF.ts },
                      { name: 'appID', value: AG_CONF.appID }
                    ]
                })
    }
  }
}
// 修改 showSearch 值
export function updRankShowSearch(showSearch) {
  return {
    type: types.UPDATE_CASE_RANK_SHOW_SEARCH,
    params: {
      showSearch: !showSearch
    }
  }
}
// 清除 state 中搜索项的 Value
export function clearCaseRankSearch(state) {
  console.log(state)
  const reqParams = {
    sourceType  : 'remain',
    pageId      : 1,
    recPerPage  : 10,
    status       : state.status
  }
  return {
    type: types.CLEAR_CASE_RANK_SEARCH,
    payload: {
      //promise: api.get('case/all_page', {params: reqParams})
    }
  }
}



// 按关键字获取员工列表
export function getExecutorKeywordList(keyword) {
  /*
   todo：需要添加关键字过滤机制时在此处理
   */
  console.log("进入员工搜索");
  return {
    type: types.GET_RANKUSER_LIST_BY_KEYWORD,
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