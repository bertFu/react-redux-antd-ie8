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

import * as addCaseAction from './modules/addCase/add_case_action' // 添加case
import * as caseManageAction from './modules/caseManage/case_manage_action' // case管理
import * as caseRankAction from './modules/caseRank/case_rank_action' // case排名
import * as leftMenuAction from './modules/leftMenu/left_menu_action' // 左侧菜单
import * as myCaseAction from './modules/myCase/my_case_action' // 我的发布
import * as myFocusAction from './modules/myFocus/my_focus_action' // 我的关注
import * as myTaskAction from './modules/myTask/my_task_action' // 我的任务
import * as topMenuAction from './modules/topMenu/top_menu_action' // 顶部菜单
import * as userAction from './modules/user/user_action' // 用户

export default {
  ...addCaseAction,
  ...caseManageAction,
  ...caseRankAction,
  ...leftMenuAction,
  ...myCaseAction,
  ...myFocusAction,
  ...myTaskAction,
  ...topMenuAction,
  ...userAction,
}
