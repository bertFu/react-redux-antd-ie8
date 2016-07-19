import React from 'react';
import { Tree, TreeSelect, Form, Select, InputNumber, Radio, Spin, Button, Upload, Icon, Input, Modal, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as addCaseAction from '../../store/modules/addCase/add_case_action';
import { getAddCaseLeftMenu } from '../../store/modules/menu/menu_action';

// import TreeSelect from './TreeSelect';
import Star from '../../components/Star';

import './index.less';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

import reqwest from 'reqwest'
import AG_CONF from '../../constants/AgCode';

let timeout; // 判断用户查询输入时的输入时间记录

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.focusChange = this.focusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.executorhange = this.executorhange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTreeChange = this.onTreeChange.bind(this);
    this.onTreeLoadData = this.onTreeLoadData.bind(this);
    this.onTreeSelect = this.onTreeSelect.bind(this);
    this.execStar = this.execStar.bind(this);
    this.orgSearch = this.orgSearch.bind(this);
    this.rootOrgshow = this.rootOrgshow.bind(this);
  }

  /**
   * 初始化页面信息
   * 
   * 1、加载类型列表
   * 2、加载执行人列表
   * 3、加载关注人列表
   * 4、设置侧边菜单，侧边菜单会受到Ajax延迟影响，导致信息错误，所以设置延迟加载
   * 5、初始化组织结构树信息
   *  
   * TODO：需要优化设置侧边菜单功能
   * 
   */
  componentDidMount() {
    const self = this;
    this.props.addCaseAction.getCaseTypeList();
    this.props.addCaseAction.getExecutorList();
    this.props.addCaseAction.getFocusList();

    setTimeout(function() {
      console.log('延迟设置');
      self.props.getAddCaseLeftMenu()
    }, 1000);

    // this.props.addCaseAction.getRootOrgs();
    this.props.addCaseAction.getCollectionOrgs();
  }

  /**
   * 上传临时文件
   *
   * 1、判断失败请求提示上传失败
   * 2、判断请求成功，且code为0，提示成功，并将文件信息保存起来
   * 3、请求成功，code不为0，提示失败信息
   *  
   * @param {any} file
   */
  uploadChange(file) {
    if (file.file.status == 'error' && !file.event) {
      console.log('上传失败！！');
    }
    if (file.file.status == 'done') {
      if (file.file.response.code === '0') {
        console.log('上传成功！！', this.props);
        this.props.addCaseAction.setDefaultFileList(file.fileList);
      } else {
        console.log('上传失败！！', file.file.response.message);
      }
    }
  }

  /**
   * 监听文件列表变化 
   * 
   * @param {any} file
   */
  uploadDataFun(file) {
    // console.log('uploadDataFun file', file);
  }

  /**
   * 提交添加case请求
   * 
   * 1、表单验证
   * 2、图片信息参数处理
   * 3、加入分组信息
   * 4、发送请求
   * 5、重置表单信息
   * 
   * @param {any} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {

      const { fileList, orgId, orgName, executorUser, focusUser } = this.props;

      console.log('values', values);

      if (!orgId || !orgName) {
        this.props.addCaseAction.updAddCaseStateValue({ orgValidateStatus: 'error' })
        return;
      }
      if (!!errors) {
        console.log('Errors in form!!!', errors);
        return;
      }


      // 图片处理，需要将图片集合传入，在 `Action` 中处理
      values.filesPreUrl = JSON.stringify(fileList.map(file => {
        return {
          filePath: file.response.content.filePreUrl,
          fileName: file.name
        }
      }));

      // 分组信息
      values.groupId = orgId;
      values.groupName = orgName;
      values.groupType = 'case';
      values.executorList = executorUser;
      values.focusOnPeopleList = focusUser;
      this.props.addCaseAction.updAddCaseStateValue({ orgValidateStatus: 'success' })

      this.props.addCaseAction.submitCase(values);

      // 重置表单值 
      // TODO：需要在提交成功后做此操作
      // 思路：监听props变化，加入判断key，成功后重置页面信息
      this.props.form.resetFields();
    });
  }

  /**
   * 用户搜索关注人信息
   * 
   * 1、判断输入的值，当只等于空时，显示收藏关注人信息
   * 2、获取输入值，搜索相关联系人信息
   * 
   * @param {any} inputValue
   */
  focusChange(inputValue) {
    if (!inputValue && inputValue.length == 0) {
      this.props.addCaseAction.getFocusList();
    }
    if (inputValue.length >= 1) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout((function() {
        this.props.addCaseAction.getFocusKeywordList(inputValue)
      }).bind(this), 300);
    }
  }

  /**
   * 用户搜索执行人信息
   * 
   * 1、判断输入的值，当只等于空时，显示收藏执行人信息
   * 2、获取输入值，搜索相关联系人信息
   * 
   * @param {any} inputValue
   */
  executorhange(inputValue) {
    const self = this;
    if (!inputValue && inputValue.length == 0) {
      self.props.addCaseAction.getExecutorList();
    }
    if (inputValue.length >= 1) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout((function() { self.props.addCaseAction.getExecutorKeywordList(inputValue) }), 300);
    }
  }

  /**
   * 执行人收藏 
   * 
   * @param {any} event
   */
  execStar(executorObj) {
    this.props.addCaseAction.execStar(executorObj);
  }

  /**
   * 组织架构收藏 
   * 
   * @param {any} event
   */
  orgStar(orgObj) {
    this.props.addCaseAction.orgStar(orgObj);
  }

  /**
   * 关注人收藏 
   * 
   * @param {any} event
   */
  focusStar(focusObj) {
    this.props.addCaseAction.focusStar(focusObj);
  }

  /**
   * 输入验证
   * 
   * TODO：用于测试，还未加入实际功能 
   * 
   * @param {any} rule
   * @param {any} value
   * @param {any} callback
   */
  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  /**
   * 重置表单信息 
   * 
   * @param {any} e
   */
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  /**
   * 用于显示临时文件详情
   * 
   * TODO：未实现
   * 
   * @param {any} e
   * @returns
   */
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  /**
   * TODO 记录临时文件显示需要字段 
   * 
   * @returns
   */
  getInitialState() {
    return {
      priviewVisible: false,
      priviewImage: '',
    };
  }

  /**
   * TODO： 显示临时文件 
   */
  handleCancel() {
    this.setState({
      priviewVisible: false,
    });
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
  onTreeLoadData(treeNode) {
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
  onTreeSelect(value, node, extra) {
    const id = node.props.eventKey
    this.props.addCaseAction.updAddCaseStateValue({ orgValidateStatus: 'success' })
    this.props.addCaseAction.updOrgValue(value, id)
  }

  /**
   * 选中树中的某个节点，根据选中节点的Id获取对应的case列表
   * 
   * 判断节点的值，没有值时清除节点信息
   */
  onTreeChange(value, arr, obj) {
    if (!value) {
      this.props.addCaseAction.updOrgValue('', '')
    }
  }

  /**
   * 遍历节点数据，生成节点DOM 
   * 
   * @param {any} data
   * @returns
   */
  loop(data) {
    const treeNodeDom = data && data.map((item) => {
      let reqParams;
      if (item.starStatus) {
        reqParams = {
          id: item.collectId,
          starStatus: item.starStatus
        }
      } else {
        reqParams = {
          groupId: item.key,
          groupName: item.name,
          starStatus: item.starStatus
        }
      }

      const titleDOM = (
        <span>
          {item.name}
          <Star
            star={item.starStatus}
            style={{ color: '#2db7f5', position: 'absolute', right: '0', top: '0' }}
            onClick={() => { this.orgStar(reqParams) } }/>
        </span>
      )

      if (item.children) {
        return <TreeNode className="star-tree" value={item.name}  title={titleDOM} key={item.key}>{this.loop(item.children) }</TreeNode>;
      }
      return <TreeNode className="star-tree" value={item.name} title={titleDOM} key={item.key}  isLeaf={item.isLeaf} />;
    })
    return treeNodeDom;
  }

  /**
   * 构建关注人option 
   * 
   * @param {any} list
   * @param {any} status
   * @returns
   */
  buildFocusDom(list, status) {
    if (!list || !list.length > 0) {
      return <Option key='load'>暂无数据</Option>;
    }

    let focusOption;
    if (status === 'collection')
      focusOption = list.map((focus, index) => {
        return (
          <Option key={focus.focusId}>
            {focus.focusName}
            <Star
              star={true}
              style={{ marginRight: '15px' }}
              onClick={() => { this.focusStar({ id: focus.id, starStatus: true }) } }/>
          </Option>
        )
      })

    if (status === 'account') {
      focusOption = list.map((account, index) => {
        let reqParams;
        if (account.starStatus) {
          reqParams = {
            id: account.collectId,
            starStatus: account.starStatus
          }
        } else {
          reqParams = {
            focusId: account.uuid,
            focusName: account.realname + '-' + account.familyName,
            starStatus: account.starStatus
          }
        }
        return (
          <Option key={account.uuid}>
            {account.realname + '-' + account.familyName}
            <Star
              star={account.starStatus}
              style={{ marginRight: '15px' }}
              onClick={() => { this.focusStar(reqParams) } }/>
          </Option>)
      })
    }
    return focusOption;
  }

  /**
   * 构建执行人option 
   * 
   * @param {any} list
   * @param {any} status
   * @returns
   */
  buildExecutorDom(list, status) {
    if (!list || !list.length > 0) {
      return <Option key='load'>暂无数据</Option>;
    }

    let executor;
    if (status === 'collection')
      executor = list.map((executor) => {
        return (
          <Option key={executor.executorId}>
            {executor.executorName}
            <Star
              star={true}
              onClick={() => { this.execStar({ id: executor.id, starStatus: true }) } }/>
          </Option>);

      })

    if (status === 'account') {
      executor = list.map((account) => {
        let reqParams;
        if (account.starStatus) {
          reqParams = {
            id: account.collectId,
            starStatus: account.starStatus
          }
        } else {
          reqParams = {
            executorId: account.uuid,
            executorName: account.realname + '-' + account.familyName,
            starStatus: account.starStatus
          }
        }
        return (
          <Option key={account.uuid}>
            {account.realname + '-' + account.familyName}
            <Star
              star={account.starStatus}
              onClick={() => { this.execStar(reqParams) } }/>
          </Option>);
      });
    }
    return executor;
  }

  orgSearch(inputValue) {
    const self = this;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (!inputValue && inputValue.length == 0) {
      // timeout = setTimeout((function() { self.props.addCaseAction.getCollectionOrgs() }), 500);
      console.log('this.props.isRootOrgShow', this.props.isRootOrgShow);
      if (!this.props.isRootOrgShow) {
        this.props.addCaseAction.getRootOrgs();
      } else {
        this.props.addCaseAction.getCollectionOrgs();
      }
    }
    if (inputValue.length >= 1) {
      timeout = setTimeout((function() { self.props.addCaseAction.getOrgsListByKeyword({ keyword: encodeURI(inputValue) }) }), 300);
    }
  }
  rootOrgshow(isRootOrgShow) {
    if (isRootOrgShow) {
      this.props.addCaseAction.getRootOrgs();
    } else {
      this.props.addCaseAction.getCollectionOrgs();
    }
    this.props.addCaseAction.updAddCaseStateValue({ isRootOrgShow: !isRootOrgShow })
  }

  render() {
    const { getFieldProps, isFieldValidating, getFieldError, setFieldsValue } = this.props.form;
    const { orgCollectionList, focusUser, executorUser, orgName, orgList, orgValidateStatus, typeList, execCollectList, focusCollectList, focusList, execList, fileList } = this.props;
    // 默认表单间距
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };
    // 上传图片参数
    const props = {
      action: AG_CONF.agUrl + 'case2/pre_attachment?sign=' + AG_CONF.sign + '&ts=' + AG_CONF.ts + '&appID=' + AG_CONF.appID,
      listType: 'picture-card'
    };
    // 标题配置
    const titleProps = getFieldProps('caseTitle', {
      rules: [
        { required: true, message: '标题必需填写' },
        { validator: this.userExists }
      ],
    });
    // 详情配置
    const textareaProps = getFieldProps('caseDesc', {
      rules: [
        { required: true, message: '发布内容必须填写' }
      ],
    });
    // 催费金额配置
    const amount = getFieldProps('amount', { initialValue: 0 });
    // 时间节点配置
    const time = getFieldProps('timePoint', { initialValue: '24' });
    // 优先级配置
    const priority = getFieldProps('priority', { initialValue: '4' });
    // 任务类型配置
    let typeField = getFieldProps('caseTypeId', { initialValue: '' });
    // 任务类型列表
    const typeRadioList = typeList && typeList.map((type, index) => {
      if (index == 0) {
        typeField = getFieldProps('caseTypeId', { initialValue: type.id });
      }
      return <RadioButton value={type.id}>{type.case_type}</RadioButton>;
    })
    // 执行人配置
    const executorUserConf = getFieldProps('executorList', {
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择执行人',
      //     type: 'object',
      //   },
      // ]
    });
    // 执行人列表，默认显示收藏的执行人列表
    let executorOptionList = this.buildExecutorDom(execCollectList, 'collection');
    // 当搜索的联系人有值时，执行人列表显示搜索到的信息
    if (execList && execList.length > 0) {
      executorOptionList = this.buildExecutorDom(execList, 'account');
    }
    // 关注人配置
    const focusUserConf = getFieldProps('focusOnPeopleList', {
      rules: [
        { required: true, message: '请选择关注人', type: 'array' }
      ],
    });
    // 关注人列表，默认显示关注人收藏列表
    let focusOptionList = this.buildFocusDom(focusCollectList, 'collection')
    // 当搜索的关注人列表有值是，关注人列表显示搜索到的信息
    if (focusList && focusList.length > 0) {
      focusOptionList = this.buildFocusDom(focusList, 'account')
    }
    // 获取节点DOM
    // const treeNodes = this.loop(orgList && orgList.length > 0 ? orgList : orgCollectionList);
    const treeNodes = this.loop(orgList);
    const paramJson = {
      // 执行人配置
      executorParam: {
        showSearch: true,
        value: executorUser,
        labelInValue: true,
        optionFilterProp: 'children',
        onSearch: this.executorhange,
        notFoundContent: '无法找到',
        filterOption: (inputValue, option) => { return option; },
        placeholder: '请选择执行人',
        style: { width: '100%' }
      },
      // 树节点配置
      treeSelectParams: {
        value: orgName,
        showSearch: true,
        filterTreeNode: function(inputValue, treeNode) {
          return treeNode;
        },
        onSearch: this.orgSearch,
        treeDefaultExpandAll: false,
        placeholder: "请选择",
        searchPlaceholder: "输入您要查询的节点",
        onChange: this.onTreeChange,
        loadData: this.onTreeLoadData,
        onSelect: this.onTreeSelect
      },
      // 关注人配置
      focusParam: {
        multiple: true,
        value: focusUser,
        labelInValue: true,
        optionFilterProp: "children",
        onSearch: this.focusChange,
        notFoundContent: "无法找到",
        filterOption: (inputValue, option) => { return option; },
        placeholder: "请选择关注人",
      },
      // 催费金额
      amountParams: {
        min: 0,
        max: 10000,
        step: 0.11,
        style: { width: 100 }
      }
    }

    return (
      <Spin spinning={this.props.loading}>
        <Form horizontal form={this.props.form} >
          <Row gutter={16}>
            <Col sm={13}>
              <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback
                help={isFieldValidating('caseTitle') ? '校验中...' : (getFieldError('caseTitle') || []).join(', ') }
                >
                <Input {...titleProps}  placeholder="请输入标题" />
              </FormItem>

              <FormItem
                label="催费金额"
                {...formItemLayout}>
                <InputNumber
                  {...paramJson.amountParams}
                  {...amount} />
                <span className="ant-form-text"> 元</span>
              </FormItem>

              <FormItem
                label={<span>关联分组<span className="ant-divider"></span><a onClick={() => { this.rootOrgshow(this.props.isRootOrgShow) } }>{this.props.isRootOrgShow ? '收藏' : '架构'}</a></span>}
                required
                validateStatus={orgValidateStatus}
                help={!orgValidateStatus || orgValidateStatus == 'success' ? '' : '请选择关联分组'}
                {...formItemLayout} >
                <TreeSelect className="tree-select"
                  { ...paramJson.treeSelectParams }>
                  {treeNodes}
                </TreeSelect>
              </FormItem>


              <FormItem
                {...formItemLayout}
                label="执行人"
                required>
                <Select
                  {...executorUserConf}
                  {...paramJson.executorParam}
                  >
                  {executorOptionList}
                </Select>
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="关注人"
                required>
                <Select
                  {...focusUserConf}
                  {...paramJson.focusParam}>
                  {focusOptionList}
                </Select>
              </FormItem>

              <FormItem
                {...formItemLayout}
                required
                label="发布内容">
                <Input
                  type="textarea"
                  style={{ height: 150 }}
                  placeholder="请输入发布内容"
                  {...textareaProps} />
              </FormItem>

              <FormItem
                label="时间节点"
                required
                labelCol={formItemLayout.labelCol}>
                <RadioGroup {...time}>
                  <RadioButton value="24">24小时</RadioButton>
                  <RadioButton value="48">48小时</RadioButton>
                  <RadioButton value="72">72小时</RadioButton>
                  <RadioButton value="120">120小时</RadioButton>
                </RadioGroup>
              </FormItem>

              <FormItem
                label="任务类型"
                required
                labelCol={formItemLayout.labelCol}>
                <RadioGroup {...typeField}>
                  {typeRadioList}
                </RadioGroup>
              </FormItem>

              <FormItem
                label="优先级"
                required
                labelCol={formItemLayout.labelCol}>
                <RadioGroup {...priority}>
                  <RadioButton value="4">低</RadioButton>
                  <RadioButton value="3">中</RadioButton>
                  <RadioButton value="2">高</RadioButton>
                  <RadioButton value="1">非常高</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>

            <Col sm={11}>

              <FormItem
                {...formItemLayout}
                label="小区"
                >
                <Input {...getFieldProps('community', { initialValue: '' }) }  placeholder="请输入小区信息" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="楼栋"
                >
                <Input {...getFieldProps('building', { initialValue: '' }) }  placeholder="请输入楼栋信息" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="单元"
                >
                <Input {...getFieldProps('unit', { initialValue: '' }) }  placeholder="请输入单元信息" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="房号"
                >
                <Input {...getFieldProps('room', { initialValue: '' }) }  placeholder="请输入房号信息" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="业主姓名"
                >
                <Input {...getFieldProps('ownerName', { initialValue: '' }) }  placeholder="请输入业主姓名" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="业主电话"
                >
                <Input {...getFieldProps('ownerPhone', { initialValue: '' }) }  placeholder="请输入业主电话" />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="欠费月数"
                >
                <Input {...getFieldProps('arrearsMonth', { initialValue: '' }) }  placeholder="请输入欠费月数" />
              </FormItem>

              <FormItem>
                <div className="clearfix">
                  <Upload {...props}
                    data={this.uploadDataFun.bind(this) }
                    onChange={this.uploadChange.bind(this) }
                    fileList={this.props.fileList}
                    >
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>

                </div>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="ghost" style={{ marginRight: 8 }} onClick={this.handleReset.bind(this) }>重置</Button>
              <Button type="primary" onClick={this.handleSubmit}>发布</Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
};

function mapStateToProps(state) {
  return {
    typeList: state.addCase.typeList,
    execCollectList: state.addCase.execCollectList,
    focusCollectList: state.addCase.focusCollectList,
    focusList: state.addCase.focusList,
    execList: state.addCase.execList,
    loading: state.addCase.loading,
    fileList: state.addCase.fileList,
    orgValidateStatus: state.addCase.orgValidateStatus,
    orgList: state.addCase.orgList,
    orgName: state.addCase.orgName,
    orgId: state.addCase.orgId,
    executorUser: state.addCase.executorUser,
    focusUser: state.addCase.focusUser,
    orgCollectionList: state.addCase.orgCollectionList,
    isRootOrgShow: state.addCase.isRootOrgShow
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCaseAction: bindActionCreators(addCaseAction, dispatch),
    getAddCaseLeftMenu: bindActionCreators(getAddCaseLeftMenu, dispatch)
  }
}
Demo = Form.create({
  onFieldsChange: (props, fields) => {
    console.log('fields', fields);
    if (fields.executorList && fields.executorList.value) {
      const executorUser = {
        key: fields.executorList.value.key,
        label: fields.executorList.value.label[0]
      }
      props.addCaseAction.updAddCaseStateValue({ executorUser: executorUser })
    }
    if (fields.focusOnPeopleList && fields.focusOnPeopleList.value && !fields.focusOnPeopleList.dirty) {
      let focusList = [];
      fields.focusOnPeopleList.value.map(focus => {
        let label = typeof (focus.label) === 'string' ? focus.label : focus.label[0];
        focusList.push({
          key: focus.key,
          label: label
        })
      })
      props.addCaseAction.updAddCaseStateValue({ focusUser: focusList })
    }
  },
  // mapPropsToFields: (props) => {
  //   console.log('props', props);
  // }
})(Demo);
export default connect(mapStateToProps, mapDispatchToProps)(Demo);



// 点击图片显示详情功能：
// TODO：暂未加入

// <Modal visible={this.props.priviewVisible} footer={null} onCancel={this.handleCancel}>
//   <img alt="example" src={this.state.priviewImage} />
// </Modal>

