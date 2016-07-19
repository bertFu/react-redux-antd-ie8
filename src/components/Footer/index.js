import React from 'react'

import styles from './index.less'

export default class Footer extends React.Component {
  constructor () {
    super()
  }

  render () {

    return (
      <div className={styles["ant-layout-footer"]}>
      xxxx 版权所有 © 2015 xxxxxx.com
      </div>
    )
  }
}
