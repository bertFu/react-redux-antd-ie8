import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../../../util';
import types from '../../types';
import InitState from './menu_state';

export default createReducer(new InitState, {
  [`${types.GET_TOP_MENU}_SUCCESS`]: (state, data) => {
    console.log('data', data)
    return state.set('topMenu', data.content)
  },

  [`${types.UPDATE_NAVPATH}`]: (state, data) => {

    let navpath = [], tmpOb, tmpKey, child, selectClass = 'ant-menu-item-selected';
    /**
     * 判断 `Action` 传来的数据是否有 `面包屑` 信息
     * 
     * `Menu` 控件传来的值 ['子级控件值', '父级控件值']，将数组倒序，先遍历父级标签
     * 如果不做方向操作，`child` 没有子级菜单列表，导致程序出错
     * 
     * 判断如果是父级标签，查询菜单Json，取到对应Key的值。
     * 储存该菜单的子集菜单集合到 `child` 中
     * 将 `key`、`name` 添加到 `面包屑` 集合中
     * 
     * 判断如果是子级标签，取出对应的Key值
     * 判断 `child` 是否有值，
     * 取到对应的子级数据中的Json
     * 将 `key`、`name` 添加到 `面包屑` 集合中
     * 
     * 在面包屑组件中遍历 `navpath` 构建 `Breadcrumb` 标签的值，按顺序显示相关内容
     * 
     * `selectClass` 用于解决同步菜单二级菜单点击时 `class` 选中状态的问题，目前没有二级菜单，所以暂时没有用处
     * 
     */
    if (data.data) {
      data.data.reverse().map((item) => {
        if (item.indexOf('sub') != -1) {
          tmpKey = item.replace('sub', '');
          tmpOb = _.find(state.topMenu, function(o) {
            return o.key == tmpKey;
          });
          child = tmpOb.child;
          navpath.push({
            key: tmpOb.key,
            name: tmpOb.name
          })
          // selectClass = ''
        }
        if (item.indexOf('menu') != -1) {
          tmpKey = item.replace('menu', '');
          if (child) {
            tmpOb = _.find(child, function(o) {
              return o.key == tmpKey;
            });
          }
          navpath.push({
            key: tmpOb.key,
            name: tmpOb.name
          })
        }
      })
    }

    return state.set('currentIndex', data.key * 1)
      .set('navpath', navpath)
      .set('selectClass', selectClass)
  },

  [`${types.UPDATE_STATUS}`]: (state, data) => {

    return state.set('status', data.status)
  },

  [`${types.GET_LEFT_MENU}_SUCCESS`]: (state, data, params) => {

    let report = data.content, leftMenuType;
    params.leftMenu.map((item) => {
      switch (item.key) {
        case 'ongoing':
          item.num = report.pending || 0;
          break;
        case 'completed':
          item.num = report.finish || 0;
          break;
        case 'confirm_completed':
          item.num = report.confirmFinish || 0;
          break;
        case 'closed':
          item.num = report.closed || 0;
          break;
        case 'gratuity':
          item.num = report.reward || 0;
          break;
        case 'thumb_up':
          item.num = report.likeTotal || 0;
          break;
        case 'dislike':
          item.num = report.booingTotal || 0;
          break;
      }
    })

    switch (params.taskMatch) {
      case 1:
        leftMenuType = 'my_case'
        break;
      case 2:
        leftMenuType = 'my_task'
        break;
      case 3:
        leftMenuType = 'my_focus'
        break;

      default:
        break;
    }

    return state.set('leftMenuType', leftMenuType)
      .set('leftMenu', params.leftMenu)
  },

  [`${types.GET_MANAGE_LEFT_MENU}_SUCCESS`]: (state, data, params) => {

    let case_manage = data.content;

    params.leftMenu.map((item) => {
      switch (item.key) {
        case 'ongoing':
          item.num = case_manage.pending || 0;
          break;
        case 'completed':
          item.num = case_manage.finish || 0;
          break;
        case 'confirm_completed':
          item.num = case_manage.confirmFinish || 0;
          break;
        case 'closed':
          item.num = case_manage.closed || 0;
          break;
        case 'gratuity':
          item.num = case_manage.reward || 0;
          break;
        case 'thumb_up':
          item.num = case_manage.likeTotal || 0;
          break;
        case 'dislike':
          item.num = case_manage.booingTotal || 0;
          break;
      }
    })

    return state.set('leftMenuType', 'case_manage')
      .set('leftMenu', params.leftMenu)
  },

  [`${types.GET_GROUP_STATISTICS}_SUCCESS`]: (state, data, params) => {
    let case_group = data.content;

    const leftMenu = _.map(params.leftMenu, ((item) => {
      switch (item.key) {
        case 'ongoing':
          item.num = case_group.pending || 0;
          break;
        case 'completed':
          item.num = case_group.finish || 0;
          break;
        case 'confirm_completed':
          item.num = case_group.confirmFinish || 0;
          break;
        case 'closed':
          item.num = case_group.closed || 0;
          break;
        case 'gratuity':
          item.num = case_group.reward || 0;
          break;
        case 'thumb_up':
          item.num = case_group.likeTotal || 0;
          break;
        case 'dislike':
          item.num = case_group.booingTotal || 0;
          break;
      }
      return item;
    }))

    return state.set('leftMenuType', 'case_group')
      .set('leftMenu', leftMenu)
  },

  [`${types.INIT_MENU}`]: (state, data, params) => {

    params.leftMenu.map((item) => {
      item.num = 0;
    })

    return state.set('leftMenuType', '')
  },

  [`${types.UPDATE_COLLAPSE}`]: (state, data) => {

    return state.set('collapse', !data.collapse)
  },

  [`${types.GET_ADD_CASE_LEFT_MENU}`]: (state, data) => {

    return state.set('leftMenu', data.leftMenu)
  },
})