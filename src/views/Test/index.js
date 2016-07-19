import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tree, TreeSelect } from 'antd';

import './index.less'

const TreeNode = TreeSelect.TreeNode;

function generateTreeNodes(treeNode) {
  console.log('treeNode', treeNode);
  /**
   * 生成🌲树节点
   * 
   * 参数： `🌲树控件`
   * 初始化 `arr`
   * 缓存 `key` -> eventKey 
   * 
   * 构建 `🌲树节点` 后返回
   * 
   */
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  /**
   * 
   * setLeaf(treeData, curKey, level）
   * 
   * 参数：
   * 1、 `data` 🌲树控件集合
   * 2、 `curKey` 选中的 `key`
   * 3、 `level` 🌲树控件数据的层级
   * 
   * desc：
   * 设置🍃叶子节点是否可以展开
   * 
   * * * * * * * * * * * * * * * * * * * * * * * * 
   * 
   * loopLeaf(data, lev)
   * 
   * 参数：
   * 1、 `data` 🌲树控件集合
   * 2、 `lev` 🌲树控件数据的层级
   * 
   * desc:
   * 循环🍃叶子节点
   * 
   * if (item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0)
   * 遍历数控件集合，如果当前 `key` 的长度 `大于` 传入的 `key`，在判断当前 `key` 名子中包含该传入的 `key` 则返回true，否则返回false
   * 遍历数控件集合，如果当前 `key` 的长度 `小于` 传入的 `key`，在判断传入的 `key`名子中包含该当前 `key` 则返回true，否则返回false   
   *  
   * if (item.children)
   * 如果该叶子，有子节点，递归判断   
   * 
   * else if (l < 1)
   * 如果该叶子没有子节点，且层级等于1，则设置不能展开
   * 
   */
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

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
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

const Demo = React.createClass({
  getInitialState() {
    return {
      treeData: [],
    };
  },
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true },
        ],
      });
    }, 100);
  },
  onSelect(info) {
    console.log('selected', info);
  },
  onLoadData(treeNode) {
    console.log('treeNode', treeNode);
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 10);
        this.setState({ treeData });
        resolve();
      }, 500);
    });
  },
  onChange(value) {
    console.log(arguments);
    this.setState({ value });
  },
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode value={item.name} title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode value={item.name} title={item.name} key={item.key}  disabled={item.key === '0-0-0'} />;
    });
    const treeNodes = loop(this.state.treeData);
    return (
      <div>
      
        
        <TreeSelect style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        allowClear
        onChange={this.onChange}
        loadData={this.onLoadData}
      >
      
        {treeNodes}
      </TreeSelect>
      </div>
    );
  },
});

export default Demo;