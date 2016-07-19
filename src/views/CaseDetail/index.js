import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Icon, Modal, Button, Card, message, Spin, Table, Upload, Popconfirm, BackTop } from 'antd';

import * as caseDetailAction from '../../store/modules/caseDetail/case_detail_action';
import { getAddCaseLeftMenu } from '../../store/modules/menu/menu_action';
import UpdCase from '../UpdCase';
import TopDetail from './TopDetail';
import AddRelatedCase from './addRelatedCase';
import Comment from './comment';
import operationInfo from '../../constants/OperatorInfo';

import './index.less';

import md5 from 'md5';
import reqwest from 'reqwest';

const appID = window.globalConfig.appid;
const token = window.globalConfig.token;
const ts = new Date().getTime().toString().substring(0, 10);
const sign = md5(appID + ts + token + 'false');
const agUrl = window.globalConfig.url;

const operatorId = window.globalConfig.operatorId;
const operator = window.globalConfig.operator;

const TabPane = Tabs.TabPane;

class CaseDetail extends React.Component {
  constructor(props) {
    super(props)
    this.showUpdModel = this.showUpdModel.bind(this);
    this.UpdModelOk = this.UpdModelOk.bind(this);
    this.UpdModelCancel = this.UpdModelCancel.bind(this);
  }
  componentDidMount() {
    this.props.caseDetailAction.getCaseInfo(this.props.params.caseId)
    this.props.getAddCaseLeftMenu()
  }
  componentWillUnmount() {
    this.props.caseDetailAction.updState({
      orgName: '',
      orgId: '',
      updGroupVisible: false,
      updCreateUserVisible: false,
      updFocusUserVisible: false,
      updExecVisible: false
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.caseId != this.props.params.caseId){
      this.props.caseDetailAction.getCaseInfo(nextProps.params.caseId);
    }
    
  }

  /**
   * 文件上传
   */
  uploadChange(info) {
    this.props.caseDetailAction.updLoad(true)
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      if (info.file.response.code == 0) {
        this.props.caseDetailAction.getCaseInfo(this.props.params.caseId)
        message.success(`${info.file.name} 上传成功。`);
      } else {
        this.props.caseDetailAction.updLoad(false)
        message.error(`上传失败：${info.file.response.message}`);
      }
    } else if (info.file.status === 'error') {
      this.props.caseDetailAction.updLoad(false)
      message.error(`${info.file.name} 上传失败。`);
    }
  }
  goBlack() {
    /**
     * 返回上级页面
     * 
     * 优化：
     * 使用 `router` 功能返回上级页面
     */
    window.history.go(-1);
  }
  showUpdModel() {
    this.props.caseDetailAction.updModelVisible(true);
  }
  UpdModelOk() {
    console.log('UpdModelOk');
    this.props.caseDetailAction.updModelVisible(false);
  }
  UpdModelCancel() {
    console.log('UpdModelCancel');
    this.props.caseDetailAction.updModelVisible(false);
  }
  render() {
    const caseInfo = this.props.caseInfo;
    const caseId = this.props.params.caseId;

    const upDataProps = {
      name: 'file',
      action: agUrl + 'case2/attachment?sign=' + sign + '&ts=' + ts + '&appID=' + appID,
      data: {
        caseId: this.props.params.caseId,
        operatorId: operatorId,
        operator: operator,
        attachmentName: ''
      },
      beforeUpload: function(file) {
        this.data.attachmentName = file.name;
      },
      showUploadList: false,
      headers: {
        authorization: 'authorization-text',
      },
    };

    let operationList = [];
    // 判断操作人等于执行人，如果是执行人并且状态是进行中，则可以点击完成。
    caseInfo.executorList && caseInfo.executorList.map(exec => {
      if (operationInfo.operatorId === exec.userId && caseInfo.status === "1") {
        operationList.push(
          <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title='确定要完成这个任务吗？' onConfirm={() => { this.props.caseDetailAction.updStatusFinish(caseId) } }>
              <a>完成</a>
            </Popconfirm>
          </span>
        )
      }
    })
    // 判断操作人等于创建人，如果是创建人并且状态是完成，则显示确认完成。
    // 关闭完成按钮：判断操作人等于创建人，如果是创建人并且状态不是确认完成，则显示关闭。
    if (operationInfo.operatorId === caseInfo.createUserId) {
      if (caseInfo.status === "2") {
        operationList.push(
          <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title='确定要完成这个任务吗？' onConfirm={() => { this.props.caseDetailAction.updStatusConfirmFinish(caseId) } }>
              <a>确认完成</a>
            </Popconfirm>
          </span>
        )
      }

      if (caseInfo.status !== "3" && caseInfo.status !== "4") {
        operationList.push(
          <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title='确定要关闭这个任务吗？' onConfirm={() => { this.props.caseDetailAction.updStatusClose(caseId) } }>
              <a>关闭</a>
            </Popconfirm>
          </span>
        )
      }
    }
    return (
      <Spin spinning={this.props.loading}>
        <BackTop />
        <a onClick={this.goBlack}>返回</a>
        <div>
          <h3 style={{ textAlign: 'center', height: '40' }}>{caseInfo.caseTitle}</h3>

          <div className="detail-top-list">
            <TopDetail caseInfo={caseInfo} />
            <Row>
              <Col className="detail-title" span={4}>操作：</Col>
              <Col className="detail-content" span={20}>
                <a onClick={this.showUpdModel}>修改</a>
                {operationList}
              </Col>
            </Row>
          </div>

          <Modal title="基本信息修改" visible={this.props.updModalVisible}
            width={1100}
            style={{ top: 20 }}
            footer=""
            onOk={this.UpdModelOk} onCancel={this.UpdModelCancel}
            okText="OK" cancelText="Cancel"
            >
            <UpdCase caseInfo={caseInfo}/>
          </Modal>


          <div className="card-container">
            <Tabs type="card" defaultActiveKey="1">
              <TabPane tab="任务动态" key="1">
                <Comment
                  commentList={caseInfo.commentList}
                  subComment={(comment) => {
                    this.props.caseDetailAction.addComment(this.props.params.caseId, comment)
                  } }
                  />
              </TabPane>
              <TabPane tab="附件列表" key="2">

                <div style={{ marginBottom: 10 }}>
                  <Upload
                    {...upDataProps}
                    onChange={this.uploadChange.bind(this) }
                    >
                    <Button type="primary">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                </div>

                <div className='table-group'>
                  <Table
                    columns={[{
                      title: '名称',
                      dataIndex: 'attachmentName',
                      render: (text, record) => <a href={record.attachmentShowUrl} target="_blank"><span><img style={{ height: 32, width: 32, float: 'left', marginRight: '9px' }} src={record.attachmentShowUrl}/></span><span style={{ lineHeight: '30px' }}>{text}</span></a>,
                    }, {
                        title: '下载',
                        dataIndex: 'attachmentUrl',
                        render: url => <a href={url}>点击下载</a>,
                      }, {
                        title: '最后修改时间',
                        dataIndex: 'lastModifyTime',
                      }, {
                        title: '创建时间',
                        dataIndex: 'createTime',
                      }, {
                        title: '创建人',
                        dataIndex: 'createUser',
                      }]}
                    dataSource={caseInfo.attachmentList}
                    pagination={false}
                    />
                </div>
              </TabPane>
              <TabPane tab="添加关联Case" key="3">
              
                <AddRelatedCase
                  placeholder='请输入工号'
                  onClick={(event, relationCaseNo) => {
                    const param = {
                      caseId: this.props.params.caseId,
                      relationCaseNo: relationCaseNo
                    }
                    this.props.caseDetailAction.subRelationCase(param)
                  } }
                  butText='确认关联'
                  butType='primary'
                  relationList={caseInfo.relationList}
                  delRelatedCase={(relationCaseId) => {
                    const param = {
                      relationCaseId: relationCaseId,
                      caseId:  this.props.params.caseId
                    }
                    this.props.caseDetailAction.delRelationCase(param)
                  }}
                  />

              </TabPane>
            </Tabs>
          </div>
        </div>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    caseInfo: state.caseDetail.caseInfo,
    loading: state.caseDetail.loading,
    updModalVisible: state.caseDetail.updModalVisible,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    caseDetailAction: bindActionCreators(caseDetailAction, dispatch),
    getAddCaseLeftMenu: bindActionCreators(getAddCaseLeftMenu, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetail);
