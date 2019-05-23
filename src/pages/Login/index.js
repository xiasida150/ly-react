/*global localStore*/
import React, { Component } from 'react';
import { getRsakey, login } from './login-api.js';
import { aesEdd, getAesKey, rsaAdd } from '@/util/DES';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Card, Row, Col } from 'antd';
import './login.less';


const aesKeyOnce = `VyfQhURd6CrpnDI9`;
const aesIvOnce = `tlBIcm4HU4xGO20H`;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                u: '15680055860',
                p: 'ly123456',
                l: 'account',
                t: 'web',
                k: getAesKey(),
            }
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeU = this.onChangeU.bind(this)
        this.onChangeP = this.onChangeP.bind(this)
        this.onChangeK = this.onChangeK.bind(this)

    }


    async componentWillMount() {
        let result = await getRsakey();
        let data = (result.data.replace(/[\r\n]/g, '')).trim();
        let rsak = JSON.parse(aesEdd(data, aesKeyOnce, aesIvOnce));
        localStore.set('rsak', rsak.rsa)
    }

    async onSubmit(e) {
        e.preventDefault();
        let data = this.state.form
        let addData = rsaAdd(JSON.stringify(data), localStore.get('rsak'))
        let res = await login(addData)

        let { k } = data;
        let aeskey = k.slice(0, 16);
        let iv = k.slice(16, 32);
        if (res.code === 200) {
            let trimdata = (res.data.replace(/[\r\n]/g, '')).trim();
            let eddData = JSON.parse(aesEdd(trimdata, aeskey, iv));
            localStore.set('token', res.token);
            localStore.set('user', JSON.stringify(eddData.user))
            localStore.set('userInfo', JSON.stringify(eddData.userInfo))
            this.props.history.push({
                pathname: '/select-hospital',
            })
        }
    }



    onChangeU(e) {
        this.setState({
            form: {
                u: e.target.value
            }
        })
    }
    onChangeP(e) {
        this.setState({
            form: {
                p: e.target.value
            }
        })
    }
    onChangeK(e) {
        this.setState({
            form: {
                k: e.target.value
            }
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={8}></Col>
                    <Col span={4}>
                        <Card title="登录" bordered={false} style={{ width: 300, textAlign: "center" }}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Item label="用户名">
                                    {
                                        getFieldDecorator('u', {
                                            rules: [{ required: true, message: '请输入手机号' }],
                                            initialValue: this.state.form.u
                                        })(
                                            <Input placeholder="请输入手机号" onChange={this.onChangeU} />
                                        )
                                    }

                                </Form.Item>
                                <Form.Item label="密码">
                                    {
                                        getFieldDecorator('p', {
                                            rules: [{ required: true, message: '请输入密码' }],
                                            initialValue: this.state.form.p
                                        })(
                                            <Input placeholder="请输入密码" onChange={this.onChangeP} />
                                        )
                                    }
                                </Form.Item>

                                <Form.Item>

                                    {
                                        getFieldDecorator('k', {
                                            initialValue: this.state.form.k
                                        })(
                                            <Input readOnly onChange={this.onChangeK} />
                                        )
                                    }
                                </Form.Item>

                                <Form.Item className='loginBtn'>
                                    <Button type="primary" htmlType="submit">登录</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={4}></Col>
                </Row>

            </React.Fragment>
        )
    }
}


export default withRouter(Form.create()(Login))
