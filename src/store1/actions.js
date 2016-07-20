/**
 * 统一管理 `Action` 将 `Action` 中的方法打包提供给 `View` 使用
 * 
 * @connect(
 *   state => ({...state}),
 *   dispatch => bindActionCreators(Action, dispatch)
 * )
 * 
 * 将逻辑代码统一放在 `Action` 层，这样有利于逻辑重用，且在修改逻辑代码时，不需要改动 `View` 层
 */

import * as leftMenuAction from './modules/leftMenu/left_menu_action' // 左侧菜单
import * as topMenuAction from './modules/topMenu/top_menu_action' // 顶部菜单
import * as userAction from './modules/user/user_action' // 用户

export default {
  ...leftMenuAction,
  ...topMenuAction,
  ...userAction,
}
