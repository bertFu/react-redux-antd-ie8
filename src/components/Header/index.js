import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import styles from './index.less'
// import styles from './index.less';
import { Link } from 'react-router'

// import * as menu from '../../store/modules/menu/menu_action'

import logo from './logo.png'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const DropdownButton = Dropdown.Button;

const defaultProps = {
  topMenu: [],
  currentIndex: 0
}

const propTypes = {
  topMenu: PropTypes.array,
  currentIndex: PropTypes.number
}

class Header extends React.Component {
  constructor () {
    super()
    this.onCollapseChange = this.onCollapseChange.bind(this);
    this.menuClickHandle = this.menuClickHandle.bind(this);
  }
  
  componentDidMount () {
    /**
     * 初始化头部菜单，通过服务端获取。
     */
    // this.props.menu.getTopMenu()
  }
    
  menuClickHandle (item) {
    /**
     * 加入二级导航时，可以通过判断字符串头标记来定位是住导航还是子导航
     * 
     */
    // if (item.key.indexOf('sub') != -1) {
    //   console.log('是主导航')
    // } else {
    //   console.log('是副级导航');
    // }
    
    /**
     * 特定功能：返回旧版
     * 
     * 判断 `key = index.html` 则跳转旧版
     * 因为在导航前加入了标记，所以这里判断时也需要加入 `sub` 标记 
     * 
     */
    switch (item.key) {
      case 'myMain':
        // 获取我的发布数据
        // 获取边栏菜单数据
      break;
      case 'submanage':
        // 获取case管理数据
        // 获取边栏菜单数据
      break;
      case 'sub' + 'index.html':
        window.open("/index.html");
      break;
    }
    
    /**
     * 默认情况更改 `面包屑` 信息
     */
    // this.props.menu.updateNavPath(item.keyPath, item.key)
  }
  
  onCollapseChange(collapse) {
    /**
     * 侧栏切换功能
     * 
     * 点击特定按钮更改侧栏状态，实现侧栏切换功能
     * 通过判断侧栏状态，显示不同的class
     * 该 `class` 在 `View/App` 下: `<div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>`
     * 该功能可以放在任意位置，目前放在顶部实现
     * 
     */
    // this.props.menu.updateCollapse(this.props.collapse)
  }
  
  render () {
    // const { topMenu, user, collapse, routing } = this.props
    // const basename = '/newIndex.html/';
    // let selectKey = routing.locationBeforeTransitions && routing.locationBeforeTransitions.pathname.split('/')[1]
    // console.log('selectKey', selectKey);
    // console.log('routing', routing);
    // console.log('THIS.PROPS', this.props);
    
    const topMenu = [
            {
                key: 'add_task',
                name: '发起任务',
                icon: 'edit'
            },
            {
                key: 'my_case',
                name: '我的发布',
                icon: 'book'
            },
            {
                key: 'my_task',
                name: '我的任务',
                icon: 'user'
            },
            {
                key: 'my_focus',
                name: '我的关注',
                icon: 'eye-o'
            },
            {
                key: 'case_manage',
                name: 'case管理',
                icon: 'setting'
            }, {
                key: 'case_group',
                name: '分组管理',
                icon: 'tags-o'
            }, {
                key: 'case_rank',
                name: '统计排名',
                icon: 'line-chart'
            }, {
                key: 'index.html',
                name: '返回旧版',
                icon: 'retweet'
            }
        ];  
     
    const menu = topMenu.map((item) => {
      /**
       * 遍历 `topMenu` 显示顶部信息
       * 
       * `sub` 标记为是主导航
       * `key` 用于页面跳转与记录唯一
       * `name` 标签显示内容
       * 
       */
      return (
        <Menu.Item key={'sub'+ item.key}>
            <Link to={'' + item.key}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
        </Menu.Item>
      )
    });
    /**
     * `selectKey` 用于默认显示
     * 
     * 优化：
     * 根据路由规则显示导航状态
     * 需要在 `state` 中加入 `router` 这样就方便了对全局的管理了
     * 学习下 `redux-simple-router` 来实现该功能 
     * 
     */
    // return (
    //   <div className='ant-layout-header'>
    //     <div className="ant-layout-wrapper">
    //       <div className="collapse-icon" onClick={this.onCollapseChange}><Icon type="bars" /></div>
    //       <Menu 
    //         theme="light" 
    //         mode="horizontal" 
    //         onClick={this.menuClickHandle}
    //         defaultSelectedKeys={'sub' + selectKey} style={{lineHeight: '64px'}}>
    //         { menu }
    //       </Menu>
    //     </div>
    //   </div>
    // )
    return (
      <div className={styles['ant-layout-header']}>
        <div className={styles["ant-layout-wrapper"]}>
          <Menu 
            theme="light" 
            mode="horizontal" 
            onClick={this.menuClickHandle}
            style={{lineHeight: '64px'}}>
            { menu }
          </Menu>
        </div>
      </div>
    )
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  // console.log('state.router', state.router);
  // console.log('state.routing', state.routing);
  return {    
      // topMenu       : state.menu.topMenu,
      // currentIndex  : state.menu.currentIndex,
      // collapse      : state.menu.collapse,
      // selectKey     : state.menu.selectKey,
      
      // router        : state.router,
      // routing       : state.routing,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    // menu: bindActionCreators(menu, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


  // handleClick(e) {
  //   /**
  //    * 旧版头部功能
  //    * 
  //    * 目前已经停用，留着以后用到时方便
  //    * 
  //    */
  //   console.log('click ', e);
  //   this.setState({
  //     current: e.key,
  //   });
  // }

  // render () {
  //   const {user} = this.props
  //   return (
  //     <div className='ant-layout-header'>
  //       <div className="ant-layout-wrapper">
         
  //         <Menu className="header-menu" onClick={this.handleClick} style={{lineHeight: '64px'}}
  //         mode="horizontal">
  //           <SubMenu title={<span><Icon type="user" />{user.user}</span>}>
  //             <Menu.Item key="setting:1">选项1</Menu.Item>
  //             <Menu.Item key="setting:2">选项2</Menu.Item>
  //             <Menu.Divider />
  //             <Menu.Item key="setting:3">注销</Menu.Item>
  //           </SubMenu>
  //           <Menu.Item key="mail">
  //             <Icon type="question" />帮助
  //           </Menu.Item>
  //         </Menu>
  //       </div>
  //     </div>
  //   )
  // }