import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button, Row, Col } from 'antd';
import classNames from 'classnames';

import * as myFocusAction from '../../store/modules/myFocus/my_focus_action';

import './index.less'
import * as Util from '../../util';

const InputGroup = Input.Group;

class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.caseNoInputChange = this.caseNoInputChange.bind(this);
    this.keywordInputChange = this.keywordInputChange.bind(this);
  }

  /**
   * 修改员工号 
   * 
   * @param {any} e
   */
  caseNoInputChange(e) {
    this.props.myFocusAction.updMyFocusStateValue({ caseNo: e.target.value }); // TODO
  }

  /**
   * 修改关键字 
   * 
   * @param {any} e
   */
  keywordInputChange(e) {
    this.props.myFocusAction.updMyFocusStateValue({ keyword_value: e.target.value });
  }

  /**
   * 根据 `值` 搜索匹配的 `case` 列表
   * 
   * desc：
   * 1、获取所有搜索条件参数
   * 2、默认搜索第一页关键字
   * 3、进行 `case` 搜索
   * 
   * @param {any} e
   */
  onSearch(e) {
    e.preventDefault();
    let { reqParams } = this.props;
    reqParams.pageId = 1;
    reqParams.recPerPage = this.props.pager.recPerPage;

    this.props.myFocusAction.getMyFocusList(reqParams);
  }

  /**
   * 清楚搜索内容
   * 
   * @param {any} e
   */
  clearSearch(e) {
    e.preventDefault();
    this.props.myFocusAction.clearMyFocusSearch(this.props.reqParams);
  }
  render() {
    const { caseNo, keyword_value } = this.props;
    // 工单号搜索框配置
    const caseNoParam = {
      size: "default",
      value: caseNo,
      onChange: this.caseNoInputChange,
      onPressEnter: this.onSearch,
      placeholder: "按工单号搜索"
    };
    // 关键字搜索框配置
    const keywordParam = {
      size: "default",
      value: keyword_value,
      onChange: this.keywordInputChange,
      onPressEnter: this.onSearch,
      placeholder: "按关键字搜索"
    };

    return (

      <div className="gutter-example" style={{ marginBottom: '16', position: 'relative' }}>
        <div className="">
          <Row gutter={16}>
            <Col span="4">
              <Input
                { ...caseNoParam } />
            </Col>

            <Col span="6">
              <Input
                { ...keywordParam } />
            </Col>
            <Col span="12">
              <Button type="primary" onClick={this.onSearch} style={{ marginRight: '10px' }}>搜索</Button>
              <Button onClick={this.clearSearch}>清除条件</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return {
    keyword_value: state.myFocus.keyword_value,
    caseNo: state.myFocus.caseNo,
    reqParams: Util.myFocusParamsFromat(state),
    pager: state.myFocus.pager
  }
}

function mapDispatchToProps(dispatch) {
  return {
    myFocusAction: bindActionCreators(myFocusAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
