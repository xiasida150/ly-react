import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import { BrowserRouter, Route, Switch, exact, Redirect, Link } from 'react-router-dom';
import { getMenuLists } from "./api.js";
import { mergeMenu } from "@/util/tool";
import { routes } from '@/pages/Layout/routers';


import './index.less';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Index extends Component {


    state = {
        collapsed: false,
        openKeys: ['sub1'],
    };


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };




    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    async componentWillMount() {
        let menulists = await getMenuLists();
        let menulist = menulists.filter(item => item.menuType === 1);
        let meList = mergeMenu(menulist, 'menuPid')
        console.log('meList --> ', meList)
        this.setState({
            leftList: meList
        })
    }


    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];



    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };



    render() {
        const { collapsed } = this.state;

        return (

            <Layout>

               
               
               
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%',background:'#fff' }} />


                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        background:'#fff',
                        left: 0,
                        top: 65,
                    }}
                >
                    <Menu theme="" mode="inline" 
                        defaultSelectedKeys={['4']}
                        onOpenChange={this.onOpenChange}
                        openKeys={this.state.openKeys}
                        >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>Navigation One</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>Navigation Two</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>Navigation Three</span>
                                </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>

                    <Content style={{ margin: '65px 0 0 16px', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            ...
          <br />
                            Really
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            long
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            ...
          <br />
                            content
        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
