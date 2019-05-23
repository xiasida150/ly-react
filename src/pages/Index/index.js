import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

import { BrowserRouter, Route, Switch, exact, Redirect, Link } from 'react-router-dom';
import { getMenuLists } from "./api.js";
import { mergeMenu } from "@/util/tool";
import { routes } from '@/pages/Layout/routers';


import './index.less';

const { Header, Sider, Content, } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leftList: [],
            openKeys: ['sub1'],
            collapsed: false,
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

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


    changeLeftPos() {
        const { leftWidth } = this.state.indexTop;
        const width = leftWidth === 200 ? 0 : 200;
        this.setState({
            indexTop: {
                leftWidth: width
            }
        })
    }



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
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div className="logo" >

                    </div>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />

                </Header>
                <Layout>
                    <Sider trigger={null} 
                        collapsible 
                        collapsed={this.state.collapsed} 
                        onCollapse={this.onCollapse} >

                        <Menu
                            mode="inline" 
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop" />
                                <span>Option 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="inbox" />
                                <span>Option 3</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
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
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="11">Option 11</Menu.Item>
                                    <Menu.Item key="12">Option 12</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>

                    </Sider>
                    <Content>Content</Content>
                </Layout>
            </Layout>










        )
    }
}
