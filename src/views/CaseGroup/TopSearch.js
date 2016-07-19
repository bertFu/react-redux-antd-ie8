import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, Row, Col, Radio, Form, DatePicker, Select, QueueAnim, Icon } from 'antd';
import classNames from 'classnames';

import TreeSelect from './TreeSelect';

import * as caseGroupAction from '../../store/modules/caseGroup/case_group_action'

import './index.less'
import * as Util from '../../util';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const InputGroup = Input.Group;

class SearchInput extends React.Component{
  constructor (props) {
    super(props)
    this.onSearch         = this.onSearch.bind(this);
    this.onShowSearch     = this.onShowSearch.bind(this);
    this.clearSearch      = this.clearSearch.bind(this);
    this.sourceTypeChange = this.sourceTypeChange.bind(this);
    this.searchTypeChange = this.searchTypeChange.bind(this);
    this.startTimeChange  = this.startTimeChange.bind(this);
    this.endTimeChange    = this.endTimeChange.bind(this);
    this.isTimeoutChange  = this.isTimeoutChange.bind(this);
  }

  /**
   * 修改 caseNo 
   * 
   * @param {any} e
   */
  caseNoInputChange(e) {
    this.props.caseGroupAction.updGroupStateValue({caseNo: e.target.value});
  }

  /**
   * 修改 keyword
   * 
   * @param {any} e
   */
  keywordInputChange(e) {
    this.props.caseGroupAction.updGroupStateValue({keyword_value: e.target.value});
  }

  /**
   * 修改 人员姓名
   * 
   * @param {any} e
   */
  sourceUserChange(e) {
    this.props.caseGroupAction.updGroupStateValue({sourceUser: e.target.value});
  }

  /**
   * 修改 人员类型 
   * 
   * @param {any} value
   */
  sourceTypeChange(value) {
    this.props.caseGroupAction.updGroupStateValue({sourceType: value});
  }

  /**
   * 修改 时区类型
   * 
   * @param {any} value
   */
  searchTypeChange(value) {
    this.props.caseGroupAction.updGroupStateValue({searchType: value});
  }

  /**
   * 修改 开始时间
   * 
   * @param {any} value
   */
  startTimeChange(value) {
    const startTime = Util.dateFormat(value, 'yyyy-MM-dd hh:mm:ss')
    this.props.caseGroupAction.updGroupStateValue({startTime: startTime});
  }

  /**
   * 修改 结束时间 
   * 
   * @param {any} value
   */
  endTimeChange(value) {
    const endTime = Util.dateFormat(value, 'yyyy-MM-dd hh:mm:ss')
    this.props.caseGroupAction.updGroupStateValue({endTime: endTime});
  }

  /**
   * 修改任务进度 
   * 
   * @param {any} e
   */
  isTimeoutChange(e) {
    console.log('value', e.target.value);
    this.props.caseGroupAction.updGroupStateValue({isTimeout: e.target.value});
    
  }
  
  /**
   * 根据 `值` 搜索匹配的 `case` 列表
   * 
   * desc：
   * 获取所有搜索条件，进行 `case` 搜索，关键字需要编码后发送，不然服务端无法读取
   * 
   */
  onSearch(e) {
    e.preventDefault();
    let reqParams = this.props.reqParams;
    reqParams.pageId = 1;
    reqParams.recPerPage = this.props.pager.recPerPage;
    
    this.props.caseGroupAction.getCaseGroupList(reqParams);
  }
  
  /**
   * 清除查询信息 
   * 
   * @param {any} e
   */
  clearSearch(e) {
    e.preventDefault();
    this.props.caseGroupAction.clearCaseGroupSearch(this.props.reqParams);
  }
  
  /**
   * 显示高级搜索 
   */
  onShowSearch() {
    this.props.caseGroupAction.updGroupShowSearch(this.props.showSearch);
  }
  
  render() {
    const { caseNo, keyword_value, sourceUser, showSearch } = this.props;
    // 高级搜索样式
    const searchClass = classNames({
      'ant-form ant-form-horizontal': true,
      'ant-advanced-search-form': showSearch,
    });
    // 人员类型 DOM
    const selectBefore = (
      <Select  value={this.props.sourceType} onChange={this.sourceTypeChange} style={{ width: 80 }}>
        <Option value="">请选择</Option>
        <Option value="createUser">发布人</Option>
        <Option value="executorUser">执行人</Option>
        <Option value="focusUser">关注人</Option>
      </Select>
    );
    
    return (
        <div className="gutter-example" style={{ marginBottom: '16', position: 'relative'}}>
          <div className="">
              <Row gutter={16}>          
                <Col span="4">
                  <Input 
                    size="default"
                    value={caseNo}
                    onChange={this.caseNoInputChange.bind(this)}
                    onPressEnter={this.onSearch}
                    placeholder="按工单号搜索" />
                </Col>
                
                <Col span="6">
                  <Input 
                    size="default"
                    value={keyword_value}
                    onChange={this.keywordInputChange.bind(this)}
                    onPressEnter={this.onSearch}
                    placeholder="按关键字搜索" />
                </Col>
                <Col span="6">
                  <TreeSelect/>
                </Col>
                {!showSearch ? [
                <Col span="6">
                    <Button type="primary" onClick={this.onSearch} style={{marginRight: '10px'}}>搜索</Button>
                    <Button onClick={this.clearSearch}>清除条件</Button>
                </Col>
                ]: null}
              </Row>
              <QueueAnim  style={{marginTop: '20px;'}} component={Form} className={searchClass} type="left" leaveReverse>
                {showSearch ? [
                  <Row key="item1">
                    <Col span={24}>
                      <FormItem
                        label="人员类型"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 13 }}
                      >
                        <Input  
                          value={sourceUser}
                          style={{width: '420px'}}
                          onChange={this.sourceUserChange.bind(this)}
                          onPressEnter={this.onSearch}
                          addonBefore={selectBefore} 
                          placeholder="请输入人员姓名" 
                        />
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      
                      <FormItem
                          label="时间区间"
                          labelCol={{ span: 3 }}
                          wrapperCol={{ span: 16 }}
                      >
                          <Select value={this.props.searchType} onChange={this.searchTypeChange} style={{ width: '110px', marginRight: '20px'}}>
                            <Option value="">请选择时区</Option>
                            <Option value="createTime">创建时间</Option>
                            <Option value="finishTime">完成时间</Option>
                            <Option value="confirmFinishTime">确认完成时间</Option>
                            <Option value="closeTime">关闭时间</Option>
                          </Select>
                          <DatePicker onChange={this.startTimeChange} value={this.props.startTime} format="yyyy-MM-dd HH:mm:ss" showTime  placeholder="开始时间" />
                          <span> - </span>
                          <DatePicker onChange={this.endTimeChange} value={this.props.endTime} format="yyyy-MM-dd HH:mm:ss" showTime  placeholder="结束时间" />
                      </FormItem>
                    </Col>
                  </Row>,
                  <Row key="submit">
                    <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                      <Button type="primary" onClick={this.onSearch}>搜索</Button>
                      <Button onClick={this.clearSearch}>清除条件</Button>
                    </Col>
                  </Row>,
                ] : null}
              </QueueAnim>
          </div>
          
          <div style={{position: 'absolute', top: 0, right: 0}}>
            <div  style={{float: 'left', marginRight: '20px', lineHeight: '28px'}}>
              <a onClick={this.onShowSearch} className="ant-dropdown-link">{!showSearch ? <span>高级搜索<Icon type="down" /></span> : <span>简单搜索<Icon type="up" /></span>}</a>
            </div>
          </div>
        </div>
    );
  }
};


function mapStateToProps(state) {
  return {
      keyword_value     : state.caseGroup.keyword_value,
      caseNo            : state.caseGroup.caseNo,
      sourceType        : state.caseGroup.sourceType,
      sourceUser        : state.caseGroup.sourceUser,
      showSearch        : state.caseGroup.showSearch,
      
      searchType        : state.caseGroup.searchType,
      startTime         : state.caseGroup.startTime,
      endTime           : state.caseGroup.endTime,
      isTimeout         : state.caseGroup.isTimeout,
      
      reqParams         : Util.caseGroupParamsFromat(state),
      
      pager             : state.caseGroup.pager
  }
}

function mapDispatchToProps(dispatch) {
  return {
    caseGroupAction: bindActionCreators(caseGroupAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
