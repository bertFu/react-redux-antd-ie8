import { IMAGE_HOST_TEST, IMAGE_HOST_PROD } from '../constants'
import { message } from 'antd';

export const noop = function noop() {}

/**
 * createReducer(initialparams, reducerMap)
 *
 * desc：
 * 自定义创建 `Reducer`
 *
 * 参数：
 * 1、 `initialparams` 初始 `params` 对象
 * 2、 `reducerMap` 与 `Action` 的映射关系, 判断 `action.type`的值， `promise` 的处理结果会由中间件 + `_SUCCESS、_ERROR、PENDING` 返回。
 *
 * 例 `reducerMap` 参数形式：
 * {
 *   [`${types.GET_SITE_INFO}_SUCCESS`]: (params, data) => {
 *     return params.set('siteInfo', data)
 *   },

 *   [`${types.GET_SITE_STATS}_SUCCESS`]: (params, data) => {
 *     return params.set('siteStats', data)
 *   },

 *   [`${types.GET_ALL_NODES}_SUCCESS`]: (params, data) => {
 *     return params.set('nodes', data)
 *   }
 * }
 *
 * 返回值：
 * 使用 `es6` 语法返回一个 `function(params = initialparams, action){}` -> `(params = initialparams, action) => {}`
 * 函数内部：取出当前传入的 `action.type` 值，匹配 `reducerMap` 中对应的 `key` 值？ 有匹配值则返回 `reducerMap` 所对应的方法 `(params, data) => {}` 进行处理, 没有则直接返回 `initialSparams`
 *
 */
export function createReducer (initialparams, reducerMap) {
  return (params = initialparams, action) => {
    const reducer = reducerMap[action.type]
    /*
      TODP：判断 `请求` 返回的 `Code` 显示服务端提示信息。
     */
    if (!action.error && action.payload && action.payload.code && action.payload.code != '0') {
      message.error(action.payload.message);
      if (params.get('loading')) {
        return params.set('loading', false); 
      } else {
        return params;
      }
    }
    
    return reducer ? reducer(params, action.payload ? action.payload : {}, action.params) : params
  }
}

/**
 * fixNumber(date)
 *
 * desc：
 * 修复时间字符串，判断时间长度是否满足要求，不满足则根据长度差距在其末尾不足 '0'
 *
 * 参数：
 * `date` 时间 String
 *
 * 默认 `dataLength` = 13
 */
const fixNumber = function(date) {
  const dateLength = 13;
  const len = date.length;

  let diffLen = dateLength - len;
  let diff = '';

  while (diffLen) {
    diff += '0';
    diffLen--;
  }

  return date + diff;
};

/**
 * dateFormat(data, format)
 *
 * desc：
 * 时间格式化，默认为 `yyyy-MM-dd` 类型
 *
 * 懵逼了，需要啃下 `es6` 语法。。。
 *
 * */
export function dateFormat (date, format) {
  let _format = format || 'yyyy-MM-dd';

  const d = date;
  const o = {
    'M+' : d.getMonth() + 1, // month
    'd+' : d.getDate(), // day
    'h+' : d.getHours(), // hour
    'm+' : d.getMinutes(), // minute
    's+' : d.getSeconds(), // second
    'q+' : Math.floor((d.getMonth() + 3) / 3), // quarter
    'S' : d.getMilliseconds() // millisecond
  };

  /**
   * `repeat` 方法返回一个新字符串，表示将原字符串重复 `n` 次。
   *
   * `RegExp` 是javascript中的一个内置对象。为正则表达式。
   * `RegExp.$1` 是 `RegExp` 的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
   * 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
   *
   * 例子：
   * var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)
   * r.exec('1985-10-15');
   * s1=RegExp.$1;
   * s2=RegExp.$2;
   * s3=RegExp.$3;
   * alert(s1+" "+s2+" "+s3)//结果为1985 10 15
   *
   * `test()` 方法用于检测一个字符串是否匹配某个模式.
   * 语法：RegExpObject.test(string)
   *
   */

  /**
   * 使用正则匹配年份：
   * 
   * 1、 /(y+)/.test(_format)
   * - 检测： `_format` 中最少有一个 `y` // 正则： `+` 表示最少要有一个； `*` 表示 `0-N` ge; `?` 表示 `0/1` 个
   *
   * 2、 (d.getFullYear() + '').substr(4 - RegExp.$1.length))
   * - 判断正则匹配的字符串长度，截取年份字符串，正则匹配长度为 `1~3`、`5~7` 匹配结果为 `1~3` 位的年份字符串， `4,8,...` 为整个年份字符串
   *
   * 3、 _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
   * - 替换所有 `y` 为上面匹配出的年份字符串的结果
   *
   */

  if (/(y+)/.test(_format)) {
    _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(_format)) {
      _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return _format;
}

/**
 * imgTrustUrl(url)
 * 在 `node` 服务上使用，判断 `开发环境/测试环境` 补全 `Url`，在前面加入服务器 `Url`
 *
 * 后续研究下如何扩展 `Java` 配置
 *
 */
export function imgTrustUrl (url) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return IMAGE_HOST_TEST + url
  } else if (process.env.NODE_ENV === 'production') {
    return IMAGE_HOST_PROD + url
  } else {
    return url
  }
}

/**
 * isPromise (value)
 *
 * desc：判断是否是 `Promise` 类型
 *
 * 入参：Object
 *
 * 返回值：Boolean
 *
 */
export function isPromise (value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function'
  }
}

/**
 * getCookie(name)
 *
 * desc：
 * 根据传入的名字，获取 `cookie` 中的值
 * 拼接后以数据的形式返回
 *
 * 入参：String
 *
 * 返回值：Array
 *
 */
export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

/**
 * 新旧page对象切换
 */
export function getNewPager(newPage, oldPage) {
  if (!newPage) {
    return oldPage;
  }
  return {
      pageId: newPage.pageId ? newPage.pageId : oldPage.pageId,
      recPerPage:  newPage.recPerPage ? newPage.recPerPage : oldPage.recPerPage,
      total: newPage.total || newPage.total === 0 ? newPage.total : oldPage.total,
    }
}

/**
 * `我的发布` 请求参数管理
 */
export function myCaseParamsFromat(params) {
  return {
      keyword         : encodeURI(params.myCase.keyword_value),
      caseNo          : params.myCase.caseNo,
      taskType        : params.myCase.taskType,
      sortType        : params.myCase.sortType,
      create_time     : params.myCase.create_time,
      isDesc          : params.myCase.isDesc,
      
      status          : params.menu.status,
      pageId          : params.myCase.pager.pageId,
      recPerPage      : params.myCase.pager.recPerPage,
      
      taskMatch       : params.myCase.taskMatch
  }
}
/**
 * `我的任务` 请求参数管理
 */
export function myTaskParamsFromat(params) {
  return {
      keyword         : encodeURI(params.myTask.keyword_value),
      caseNo          : params.myTask.caseNo,
      taskType        : params.myTask.taskType,
      sortType        : params.myTask.sortType,
      create_time     : params.myTask.create_time,
      isDesc          : params.myTask.isDesc,
      
      status          : params.menu.status,
      pageId          : params.myTask.pager.pageId,
      recPerPage      : params.myTask.pager.recPerPage,
      
      taskMatch       : params.myTask.taskMatch
    }
}

/**
 * `统计排名` 请求参数管理
 */
export function caseRankParamsFromat(params) {
    return {
        sourceType      : params.caseRank.sourceType,
        sourceUser      : params.caseRank.sourceUser.key || '',
        startTime       : params.caseRank.startTime,
        endTime         : params.caseRank.endTime,
        isDesc          : params.caseRank.isDesc,

        pageId          : params.caseRank.pager.pageId,
        recPerPage      : params.caseRank.pager.recPerPage,
    }
}
/**
 * `我的关注` 请求参数管理
 */
export function myFocusParamsFromat(params) {
  return {
      keyword         : encodeURI(params.myFocus.keyword_value),
      caseNo          : params.myFocus.caseNo,
      taskType        : params.myFocus.taskType,
      sortType        : params.myFocus.sortType,
      create_time     : params.myFocus.create_time,
      isDesc          : params.myFocus.isDesc,
      
      status          : params.menu.status,
      pageId          : params.myFocus.pager.pageId,
      recPerPage      : params.myFocus.pager.recPerPage,
      
      taskMatch       : params.myFocus.taskMatch
    }
}
/**
 * `case分组` 请求参数管理
 */
export function caseGroupParamsFromat(params) {
  return {
      keyword         : encodeURI(params.caseGroup.keyword_value),
      caseNo          : params.caseGroup.caseNo,
      taskType        : params.caseGroup.taskType,
      sortType        : params.caseGroup.sortType,
      create_time     : params.caseGroup.create_time,
      isDesc          : params.caseGroup.isDesc,
    
      sourceType      : params.caseGroup.sourceType,
      sourceUser      : encodeURI(params.caseGroup.sourceUser),
      
      searchType      : params.caseGroup.searchType,
      startTime       : encodeURI(params.caseGroup.startTime),
      endTime         : encodeURI(params.caseGroup.endTime),
      
      status          : params.menu.status,
      pageId          : params.caseGroup.pager.pageId,
      recPerPage      : params.caseGroup.pager.recPerPage,
      
      groupId         : params.caseGroup.orgId
    }
}
/**
 * `case管理` 请求参数管理
 */
export function caseManageParamsFromat(params) {
  return {
      keyword         : encodeURI(params.caseManage.keyword_value),
      caseNo          : params.caseManage.caseNo,
      taskType        : params.caseManage.taskType,
      sortType        : params.caseManage.sortType,
      create_time     : params.caseManage.create_time,
      isDesc          : params.caseManage.isDesc,
      
      sourceType      : params.caseManage.sourceType,
      sourceUser      : encodeURI(params.caseManage.sourceUser),
      
      searchType      : params.caseManage.searchType,
      startTime       : encodeURI(params.caseManage.startTime),
      endTime         : encodeURI(params.caseManage.endTime),
      
      isTimeout       : params.caseManage.isTimeout,
      
      status          : params.menu.status,
      pageId          : params.caseManage.pager.pageId,
      recPerPage      : params.caseManage.pager.recPerPage
    }
}

