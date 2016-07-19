import keyMirror from 'key-mirror'

/**
 * key-mirror：
 * keyMirror() 创建的对象，值会与名字一致，编码起来更方便
 */

export default keyMirror({
  // Add Case 
  SUBMIT_CASE                 : null,
  GET_CASE_TYPE               : null,
  GET_EXEC_LIST_BY_KEYWORD    : null,
  GET_EXEC_COLLECTION_LIST    : null,
  GET_FOCUS_LIST_BY_KEYWORD   : null,
  GET_FOCUS_COLLECTION_LIST   : null,
  UPD_DEFAULT_FILE_LIST       : null,
  GET_ADD_ROOT_ORGS           : null, 
  GET_ADD_ORGS_BY_ID          : null, 
  UPD_ADD_ORG_VALUE           : null,
  SET_STATE                   : null,
  SUBMIT_UPDATE_CASE          : null,
  UPDATE_ADD_CASE_STATE_VALUE : null,
  EXEC_STAR                   : null,
  FOCUS_STAR                  : null,
  ORG_STAR                    : null,
  GET_ADD_COLLECTION_ORGS     : null,
  GET__ORGS_LIST_BY_KEYWORD   : null,
  
  // Case Manage
  GET_CASE_MANAGE                   : null,
  GET_CASE_MANAGE_LIST              : null,
  UPDATE_CASE_MANAGE_ROOT_KEY       : null,
  GET_CASE_MANAGE_SCREENING_TYPE    : null,
  UPDATE_CASE_MANAGE_SHOW_SEARCH    : null,
  CLEAR_CASE_MANAGE_SEARCH          : null,
  UPDATE_CASE_MANAGE_SOURCE_USER    : null,
  UPDATE_CASE_MANAGE_STATE_VALUE    : null,


  // Case RANK
  GET_CASE_RANK                   : null,
  GET_CASE_RANK_LIST              : null,
  UPDATE_CASE_RANK_ROOT_KEY       : null,
  GET_CASE_RANK_SCREENING_TYPE    : null,
  UPDATE_CASE_RANK_SHOW_SEARCH    : null,
  CLEAR_CASE_RANK_SEARCH          : null,
  UPDATE_CASE_RANK_SOURCE_USER    : null,
  UPDATE_CASE_RANK_STATE_VALUE    : null,
  GET_RANKUSER_LIST_BY_KEYWORD    : null,
  
  // Case Group
  GET_CASE_GROUP                  : null,
  GET_CASE_GROUP_LIST             : null,
  UPDATE_CASE_GROUP_STATE         : null, // TODO 该功能还未想好
  GET_ROOT_ORGS                   : null, 
  GET_ORGS_BY_ID                  : null, 
  UPD_ORG_VALUE                   : null,
  GET_GROUP_STATISTICS            : null,
  UPDATE_CASE_GROUP_ROOT_KEY      : null,
  GET_CASE_GROUP_SCREENING_TYPE   : null,
  UPDATE_CASE_GROUP_SHOW_SEARCH   : null,
  CLEAR_CASE_GROUP_SEARCH         : null,
  
  // My Case
  GET_MY_CASE                   : null,
  GET_MY_CASE_LIST              : null,
  UPDATE_STATUS_CLOSE           : null,
  UPDATE_STATUS_CONFIRM_FINISH  : null,
  UPDATE_MY_CASE_ROOT_KEY       : null,
  GET_MY_CASE_SCREENING_TYPE    : null,
  UPDATE_MY_CASE_STATE_VALUE    : null,
  CLEAR_MY_CASE_SEARCH          : null,
  
  // My Task
  GET_MY_TASK                   : null,
  GET_MY_TASK_LIST              : null,
  UPDATE_STATUS_FINISH          : null,
  UPDATE_MY_TASK_ROOT_KEY       : null,
  GET_MY_TASK_SCREENING_TYPE    : null,
  UPDATE_MY_TASK_STATE_VALUE    : null,
  CLEAR_MY_TASK_SEARCH          : null,
  
  // My Focus
  GET_MY_FOCUS                   : null,
  GET_MY_FOCUS_LIST              : null,
  UPDATE_MY_FOCUS_ROOT_KEY       : null,
  GET_MY_FOCUS_SCREENING_TYPE    : null,
  UPDATE_MY_FOCUS_STATE_VALUE    : null,
  CLEAR_MY_FOCUS_SEARCH          : null,
  
  // Menu
  UPDATE_NAVPATH          : null,
  GET_TOP_MENU            : null,
  GET_LEFT_MENU           : null,
  GET_MANAGE_LEFT_MENU    : null,
  UPDATE_COLLAPSE         : null,
  UPDATE_STATUS           : null,
  INIT_MENU               : null,
  GET_ADD_CASE_LEFT_MENU  : null,
  
  // User
  UID_NOT_FOUND   : null,
  FETCH_PROFILE   : null,
  LOGIN           : null,
  LOGOUT          : null,
  
  // Case Detail
  GET_CASE_INFO               : null,
  UPDATE_LOAD                 : null,
  ADD_COMMENT                 : null,
  UPDATE_MODEL_VISIBLE        : null,
  UPDATE_CASE_DETAIL_VISIBLE  : null,
  UPDATE_EXEC                 : null,
  GET_DETAIL_ORGS_BY_ID       : null,
  GET_DETAIL_ROOT_ORGS        : null,
  UPD_DETAIL_ORG_VALUE        : null,
  UPDATE_CREATE_USER          : null,
  UPDATE_FOCUS                : null
})
