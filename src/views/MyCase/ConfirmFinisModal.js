import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Rate } from 'antd';

const FormItem = Form.Item;

let App = React.createClass({
  getInitialState() {
    return {
      visible: false, // 控制摸态框隐藏显示
      value: 3, // 评分星级
    };
  },

  /**
   * 修改评分等级 
   * 
   * @param {any} value
   */
  handleChange(value) {
    this.setState({ value });
  },

  /**
   * 显示摸态框 
   */
  showModal() {
    this.setState({
      visible: true,
    });
  },

  /**
   * 点击确认时的操作 TODO：需要完善
   * 
   * 1、判断提交信息
   * 2、执行确认操作
   * 3、关闭确认框 
   * 
   */
  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      this.setState({
        visible: false,
      });
    });
  },

  /**
   * 点击取消隐藏确认框 
   * 
   * @param {any} e
   */
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  },

  render() {
    const { value, visible } = this.state;
    const { getFieldProps } = this.props.form;
    // 确认信息
    const textareaProps = getFieldProps('complete_reason');
    // 摸态框属性
    const modalParams = {
      title: "您是否确认要完成这项任务?",
      visible: visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel
    }
    // 评分信息
    const score = value && <span className="ant-rate-text">{value} 星</span>

    return (
      <span>
        <span className="ant-divider"></span>
        <a onClick={this.showModal}>确认完成</a>
        <Modal { ...modalParams }>
          <Form horizontal form={this.props.form}>
            <FormItem label="请输入完成原因">
              <Input type="textarea" rows={4} placeholder="请输入完成原因"
                {...textareaProps}/>
            </FormItem>
          </Form>
          <span>
            <Rate onChange={this.handleChange} value={value} />
            {score}
          </span>
        </Modal>
      </span>
    );
  },
});

App = Form.create()(App);

export default App;