import _ from 'lodash';
import { message } from 'antd';
import { createReducer } from '../../../util';
import types from '../../types';
import InitState from './add_case_state';

export default createReducer(new InitState, {
  [`${types.GET_CASE_TYPE}_SUCCESS`]: (state, data) => {
    return state.set('typeList', data.content)
  },

  /**
   * TODO
   * 1、这里直接替换执行人列表即可
   * 2、执行人收藏列表初始时查询
   * 3、当搜索的字段为空时，删除做删除执行人列表的操作
   * 4、在 `View` 层判断: `executorList && execAccountList` 如果有 `执行人列表` 信息则优先选择执行人， 否则选择 `执行人收藏列表`
   */
  [`${types.GET_EXEC_COLLECTION_LIST}_SUCCESS`]: (state, data, params) => {
    if (params.refresh) {
      return state.set('execCollectList', data.content)
    } else {
      return state.set('execCollectList', data.content)
        .set('execList', [])
    }

  },

  /**
   * TODO：同上，与执行人逻辑相同 
   */
  [`${types.GET_FOCUS_COLLECTION_LIST}_SUCCESS`]: (state, data, params) => {
    if (params.refresh) {
      return state.set('focusCollectList', data.content)
    } else {

      return state.set('focusCollectList', data.content)
        .set('focusList', [])
    }
  },

  /*
   * _.map 遍历关注人列表过滤离职员工
   * 2、判断关注人是否在关注列表中，如果是关注人，关注人状态修改为关注状态，加入关注ID
   * _.compact 过滤遍历后的数据，处理undefined数据
   */
  [`${types.GET_FOCUS_LIST_BY_KEYWORD}_SUCCESS`]: (state, data) => {
    const focusList = _.compact(_.map(data.content, (account, index) => {
      if (account.disable == 0) {
        account.starStatus = false;
        state.focusCollectList.map(focusCollect => {
          if (account.uuid === focusCollect.focusId) {
            account.starStatus = true;
            account.collectId = focusCollect.id;
            return;
          }
        })
        return account
      }
    }))
    return state.set('focusList', focusList)
  },

  /*
   * 1、_.map 遍历关注人列表过滤离职员工
   * 2、判断执行人是否在关注列表中，如果是关注人，执行人状态修改为关注状态，加入关注ID
   * 3、_.compact 过滤遍历后的数据，处理undefined数据
   */
  [`${types.GET_EXEC_LIST_BY_KEYWORD}_SUCCESS`]: (state, data) => {
    const execList = _.compact(_.map(data.content, (account, index) => {
      if (account.disable == 0) {
        account.starStatus = false;
        state.execCollectList.map(execCollect => {
          if (account.uuid === execCollect.executorId) {
            account.starStatus = true;
            account.collectId = execCollect.id;
            return;
          }
        })
        return account
      }
    }))
    return state.set('execList', execList)
  },
  /** 
   * 发布成功重置数据
   * 
   * TODO：需要优化，将数据统一由 redux 管理
   */
  [`${types.SUBMIT_CASE}_SUCCESS`]: (state) => {
    message.success('发布成功');
    return (new InitState);
  },

  [`${types.SUBMIT_CASE}_PENDING`]: (state) => {
    return state.set('loading', true)
  },

  [`${types.SUBMIT_CASE}_ERROR`]: (state) => {
    message.error('发布失败');
    return state.set('loading', false)
  },

  /**
   * 处理文件集合，将显示地址改为服务端提供的地址 
   */
  [`${types.UPD_DEFAULT_FILE_LIST}`]: (state, data, params) => {
    const fileList = params.fileList && params.fileList.map(file => {
      file.thumbUrl = file.response.content.preShow
      return file
    })
    return state.set('fileList', fileList);

  },

  /**
   * 获取添加任务的组织树的最高节点
   * 
   * 修改返回结构
   */
  [`${types.GET_ADD_ROOT_ORGS}_SUCCESS`]: (state, data, params) => {
      
    const result = data.content && data.content.map(org => {
      let orgObje = {
        key: org.uuid,
        value: org.uuid,
        name: org.name,
        isLeaf: false,
        starStatus: false
      };
      state.orgCollectionList.map(orgCollection => {
        if (org.uuid === orgCollection.key) {
          orgObje.starStatus = true;
          orgObje.collectId = orgCollection.collectId;
          return;
        }
      })
      return orgObje;
    })
    
    console.log('orgList', result);
    return state
      .set('orgList', result)
      .set('orgName', '')
    // .set('orgName', result && result.length>0 ? result[0].name : '请联系管理员配置组权限')
  },

  /**
   * 获取添加任务的组织树的收藏列表
   * 
   * 修改返回结构
   */
  [`${types.GET_ADD_COLLECTION_ORGS}_SUCCESS`]: (state, data, params) => {
    const result = data.content && data.content.map(org => {
      return {
        key: org.groupId,
        value: org.groupId,
        name: org.groupName,
        isLeaf: org.isAll && org.isAll === '0' ? false : true,
        starStatus: true,
        collectId: org.id
      }
    })
    if (params.refresh) {
      return state
        .set('orgCollectionList', result)
        .set('orgName', '')
    } else {
      return state
        .set('orgCollectionList', result)
        .set('orgList', result)
        .set('orgName', '')
    }
  },

  /**
   * 按关键字搜索组织架构列表
   * 
   * 修改返回结构
   */
  [`${types.GET__ORGS_LIST_BY_KEYWORD}_SUCCESS`]: (state, data, params) => {
    const result = data.content && data.content.list.map(org => {
      let orgObje = {
        key: org.uuid,
        value: org.uuid,
        name: org.name,
        halfChecked: false,
        isLeaf: false,
        starStatus: false
      };
      state.orgCollectionList.map(orgCollection => {
        if (org.uuid === orgCollection.key) {
          orgObje.starStatus = true;
          orgObje.collectId = orgCollection.collectId;
          return;
        }
      })
      return orgObje;
    })

    return state
      .set('orgList', result)
  },

  /**
   * 通过ID获取子节点 
   */
  [`${types.GET_ADD_ORGS_BY_ID}`]: (state, data, params) => {
    // 处理组织架构信息结构
    // const result = params.data.content && params.data.content.map(org => {
    //   return {
    //     key: org.uuid,
    //     name: org.name,
    //     isLeaf: false, // TODO 子节点的权限不做约束
    //   }
    // })
    const result = params.data.content && params.data.content.map(org => {
      let orgObje = {
        key: org.uuid,
        value: org.uuid,
        name: org.name,
        halfChecked: false,
        isLeaf: false,
        starStatus: false
      };
      state.orgCollectionList.map(orgCollection => {
        if (org.uuid === orgCollection.key) {
          orgObje.starStatus = true;
          orgObje.collectId = orgCollection.collectId;
          return;
        }
      })
      return orgObje;
    })

    /*
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

  /**
   * 设置组织树的值
   */
  [`${types.UPD_ADD_ORG_VALUE}`]: (state, data, params) => {
    return state.set('orgName', params.orgName)
      .set('orgId', params.orgId)
  },

  /**
   * TODO：处理state需要合并
   */
  [`${types.SET_STATE}`]: (state, data, params) => {
    return state
      .set('orgName', params.orgName)
      .set('orgId', params.orgId)
  },

  /**
   * 统一处理更新 state
   */
  [`${types.UPDATE_ADD_CASE_STATE_VALUE}`]: (state, data, params) => {
    return state
      .set('orgValidateStatus', params.state_value.orgValidateStatus !== undefined ? params.state_value.orgValidateStatus : state.orgValidateStatus)
      .set('executorUser', params.state_value.executorUser !== undefined ? params.state_value.executorUser : state.executorUser)
      .set('isRootOrgShow', params.state_value.isRootOrgShow !== undefined ? params.state_value.isRootOrgShow : state.isRootOrgShow)
      .set('focusUser', params.state_value.focusUser !== undefined ? params.state_value.focusUser : state.focusUser)
  },

  /**
   * 执行人 更改 收藏/取消收藏 状态
   * 
   * 1、判断状态
   *  收藏：将状态改为取消收藏
   *  未收藏：加入收Id，设置状态为收藏
   * 
   * 2、提示执行结果
   */
  [`${types.EXEC_STAR}_SUCCESS`]: (state, data, params) => {
    let messageStr;
    let execList;
    if (params.starStatus) {
      messageStr = '取消关注成功';
      execList = state.execList.map(exec => {
        if (exec.collectId === params.collectId) {
          exec.starStatus = false;
        }
        return exec;
      })
    } else {
      messageStr = '关注成功';
      execList = state.execList.map(exec => {
        if (exec.uuid === params.executorId) {
          exec.collectId = data.content.id;
          exec.starStatus = true;
        }
        return exec;
      })
    }

    message.success(messageStr);
    return state.set('execList', execList);
  },

  /**
   * 关注人 更改 收藏/取消收藏 状态
   * 
   * 1、判断状态
   *  收藏：将状态改为取消收藏
   *  未收藏：加入收Id，设置状态为收藏
   * 
   * 2、提示执行结果
   */
  [`${types.FOCUS_STAR}_SUCCESS`]: (state, data, params) => {
    let messageStr;
    let focusList;
    if (params.starStatus) {
      messageStr = '取消关注成功';
      focusList = state.focusList.map(exec => {
        if (exec.collectId === params.collectId) {
          exec.starStatus = false;
        }
        return exec;
      })
    } else {
      messageStr = '关注成功';
      focusList = state.focusList.map(exec => {
        if (exec.uuid === params.focusId) {
          exec.collectId = data.content.id;
          exec.starStatus = true;
        }
        return exec;
      })
    }

    message.success(messageStr);
    return state.set('focusList', focusList);
  },

  /**
   * 组织架构 更改 收藏/取消收藏 状态
   * 
   * 1、判断状态
   *  收藏：将状态改为取消收藏
   *  未收藏：加入收Id，设置状态为收藏
   * 
   * 2、提示执行结果
   */
  [`${types.ORG_STAR}_SUCCESS`]: (state, data, params) => {
    console.log('state', state);
    let messageStr;
    let orgList;

    function isStar(list, params) {
      return list.map(org => {
        
        if (params.starStatus) {
          if (org.collectId === params.collectId) {
            org.starStatus = false;
          }
        } else {
          if (org.key === params.orgId) {
            org.collectId = data.content.id;
            org.starStatus = true;
          }
        }
        if(org.children){
          console.log('org', org.children); 
          org.children = isStar(org.children, params)
        }

        return org;
      })
    }

    if (params.starStatus) {
      messageStr = '取消关注成功';
      orgList = isStar(state.orgList, params);
    } else {
      messageStr = '关注成功';
      orgList = isStar(state.orgList, params);
    }

    message.success(messageStr);
    return state.set('orgList', orgList);
  }
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