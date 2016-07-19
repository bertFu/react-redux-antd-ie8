import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './modules/user/user_reducer';
import menu from './modules/menu/menu_reducer';
import myCase from './modules/myCase/my_case_reducer';
import myTask from './modules/myTask/my_task_reducer';
import myFocus from './modules/myFocus/my_focus_reducer';
import addCase from './modules/addCase/add_case_reducer';
import caseManage from './modules/caseManage/case_manage_reducer';
import caseGroup from './modules/caseGroup/case_group_reducer';
import caseDetail from './modules/caseDetail/case_detail_reducer';
import caseRank from './modules/caseRank/case_rank_reducer';
/**
 * combineReducers(reducers)
 * 
 * desc：
 * combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
 * 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。
 * 
 * 最终，state 对象的结构会是这样的：
 * 
 * {
 *   reducer1: ...
 *   reducer2: ...
 * }
 * 
 * 自定义 `State` 树名称：
 * 通过为传入对象的 reducer 命名不同来控制 state key 的命名。例如，你可以调用 combineReducers({ todos: myTodosReducer, counter: myCounterReducer }) 将 state 结构变为 { todos, counter }。
 * 通常的做法是命名 reducer，然后 state 再去分割那些信息，因此你可以使用 ES6 的简写方法：combineReducers({ counter, todos })。这与 combineReducers({ counter: counter, todos: todos }) 一样。
 * 
 * 参数：
 * reducers (Object): 一个对象，它的值（value） 对应不同的 reducer 函数，这些 reducer 函数后面会被合并成一个。下面会介绍传入 reducer 函数需要满足的规则。
 * 
 * 返回值：
 * (Function)：一个调用 reducers 对象里所有 reducer 的 reducer，并且构造一个与 reducers 对象结构相同的 state 对象。
 * 
 * 注意，每个传入 combineReducers 的 reducer 都需满足以下规则：
 * 1、所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。（在 `switch` 最后 `return state`）
 * 2、永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
 * 3、如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。
 *    使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。(`state = initState`，当 `state` 为 `undefined` 时会赋默认值 `initState`)
 * 
 */

export default combineReducers({
  user,
  menu,

  caseManage,
  caseGroup,
  caseDetail,
  caseRank,

  myCase,
  myTask,
  addCase,
  myFocus,
  routing: routerReducer
});
