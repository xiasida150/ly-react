/*global localStore*/
import React, { Component } from 'react';
import { aesEdd, getAesKey, rsaAdd } from '@/util/DES';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Select, Layout, Button, } from 'element-react';
import { getHospitalList, getHospitalInfo } from './api.js';


class SelectHospital extends Component {


    constructor(props) {
        super(props);

        this.state = {
            hospital: {
                hospitalId: '',
                hosList: []
            }
        };
    }
    async componentWillMount() {
        let list = await getHospitalList();
        this.setState({
            hospital: {
                hosList: list
            }
        })
    }



    async onSubmit(e) {
        e.preventDefault();
        const { hospitalId } = this.state.hospital;
        let hospitalInfo = hospitalId ? await getHospitalInfo({ hospitalId, type: "true" }) : '';
        if(hospitalInfo){
            localStore.set('doctor', JSON.stringify(hospitalInfo.doctor))
            localStore.set('hospitalInfo', JSON.stringify(hospitalInfo.hospitalInfo))
            localStore.set("hospitalId", hospitalId);
            this.props.history.push({
                pathname: '/',
            })
        }
    }




    onChange(key, value) {
        this.setState({
            hospital: Object.assign(this.state.hospital, { [key]: value })
        });
    }
    render() {
        const { hosList, hospitalId } = this.state.hospital;
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
                        <Card className="box-card" style={{ height: 300 }}>

                            <Form model={this.state.form} labelWidth="80" labelPosition='top' onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="选择机构">
                                    <Select value={hospitalId}
                                        placeholder="请选择一个医院"
                                        style={{ width: '100%' }}
                                        onChange={this.onChange.bind(this, 'hospitalId')}
                                    >
                                        {
                                            hosList && hosList.map((domain, index) => {
                                                return (
                                                    <Select.Option
                                                        key={index}
                                                        value={domain.id}
                                                        label={domain.hospitalName}
                                                    ></Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item className='loginBtn' style={{ marginTop: 166 }}>
                                    <Button style={{width: '100%'}} type="primary" nativeType="submit">登录</Button>
                                </Form.Item>
                            </Form>
                        </Card>

                    </Layout.Col>
                </Layout.Row>

            </React.Fragment>
        )
    }
}


export default withRouter(SelectHospital)
