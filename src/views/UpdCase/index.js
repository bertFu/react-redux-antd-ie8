import React from 'react';
import { Form, InputNumber, Radio, Spin, Button, Input, Modal, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as addCaseAction from '../../store/modules/addCase/add_case_action';
import * as caseDetailAction from '../../store/modules/caseDetail/case_detail_action';
import { getAddCaseLeftMenu } from '../../store/modules/menu/menu_action';

import './index.less';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import md5 from 'md5';
import reqwest from 'reqwest'

const appID = window.globalConfig.appid;
const token = window.globalConfig.token;
const ts = new Date().getTime().toString().substring(0, 10);
const sign = md5(appID + ts + token + 'false');
const agUrl = window.globalConfig.url;

function noop() {
  return false;
}

let timeout;

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 初始化搜索信息
   * 
   * 1、case类型列表
   * 2、执行人列表
   * 3、关注人列表
   * 4、设置各个项的值
   */
  componentDidMount() {
    const { caseInfo } = this.props;
    this.props.addCaseAction.getCaseTypeList();
    this.props.addCaseAction.getExecutorList();
    this.props.addCaseAction.getFocusList();
    this.props.addCaseAction.setState(caseInfo);
  }

  /**
   * 提交修改信息
   * 
   * 1、表单验证
   * 2、获取修改参数
   * 3、修改信息
   * 
   * @param {any} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      values.id = this.props.caseInfo.id;

      this.props.caseDetailAction.submitUpdateCase(values);
    });
  }

  /**
   * 信息验证
   * 
   * TODO：验证器存在问题无法调用，需要解决 
   * 
   * @param {any} rule
   * @param {any} value
   * @param {any} callback
   */
  userExists(rule, value, callback) {
    console.log('sd');
    // if (!value) {
    callback();
    // } else {
    //   setTimeout(() => {
    //     if (value === 'JasonWood') {
    //       callback([new Error('抱歉，该用户名已被占用。')]);
    //     } else {
    //       callback();
    //     }
    //   }, 800);
    // }
  }

  /**
   * 欠费月数信息验证
   * 
   * TODO：验证器存在问题无法调用，需要解决
   * 
   * @param {any} rule
   * @param {any} value
   * @param {any} callback
   */
  arrearsAmountValidator(rule, value, callback) {
    console.log('isNaN(value)', isNaN(value));
    if (!value) {
      callback();
    } else {
      if (isNaN(value)) {
        callback([new Error('请输入数字。')]);
      } else {
        callback();
      }
    }
  }

  /**
   * 重置表单操作
   * 
   * @param {any} e
   */
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  render() {
    const { loading, caseInfo, typeList, execCollectList, focusCollectList, focusList, execList, fileList } = this.props;
    const { getFieldProps, isFieldValidating, getFieldError, setFieldsValue } = this.props.form;
    // 表单项默认间距
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    // 自定义右侧表单项间距
    const formLeftItem = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const props = {
      action: agUrl + 'case2/pre_attachment?sign=' + sign + '&ts=' + ts + '&appID=' + appID,
      listType: 'picture-card',
    };
    // 标题配置
    const titleProps = getFieldProps('caseTitle',
      { initialValue: caseInfo.caseTitle },
      {
        rules: [
          { required: true, message: '标题必需填写' },
          { validator: this.userExists },
        ],
      });
    // 详情配置
    const textareaProps = getFieldProps('caseDesc',
      { initialValue: caseInfo.caseDesc },
      {
        rules: [
          { required: true, message: '发布内容必须填写' },
        ],
      });
    // 催费金额配置
    const amount = getFieldProps('amount', { initialValue: caseInfo.amount })
    // 时间节点配置
    const time = getFieldProps('timePoint', { initialValue: caseInfo.timePoint + '' })
    // 优先级配置
    const priority = getFieldProps('priority', { initialValue: caseInfo.priority });
    // 任务配置
    let typeField = getFieldProps('caseTypeId', { initialValue: caseInfo.caseTypeId })
    // 任务类型列表项
    const typeRadioList = typeList.map((type, index) => {
      return <RadioButton value={type.id}>{type.case_type}</RadioButton>
    })

    return (
      <Spin spinning={loading}>
        <Form horizontal form={this.props.form} >
          <Row gutter={16}>
            <Col sm={13}>
              <FormItem
                {...formItemLayout}
                label="标题"
                required
                hasFeedback
                help={isFieldValidating('caseTitle') ? '校验中...' : (getFieldError('caseTitle') || []).join(', ') }
                >
                <Input {...titleProps}  placeholder="请输入标题" />
              </FormItem>

              <FormItem
                label="催费金额"
                {...formItemLayout}>
                <InputNumber min={0} max={10000} step={0.11} style={{ width: 100 }} {...amount} />
                <span className="ant-form-text"> 元</span>
              </FormItem>

              <FormItem
                {...formItemLayout}
                required
                label="发布内容">
                <Input type="textarea"  style={{ height: 150 }} placeholder="请输入发布内容" {...textareaProps} />
              </FormItem>

              <FormItem
                label="时间节点"
                required
                labelCol={{ span: 4 }}>
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
                labelCol={{ span: 4 }}>
                <RadioGroup {...typeField}>
                  {typeRadioList}
                </RadioGroup>
              </FormItem>

              <FormItem
                label="优先级"
                required
                labelCol={{ span: 4 }}>
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
                {...formLeftItem}
                label="小区"
                >
                <Input {...getFieldProps('community', { initialValue: caseInfo.community }) }  placeholder="请输入小区信息" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="楼栋"
                >
                <Input {...getFieldProps('building', { initialValue: caseInfo.building }) }  placeholder="请输入楼栋信息" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="单元"
                >
                <Input {...getFieldProps('unit', { initialValue: caseInfo.unit }) }  placeholder="请输入单元信息" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="房号"
                >
                <Input {...getFieldProps('room', { initialValue: caseInfo.room }) }  placeholder="请输入房号信息" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="业主姓名"
                >
                <Input {...getFieldProps('ownerName', { initialValue: caseInfo.ownerName }) }  placeholder="请输入业主姓名" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="业主电话"
                >
                <Input {...getFieldProps('ownerPhone', { initialValue: caseInfo.ownerPhone }) }  placeholder="请输入业主电话" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="欠费月数"
                >
                <Input {...getFieldProps('arrearsMonth', { initialValue: caseInfo.arrearsMonth }) }  placeholder="请输入欠费月数" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="收费方式"
                >
                <Input {...getFieldProps('chargeWay', { initialValue: caseInfo.chargeWay }) }  placeholder="请输入欠费月数" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="实收金额"
                >
                <Input {...getFieldProps('recoveredAmount', { initialValue: caseInfo.recoveredAmount }) }  placeholder="请输入欠费月数" />
              </FormItem>

              <FormItem
                {...formLeftItem}
                label="实收历史欠费金额"
                help={isFieldValidating('arrearsAmount') ? '校验中...' : (getFieldError('arrearsAmount') || []).join(', ') }
                >
                <Input {...getFieldProps('arrearsAmount', { initialValue: caseInfo.arrearsAmount }, {
                  rules: [
                    { validator: this.arrearsAmountValidator },
                  ],
                }) }  placeholder="请输入欠费月数" />
              </FormItem>

            </Col>
          </Row>

          <Row>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="ghost" style={{ marginRight: 8 }} onClick={this.handleReset.bind(this) }>重置</Button>
              <Button type="primary" onClick={this.handleSubmit}>修改</Button>
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
    loading: state.caseDetail.loading,
    fileList: state.addCase.fileList,
    orgName: state.addCase.orgName,
    orgId: state.addCase.orgId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCaseAction: bindActionCreators(addCaseAction, dispatch),
    caseDetailAction: bindActionCreators(caseDetailAction, dispatch),
    getAddCaseLeftMenu: bindActionCreators(getAddCaseLeftMenu, dispatch)
  }
}
Demo = Form.create()(Demo);
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
