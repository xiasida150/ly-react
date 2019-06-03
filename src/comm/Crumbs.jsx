import React, { Component } from 'react'
import { Breadcrumb, Alert } from 'antd';



let backAndTextColor = {
    paddingLeft: '5px',
    borderLeft: '5px solid #05C2DF',
    margin: '0 0 14px',
};

export default class Crumbs extends Component {
    render() {
        const TextArr = this.props.textArr;
        return (
            <Breadcrumb separator=">" style={backAndTextColor}>
                {
                    TextArr.map((i) => <Breadcrumb.Item key={i}>{i}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        )
    }
}
