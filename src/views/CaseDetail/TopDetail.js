import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Select, Row, Col, Icon, Form, Input, Modal, message, Popover } from 'antd';

import * as caseDetailAction from '../../store/modules/caseDetail/case_detail_action';
import * as addCaseAction from '../../store/modules/addCase/add_case_action';

import TreeSelect from './TreeSelect';
import OPERATOR_INFO from '../../constants/OperatorInfo'

const FormItem = Form.Item;

let timeout;
class TopDetail extends React.Component{
  constructor(props) {
    super(props)
    this.confirmUpdExec = this.confirmUpdExec.bind(this);
    this.showUpdExec = this.showUpdExec.bind(this);
    this.confirmUpdGroup = this.confirmUpdGroup.bind(this);
    this.showUpdGroup = this.showUpdGroup.bind(this);
    this.executorhange = this.executorhange.bind(this);
    this.execChange = this.execChange.bind(this);
    this.showUpdCreateUser = this.showUpdCreateUser.bind(this);
    this.confirmUpdCreateUser = this.confirmUpdCreateUser.bind(this);
    this.createUserChange = this.createUserChange.bind(this);
    this.showUpdFocusUser = this.showUpdFocusUser.bind(this);
    this.confirmUpdFocusUser = this.confirmUpdFocusUser.bind(this);
    this.focusChange = this.focusChange.bind(this);
  }
  
  /**
   * 初始化信息
   * 
   * 1、获取执行人列表
   * 2、获取关注人列表
   *  
   */
  componentDidMount() {
    this.props.addCaseAction.getExecutorList();
    this.props.addCaseAction.getFocusList();
  }
  
  /**
   * 执行人修改框搜索用户
   * 
   * 1、判断输入，为空显示收藏执行人列表
   * 2、根据输入的值查询执行人列表，获取相关数据显示 
   * 
   * @param {any} inputValue
   */
  executorhange(inputValue) {
    const self = this;
    if (!inputValue && inputValue.length == 0){
      self.props.addCaseAction.getExecutorList();
    }
    if (inputValue.length >= 1) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout((function(){
        self.props.addCaseAction.getExecutorKeywordList(inputValue);
      }), 300); 
    }
  }
  
  /**
   * 关注人修改框搜索用户
   * 
   * 1、判断输入，为空显示收藏关注人列表
   * 2、根据输入的值查询关注人列表，获取相关数据显示 
   * 
   * @param {any} inputValue
   */
  focusChange(inputValue) {
    if (!inputValue && inputValue.length == 0){
      this.props.addCaseAction.getFocusList();
    }
    if (inputValue.length >= 1) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout((function(){
          this.props.addCaseAction.getFocusKeywordList(inputValue)
      }).bind(this), 300); 
    }
  }
  
  /**
   * 修改执行人的值
   * 
   * @param {any} value
   */
  execChange(value) {
    this.props.caseDetailAction.updState({selectedExec: value});
  }
  
  /**
   * 开启/关闭 创建人修改气泡
   */
  showUpdCreateUser() {
    this.props.caseDetailAction.updState({updCreateUserVisible: !this.props.updCreateUserVisible});
  }
  
  /**
   * 确认修改创建人操作 
   * 
   * 1、输入验证
   * 2、获取请求参数
   * 3、构建请求参数
   * 4、发送修改创建人请求
   * 5、隐藏气泡
   * 6、重置表单信息
   * 
   */
  confirmUpdCreateUser() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      
      if(this.props.selectedCreateUser){
        const caseInfo         = this.props.caseInfo;
        const caseId           = caseInfo.id;
        const operatorId       = OPERATOR_INFO.operatorId;
        const operator         = OPERATOR_INFO.operator;
        const newCreaterId      = this.props.selectedCreateUser.key;
        const newCreaterName    = this.props.selectedCreateUser.label;
        let oldCreaterId        = '';
        let oldCreaterName      = '';
        
        if (caseInfo.createUser && caseInfo.createUserId) {
          oldCreaterId   = caseInfo.createUserId;
          oldCreaterName = caseInfo.createUser;
        }
        const updCreateParams = {
          caseId          : caseId,
          oldCreaterId    : oldCreaterId,
          oldCreaterName  : oldCreaterName,
          newCreaterId    : newCreaterId,
          newCreaterName  : newCreaterName,
          reason          : values.reason,
          operatorId      : operatorId,
          operator        : operator
        };
        this.props.caseDetailAction.updCreateUser(updCreateParams);
      }
      this.props.caseDetailAction.updState({updCreateUserVisible: false}); 
      this.props.form.resetFields();        
    });
  }
  
  /**
   * 选择创建人信息
   * 
   * @param {any} value
   */
  createUserChange(value) {
    this.props.caseDetailAction.updState({selectedCreateUser: value});
  }
  
  /**
   * 开启/关闭 执行人修改气泡 
   */
  showUpdExec() {
    this.props.caseDetailAction.updState({updExecVisible: !this.props.updExecVisible});
  }
  
  
  /**
   * 确认修改创建人操作 
   * 
   * 1、输入验证
   * 2、获取请求参数
   * 3、构建请求参数
   * 4、发送修改创建人请求
   * 5、隐藏气泡
   * 6、重置表单信息
   * 
   */
  confirmUpdExec() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      
      if(this.props.selectedExec){
        const caseInfo         = this.props.caseInfo;
        const caseId           = caseInfo.id;
        const operatorId       = OPERATOR_INFO.operatorId;
        const operator         = OPERATOR_INFO.operator;
        const newExecutorId    = this.props.selectedExec.key;
        const newExecutorName  = this.props.selectedExec.label;
        let oldExecutorId      = '';
        let oldExecutorName    = '';
        
        if (caseInfo && caseInfo.executorList.length > 0) {
          oldExecutorId   = caseInfo.executorList[0].userId;
          oldExecutorName = caseInfo.executorList[0].userName;
        }
        const updExecParams = {
          caseId          : caseId,
          oldExecutorId   : oldExecutorId,
          oldExecutorName : oldExecutorName,
          newExecutorId   : newExecutorId,
          newExecutorName : newExecutorName,
          reason          : values.reason,
          operatorId      : operatorId,
          operator        : operator
        };
      
        this.props.caseDetailAction.updExec(updExecParams);
      }
      this.props.caseDetailAction.updState({updExecVisible: false});
      this.props.form.resetFields(); 
    });
  }
  /* 开启/关闭 关注人气泡 */
  showUpdFocusUser() {
    this.props.caseDetailAction.updState({updFocusUserVisible: !this.props.updFocusUserVisible});
  }
  confirmUpdFocusUser() {
    const focusOnPeopleList = this.props.form.getFieldsValue().focusOnPeopleList;
    const caseInfo         = this.props.caseInfo;
    const caseId           = caseInfo.id;
    const operatorId       = OPERATOR_INFO.operatorId;
    const operator         = OPERATOR_INFO.operator;
    
    const updFocusParams = {
      caseId            : caseId,
      focusOnPeopleList : focusOnPeopleList,
      operatorId        : operatorId,
      operator          : operator
    };
  
    this.props.caseDetailAction.updFocusUser(updFocusParams);
    this.props.caseDetailAction.updState({updFocusUserVisible: false});
    this.props.form.resetFields();
  }
  /* 开启/关闭 分组修改气泡 */
  showUpdGroup() {
    this.props.caseDetailAction.updState({updGroupVisible: !this.props.updGroupVisible});
  }
  confirmUpdGroup() {
    const caseInfo      = this.props.caseInfo;
    const caseId        = caseInfo.id;
    const newGroupId    = this.props.orgId;
    const newGroupName  = this.props.orgName;
    const operatorId    = operatorId;
    const operator      = operator;
    let oldGroupId      = '';
    let oldGroupName    = '';
     
    if (caseInfo && caseInfo.caseGroupList.length > 0) {
      oldGroupId   = caseInfo.caseGroupList[0].groupId;
      oldGroupName = caseInfo.caseGroupList[0].groupName;
    } 
    const updGroupParams = {
      caseId        : caseId,
      oldGroupId    : oldGroupId,
      oldGroupName  : oldGroupName,
      newGroupId    : newGroupId,
      newGroupName  : newGroupName,
      operatorId    : operatorId,
      operator      : operator
    }
    this.props.caseDetailAction.updGroup(updGroupParams);
    this.props.caseDetailAction.updState({updGroupVisible: false});
    this.props.form.resetFields();    
  }
  
  render() {
    const getFieldProps = this.props.form.getFieldProps;
    const { caseInfo, execCollectList, execList, focusCollectList, focusList } = this.props;
    
    /* 修改执行人 */
    let optionList = execCollectList.map( (executor) => { 
      return <Option key={executor.executorId}>{executor.executorName}</Option>;
    });
    if (execList && execList.length>0){
      optionList = execList.map( (account, index) => {
          return <Option key={account.uuid}>{account.realname + '-' + account.familyName}</Option>;
      }) 
    };
    
    let label = '';
    let key = '';
    let executorName = null;
    if (caseInfo.executorList && caseInfo.executorList.length>0) {
      label = caseInfo.executorList[0].userName;
      key = caseInfo.executorList[0].userId;
      caseInfo.executorList.map( (item, index, items) =>{
        executorName = (items.length-1) == index ? item.userName : item.userName + ',';
        
      });
    } 
    const executorUserSelectParam = {
      defaultValue: {
        label: label,
        key: key 
      },
      showSearch: true,
      labelInValue: true, 
      optionFilterProp: "children",
      onSearch: this.executorhange,
      onChange: this.execChange,
      notFoundContent: "无法找到",
      placeholder: "请选择执行人",
      filterOption: (inputValue, option) => {return option;}
    };
    const execTitle = (param) => {
      return (
        <div>
          修改执行人
          <div style={{float: 'right'}}>
            <a onClick={param.onClose} >取消</a>
              <span className="ant-divider"></span>
            <a onClick={param.onConfirm}>确定</a>
          </div>
        </div>
      )
    };
    const execContent = (selectParam, optionList) => {
      
      const reasonProps = getFieldProps('reason', {
        rules: [
          { required: true, message: '请输入修改原因！' }
        ],
      });
      
      return (
        <div>
          <Form horizontal form={this.props.form}>
            <FormItem>
              <Select 
                {...selectParam}
                style={{ minWidth: '150px', width: '100%' }}
              >
                {optionList}
              </Select>
            </FormItem>
            
            <FormItem
              hasFeedback
            >
              <Input
                {...reasonProps} 
                placeholder="请输入修改原因"
              />
            </FormItem>
          </Form>
        </div>
      )
    };
    const execPopverParams = {
      content: execContent(executorUserSelectParam, optionList), 
      title: execTitle({
        onClose: this.showUpdExec, 
        onConfirm: this.confirmUpdExec
      }),
      trigger: "click",
      visible: this.props.updExecVisible
    };
    const executorStr =   (
      <div>
        <span>
          { executorName? executorName : <span style={{color: '#ccc'}}>暂无数据</span> }
          &nbsp;&nbsp;&nbsp;
        </span>
        <Popover
          {...execPopverParams}
        > 
          <a onClick={this.showUpdExec}><Icon type="edit" /></a>
        </Popover>
      </div>
    ); /* 修改执行人 end */
    
    /* 修改发起人 */
    let createUserLabel = '';
    let createUserKey = '';
    let createUserName = null;
    if (caseInfo.createUser && caseInfo.createUserId) {
      createUserLabel = caseInfo.createUser;
      createUserKey = caseInfo.createUserId;
      createUserName = caseInfo.createUser;
    } 
    const createUserSelectParam = {
      defaultValue: {
        label: createUserLabel,
        key: createUserKey 
      },
      showSearch: true,
      labelInValue: true, 
      optionFilterProp: "children",
      onSearch: this.executorhange,
      onChange: this.createUserChange,
      notFoundContent: "无法找到",
      placeholder: "请选择执行人",
      filterOption: (inputValue, option) => {return option;}
    };
    const CreateUserPopverParams = {
      content: execContent(createUserSelectParam, optionList), 
      title: execTitle({
        onClose: this.showUpdCreateUser, 
        onConfirm: this.confirmUpdCreateUser
      }),
      trigger: "click",
      visible: this.props.updCreateUserVisible
    };
    
    const createUserStr =   (
      <div>
        <span>
          { createUserName? createUserName : <span style={{color: '#ccc'}}>暂无数据</span> }
          &nbsp;&nbsp;&nbsp;
        </span>
        <Popover
          {...CreateUserPopverParams}
        > 
          <a onClick={this.showUpdCreateUser}><Icon type="edit" /></a>
        </Popover>
      </div>
    );
    /* 修改发起人 end */
      
    /* 修改关联分组 */
    const groupContent = (
      <div>
        <TreeSelect caseInfo={caseInfo} />
      </div>
    );
    const groupTitle = (
      <div>
        修改关联分组
        <div style={{float: 'right'}}>
          <a onClick={this.showUpdGroup}>取消</a>
            <span className="ant-divider"></span>
          <a onClick={this.confirmUpdGroup}>确定</a>
        </div>
      </div>
    );
    const groupPopverParams = {
      content: groupContent, 
      title: groupTitle,
      trigger: "click",
      visible: this.props.updGroupVisible
    }
    const groupDom = (
        <div>
          <span>
            {
              caseInfo.caseGroupList && caseInfo.caseGroupList.length > 0 
                ? caseInfo.caseGroupList[0].groupName 
                : <span style={{color: '#ccc'}}>暂无数据</span>
            }
            &nbsp;&nbsp;&nbsp;
          </span>
          <Popover 
            {...groupPopverParams}
          > 
          <a onClick={this.showUpdGroup}><Icon type="edit" /></a>
          </Popover>
        </div>
    ) /* 修改关联分组 end */
    
     /* 修改关注人 */
      const focusUser = getFieldProps('focusOnPeopleList',
      { initialValue: caseInfo.focusOnPeopleList && caseInfo.focusOnPeopleList.length>0 ? caseInfo.focusOnPeopleList.map(focusPeople => {
        return {
          label: focusPeople.userName,
          key: focusPeople.userId
        }
      }): []}, 
      {
        rules: [
          { required: true, message: '请选择关注人', type: 'array' }
        ],
      });
      let focusOptionList = focusCollectList.map( (focus, index) => {
        return <Option key={focus.focusId}>{focus.focusName}</Option>
      })
      if (focusList && focusList.length>0){
        focusOptionList = focusList.map( (account, index) => {
          return <Option key={account.uuid}>{account.realname + '-' + account.familyName}</Option>
        })
      }
     const focusUserContent = (
      <div>
        <FormItem>
          <Select 
            multiple
            {...focusUser}
            style={{width: '200px'}}
            labelInValue
            optionFilterProp="children"
            onSearch={this.focusChange}
            notFoundContent="无法找到"
            filterOption={(inputValue, option) => {return option;}}
            placeholder="请选择关注人">
            {focusOptionList}
          </Select>
        </FormItem>
      </div>
    );
     const FocusUserPopverParams = {
      content: focusUserContent, 
      title: execTitle({
        onClose: this.showUpdFocusUser, 
        onConfirm: this.confirmUpdFocusUser
      }),
      trigger: "click",
      visible: this.props.updFocusUserVisible
    }
    const focusDom = (
        <div>
          <span>
            { caseInfo.focusList? caseInfo.focusList : <span style={{color: '#ccc'}}>暂无数据</span> }
            &nbsp;&nbsp;&nbsp;
          </span>
          <Popover 
            {...FocusUserPopverParams}
          > 
          <a onClick={this.showUpdFocusUser}><Icon type="edit" /></a>
          </Popover>
        </div>
    );
     /* 修改关注人 end */
    
    /* 状态转换 */
    const statusFormat = (status) => { 
      switch (status) {
        case '1':
          return '进行中';
        case '2':
          return '已完成';
        case '3':
          return '确认完成';
        case '4':
          return '已关闭';
        default:
          return status;
      }
    }
    
    /* 状态转换 */
    const priorityFormat = (priority) => { 
      switch (priority) {
        case '1':
          return '非常高';
        case '2':
          return '高';
        case '3':
          return '中';
        case '4':
          return '低';
        default:
          return priority;
      }
    }
    return (
      <div>
        <Row>
          <Col className="detail-title" span={4}>工单号：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.caseNo ? caseInfo.caseNo : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>发起人：</Col>
          <Col className="detail-content" span={4}>
            { createUserStr }
          </Col>
          <Col className="detail-title" span={4}>发起时间：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.createTime ? caseInfo.createTime : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
        </Row>
        <Row>
          <Col className="detail-title" span={4}>状态：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.status ? statusFormat(caseInfo.status) : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title yincang" span={4}>执行人：</Col>
          <Col className="detail-content" span={4}>
            { executorStr }
          </Col>
          <Col className="detail-title" span={4}>任务类型：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.caseTypeName ? caseInfo.caseTypeName : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>               
        </Row>
        <Row>
          <Col className="detail-title" span={4}>关联分组：</Col>
          <Col className="detail-content" span={4}>
            { groupDom }
          </Col>
          <Col className="detail-title" span={4}>小区：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.community ? caseInfo.community : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>业主姓名：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.ownerName ? caseInfo.ownerName : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
        </Row>
        <Row>       
          <Col className="detail-title" span={4}>楼栋：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.building ? caseInfo.building : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>欠费月数：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.arrearsMonth ? caseInfo.arrearsMonth : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>房号：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.room ? caseInfo.room : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
        </Row>
        <Row>
          <Col className="detail-title" span={4}>催费金额：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.amount ? caseInfo.amount : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>实收金额：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.recoveredAmount ? caseInfo.recoveredAmount : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>业主电话：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.ownerPhone ? caseInfo.ownerPhone : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          </Row>
        <Row>
          <Col className="detail-title" span={4}>单元：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.unit ? caseInfo.unit : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>实收历史欠费金额：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.arrearsAmount ? caseInfo.arrearsAmount : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>收费方式：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.chargeWay ? caseInfo.chargeWay : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
        </Row>
        <Row>
          <Col className="detail-title" span={4}>优先级：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.priority ? priorityFormat(caseInfo.priority) : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
          <Col className="detail-title" span={4}>时间节点：</Col>
          <Col className="detail-content" span={4}>{ caseInfo.timePoint ? caseInfo.timePoint + '小时' : (<span style={{color: '#ccc'}}>暂无数据</span>) }</Col>
        </Row>
        <Row>
          <Col className="detail-title" span={4}>关注人：</Col>
          <Col className="detail-content white-space" span={20}>
            { focusDom }
          </Col>
        </Row>
        <Row>
          <Col className="detail-title" span={4}>详情：</Col>
          <Col className="detail-content white-space" span={20}>
            {caseInfo.caseDesc ? caseInfo.caseDesc : (<span style={{color: '#ccc'}}>暂无数据</span>) }
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    caseInfo        : state.caseDetail.caseInfo,
    loading         : state.caseDetail.loading,
    updModalVisible : state.caseDetail.updModalVisible,
    updExecVisible  : state.caseDetail.updExecVisible,
    updGroupVisible : state.caseDetail.updGroupVisible,
    updCreateUserVisible : state.caseDetail.updCreateUserVisible,
    updFocusUserVisible   : state.caseDetail.updFocusUserVisible,
    
    selectedExec    : state.caseDetail.selectedExec,
    selectedCreateUser : state.caseDetail.selectedCreateUser,
        
    execCollectList : state.addCase.execCollectList,
    focusCollectList    : state.addCase.focusCollectList,
    focusList           : state.addCase.focusList,
    execList        : state.addCase.execList,
    orgId           : state.caseDetail.orgId,
    orgName         : state.caseDetail.orgName,
    
    routing         : state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return  {
   addCaseAction: bindActionCreators(addCaseAction, dispatch),
   caseDetailAction: bindActionCreators(caseDetailAction, dispatch)
  }
}
TopDetail = Form.create()(TopDetail);
export default connect(mapStateToProps, mapDispatchToProps)(TopDetail);
