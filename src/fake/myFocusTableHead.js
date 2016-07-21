import React from 'react'
import { Link } from 'react-router'

module.exports = [
  {
    title: '工号',
    dataIndex: 'caseNo',
  }, {
    title: '标题',
    render: (text, record, index) => <div className="yincang" style={{width: '300'}}>{record.caseTitle}</div>,
  },{ 
    title: '发起人', 
    dataIndex: 'createUser', 
    key: 'createUser'
  },{ 
    title: '发起时间', 
    dataIndex: 'createTime', 
    key: 'createTime', 
    sorter: true 
  },{ 
    title: '执行人', 
    render: (text, record, index) => record.executorList[0] && record.executorList[0].userName,
    key: 'executorUser'
  },{ 
    title: '类型', 
    dataIndex: 'caseTypeName', 
    key: 'caseTypeName' , 
    filters: [
      { text: '管理', value: 'manage' },
      { text: '信息', value: 'info' },
      { text: '数据', value: 'data' },
      { text: '间接', value: 'indirect' },
      { text: '派单', value: 'dispatch' },
      { text: 'Bug信息', value: 'bug' }],
    // filterMultiple: false
  },{ 
    title: '状态',
    render: function(text, record, index){
      switch (record.status) {
        case '1':
          return (<div><span className="case-state state-error"></span>进行中</div>);
        case '2':
          return (<div><span className="case-state state-success"></span>已完成</div>);
        case '3':
          return (<div><span className="case-state state-close"></span>确认完成</div>);
        case '4':
          return (<div><span className="case-state state-close"></span>已关闭</div>);
      }
    }, 
    key: 'status',
  },{ 
    title: '催费金额',
    dataIndex: 'amount', 
    key: 'amount', 
    sorter: true 
  },{ 
    title: '关注人',
    render: (text, record, index) => <div className="yincang" style={{width: '400'}}>{record.focusList}</div>,
    key: 'focusUser'
  },{
    title: '管理',
    key: 'operation',
    fixed: 'right',
    render: (record) => <Link to={{pathname:"case_detail/" + record.id}}>详情</Link>
  }
]