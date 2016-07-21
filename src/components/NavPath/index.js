import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'

import styles from './index.less'

const defaultProps = {
  navpath: []
}

const propTypes = {
  navpath: PropTypes.array
}

class NavPath extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { navpath } = this.props
    const bread = navpath.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
      )
    })
    const breadInit = <Breadcrumb.Item key={'bc-myMain'}>我的发布</Breadcrumb.Item>
    return (
      <div className={styles["ant-layout-breadcrumb"]}>
        <Breadcrumb>
          <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
          {bread.length == 0? breadInit: bread}
        </Breadcrumb>
      </div>
    )
  }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    // navpath: state.menu.navpath
  }
}

export default connect(mapStateToProps)(NavPath)
