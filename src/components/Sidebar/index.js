import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Menu, Icon, Badge, notification } from 'antd';
import * as MenuAction  from '../../store/modules/menu/menu_action';

import { logout } from '../../store/modules/user/user_action';

// import * as Util from '../../util';

import logo from './logo.png'
import touxiang from './touxiang.png'

const SubMenu = Menu.SubMenu

import styles from '../../views/App/index.less'

const defaultProps = {
  leftMenu: [],
  currentIndex: 0
}

const propTypes = {
  leftMenu: PropTypes.array,
  currentIndex: PropTypes.number
}

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.menuClickHandle = this.menuClickHandle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.MenuAction.getCaseMenu();
  }

  menuClickHandle(item) {
    this.props.updateNavPath(item.keyPath, item.key)
    console.log('menuClickHandle click ', item);
    this.setState({
      current: item.key,
    });
  }
  logout() {
    this.props.logout();
  }
  onClick(e) {
  }

  render() {
    const { leftMenu } = this.props
    
    let openKey = []
    const menu = leftMenu.map((item) => {
      openKey.push('sub' + item.key)

      return (
        <Menu.Item style={{ zIndex: 10 }} key={item.key}>
          <Badge dot={item.dot}>
            <Icon type={item.icon} />
          </Badge>
          <span className={styles["nav-text"]}>{item.name}</span>
          <span className={styles["nav-badge"]} style={{ float: 'right' }}>{ item.num }</span>
        </Menu.Item>
      )
    });
    // <div className="nav-portrait-title">编辑显示昵称</div>
    // return (
    //     <aside className="ant-layout-sider">
    //         <div className="ant-layout-logo"><img src={logo} /><span className="nav-text">催费跟踪后台</span></div>
    //         <div className="ant-layout-portrait">
    //           <div className="nav-portrait"><img src={OPERATOR_INFO.avatarUrl + OPERATOR_INFO.operatorId} /></div>
    //           <div className="nav-portrait-name">{OPERATOR_INFO.operator}</div>
    //           <div className="nav-portrait-title" onClick={this.logout}>注销</div>
    //         </div>
    //         <Menu mode="inline" theme="dark" onClick={this.onClick.bind(this)} selectedKeys={defaultSelectedKeys}>
    //           { menu }
    //         </Menu>
    //       </aside>
    // )

    return (
      <aside className={styles["ant-layout-sider"]}>
        <div className={styles["ant-layout-logo"]}><img src={logo} /><span className={styles["nav-text"]}>xxxx后台</span></div>
        <div className={styles["ant-layout-portrait"]}>
          <div className={styles["nav-portrait"]}><img src={touxiang} /></div>
          <div className={styles["nav-portrait-name"]}>admin</div>
          <div className={styles["nav-portrait-title"]} onClick={this.logout}>注销</div>
        </div>
        <Menu mode="inline" theme="dark" onClick={this.onClick.bind(this) }>
          { menu }
        </Menu>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
Sidebar.contextTypes = contextTypes;
function mapStateToProps(state) {
  console.log('state', state);
  return {
    leftMenuType: state.menu.leftMenuType,
    leftMenu: state.menu.leftMenu,
    currentIndex: state.menu.currentIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
    MenuAction: bindActionCreators(MenuAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
