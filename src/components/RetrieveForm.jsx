import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let RForm = React.createClass({
    render: function() {
        const self = this;
        const RType = this.props.RType;
        return RType ?
                (<div className="f-search">
                    <Form inline>
                        { 
                            RType.map(function(item){
                                return self.dealConfigRType(item);
                            })
                        }
                        <FormItem key="search-btn">
                            <Button type="primary" onClick={this.handleRetrieve}>查询</Button>
                        </FormItem>
                    </Form>
                </div>):
                <div></div>;
    },

    dealConfigRType: function(item){
        const { getFieldProps } = this.props.form;

        switch (item.type){
            case 'string':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Input placeholder={item.placeholder||''}
                            {...getFieldProps(item.name)} />    
                        </FormItem>
                break;

            case 'date':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name)} />  
                        </FormItem>
                break;

            case 'select':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Select  {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })} >
                                {
                                    item.options.map(function(item){
                                        return <Option key={item.value} value={item.value}>{item.text}</Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                break;

            case 'radio':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <RadioGroup {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })}>
                                {
                                    item.options.map(function(item){
                                        return <Radio key={item.value} value={item.value}>{item.text}</Radio>
                                    })
                                }
                            </RadioGroup>
                        </FormItem>
                break;

            case 'switch':
                return <FormItem
                            label={item.label}
                            key={item.name}>
                            <Switch {...getFieldProps(item.name, { initialValue: item.defaultValue|| false })} />
                        </FormItem>
                break;

            default:
                return '';
                break;
        }
    },

    handleRetrieve: function(){

        console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.submit(this.props.form.getFieldsValue());
    }
});
RForm = Form.create()(RForm);

export default RForm;
