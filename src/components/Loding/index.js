import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { Spin, Alert } from 'antd'
import { connect } from 'react-redux'

import styles from './index.less'

const defaultProps = {}

const propTypes = {}

class Loding extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const boxflex = styles["boxflex"];
        const box_center = styles["box"] + '' + styles['center'];
        const line = styles["line"];
        const load_load1_move = styles["load"] + ' ' + styles['load1'] + ' ' + styles['move'];
        const sc = styles["sc"];
        const scale = styles["scale"];
        const scale_delay1 = styles["scale"] + ' ' + styles['delay1'];
        const scale_delay2 = styles["scale"] + ' ' + styles['delay2'];
        const li = styles["li"];
        const fz = styles["fz"];

        const loaing_1_style = {
            display: 'inline-block',
            width: '30px',
            height: '30px',
        }
        const loaing_1 = (
            <div className={box_center}>
                <span className={load_load1_move} style={loaing_1_style}></span>
            </div>
        )
        const loaing_2 = (
            <div className={box_center}>
                <span className={load_load1_move} style={loaing_1_style}><i></i></span>
            </div>
        )
        const loaing_3 = (
            <div className={box_center}>
                <span className={sc}>
                    <i className={scale}></i>
                    <i className={scale_delay1}></i>
                    <i className={scale_delay2}></i>
                </span>
            </div>
        )
        const loaing_4 = (
            <div className={box_center}>
                <span className={li}>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                    <i className={line} style={{ height: '26px', width: '7px' }}></i>
                </span>
            </div>
        )

        const loaing_5_style = {
            display: 'inline-block',
            width: '30px',
            height: '30px',
            border: '6px solid #64efb9'
        }
        const loaing_5 = (
            <div className={box_center}>
                <span className={li}>
                    <em className={fz} style={loaing_5_style} ></em>
                </span>
            </div>
        )
        return (
            <div>
                <Spin>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>
                <Spin tip={loaing_1}>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>

                <Spin tip={loaing_2}>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>

                <Spin tip={loaing_3}>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>

                <Spin tip={loaing_4}>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>

                <Spin tip={loaing_5}>
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        />
                </Spin>
            </div>
        )
    }
}

Loding.propTypes = propTypes;
Loding.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        // navpath: state.menu.navpath
    }
}

export default connect(mapStateToProps)(Loding)
