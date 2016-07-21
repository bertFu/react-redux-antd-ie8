/**
 * 1、处理 `Ag` 参数
 * 2、appId、token、ts 加密传输
 * 3、提供AgUrl
 */

import md5 from 'md5';

// const appID = window.globalConfig.appid;
// const token = window.globalConfig.token;
// const ts    = new Date().getTime().toString().substring(0,10);
// const agUrl = window.globalConfig.url;

const agConf = ''//{
//   appID   : appID,
//   token   : token,
//   ts      : ts,
//   sign    : md5(appID + ts + token + 'false'),
//   agUrl   : agUrl
// }

export default agConf