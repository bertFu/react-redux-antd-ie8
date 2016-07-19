/**
 * States 
 *
 */

import * as addCaseState from './modules/addCase/add_case_state' // 添加case
import * as caseManageState from './modules/caseManage/case_manage_state' // case管理
import * as caseRankState from './modules/caseRank/case_rank_state' // case排名
import * as myCaseState from './modules/myCase/my_case_state' // 我的发布
import * as myFocusState from './modules/myFocus/my_focus_state' // 我的关注
import * as myTaskState from './modules/myTask/my_task_state' // 我的任务
import * as MenuState from './modules/menu/menu_state' // 顶部菜单
import * as userState from './modules/user/user_state' // 用户
/**
 * 初始化states
 *
 * @return {[type]} [description]
 */

const initialState = {
  // addCase     : new addCaseState,
  // caseManage  : new caseManageState,
  // myCase      : new myCaseState,
  // myFocus     : new myFocusState,
  // myTask      : new myTaskState,
  // menu        : new MenuState,
  // user        : new userState,
}

export default initialState
