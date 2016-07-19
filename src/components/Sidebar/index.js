import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Menu, Icon, Badge, notification } from 'antd';
// import { getCaseMenu, updateNavPath, updateCollapse, updateStatus } from '../../store/modules/menu/menu_action';

// import { getCaseList } from '../../actions/case';
// import { getAllCaseManage } from '../../actions/case_manage';
// import { logout } from '../../actions/user';

// import { getCaseList } from '../../store/modules/myCase/my_case_action';
// import { getMyTaskList } from '../../store/modules/myTask/my_task_action';
// import { getMyFocusList } from '../../store/modules/myFocus/my_focus_action';
// import { getCaseManageList } from '../../store/modules/caseManage/case_manage_action';
// import { getCaseGroupList } from '../../store/modules/caseGroup/case_group_action';
// import { logout } from '../../store/modules/user/user_action';

// import OPERATOR_INFO from '../../constants/OperatorInfo';
// import * as Util from '../../util';

import logo from './logo.png'
import touxiang from './touxiang.png'

const SubMenu = Menu.SubMenu

// import styles from './index.less'
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
  constructor (props) {
    super(props)

    this.menuClickHandle = this.menuClickHandle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
  }

  menuClickHandle (item) {
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
    /**
     * 点击侧栏菜单，根据不同的 `Tab` 状态查询不同的信息
     */
    
    // let getList = function(){},reqParams = {};
    // if (this.props.leftMenuType == 'my_case') {
    //   getList = this.props.getCaseList;
    //   reqParams = this.props.myCaseReqParams;
    //   reqParams.pageId = 1;
    // }
    // if (this.props.leftMenuType == 'my_focus') {
    //   getList = this.props.getMyFocusList;
    //   reqParams = this.props.myFocusReqParams;
    //   reqParams.pageId = 1;
    // }
    // if (this.props.leftMenuType == 'my_task') {
    //   getList = this.props.getMyTaskList;
    //   reqParams = this.props.myTaskReqParams;
    //   reqParams.pageId = 1;
    // }
    // if (this.props.leftMenuType == 'case_manage') {
    //   getList = this.props.getCaseManageList;
    //   reqParams = this.props.caseManageReqParams;
    //   reqParams.pageId = 1;
    // }
    // if (this.props.leftMenuType == 'case_group') {
    //   getList = this.props.getCaseGroupList;
    //   reqParams = this.props.caseGroupReqParams;
    //   reqParams.pageId = 1;
    // }
    
    // switch (e.key) {
    //   case 'logout':
    //     this.props.logout();        
    //     notification.success({
    //           message: 'Logout Success',
    //           description: 'goodbye',
    //           duration: 2,
    //     });        
    //     this.context.router.replace('/login');
    //     break;
    //   case 'ongoing':
    //     reqParams.status = 1;
    //     break;
    //   case 'completed':
    //     reqParams.status = 2;
    //     break;
    //   case 'confirm_completed':
    //     reqParams.status = 3;
    //     break;
    //   case 'closed':
    //     reqParams.status = 4;
    //     break;
    //   default :
    //     this.props.other(e.key)
    //     break;
    // }
    
    // getList(reqParams)
    // this.props.updateStatus(reqParams.status);
  }
  
  render () {
    // const { leftMenu } = this.props
    
    // let defaultSelectedKeys;
    // switch (this.props.status) {
    //   case 1 :
    //     defaultSelectedKeys = ['ongoing']
    //     break;
    //   case 2 :
    //     defaultSelectedKeys = ['completed']
    //     break;
    //   case 3 :
    //     defaultSelectedKeys = ['confirm_completed']
    //     break;
    //   case 4 :
    //     defaultSelectedKeys = ['closed']
    //     break;
    // }
    const leftMenu = [
        {
          key: 'ongoing',
          name: '待处理数',
          icon: 'info-circle-o',
          dot: false
        },
        {
          key: 'completed',
          name: '已完成数',
          icon: 'check-circle-o',
          dot: false
        },
        {
          key: 'confirm_completed',
          name: '确认完成',
          icon: 'check-circle',
          dot: false
        },
        {
          key: 'closed',
          name: '已关闭数',
          icon: 'poweroff',
          dot: false
        },
        {
          key: 'gratuity',
          name: '获得打赏',
          icon: 'pay-circle-o',
          dot: false
        },
        {
          key: 'thumb_up',
          name: '总点赞数',
          icon: 'like',
          dot: false
        },
        {
          key: 'dislike',
          name: '总差评数',
          icon: 'dislike',
          dot: false
        },
        // {
        //   key: 'logout',
        //   name: '退出登录',
        //   icon: 'logout',
        //   dot: false
        // }
     ];
    let openKey = []
    const menu = leftMenu.map((item) => {
      openKey.push('sub'+item.key)
      
      return (
        <Menu.Item style={{ zIndex: 10}} key={item.key}>
            <Badge dot={item.dot}>
              <Icon type={item.icon} />
            </Badge>
            <span className={styles["nav-text"]}>{item.name}</span>
            <span className={styles["nav-badge"]} style={{float:'right'}}>{ item.num }</span>
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
            <div className={styles["ant-layout-logo"]}><img src={logo} /><span className={styles["nav-text"]}>催费跟踪后台</span></div>
            <div className={styles["ant-layout-portrait"]}>
              <div className={styles["nav-portrait"]}><img src={touxiang} /></div>
              <div className={styles["nav-portrait-name"]}>aaa</div>
              <div className={styles["nav-portrait-title"]} onClick={this.logout}>注销</div>
            </div>
            <Menu mode="inline" theme="dark" onClick={this.onClick.bind(this)}>
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
// console.log('state.menu.leftMenu', state.menu.leftMenu);
  return {
    // leftMenuType  : state.menu.leftMenuType,
    // leftMenu      : state.menu.leftMenu,
    // currentIndex  : state.menu.currentIndex,
    // status        : state.menu.status,
    
    // myCaseReqParams     : Util.myCaseParamsFromat(state),
    // myCasePager         : state.myCase.pager,
    
    // myTaskReqParams     : Util.myTaskParamsFromat(state),
    // myTaskPager         : state.myTask.pager,
    
    // myFocusReqParams     : Util.myFocusParamsFromat(state),
    // myFocusPager         : state.myFocus.pager,
    
    // caseManageReqParams     : Util.caseManageParamsFromat(state),
    // caseManagePager         : state.caseManage.pager,
    
    // caseGroupReqParams     : Util.caseGroupParamsFromat(state),
    // caseGroupPager         : state.caseGroup.pager
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // getCaseMenu             : bindActionCreators(getCaseMenu, dispatch),
    // updateNavPath           : bindActionCreators(updateNavPath, dispatch),
    // logout                  : bindActionCreators(logout, dispatch),
    // updateStatus            : bindActionCreators(updateStatus, dispatch),
    
    // getCaseList             : bindActionCreators(getCaseList, dispatch),
    // getCaseManageList       : bindActionCreators(getCaseManageList, dispatch),
    // getMyTaskList           : bindActionCreators(getMyTaskList, dispatch),
    // getMyFocusList          : bindActionCreators(getMyFocusList, dispatch),
    // getCaseGroupList        : bindActionCreators(getCaseGroupList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
