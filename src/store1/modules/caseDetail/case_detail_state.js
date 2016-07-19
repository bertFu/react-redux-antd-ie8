import { Record, Map, List } from 'immutable';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = Record({
  caseInfo        : {},
  updModalVisible : false,
  updExecVisible  : false,
  updGroupVisible : false,
  updCreateUserVisible: false,
  updFocusUserVisible: false,
  loading         : false,
  selectedExec      : null,
  selectedCreateUser : null,
  
  orgList         : [],
  orgId           : '',
  orgName         : '',
})

export default InitState