import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix, Row, Col, Icon} from 'antd';

import NavPath from '../../components/NavPath';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import { fetchProfile, logout } from '../../store/modules/user/user_action';
// import 'antd/dist/antd.less';
import styles from './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 判断登入权限
   */
  componentWillMount() {
    const {actions} = this.props;
    actions.fetchProfile();
  }
  /**
   * 监听porps
   * 
   * 1、监听注销字段，刷新页面
   * 
   * @param {any} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const loggingOut = nextProps.loggingOut;
    if (loggingOut) {
      window.location.href = '/';
    }
  }
  render() {
    const {user, actions} = this.props;
    const { collapse } = this.props; // 判断侧边栏隐藏显示
    
    return (
      <div className={collapse ? styles["ant-layout-aside"] + ' ' + styles["ant-layout-aside-collapse"] : styles["ant-layout-aside"]}>
        <Sidebar />
        <div className={styles["ant-layout-main"]}>
          <Header user={user} />
          <NavPath />
          <div className={styles["ant-layout-container"]}>
            <div className={styles["ant-layout-content"]}>
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {
    user: user ? user : null,
    loggingOut: user.loggingOut,
    // collapse: state.menu.collapse
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchProfile, logout }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
