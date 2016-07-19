import { Record, Map } from 'immutable';
import { PAGER } from '../../../constants/ProjectConf';

/**
 * immutable 确定操作的对象是不可变的，更好的维护性能
 * 具体说明在 `immutable.md` 文件中
 */

const InitState = Record({
  caseList        : [],
  typeList        : [],
  
  loading         : false,
  focus           : false,
  no_focus        : false,
  rootKey         : '',
  
  keyword_value   : '',
  caseNo          : '',
  taskType        : '',
  sortType        : '',
  create_time     : '',
  status          : 1,
  isDesc          : 0,
  
  taskMatch: 3,
  
  pager: PAGER
})

export default InitState