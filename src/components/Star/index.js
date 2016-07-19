import React, {PropTypes} from 'react';
import { Icon } from 'antd';

import './index.less'

const defaultProps = {
}

const propTypes = {
}

class Star extends React.Component {
  constructor() {
    super()
  }
  handleClick(event, onClick) {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  }

  render() {
    const { onClick, style, star } = this.props;

    return (
      <span
        style={style}
        className="pull-right star-color"
        onClick = {(event) => {this.handleClick(event, onClick)}}>

        <Icon type={star ? "star" : "star-o"} />
      </span>
    )
  }
}

Star.propTypes = propTypes;
Star.defaultProps = defaultProps;

export default Star;