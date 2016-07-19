import React, { PropTypes } from 'react';
import { Input, Button, Icon, Form, message } from 'antd';
import touxiang from './touxiang.png';
const FormItem = Form.Item;

let Comment = React.createClass({
  propTypes: {
    commentList: React.PropTypes.array,
    subComment: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      commentList: [],
    };
  },
  
  getInitialState: function() {
    return {
      comment: ''
    };
  },
  
  handleChange: function(e) {
    this.setState({
      comment: e.target.value
    });
  },

  subComment(event, callback) {
      const { comment } = this.state;
      if (!comment) {
        message.error('请输入评论内容');
        return;
      }
      // 执行回调
      callback(comment)
      
      this.setState({comment: ''})
  },

  render() {
    const { commentList, subComment } = this.props;
    const { comment } = this.state;
    const getFieldProps = this.props.form.getFieldProps;

    const commentElem = commentList.length > 0 ?
      commentList.map((item) => {
        return (
          <div style={{ border: '1px solid #e9e9e9', marginBottom: '8px' }}>
            <div style={{ float: 'left', padding: '10px' }}>
              <img src={touxiang} style={{ width: '108' }} />
            </div>
            <div style={{ padding: '10px 140px 10px 140px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span>{item.createUser}</span>
                <span style={{ float: 'right' }}>{item.createTime}</span>
              </div>
              <div>{item.comment}</div>
              <div style={{ marginTop: '58px' }}>
                <a style={{ marginRight: '20px' }}><Icon type="like" /> 赞 {item.likes}</a>
                <a><Icon type="dislike" /> 踩 {item.booings}</a>
                <Button style={{ float: 'right' }}  size="small">打赏</Button>
              </div>
            </div>
          </div>
        )
      }) : "暂无数据";

    return (
      <Form horizontal form={this.props.form}>
      
        <h3 style={{ marginBottom: '4' }} >评论：</h3>
        
        <FormItem hasFeedback >
          <Input
            value={comment}
            onChange={this.handleChange}
            type="textarea"
            style={{ height: 150 }}
            placeholder="请输入评论内容"
            />
        </FormItem>
        
        <Button
          style={{ marginBottom: '10px' }}
          type="primary" 
          onClick={(event) => { this.subComment(event, subComment) } }>
          发表评论
        </Button>
        
        {commentElem}

      </Form>
    );
  }
})

Comment = Form.create()(Comment);

export default Comment;