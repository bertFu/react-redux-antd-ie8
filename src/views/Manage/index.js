import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Pagination, Row, Col, Button } from 'antd';

// import CaseNoInput from './CaseNoInput';
// import KeywordInput from './KeywordInput';
import TopSearch from './TopSearch';
import ExportExcel from '../../components/ExportExcel';

import * as caseManageAction from '../../store/modules/caseManage/case_manage_action'
import { getCaseManageMenu } from '../../store/modules/menu/menu_action'

import './index.less'
import * as Util from '../../util';
import { expandedRowRender, caseManageTableHead } from '../../util/templateUtil';

class CaseManage extends React.Component {
  constructor(props) {
    super(props)
    this.handleTableChange = this.handleTableChange.bind(this);
    this.paginationChange = this.paginationChange.bind(this);
  }
  
  /**
   * 初始化table数据
   * 
   * desc：
   * 1、初始化《case管理》列表数据
   * 2、获取侧边菜单统计数据
   * 3、初始化表格类型筛选列表
   * 
   */
  componentDidMount() {
    // 按上次操作状态查询
    this.props.caseManageAction.getCaseManageList(this.props.reqParams)
    // 获取侧边菜单
    this.props.getCaseManageMenu();
    // 获取表格类型筛选列表
    this.props.caseManageAction.getCaseTypeList();
  }

  /**
   * 根据分页Id查询相关页面
   * 
   * desc：
   * 获取 `state` 中存储的请求参数，在请求参数中加入分页信息，进行查询操作
   * 
   * 优化：
   * 1、目前请求参数的格式是普通js对象， 对 `immutable` 掌握不熟，还无法完成处理操作
   * 2、参数 `reqParams` 整块获取的形式总感觉不太好，如果独立出来一个一个获取代码又太难看，需要学习下这种情况如何处理
   * 3、尝试着 `immutable` 的 `Map` 包装 `reqParams` 获取与赋值操作正常执行，但是将整个对象当做请求参数的时候出现问题，将整个 `Map` 对象单做参数了，太可怕了！！！
   * 
   */
  paginationChange(pageId) {
    let reqParams = this.props.reqParams;
    reqParams.pageId = pageId;
    this.props.caseManageAction.getCaseManageList(reqParams)
  }

  /**
   * 表格扩展搜索
   * 
   * desc：
   * 根据当前赛选条件，组合成服务端需要的请求参数，获取相应数据
   * 
   * 优化：
   * 1、每增加一个列，就需要在方法中加入一个判断，较为麻烦，考虑是否可以更加智能。
   * 
   */
  handleTableChange(pagination, filters, sorter) {
    let reqParams = this.props.reqParams;
    // 拼接排序字符
    reqParams.isDesc = sorter.order == "ascend" ? 'Asc' : 'Desc';
    reqParams.sortType = sorter.field + reqParams.isDesc;

    reqParams.taskType = filters.caseTypeName ? filters.caseTypeName.join(',') : '';
    reqParams.priority = filters.priority ? filters.priority.join(',') : '';
    // 搜索列表
    this.props.caseManageAction.getCaseManageList(reqParams);
  }

  render() {
    const { loading, caseManageList, pager, typeList } = this.props;
    const columns = caseManageTableHead({
      typeList: typeList
    });
    // 表格参数
    const tableParams = {
      columns: columns,
      className: "table",
      dataSource: caseManageList,
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
        <TopSearch/>
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
    caseManageList: state.caseManage.caseManageList,
    typeList: state.caseManage.typeList,
    loading: state.caseManage.loading,
    reqParams: Util.caseManageParamsFromat(state),
    pager: state.caseManage.pager,
    status: state.menu.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    caseManageAction: bindActionCreators(caseManageAction, dispatch),
    getCaseManageMenu: bindActionCreators(getCaseManageMenu, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseManage);
