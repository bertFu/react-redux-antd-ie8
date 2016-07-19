import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tree, TreeSelect } from 'antd';

import reqwest from 'reqwest';
import AG_CONF from '../../constants/AgCode';

import * as addCaseAction from '../../store/modules/addCase/add_case_action';

import './index.less';

const TreeNode = TreeSelect.TreeNode;

class OrgTreeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * 初始化树节点信息
   * 
   */
  componentDidMount() {
    // this.props.addCaseAction.getRootOrgs();
    this.props.addCaseAction.getCollectionOrgs();
  }

  /**
   * 加载树节点数据
   * 
   * 1、判断该节点有子节点则不做加载
   * 2、通过选中节点的ID加载子节点，加载成功后更新节点信息
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
      self.props.addCaseAction.getOrgsById(treeNode.props.eventKey, data);
    })
  }

  /**
   * 选中树中的某个节点，根据选中节点的Id获取对应的case列表
   * 
   * 1、获取节点信息，更新选中节点，加载对应的列表数据
   */
  onSelect(value, node, extra) {
    const id = node.props.eventKey
    this.props.addCaseAction.updOrgValue(value, id)
  }

  /**
   * 选中树中的某个节点，根据选中节点的Id获取对应的case列表
   * 
   * 判断节点的值，没有值时清除节点信息
   */
  onChange(value, arr, obj) {
    if (!value) {
      this.props.addCaseAction.updOrgValue('', '')
    }
  }

  render() {
    const { orgName, orgList, orgCollectionList } = this.props;
    // 遍历节点数据，生成节点DOM
    const loop = data => data && data.map((item) => {
      if (item.children) {
        return <TreeNode value={item.name} title={item.name} key={item.key}>{loop(item.children) }</TreeNode>;
      }
      return <TreeNode value={item.name} title={item.name} key={item.key}  isLeaf={item.isLeaf} />;
    });
    // 获取节点DOM
    const treeNodes = loop(orgList ? orgList : orgCollectionList);
    // 树节点配置
    const TreeSelectParams = {
      style: { width: 300 },
      value: orgName,
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
    orgList: state.addCase.orgList,
    orgCollectionList: state.addCase.orgCollectionList,
    orgName: state.addCase.orgName,
    orgId: state.addCase.orgId
  }
}

function mapDispathToprops(dispatch) {
  return {
    addCaseAction: bindActionCreators(addCaseAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispathToprops)(OrgTreeSelect);