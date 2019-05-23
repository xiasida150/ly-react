/*global localStore*/
import React, { Component } from 'react';
import { aesEdd, getAesKey, rsaAdd } from '@/util/DES';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Card } from 'antd';
import { getHospitalList, getHospitalInfo } from './api.js';

const { Option } = Select;
class SelectHospital extends Component {


    constructor(props) {
        super(props);

        this.state = {
            hospital: {
                hospitalId: '',
                hosList: []
            }
        };
        this.onChange = this.onChange.bind(this)
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
        if (hospitalInfo) {
            localStore.set('doctor', JSON.stringify(hospitalInfo.doctor))
            localStore.set('hospitalInfo', JSON.stringify(hospitalInfo.hospitalInfo))
            localStore.set("hospitalId", hospitalId);
            this.props.history.push({
                pathname: '/index',
            })
        }
    }


    onChange(e) {
        this.setState({
            hospital: {
                hospitalId:e
            }
        });
    }
    render() {
        const { hosList, hospitalId } = this.state.hospital;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
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
                            <Form  {...formItemLayout} onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="选择机构">
                                    <Select placeholder="请选择一个医院"
                                        onChange={this.onChange}
                                    >
                                    {
                                        hosList && hosList.map((val,index)=>{
                                            return <Option key={index} value={val.id}>{val.hospitalName}</Option>
                                        })
                                    }
                                    </Select>
                                </Form.Item>

                                <Form.Item className='loginBtn' style={{ marginTop: 166 }}>
                                    <Button style={{ width: '100%' }} type="primary"  htmlType="submit" >登录</Button>
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



export default withRouter(Form.create()(SelectHospital))
