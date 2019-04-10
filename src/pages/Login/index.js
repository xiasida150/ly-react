import React, { Component } from 'react';
import { getRsakey, login } from './login-api.js';
import { aesEdd, getAesKey, rsaAdd } from '@/util/DES';
import { Card, Form, Input, Select, Layout,  Button, } from 'element-react';
import store from 'store';
import './login.less';


const aesKeyOnce = `VyfQhURd6CrpnDI9`;
const aesIvOnce = `tlBIcm4HU4xGO20H`;

export default class Login extends Component {

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
    }


    async componentWillMount() {
        let result = await getRsakey();
        let data = (result.data.replace(/[\r\n]/g, '')).trim();
        let rsak = JSON.parse(aesEdd(data, aesKeyOnce, aesIvOnce));
        store.set('rsak', rsak.rsa)
    }

    async onSubmit(e) {
        e.preventDefault();
        let data = Object.assign({}, { ...this.state.form }) 
        let addData = rsaAdd(JSON.stringify(data), store.get('rsak'))
        let res = await login(addData)

        let { k } = this.state.form;
        let aeskey = k.slice(0, 16);
        let iv = k.slice(16, 32);
        if(res.code === 200){
            let trimdata = (res.data.replace(/[\r\n]/g, '')).trim();
            let eddData = JSON.parse(aesEdd(trimdata, aeskey, iv));
            store.set('token', res.token);
            store.set('user',JSON.stringify(eddData.user))
            store.set('userInfo',JSON.stringify(eddData.userInfo))
        }
    }eddData

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }


    render() {
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
                <Layout.Row gutter="20">
                    <Layout.Col span="5" offset="12">
                        <Card className="box-card">

                            <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="用户名">
                                    <Input value={this.state.form.u} onChange={this.onChange.bind(this, 'u')}></Input>
                                </Form.Item>
                                <Form.Item label="密码">
                                    <Input value={this.state.form.p} onChange={this.onChange.bind(this, 'p')}></Input>
                                    <Input value={this.state.form.k} ></Input>
                                </Form.Item>

                                <Form.Item className='loginBtn'>
                                    <Button type="primary" nativeType="submit">登录</Button>
                                </Form.Item>
                            </Form>
                        </Card>

                    </Layout.Col>
                </Layout.Row>

            </React.Fragment>
        )
    }
}
