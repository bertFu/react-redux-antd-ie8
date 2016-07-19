import React, { PropTypes } from 'react';
import { Input, Button, Row, Col, Table, Icon } from 'antd';
import { Link } from 'react-router';
import { relatedCaseTableHead } from '../../util/templateUtil';

const addRelatedCase = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    butText: React.PropTypes.string,
    butType: React.PropTypes.string,
    onClick: React.PropTypes.func,
    delRelatedCase: React.PropTypes.func,
    relationList: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      placeholder: '请输入',
      butText: '确认',
      butType: 'primary',
      relationList: []
    }
  },

  getInitialState: function() {
    return { workNumberValue: '' };
  },

  handleChange: function(e) {
    this.setState({ workNumberValue: e.target.value });
  },

  handleSubmit(event, callback) {
    const workNumberValue = this.state.workNumberValue;

    if (typeof (callback) == 'function') {
      callback(event, workNumberValue);
    }
  },

  render() {
    const { placeholder, onClick, butText, butType, value, relationList, delRelatedCase } = this.props;
    const { workNumberValue } = this.state;
    const inpitParams = {
      ref: 'workNumber',
      value: value || workNumberValue,
      onChange: this.handleChange,
      placeholder: placeholder
    };
    const buttonParams = {
      type: butType,
      onClick: (event) => {
        event.preventDefault();
        this.handleSubmit(event, onClick);
      }
    };

    const columns = relatedCaseTableHead({
      delRelatedCase: delRelatedCase
    });

    const loading = false;

    // 表格参数
    const tableParams = {
      columns: columns,
      className: "table",
      dataSource: relationList,
      pagination: false,
      size: "middle",
      loading: loading
    }

    return (
      <div>
        <Row gutter="16" style={{ marginBottom: '16px' }}>
          <Col span="8">
            <Input
              {...inpitParams}
              />

          </Col>
          <Col span="4">
            <Button
              {...buttonParams}
              >
              {butText}
            </Button>
          </Col>
        </Row>

        <div className='table-group'>
          <Table {...tableParams} />
        </div>

      </div>
    );
  }
})

export default addRelatedCase;


/**
 * 用于扩展添加关联case
 */

  // showModal() {
  //   this.setState({
    //     visible: true,
  //   });
  // }
  // handleOk() {
  //   this.setState({
  //     visible: false,
  //   });
  // }
  // handleCancel() {
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // <Modal title="Modal" visible={caseInfo.visible}
  // width={900}
  // style={{ top: 20 }}
  // footer=""
  //   onOk={this.handleOk} onCancel={this.handleCancel}
  //   okText="OK" cancelText="Cancel"
  // >
  //   <AddCase/>
  // </Modal>