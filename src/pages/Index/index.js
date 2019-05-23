import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import { BrowserRouter, Route, Switch, exact, Redirect, Link, withRouter } from 'react-router-dom';
import { getMenuLists } from "./api.js";
import { mergeMenu } from "@/util/tool";
import { routes } from '@/pages/Layout/routers';
import './index.less';


const { Header, Sider, Content } = Layout;


class Index extends Component {
    constructor(props) {
        super(props)


        this.state = {
            collapsed: false,
        }

    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    async componentWillMount() {
        let menulists = await getMenuLists();
        let menulist = menulists.filter(item => item.menuType === 1);
        let meList = mergeMenu(menulist, 'menuPid')
        this.setState({
            leftList: meList
        })
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };





    render() {
        const { leftWidth } = this.state.indexTop;
        const { leftList, Active, Openeds } = this.state;


        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        Content
              </Content>
                </Layout>
            </Layout>
        )
    }
}


export default withRouter(Index)