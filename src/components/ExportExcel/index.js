import React from 'react'
import { bindActionCreators } from 'redux'
import reqwest from 'reqwest'
import md5 from 'md5'
import { connect } from 'react-redux'
import { Button, Modal, Form, Input, Row, Col, DatePicker, Radio, Select, Cascader } from 'antd';

import * as Util from '../../util';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const appID = window.globalConfig.appid;
const token = window.globalConfig.token;
const ts = new Date().getTime().toString().substring(0,10);
const sign = md5(appID+ts+token+'false');
const agUrl = window.globalConfig.url;

import './index.less'

let ExportExcel = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  componentDidMount() {
  },
  showModal() {
    this.setState({
      visible: true,
    });
    
    reqwest({
      url: agUrl + 'case2/type', 
      method: 'get',
      type: 'json', 
      data: [ 
        { name: 'sign', value: sign }, 
        { name: 'ts', value: ts }, 
        { name: 'appID', value: appID } ]
      }).then (function(data) {
        console.log('this.state', this.state);
        if (this.isMounted()) {
          this.setState(Object.assign({}, this.state, {typeList: data.content}));
        }
      }.bind(this))
      
  },
  reset() {
    this.props.form.resetFields();
  },
  handleOk(e) {
    let subResult = this.props.form.getFieldsValue(); 
    
    // subResult.startTime = subResult.endTime? this.dataFormat(subResult.startTime) : subResult.endTime;
    // subResult.endTime = subResult.endTime? this.dataFormat(subResult.endTime) : subResult.endTime;
    
    subResult.startTime = subResult.startTime && Util.dateFormat(subResult.startTime, 'yyyy-MM-dd hh:mm:ss')
    subResult.endTime = subResult.endTime && Util.dateFormat(subResult.endTime, 'yyyy-MM-dd hh:mm:ss')
    
    
    console.log('getFormatter', subResult.endTime);
    const url = "/download?"
     + 'keyword='+ encodeURI(subResult.keyword)
     + '&taskType=' + subResult.taskType 
     + '&status=' + subResult.status 
     + '&searchType=' + subResult.searchType 
     + '&startTime=' + subResult.startTime 
     + '&endTime=' + subResult.endTime 
    //  + '&sortType=' + subResult.sortType 
     + '&sourceType=' + subResult.sourceType 
     + '&sourceUser=' + encodeURI(subResult.sourceUser)
     + '&isTimeout=' + subResult.isTimeout;
     
    console.log('url', url);
    
    window.open(url)
    
    this.setState({
      visible: false,
    });
  },
  dataFormat(strTime) {
    var date = new Date(strTime);
    // return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    return Util.dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
  },
  handleCancel() {
    this.setState({
      visible: false,
    });
  },
  timeChange(value, dateString) {
    console.log('From: ', value[0], ', to: ', value[1]);
    console.log('From: ', dateString[0], ', to: ', dateString[1]);
  },
  userTypeChange(e) {
    console.log(`userTypeChange checked:${e.target.value}`);
  },
  statusChange(e) {
    console.log(`statusChange checked:${e.target.value}`);
  },
  render() {
    const { getFieldProps } = this.props.form;
    const taskType = this.state.typeList?this.state.typeList.map( (type) => {
      return (<RadioButton value={type.id}>{type.case_type}</RadioButton>)
    }) : "";
    const selectBefore = (
      <Select {...getFieldProps('sourceType',{initialValue: 'createUser'})} defaultValue="createUser" style={{ width: 80 }}>
        <Option value="createUser">发布人</Option>
        <Option value="executorUser">执行人</Option>
        <Option value="focusUser">关注人</Option>
      </Select>
    );
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Excel导出</Button>
        <Modal title="Excel导出" visible={this.state.visible}
          width={800}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="确定导出" cancelText="取消"
        >
          <div>
            <Form horizontal className="ant-advanced-search-form">              
              <Row>
                <Col span={24}>
                  <FormItem
                    label="关键字"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 8 }}
                  >
                    <Input {...getFieldProps('keyword', {initialValue: ''})} placeholder="请输入关键字" size="default" />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="创建时间区间"
                    labelCol={{ span: 3 }}
                  >
                  
                    <Col span="4">
                      <Select {...getFieldProps('searchType',{initialValue: 'createTime'})} defaultValue="createTime" style={{ width: 110, marginRight: 10 }}>
                        <Option value="createTime">创建时间区间</Option>
                        <Option value="finishTime">完成时间区间</Option>
                        <Option value="confirmFinishTime">确认完成时间区间</Option>
                        <Option value="closeTime">关闭时间区间</Option>
                      </Select>
                    </Col>
                    <Col span="6">
                      <FormItem>
                        <DatePicker format="yyyy-MM-dd HH:mm:ss" showTime {...getFieldProps('startTime', {initialValue: ''})} placeholder="开始时间" />
                      </FormItem>
                    </Col>
                    <Col span="1">
                      <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="6">
                      <FormItem>
                        <DatePicker format="yyyy-MM-dd HH:mm:ss" showTime {...getFieldProps('endTime', {initialValue: ''})} placeholder="结束时间" />
                      </FormItem>
                    </Col>
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="人员类型"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 8 }}
                  >
                    <Input {...getFieldProps('sourceUser',{initialValue: ''})} addonBefore={selectBefore} placeholder="请输入人员姓名" />
                  </FormItem>
                </Col>
                <Col span={24}>
                      <FormItem
                        label="任务进度"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 14 }}
                      >
                        <RadioGroup {...getFieldProps('isTimeout',{initialValue: ''})}>
                          <RadioButton value="">全部</RadioButton>
                          <RadioButton value="0">已超时</RadioButton>
                          <RadioButton value="1">未超时</RadioButton>
                        </RadioGroup>
                      </FormItem>
                    </Col>
                <Col span={24}>
                  <FormItem
                    label="请选择状态"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 14 }}
                  >
                    <RadioGroup {...getFieldProps('status',{initialValue: ''})}>
                      <RadioButton value="">全部</RadioButton>
                      <RadioButton value="1">进行中</RadioButton>
                      <RadioButton value="2">已完成</RadioButton>
                      <RadioButton value="3">确认完成</RadioButton>
                      <RadioButton value="4">已关闭</RadioButton>
                    </RadioGroup>
                  </FormItem>
                </Col>
                
                <Col span={24}>
                  <FormItem
                    label="选择case类型"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 14 }}
                  >
                    <RadioGroup {...getFieldProps('taskType',{initialValue: ''})} >
                      <RadioButton value="">全部</RadioButton>
                      {taskType}
                    </RadioGroup>
                  </FormItem>
                </Col>
                
              </Row>
              
              <Row>
                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                  <Button onClick={this.reset}>请除条件</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
});

ExportExcel = Form.create()(ExportExcel);

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportExcel);
