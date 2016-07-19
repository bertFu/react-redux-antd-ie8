import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

let App = React.createClass({
  getInitialState() {
    return { visible: false };
  },

  /**
   * 显示关闭操作框 
   */
  showModal() {
    this.setState({
      visible: true,
    });
  },

  /**
   * 执行确认关闭操作
   * 
   * 1、用户没输入关闭信息时给出相应提示
   * 2、用户输入关闭信息，执行外部传入的关闭方法，将关闭信息传入该方法中
   * 3、隐藏关闭操作框
   * 
   */
  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      // 执行外部传入的方法
      this.props.confirmFinishCase && this.props.confirmFinishCase(values.delete_reason);
      this.setState({
        visible: false,
      });
    });
  },

  /**
   * 点击取消的隐藏操作 
   * 
   * @param {any} e
   */
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  },
  render() {
    const { getFieldProps } = this.props.form;
    const { visible } = this.state;
    // 设置关闭input：必填、未填写时的提示
    const textareaProps = getFieldProps('delete_reason', {
      rules: [
        { required: true, message: '必须填写关闭原因！' },
      ],
    });
    // 摸态框属性
    const modalParams = {
      title: "您是否确认要删除这项任务?",
      visible: visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel
    }

    return (
      <span>
        <span className="ant-divider"></span>
        <a onClick={this.showModal}>关闭</a>
        <Modal { ...modalParams }>
          <Form horizontal form={this.props.form}>
            <FormItem label="请输入删除原因" required >
              <Input type="textarea" rows={4} placeholder="请输入删除原因"
                {...textareaProps}/>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  },
});

App = Form.create()(App);

export default App;