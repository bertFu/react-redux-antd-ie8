import keyMirror from 'key-mirror'

/**
 * key-mirror：
 * keyMirror() 创建的对象，值会与名字一致，编码起来更方便
 */

export default keyMirror({
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
  LOGOUT          : null
})
