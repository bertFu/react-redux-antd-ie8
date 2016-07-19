import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Pagination, Row, Col, Button } from 'antd';

// import CaseNoInput from './CaseNoInput';
// import KeywordInput from './KeywordInput';
import TopSearch from './TopSearch';
import ExportExcel from '../../components/ExportExcel';

import * as caseRankAction from '../../store/modules/caseRank/case_rank_action'
import { getAddCaseLeftMenu } from '../../store/modules/menu/menu_action';

import './index.less'
import * as Util from '../../util';
import { expandedRowRender, caseRankTableHead } from '../../util/templateUtil';

class CaseRank extends React.Component{
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    const self = this;
    const newRootKey = this.props.routing.locationBeforeTransitions.key
    const oldRootKey = this.props.rootKey
    // if (newRootKey === oldRootKey) {
      // 按上次操作状态查询
      this.props.caseRankAction.getCaseRankList(this.props.reqParams)
    // } else {
    //   // 初始化table数据
    //   this.props.caseRankAction.getCaseRank({
    //         status      : this.props.status,
    //         pageId      : 1,
    //         recPerPage  : this.props.pager.recPerPage || 10
    //       })
    // }
    // 获取侧边菜单
    setTimeout(function() {
      console.log('延迟设置');
      self.props.getAddCaseLeftMenu()
    }, 1000);
    // 修改 `rootKey` 的值
    this.props.caseRankAction.updRankRootKey(newRootKey)
    // 获取表格类型筛选列表
    this.props.caseRankAction.getCaseTypeList();
  }
  // 分页搜索
  paginationChange(pageId) {
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
    let reqParams = this.props.reqParams;
    reqParams.pageId = pageId;
    this.props.caseRankAction.getCaseRankList(reqParams)
  }
  // 表格搜索
  handleTableChange(pagination, filters, sorter) {
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
    let reqParams = this.props.reqParams;
    // 拼接排序字符
    reqParams.isDesc = sorter.order == "ascend"? '1' : '0';
    reqParams.sortType = sorter.field + reqParams.isDesc;
    // 拼接类型搜索条件
    let typeStr = '';
    if (filters.caseTypeName && filters.caseTypeName.length > 0) {
      filters.caseTypeName.map((type, index) => {
        if (index == (filters.caseTypeName.length-1)) {
          typeStr += type;
        } else {
          typeStr += type + ',';
        }
      })
    }
    reqParams.taskType = typeStr;
    // 搜索列表
    this.props.caseRankAction.getCaseRankList(reqParams);
  }

  render() {
    const { loading, caseRankList, pager, typeList } = this.props;
    const columns = caseRankTableHead({
      typeList: typeList
    });
   const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <TopSearch/>
        <div className='table-group'>
          <Table
              columns={columns}
              className="table"
              dataSource={caseRankList}
              pagination={false}
              scroll={{ x: 800}}
              size="middle"
              loading={loading}
              onChange={this.handleTableChange.bind(this)} />
        </div>

        <Pagination
          style={{ marginTop: 16 }}
          showQuickJumper
          total={pager.total}
          showTotal={total => `共 ${total} 条`}
          current={pager.pageId}
          onChange={this.paginationChange.bind(this)}
          pageSize={pager.recPerPage}
          total={pager.total} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    caseRankList    : state.caseRank.caseRankList,
    typeList          : state.caseRank.typeList,

    rootKey           : state.caseRank.rootKey,
    loading           : state.caseRank.loading,

    reqParams         : Util.caseRankParamsFromat(state),

    pager             : state.caseRank.pager,

    status            : state.menu.status,
    routing           : state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    caseRankAction: bindActionCreators(caseRankAction, dispatch),
    getAddCaseLeftMenu: bindActionCreators(getAddCaseLeftMenu, dispatch)  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseRank);
