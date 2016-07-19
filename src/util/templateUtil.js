import React, { PropTypes } from 'react';
import { Table, Pagination, Popconfirm, Row, Col } from 'antd';
import { Link } from 'react-router'

/**
 * 格式化 `caseDesc`
 * 
 * desc：
 * 服务端传来的 `caseDesc` 换行是用 `/n` 来体现的，在页面上无法显示
 * 
 * 该方法将 `caseDesc` 按 `/n` 来切割成数据
 * 遍历切割后的数据，处理换行显示
 * 
 */
const caseDescFormat = (caseDesc) => {
  return caseDesc.split("/n")
    .map((item, index, items) => {
      if ((items.length - 1) == index) {
        return <span>{item}</span>
      } else {
        return <span>{item}<br/></span>
      }
    });
};

/**
 * 处理表格左侧 `+` 扩展内容
 * 
 * desc：
 * 表格显示的字段为主要字段，扩展中显示的是附加字段及详情
 * 方便在使用case的时候，可以直接在表格上操作，减去进入详情的步骤
 * 
 */
export const expandedRowRender = (record) => {
  const caseDescElement = caseDescFormat(record.caseDesc);

  const styleTitle = { textAlign: 'right', border: '1px dotted #ccc', borderRight: 'none', borderLeft: 'none', padding: '10px', lineHeight: '1.5' };
  const styleContent = { border: '1px dotted #ccc', borderLeft: 'none', borderRight: 'none', padding: '10px', lineHeight: '1.5' };
  const styleDetail = { textAlign: 'right', padding: '0 10px 10px 10px' };
  const styleDetailCont = { textAlign: 'right', padding: '10px' };
  return <div>
    <Row>
      <Col style={styleTitle} span={2}>小区：</Col>
      <Col style={styleContent} span={3}>{record.community ? record.community : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>业主姓名：</Col>
      <Col style={styleContent} span={3}>{record.ownerName ? record.ownerName : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>单元：</Col>
      <Col style={styleContent} span={3}>{record.unit ? record.unit : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>实收金额：</Col>
      <Col style={styleContent} span={3}>{record.recoveredAmount ? record.recoveredAmount : '暂无数据'}</Col>
    </Row>
    <Row>
      <Col style={styleTitle} span={2}>楼栋：</Col>
      <Col style={styleContent} span={3}>{record.building ? record.building : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>欠费月数：</Col>
      <Col style={styleContent} span={3}>{record.arrearsMonth ? record.arrearsMonth : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>房号：</Col>
      <Col style={styleContent} span={3}>{record.room ? record.room : '暂无数据'}</Col>
      <Col style={styleTitle} span={2}>业主电话：</Col>
      <Col style={styleContent} span={3}>{record.ownerPhone ? record.ownerPhone : '暂无数据'}</Col>
    </Row>
    <Row>
      <Col style={styleTitle} span={2}>收费方式：</Col>
      <Col style={styleContent} span={2}>{record.chargeWay ? record.chargeWay : '暂无数据'}</Col>
      <Col style={styleTitle} span={3}>实收历史欠费金额：</Col>
      <Col style={styleContent} span={13}>{record.arrearsAmount ? record.arrearsAmount : '暂无数据'}</Col>
    </Row>
    <br />
    <Row>
      <Col style={styleDetail} span={2}>详情：</Col>
      <Col style={styleDetailCont} span={7} style={{ whiteSpace: 'pre-line' }}>{caseDescElement ? caseDescElement : '暂无数据'}</Col>
    </Row>
  </div>
};

/**
 * case管理表格字段配置
 */
export function caseManageTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo',
    }, {
      title: '标题',
      render: (text, record, index) => <div className="yincang" style={{ width: '300' }}>{record.caseTitle}</div>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      filters: [
        {
          text: '非常高',
          value: '1',
        },
        {
          text: '高',
          value: '2',
        },
        {
          text: '中',
          value: '3',
        },
        {
          text: '低',
          value: '4',
        }
      ],
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    }
    , {
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '执行人',
      render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
      key: 'executorUser'
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      filters: operation.typeList
      // filterMultiple: false
    }, {
      title: '状态',
      render: function(text, record, index) {
        return formatStatus(record.status);
      },
      key: 'status',
    }, {
      title: '催费金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    }, {
      title: '关注人',
      render: (text, record, index) => <div className="yincang" style={{ width: '400' }}>{record.focusList}</div>,
      key: 'focusUser'
    }, {
      title: '管理',
      key: 'operation',
      fixed: 'right',
      render: (record) => <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
    }];
}

/**
 * case排名表格字段配置
 */
export function caseRankTableHead(operation) {
  return [
    {
      title: '排名',
      dataIndex: 'rownum'
    },
    {
      title: '员工姓名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '排名类型',
      render: (text, record, index) => {
        switch (record.rankType) {
          case 'remain':
            return (<div>剩余任务</div>);
          case 'create':
            return (<div>发起任务</div>);
          case 'finish':
            return (<div>完成任务</div>);
          case 'confirmfinish':
            return (<div>确认完成任务</div>);
          case 'close':
            return (<div>关闭任务</div>);
        }
      },
      key: 'rankType'
    },
    {
      title: '任务数量',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      sorter: true
    },
    {
      title: '日期',
      dataIndex: 'rankTime',
      key: 'rankTime'
    }];
}


/**
 * 我的关注表格字段配置
 */
export function myFocusTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo',
    }, {
      title: '标题',
      render: (text, record, index) => <div className="yincang" style={{ width: '300' }}>{record.caseTitle}</div>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      filters: [
        {
          text: '非常高',
          value: '1',
        },
        {
          text: '高',
          value: '2',
        },
        {
          text: '中',
          value: '3',
        },
        {
          text: '低',
          value: '4',
        }
      ],
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    }
    , {
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '执行人',
      render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
      key: 'executorUser'
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      filters: operation.typeList
      // filterMultiple: false
    }, {
      title: '状态',
      render: (text, record, index) => {
        return formatStatus(record.status);
      },
      key: 'status',
    }, {
      title: '催费金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    }, {
      title: '关注人',
      render: (text, record, index) => <div className="yincang" style={{ width: '400' }}>{record.focusList}</div>,
      key: 'focusUser'
    }, {
      title: '管理',
      key: 'operation',
      fixed: 'right',

      render: (record) => {
        return (
          <span>
            <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
          </span>)
      }
    }];
}


/**
 * 我的任务表格字段配置
 */
export function myTaskTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo'
    }, {
      title: '标题',
      render: (text, record, index) => <div className="yincang" style={{ width: '300' }}>{record.caseTitle}</div>
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      filters: [
        {
          text: '非常高',
          value: '1',
        },
        {
          text: '高',
          value: '2',
        },
        {
          text: '中',
          value: '3',
        },
        {
          text: '低',
          value: '4',
        }
      ],
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    }
    , {
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '执行人',
      render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
      key: 'executorUser'
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      // filterMultiple: false,
      filters: operation.typeList
    }, {
      title: '状态',
      render: (text, record, index) => {
        return formatStatus(record.status);
      },
      key: 'status'
    }, {
      title: '催费金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    }, {
      title: '关注人',
      render: (text, record, index) => <div className="yincang" style={{ width: '400' }}>{record.focusList}</div>,
      key: 'focusUser'
    }, {
      title: '管理',
      key: 'operation',
      fixed: 'right',

      render: (record) => {
        let successDom;
        const finishtext = '确定要完成这个任务吗？';
        if (record.status != 2 && record.status != 3 && record.status != 4) {

          successDom = <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title={finishtext} onConfirm={() => { operation.finishCase(record.id) } }>
              <a>完成</a>
            </Popconfirm>
          </span>;
        }
        return (
          <span>
            <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
            {successDom}
          </span>);
      }
    }];
}


/**
 * 我的case表格字段配置
 */
export function myCaseTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo',
    },
    {
      title: '标题',
      render: (text, record, index) => <div className="yincang" style={{ width: '300' }}>{record.caseTitle}</div>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      filters: [
        {
          text: '非常高',
          value: '1',
        },
        {
          text: '高',
          value: '2',
        },
        {
          text: '中',
          value: '3',
        },
        {
          text: '低',
          value: '4',
        }
      ],
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    },
    {
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '执行人',
      render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
      key: 'executorUser'
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      filters: operation.typeList
      // filterMultiple: false
    }, {
      title: '状态',
      render: (text, record, index) => {
        return formatStatus(record.status);
      },
      key: 'status',
    }, {
      title: '催费金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    }, {
      title: '关注人',
      render: (text, record, index) => <div className="yincang" style={{ width: '400' }}>{record.focusList}</div>,
      key: 'focusUser'
    }, {
      title: '管理',
      key: 'operation',
      fixed: 'right',

      render: (record) => {
        let ConfirmDom, CloseDom;
        const confirmFinishtext = '确定要完成这个任务吗？';
        const closetext = '确定要关闭这个任务吗？';
        if (record.status == 2) { // 已完成状态下才能操作确认完成
          ConfirmDom = <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title={confirmFinishtext} onConfirm={() => { operation.confirmFinishCase(record.id) } }>
              <a>确认完成</a>
            </Popconfirm>
          </span>

          // ConfirmDom = ConfirmFinisModal;
        }
        if (record.status != 3 && record.status != 4) {
          CloseDom = <span>
            <span className="ant-divider"></span>
            <Popconfirm placement="top" title={closetext} onConfirm={() => { operation.closeCase(record.id) } }>
              <a>关闭</a>
            </Popconfirm>
          </span>
          // CloseDom = CloseModal;
        }
        return (
          <span>
            <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
            { ConfirmDom }
            { CloseDom }
          </span>)

        // return (
        //   <span>
        //     <Link to={{pathname:"case_detail/" + record.id}}>详情</Link>
        //     {record.status != 3 && record.status != 4? <CloseModal confirmFinishCase={(close_message)=>{operation.confirmFinishCase(record.id, close_message)}}/> : ''}
        //     {record.status == 2? <ConfirmFinisModal /> : ''}
        //   </span>)
      }
    }];
}

/**
 * case分组表格字段配置
 */
export function caseGroupTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo',
    }, {
      title: '标题',
      render: (text, record, index) => <div className="yincang" style={{ width: '300' }}>{record.caseTitle}</div>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      filters: [
        {
          text: '非常高',
          value: '1',
        },
        {
          text: '高',
          value: '2',
        },
        {
          text: '中',
          value: '3',
        },
        {
          text: '低',
          value: '4',
        }
      ],
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    }
    , {
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser'
    }, {
      title: '发起时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '执行人',
      render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
      key: 'executorUser'
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      filters: operation.typeList
      // filterMultiple: false
    }, {
      title: '状态',
      render: function(text, record, index) {
        return formatStatus(record.status);
      },
      key: 'status',
    }, {
      title: '催费金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true
    }, {
      title: '关注人',
      render: (text, record, index) => <div className="yincang" style={{ width: '400' }}>{record.focusList}</div>,
      key: 'focusUser'
    }, {
      title: '管理',
      key: 'operation',
      fixed: 'right',
      render: (record) => <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
    }];
}

/**
 * 关联case 表格配置
 */
export function relatedCaseTableHead(operation) {
  return [
    {
      title: '工单号',
      dataIndex: 'caseNo',
      key: 'caseNo',
      render: (text) => <a href="#">{text}</a>,
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
    }, {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text, record, index) => {
        return formatPriority(record.priority);
      }
    }, {
      title: '状态',
      render: function(text, record, index) {
        return formatStatus(record.status);
      },
      key: 'status',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        
        const closetext = '确定删除该关联分组？';
        
        return (
          <span>
            <Link to={{ pathname: "case_detail/" + record.id }}>详情</Link>
            <span className="ant-divider"></span>
            
            <span>
              <span className="ant-divider"></span>
              <Popconfirm placement="top" title={closetext} onConfirm={() => { operation.delRelatedCase(record.id) } }>
                <a>删除</a>
              </Popconfirm>
            </span>
            
          </span>
        )
      },
    }];
}

function formatPriority(priority) {
  switch (priority) {
    case '1':
      return (<div><span className="case-state state-error"></span>非常高</div>);
    case '2':
      return (<div><span className="case-state state-emergency"></span>高</div>);
    case '3':
      return (<div><span className="case-state state-ongoing"></span>中</div>);
    case '4':
      return (<div><span className="case-state state-close"></span>低</div>);
      
    default:
      return '暂无数据'
  }
}

function formatStatus(status) {
  switch (status) {
    case '1':
      return (<div><span className="case-state state-error"></span>进行中</div>);
    case '2':
      return (<div><span className="case-state state-success"></span>已完成</div>);
    case '3':
      return (<div><span className="case-state state-close"></span>确认完成</div>);
    case '4':
      return (<div><span className="case-state state-close"></span>已关闭</div>);
  }
}