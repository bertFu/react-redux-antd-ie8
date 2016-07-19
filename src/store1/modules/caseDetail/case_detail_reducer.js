import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../../../util';
import types from '../../types';
import InitState from './case_detail_state';

export default createReducer(new InitState, {
  [`${types.GET_CASE_INFO}_SUCCESS`]: (state, data) => {
    return state.set('caseInfo', data.content)
      .set('loading', false);
  },
  [`${types.GET_CASE_INFO}_PENDING`]: (state, data) => {
    return state.set('loading', true);
  },

  [`${types.UPDATE_LOAD}`]: (state, data, params) => {
    return state.set('loading', data.loading)
  },

  [`${types.ADD_COMMENT}_SUCCESS`]: (state, data) => {
    message.success('评论成功');
    return state.set('loading', false);
  },

  [`${types.ADD_COMMENT}_PENDING`]: (state, data) => {
    return state.set('loading', true)
  },

  [`${types.UPDATE_MODEL_VISIBLE}`]: (state, data, params) => {
    return state.set('updModalVisible', params.visible)
  },

  [`${types.UPDATE_CASE_DETAIL_VISIBLE}`]: (state, data, params) => {
    return state
      .set('updModalVisible', params.state_value.updModalVisible !== undefined ? params.state_value.updModalVisible : state.updModalVisible)
      .set('updExecVisible', params.state_value.updExecVisible !== undefined ? params.state_value.updExecVisible : state.updExecVisible)
      .set('loading', params.state_value.loading !== undefined ? params.state_value.loading : state.loading)
      .set('updGroupVisible', params.state_value.updGroupVisible !== undefined ? params.state_value.updGroupVisible : state.updGroupVisible)
      .set('updFocusUserVisible', params.state_value.updFocusUserVisible !== undefined ? params.state_value.updFocusUserVisible : state.updFocusUserVisible)
      .set('updCreateUserVisible', params.state_value.updCreateUserVisible !== undefined ? params.state_value.updCreateUserVisible : state.updCreateUserVisible)
      .set('selectedExec', params.state_value.selectedExec !== undefined ? params.state_value.selectedExec : state.selectedExec)
      .set('selectedCreateUser', params.state_value.selectedCreateUser !== undefined ? params.state_value.selectedCreateUser : state.selectedCreateUser)
      .set('orgName', params.state_value.orgName !== undefined ? params.state_value.orgName : state.orgName)
      .set('orgId', params.state_value.orgId !== undefined ? params.state_value.orgId : state.orgId)
  },

  [`${types.UPDATE_EXEC}_SUCCESS`]: (state, data) => {
    message.success('修改成功');
    return state.set('loading', false);
  },

  [`${types.GET_DETAIL_ROOT_ORGS}_SUCCESS`]: (state, data, params) => {
    const result = data.content && data.content.map(org => {
      return {
        key: org.uuid,
        value: org.uuid,
        name: org.name,
        isLeaf: org.is_all && org.is_all === '0' ? true : false,
      }
    })

    return state.set('orgList', result)
    // .set('orgName', result && result.length>0 ? result[0].name : '请联系管理员配置组权限')
  },

  [`${types.GET_DETAIL_ORGS_BY_ID}`]: (state, data, params) => {

    const result = params.data.content && params.data.content.map(org => {
      return {
        key: org.uuid,
        name: org.name,
        isLeaf: false, // TODO 子节点的权限不做约束
      }
    })
    /**
     * 通过Id获取到子节点信息
     * 
     * 遍历整个 `tree` 数据，将获取到的子节点信息加到匹配的Id的节点下
     * 返回新的节点数据
     * 
     */
    const orgList = Object.assign([], state.orgList, [])

    getNewTreeData(orgList, params.key, result, 10);

    return state.set('orgList', orgList)
  },

  [`${types.UPD_DETAIL_ORG_VALUE}`]: (state, data, params) => {
    return state.set('orgName', params.orgName)
      .set('orgId', params.orgId)
  },


  [`${types.UPDATE_EXEC}_PENDING`]: (state, data) => {
    return state.set('loading', true);
  },

  [`${types.UPDATE_CREATE_USER}_SUCCESS`]: (state, data) => {
    message.success('修改成功');
    return state.set('loading', false);
  },

  [`${types.UPDATE_CREATE_USER}_PENDING`]: (state, data) => {
    return state.set('loading', true);
  },

  [`${types.UPDATE_FOCUS}_SUCCESS`]: (state, data) => {
    message.success('修改成功');
    return state.set('loading', false);
  },

  [`${types.UPDATE_FOCUS}_PENDING`]: (state, data) => {
    return state.set('loading', true);
  },

  [`${types.SUBMIT_UPDATE_CASE}_SUCCESS`]: (state, data) => {
    console.log('data', data);
    message.success('修改成功');
    return state.set('loading', false)
      .set('updModalVisible', false);
  },

  [`${types.SUBMIT_UPDATE_CASE}_PENDING`]: (state) => {
    return state.set('loading', true)
  },

  [`${types.SUBMIT_UPDATE_CASE}_ERROR`]: (state) => {
    message.success('修改失败');
    return state.set('loading', false)
  },

})

// 构建新的树结构
function getNewTreeData(treeData, curKey, child, level) {
  /**
   * getNewTreeData(treeData, curKey, child, level)
   * 
   * 参数：
   * 1、 `treeData` 🌲树控件数据
   * 2、 `curKey` 选中的 `key`
   * 3、 `child` 子节点
   * 4、 `level` 层级
   * 
   * desc：
   * 将子节点加入对应的节点中
   * 
   * 判断🌲树控件层级不符合标准则退出
   * 
   * 遍历节点，如果有子节点，则递归判断子节点
   * 没有则将节点加入子节点中
   * 
   */
  const loop = (data) => {
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (child.length == 0) {
          // message.info('提示：没有数据了！');
          item.isLeaf = true;
        } else {
          item.children = child;
        }
      } else {
        if (item.children) {
          loop(item.children);
        }
      }
    });
  };
  loop(treeData);

  return treeData;
}