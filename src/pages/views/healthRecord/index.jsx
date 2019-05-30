import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';

class HealthRecord extends Component {
    render() {
        const { location } = this.props;
        console.log('this.props --> ', this.props)
        console.log('location --> ', location)

        const pathSnippets = location.pathname.split('/').filter(i => i);
        return (
            <div>



                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>


                居民健康档案
            </div>
        )
    }
}



export default withRouter(HealthRecord)