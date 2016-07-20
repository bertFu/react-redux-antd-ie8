// import { Record, Map } from 'immutable';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = {
  user: null,
  loggingIn: false,
  loggingOut: false,
  loginErrors: null
}

export default InitState
