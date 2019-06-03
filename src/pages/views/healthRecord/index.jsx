import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import Crumbs from '@/comm/Crumbs.jsx';
import './style.less';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class HealthRecord extends Component {



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };


    render() {
        const { crumbsText } = this.props.location.state;
        const pathSnippets = (crumbsText || '').split(',')
        const { getFieldDecorator, getFieldsError} = this.props.form;

        return (
            <Fragment>
                <Crumbs textArr={pathSnippets} />


                <Form layout="inline" onSubmit={this.handleSubmit}>
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




                    <Form.Item>
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




                </Form>

            </Fragment>
        )
    }
}



export default withRouter(Form.create()(HealthRecord))