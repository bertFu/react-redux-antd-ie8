import { Record, Map } from 'immutable';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = Record({
  currentIndex  : 0,
  leftMenu      : [],
  leftMenuType  : '',
  topMenu       : [],
  navpath       : [],
  collapse      : false,
  selectClass   : '',
  selectKey     : 'my_case',
  status        : 1
})

export default InitState