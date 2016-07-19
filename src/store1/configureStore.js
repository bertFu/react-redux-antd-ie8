import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './middlewares/promiseMiddleware'
import createLogger from 'redux-logger'

import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

//使用redux的combineReducers方法将所有reducer打包起来
import reducer from './reducers'
import initState from './initState'

/**
 * 一、createStore(reducer, [initialState])
 * 
 * 参数：
 * 1、 reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
 * 2、 [initialState] (any): 初始时的 state。 
 *     在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。
 *     如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
 * 
 * 返回值：
 * (Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。
 * 
 * 
 * 
 * applyMiddleware(...middlewares)
 * 
 * desc：
 * 使用包含自定义功能的 middleware 来扩展 Redux
 * Middleware 并不需要和 createStore 绑在一起使用，也不是 Redux 架构的基础组成部分，但它带来的益处让我们认为有必要在 Redux 核心中包含对它的支持。因此，虽然不同的 middleware 可能在易用性和用法上有所不同
 * 
 * 参数：
 * ...middlewares (arguments): 遵循 Redux middleware API 的函数。
 * 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。
 * 该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。
 * 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
 * 所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。
 * 
 * 返回值：
 * (Function) 一个应用了 middleware 后的 store enhancer。
 * 这个 store enhancer 就是一个函数，并且需要应用到 createStore。它会返回一个应用了 middleware 的新的 createStore。
 */






const createStoreWithMiddleware = applyMiddleware(
  // `thunk` 中间件由 `Redux` 提供。作用是使action创建函数可以返回一个function代替一个action对象
  thunkMiddleware,

  // `applyMiddleware` 来自 `Redux` 可以包装 `Store` 的 `dispatch`, 将 `promise`
  promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] }),

  // 在控制台里能看到 redux-logger 中间件输出的 action 日志，它们清晰地反映了业务逻辑是怎样的 。如果有其他人在编辑 todolist，基于 websocket 服务端推送技术的支持，你也可以直接看到别人的操作过程。 
  // loggerMiddleware,

  routerMiddleware(browserHistory)
)(createStore);

const store = createStoreWithMiddleware(reducer, initState)

export default store

// // 默认初始化store
// export default function configureStore(initialState) {
//   return createStoreWithMiddleware(reducer, initialState);
// }
