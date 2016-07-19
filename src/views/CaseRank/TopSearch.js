import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, Row, Col, Radio, Form, DatePicker, Select, QueueAnim, Icon } from 'antd';
import classNames from 'classnames';

import ExportExcel from '../../components/ExportExcel';

import * as caseRankAction from '../../store/modules/caseRank/case_rank_action'

import './index.less'
import * as Util from '../../util';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const InputGroup = Input.Group;
let timeout;
class SearchInput extends React.Component{
  constructor (props) {
    super(props)
    this.onSearch         = this.onSearch.bind(this);
    this.onShowSearch     = this.onShowSearch.bind(this);
    this.clearSearch      = this.clearSearch.bind(this);
    this.sourceTypeChange = this.sourceTypeChange.bind(this);
    this.startTimeChange  = this.startTimeChange.bind(this);
    this.endTimeChange    = this.endTimeChange.bind(this);
    this.isTimeoutChange  = this.isTimeoutChange.bind(this);
      this.executorhange = this.executorhange.bind(this);
      this.executorselect = this.executorselect.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }
  caseNoInputChange(e) {
    this.props.caseRankAction.updRankStateValue({caseNo: e.target.value});
  }
  keywordInputChange(e) {
    this.props.caseRankAction.updRankStateValue({keyword_value: e.target.value});
  }
  sourceUserChange(e) {
    this.props.caseRankAction.updRankStateValue({sourceUser: e.target.value});
  }
  sourceTypeChange(value) {
    this.props.caseRankAction.updRankStateValue({sourceType: value});
  }
  startTimeChange(value) {
    const startTime = Util.dateFormat(value, 'yyyy-MM-dd')
    this.props.caseRankAction.updRankStateValue({startTime: startTime});
  }
  endTimeChange(value) {
    const endTime = Util.dateFormat(value, 'yyyy-MM-dd')
    this.props.caseRankAction.updRankStateValue({endTime: endTime});
  }
  isTimeoutChange(e) {
    console.log('value', e.target.value);
    this.props.caseRankAction.updRankStateValue({isTimeout: e.target.value});

  }
    executorhange(inputValue) {
        console.log('arguments', arguments)
        const self = this;
        if (inputValue.length >= 1) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout((function(){self.props.caseRankAction.getExecutorKeywordList(inputValue)}), 300);
        }
    }
  onSearch(e) {
    /**
     * 根据 `值` 搜索匹配的 `case` 列表
     *
     * desc：
     * 获取所有搜索条件，进行 `case` 搜索，关键字需要编码后发送，不然服务端无法读取
     *
     */
    e.preventDefault();
    let reqParams = this.props.reqParams;
    reqParams.pageId = 1;
    reqParams.recPerPage = this.props.pager.recPerPage;
      //reqParams.sourceUser = this.props.reqParams.sourceUser.key;

    this.props.caseRankAction.getCaseRankList(reqParams);
  }
    handleChange(value) {
        console.log(value);
        if(!value){
            this.props.caseRankAction.updRankStateValue({sourceUser: {}});
        }
    }
  clearSearch(e) {
    e.preventDefault();
    this.props.caseRankAction.clearCaseRankSearch(this.props.reqParams);
  }
  onShowSearch() {
    this.props.caseRankAction.updRankShowSearch(this.props.showSearch);
  }
    executorselect(value, option) {
        this.props.caseRankAction.updRankStateValue({sourceUser: {key: value.key, label:value.label}});
    }
  render() {
    const { caseNo, keyword_value, sourceUser, showSearch, execList } = this.props;
      const executorOptionList = execList && execList.map( (account, index) => {
          return <Option key={account.uuid}>{account.realname + '-' + account.familyName}</Option>
      })
      const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': keyword_value && !!keyword_value.trim(),
    });
    const searchClass = classNames({
      'ant-form ant-form-horizontal': true,
      'ant-advanced-search-form': showSearch,
    });
      console.log(this.props);
    return (
        <div className="gutter-example" style={{ marginBottom: '16', position: 'relative'}}>
          <div className="">
            <Row gutter={16}>
              <Col span="5">
                <FormItem
                    label="排名类型"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    >
                <Select value={this.props.sourceType} onChange={this.sourceTypeChange} style={{ width: '100%'}}>
                  <Option value="remain">剩余任务排名</Option>
                  <Option value="create">发起任务排名</Option>
                  <Option value="finish">完成任务排名</Option>
                  <Option value="confirmfinish">确认完成任务排名</Option>
                  <Option value="close">关闭任务排名</Option>
                </Select>
                </FormItem>
              </Col>

              <Col span="5">
                <FormItem
                    label="搜索员工"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    >
                  <Select
                      showSearch
                      allowClear
                      value={this.props.sourceUser}
                      labelInValue
                      optionFilterProp="children"
                      onSearch={this.executorhange}
                      onChange={this.handleChange}
                      onSelect={this.executorselect}
                      notFoundContent="无法找到"
                      filterOption={(inputValue, option) => {return option;}}
                      placeholder="请输入员工姓名"
                      style={{ width: '100%' }}
                      >
                      {executorOptionList}
                  </Select>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem
                    label="时间区间"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 18 }}
                    >
                  <DatePicker onChange={this.startTimeChange} value={this.props.startTime} format="yyyy-MM-dd"  placeholder="开始时间" />
                  <span> - </span>
                  <DatePicker onChange={this.endTimeChange} value={this.props.endTime} format="yyyy-MM-dd"  placeholder="结束时间" />
                </FormItem>
              </Col>
              <Col span="4">
                <Button type="primary" onClick={this.onSearch} style={{marginRight: '5px'}}>搜索</Button>
                <Button onClick={this.clearSearch}>清除条件</Button>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
};


function mapStateToProps(state) {
  return {
      sourceUser        : state.caseRank.sourceUser,
      execList          : state.caseRank.execList,
      sourceType        : state.caseRank.sourceType,
      startTime         : state.caseRank.startTime,
      endTime           : state.caseRank.endTime,
      isDesc            : state.caseRank.isDesc,

      reqParams         : Util.caseRankParamsFromat(state),

      pager             : state.caseRank.pager,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    caseRankAction: bindActionCreators(caseRankAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
