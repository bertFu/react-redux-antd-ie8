import { Record } from 'immutable';
import { PAGER } from '../../../constants/ProjectConf';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = Record({
  caseManageList  : [],
  typeList        : [],
  
  loading         : false,
  showSearch      : false,
  rootKey         : '',
  
  keyword_value   : '',
  caseNo          : '',
  taskType        : '',
  sortType        : '',
  create_time     : '',
  status          : 1,
  isDesc          : 0,
  
  sourceType      : '',
  sourceUser      : '',
  
  searchType      : '',
  startTime       : '',
  endTime         : '',

  isTimeout       : '',
  
  pager: PAGER
})

export default InitState

