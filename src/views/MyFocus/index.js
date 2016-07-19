import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Pagination, Popconfirm, Row, Col } from 'antd';

import TopSearch from './TopSearch';

import * as myFocusAction from '../../store/modules/myFocus/my_focus_action';
import { getCaseMenu } from '../../store/modules/menu/menu_action';

import './index.less';
import * as Util from '../../util';
import { expandedRowRender, myFocusTableHead } from '../../util/templateUtil';

class MyFocus extends React.Component {
  constructor(props) {
    super(props)
    this.handleTableChange = this.handleTableChange.bind(this);
    this.paginationChange = this.paginationChange.bind(this);
  }

  /**
   * 初始化table数据
   * 
   * desc：
   * 1、初始化《我的关注》列表数据
   * 2、获取侧边菜单统计数据
   * 3、初始化表格类型筛选列表
   * 
   */
  componentDidMount() {
    // 按上次操作状态查询
    this.props.myFocusAction.getMyFocusList(this.props.reqParams)
    // 获取侧边菜单
    this.props.getCaseMenu({ taskMatch: this.props.taskMatch });
    // 获取表格类型筛选列表
    this.props.myFocusAction.getCaseTypeList();
  }

  /**
   * 分页搜索,根据分页Id查询相关页面
   * 
   * desc：
   * 获取 `state` 中存储的请求参数，在请求参数中加入当前页数信息，进行查询操作
   * 
   */
  paginationChange(pageId) {
    let { reqParams } = this.props;
    reqParams.pageId = pageId;
    this.props.myFocusAction.getMyFocusList(reqParams)
  }

  /**
   * 表格扩展搜索
   * 
   * desc：
   * 根据当前赛选条件，组合成服务端需要的请求参数，获取相应数据
   * 
   */
  handleTableChange(pagination, filters, sorter) {
    let { reqParams } = this.props;
    // 判断需要排序的列、正序/倒序
    reqParams.sortType = sorter.field || '';
    reqParams.isDesc = sorter.order == "ascend" ? 1 : 0;
    // 类型赛选字符拼接
    reqParams.taskType = filters.caseTypeName ? filters.caseTypeName.join(',') : '';
    reqParams.priority = filters.priority ? filters.priority.join(',') : '';

    // 搜索列表
    this.props.myFocusAction.getMyFocusList(reqParams);
  }

  render() {
    const { loading, caseList, pager, typeList } = this.props;
    // 表头信息获取
    const columns = myFocusTableHead({
      typeList: typeList
    });
    // 表格参数
    const tableParams = {
      columns: columns,
      className: "table",
      dataSource: caseList,
      pagination: false,
      scroll: { x: 1600 },
      expandedRowRender: expandedRowRender, // 点击扩展详情 DOM
      size: "middle",
      loading: loading,
      onChange: this.handleTableChange
    }
    // 分页参数
    const pagerParams = {
      style: { marginTop: 16 },
      showQuickJumper: true,
      total: pager.total,
      showTotal: total => { return `共 ${total} 条` },
      current: pager.pageId,
      onChange: this.paginationChange,
      pageSize: pager.recPerPage
    }
    
    return (
      <div>
        <TopSearch />
        <div className='table-group'>
          <Table
            { ...tableParams } />
        </div>
        <Pagination
          { ...pagerParams } />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    caseList: state.myFocus.caseList,
    typeList: state.myFocus.typeList,
    loading: state.myFocus.loading,
    reqParams: Util.myFocusParamsFromat(state),
    taskMatch: state.myFocus.taskMatch,
    pager: state.myFocus.pager,
    status: state.menu.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    myFocusAction: bindActionCreators(myFocusAction, dispatch),
    getCaseMenu: bindActionCreators(getCaseMenu, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFocus);
