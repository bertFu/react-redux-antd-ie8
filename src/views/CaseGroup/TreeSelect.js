import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tree, TreeSelect } from 'antd';

import reqwest from 'reqwest';
import AG_CONF from '../../constants/AgCode';

import { getRootOrgs, getOrgsById, updOrgValue } from '../../store/modules/caseGroup/case_group_action';

import './index.less';
import * as Util from '../../util';

const TreeNode = TreeSelect.TreeNode;

class OrgTreeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * 初始化组织上树数据 
   */
  componentDidMount() {
    this.props.getRootOrgs(this.props.reqParams);
  }

  /**
   * 更具Id加载子节点
   * 
   * 1、有子节点时不加载
   * 2、没子节点时加载子节点 
   * 
   * @param {any} treeNode
   * @returns
   */
  onLoadData(treeNode) {
    const self = this;
    if (treeNode.props.children) {
      return new Promise(resolver => { resolver() })
    }
    return reqwest({
      url: AG_CONF.agUrl + 'orgs',
      method: 'get',
      type: 'json',
      data: [
        { name: 'sign', value: AG_CONF.sign },
        { name: 'ts', value: AG_CONF.ts },
        { name: 'appID', value: AG_CONF.appID },
        { name: 'pid', value: treeNode.props.eventKey }
      ]
    }).then(function(data) {
      self.props.getOrgsById(treeNode.props.eventKey, data);
    })
  }

  /**
   * 选中树中的某个节点，根据选中节点的Id获取对应的case列表
   */
  onSelect(value, node, extra) {
    const query_param = this.props.reqParams

    query_param.groupId = node.props.eventKey;
    query_param.isShowAll = node.props.isLeaf ? 1 : 0;
    query_param.pageId = this.props.pager.pageId;
    query_param.recPerPage = this.props.pager.recPerPage;;

    this.props.updOrgValue(value, query_param)
  }

  /**
   * 选中树中的某个节点，根据选中节点的Id获取对应的case列表
   */
  onChange(value, arr, obj) {

    // this.props.updOrgValue(obj)
  }
  
  render() {
    const { orgValue, orgList } = this.props;
    // 遍历节点数据，生成节点DOM
    const loop = data => data && data.map((item) => {
      if (item.children) {
        return <TreeNode value={item.name} title={item.name} key={item.key}>{loop(item.children) }</TreeNode>;
      }
      return <TreeNode value={item.name} title={item.name} key={item.key}  isLeaf={item.isLeaf} />;
    });
    // 获取节点DOM
    const treeNodes = loop(orgList);
    // 树节点配置
    const TreeSelectParams = {
      style: { width: '100%' },
      value: orgValue,
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      placeholder: "请选择",
      allowClear: true,
      onChange: this.onChange,
      loadData: this.onLoadData,
      onSelect: this.onSelect
    }
    
    return (
      <div>
        <TreeSelect
          { ...TreeSelectParams }>
          {treeNodes}
        </TreeSelect>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    orgList: state.caseGroup.orgList,
    orgValue: state.caseGroup.orgValue,

    reqParams: Util.caseGroupParamsFromat(state),
    status: state.menu.status,
    pager: state.caseGroup.pager
  }
}

function mapDispathToprops(dispatch) {
  return {
    getOrgsById: bindActionCreators(getOrgsById, dispatch),
    getRootOrgs: bindActionCreators(getRootOrgs, dispatch),
    updOrgValue: bindActionCreators(updOrgValue, dispatch)
  }
}

export default connect(mapStateToProps, mapDispathToprops)(OrgTreeSelect);