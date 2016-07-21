import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, notification, Checkbox } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../../store/modules/user/user_action';

const FormItem = Form.Item;

import styles from './index.less'

const propTypes = {
  user: PropTypes.string,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  /**
   * 监听props变化
   * 
   * 1、判断登入失败
   * 2、判断登入成功
   * 3、跳转默认页面
   * 
   * @param {any} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const isLoggingIn = nextProps.loggingIn;
    const user = nextProps.user

    if (error != this.props.loginErrors && error) {
      notification.error({
        message: 'Login Fail',
        description: error
      });
    }

    if (!isLoggingIn && !error && user) {
      notification.success({
        message: 'Login Success',
        description: 'Welcome ' + user,
        duration: 2,
      });
    }

    if (user) {
      this.context.router.replace('/home');
    }
  }

  /**
   * 提交登入请求 
   * 
   * @param {any} e
   */
  handleSubmit(e) {
    e.preventDefault()
    const data = this.props.form.getFieldsValue()
    this.props.login(data.user, data.password)
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <Row className={styles["login-row"]} type="flex" justify="space-around" align="middle">
        <Col span="9">
          <Form horizontal onSubmit={this.handleSubmit.bind(this) } className={styles["login-form"]}>
            <FormItem>
              <Row>
                <Col span='8' offset='12'>
                  <Input placeholder='请输入用户名' {...getFieldProps('user') } />
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Row>
                <Col span='8' offset='12'>
                  <Input type='password' placeholder='请输入密码' {...getFieldProps('password') } />
                </Col>
              </Row>
            </FormItem>

            <Row className={styles["check-margin"]}>
              <Col span='16' offset='12'>
                <Checkbox {...getFieldProps('agreement') }>记住账号密码</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col span='3' offset='12'>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
              <Col span='3'  offset='3'>
                <Button type='primary' htmlType='reset'>取消</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;
Login = Form.create()(Login);

function mapStateToProps(state) {
  const {user} = state;
  if (user.user) {
    return { user: user.user, loggingIn: user.loggingIn, loginErrors: '' };
  }

  return { user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
