import api from '../../../api';
import types from '../../types';

import reqwest from 'reqwest';
import AG_CONF from '../../../constants/AgCode';
import OPERATOR_INFO from '../../../constants/OperatorInfo';
import {emptyMenu, caseMenu} from '../../../../fake/leftMenu';

/**
 * 顶部菜单切换，更新面包屑 
 * 
 * @export
 * @param {any} path
 * @param {any} key
 * @returns
 */
export function updateNavPath(path, key) {
  return {
    type: types.UPDATE_NAVPATH,
    payload: {
      data: path,
      key: key
    }
  }
}

/**
 * 获取case顶部菜单 
 * 向服务端获取 `顶部菜单` 信息，服务端可以自由控制 `顶部菜单` 的权限问题
 * 
 * @export
 * @returns
 */
export function getTopMenu() {
  return {
    type: types.GET_TOP_MENU,
    payload: {
      promise: api.get('topmenu', {})
    }
  }
}

/**
 * 获取cese侧边菜单数据(我的发布、我的case、我的关注) 
 * 
 * 获取 `侧边菜单` 的统计数据
 * 根据 `taskMatch` 字段获取筛选
 * 我的发布 = 1
 * 我的case = 2
 * 我的关注 = 3
 * 
 * @export
 * @param {any} taskMatchObj
 * @returns
 */
export function getCaseMenu(taskMatchObj) {
  return {
    type: types.GET_LEFT_MENU,
    payload: {
      promise: api.get('report/my', { params: taskMatchObj })
    },
    params: {
      ...taskMatchObj,
      leftMenu: caseMenu
    }
  }
}

/**
 * 获取cese侧边菜单数据(我的发布、我的case、我的关注) 
 * 目前添加case侧边菜单不需要数据，所以先传一个空菜单
 * 
 * @export
 * @returns
 */
export function getAddCaseLeftMenu() {
  return {
    type: types.GET_ADD_CASE_LEFT_MENU,
    payload: {
      leftMenu: emptyMenu
    }
  }
}

/**
 * 
 * 获取 `我的管理侧边菜单` 的统计数据
 * 我的管理统计数据是独立的接口，所以在 `Action` 中开一个独立的动作
 *
 * 优化：
 * 可以通过传参来判断需要访问那个接口
 * type = myCase、myTask、myFocu、manage
 * 判断type类型获取相应的结果刷新 `State`
 * 
 * @export
 * @param {any} param
 * @returns
 */
export function getCaseManageMenu(param) {
  return {
    type: types.GET_MANAGE_LEFT_MENU,
    payload: {
      promise: api.get('report/all_page', { params: param })
    },
    params: {
      leftMenu: caseMenu
    }
  }
}

/**
 * 侧栏菜单的隐藏显示控制 
 * 
 * 通过点击切换按钮触发该功能
 * 目前在 `View/App` 下控制，打开与隐藏的Class
 * 
 * @export
 * @param {any} collapse
 * @returns
 */
export function updateCollapse(collapse) {
  return {
    type: types.UPDATE_COLLAPSE,
    payload: {
      collapse: collapse,
    }
  }
}

/**
 * 修改 state 
 * 
 * @export
 * @param {any} status
 * @returns
 */
export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    payload: {
      status: status,
    }
  }
}
