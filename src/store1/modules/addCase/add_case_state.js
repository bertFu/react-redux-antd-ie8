import { Record } from 'immutable';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = Record({
  typeList          : [],
  fileList          : [],
  execList          : [],
  execCollectList   : [],
  focusList         : [],
  focusCollectList  : [],
  loading           : false,
  isRootOrgShow     : true,
  
  executorUser      : undefined,
  focusUser         : undefined,
  
  caseNo            : '',
  orgValidateStatus : 'success',
  orgList           : [],
  orgCollectionList : [],
  orgId             : '',
  orgName           : '',
})

export default InitState