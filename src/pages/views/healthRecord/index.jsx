import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Radio, Select, DatePicker } from 'antd';
import moment from 'moment';
import Crumbs from '@/comm/Crumbs.jsx';
import Population from "./../../../comm/Population.jsx";
import './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class HealthRecord extends Component {



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const cct = values['CreateTime'] || [new Date(), new Date()];
                console.log('cct =>', cct)
                const edt = values['EditTime'] || [new Date(), new Date()];
                const [startCreateTime, endCreateTime] = [cct[0].format('YYYY-MM-DD'), cct[1].format('YYYY-MM-DD')];
                const [startEditTime, endEditTime] = [edt[0].format('YYYY-MM-DD'), edt[1].format('YYYY-MM-DD')];

                const val = {
                    ...values,
                    startCreateTime,
                    endCreateTime,
                    startEditTime,
                    endEditTime,
                }

                console.log('Received values of form: ', val);
            }
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };

    CreateTimeOnChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    EditTimeOnChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }


    render() {
        const { crumbsText } = this.props.location.state || {};
        const pathSnippets = (crumbsText || ',').split(',')
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return (
            <Fragment>
                <Crumbs textArr={pathSnippets} />


                <Form onSubmit={this.handleSubmit}>
                    <Form.Item className='list-form-item'>
                        <Form.Item className='sea-from-input-item'>
                            {getFieldDecorator('personalInput', {})
                                (
                                    <Input
                                        placeholder="请输入姓名/身份证/电话/现住址"
                                    />,
                                )}
                        </Form.Item>
                        <Form.Item className='sea-from-input-item'>
                            {getFieldDecorator('recordInput', {})
                                (
                                    <Input
                                        placeholder="请输入建档单位/建档人/责任医生"
                                    />,
                                )}
                        </Form.Item>

                        <Form.Item style={{ display: 'inline-block', }}>
                            <Button type="primary"
                                icon="search"
                                className='sea-btn'
                                htmlType="submit" >
                                搜索
                            </Button>
                            &nbsp;
                            <Button type="button" className='btn-blue' htmlType="button" onClick={this.handleReset} >
                                清除条件
                            </Button >
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className='label-tit list-form-item' label='人群类型'>
                        {getFieldDecorator('populationClassVal', {
                            initialValue: []
                        }
                        )(
                            <Population />,
                        )}
                    </Form.Item>

                    <Form.Item className='label-tit list-form-item' label='性别'>
                        {getFieldDecorator('sex', {
                            initialValue: ""
                        }
                        )(
                            <Radio.Group >
                                <Radio key='不限' value='' >不限</Radio>
                                <Radio key='男' value='1'>男</Radio>
                                <Radio key='女' value='2'>女</Radio>
                                <Radio key='未知' value='0'>未知</Radio>
                                <Radio key='未说明' value='9'>未说明</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item className='label-tit list-form-item' label='年龄'>
                        {getFieldDecorator('age', {
                            initialValue: ""
                        }
                        )(
                            <Radio.Group >
                                <Radio key='不限' value='' >不限</Radio>
                                <Radio key='0-3' value='1'>0-3</Radio>
                                <Radio key='4-6' value='2'>4-6</Radio>
                                <Radio key='7-17' value='3'>7-17</Radio>
                                <Radio key='18-59' value='4'>18-59</Radio>
                                <Radio key='60-64' value='5'>60-64</Radio>
                                <Radio key='65以上' value='6'>65以上</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item className='list-form-item'>

                        <Form.Item className='label-tit list-form-item ' style={{ display: 'inline-block' }} label='是否签约'>
                            {getFieldDecorator('isContract', {
                                initialValue: ""
                            }
                            )(
                                <Select >
                                    <Option value="">不限</Option>
                                    <Option value="0">未签约</Option>
                                    <Option value="1">已签约</Option>
                                </Select>
                          ,
                            )}
                        </Form.Item>
                        <Form.Item className='label-tit list-form-item ' style={{ display: 'inline-block' }} label='是否有家庭档案'>
                            {getFieldDecorator('hasFamily', {
                                initialValue: ""
                            }
                            )(
                                <Select >
                                    <Option value="">不限</Option>
                                    <Option value="0">是</Option>
                                    <Option value="1">否</Option>
                                </Select>
                          ,
                            )}
                        </Form.Item>
                        <Form.Item className='label-tit list-form-item ' style={{ display: 'inline-block' }} label='重复建档'>
                            {getFieldDecorator('repeat', {
                                initialValue: ""
                            }
                            )(
                                <Select >
                                    <Option value="">不限</Option>
                                    <Option value="0">是</Option>
                                    <Option value="1">否</Option>
                                </Select>
                          ,
                            )}
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className='list-form-item'>

                        <Form.Item className='label-tit list-form-item ' style={{ display: 'inline-block' }} label='建档时间'>
                            {getFieldDecorator('CreateTime', {}
                            )(
                                <RangePicker />,
                            )}
                        </Form.Item>
                        <Form.Item className='label-tit list-form-item ' style={{ display: 'inline-block' }} label='更新时间'>
                            {getFieldDecorator('EditTime', {}
                            )(
                                <RangePicker />,
                            )}
                        </Form.Item>

                    </Form.Item>

                </Form>

            </Fragment>
        )
    }
}



export default withRouter(Form.create()(HealthRecord))