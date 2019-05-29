import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

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
        openKeys: ['1'],
        leftFlag: true,
        leftList: [],
        rootSubmenuKeys: [],
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
        this.setState({
            leftList: meList,
            rootSubmenuKeys: [...Array(meList.length).keys()]
        })
    }


    // rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    rootSubmenuKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];



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




    // 切换左边菜单栏
    toggleSiderMenu = () => {
        this.setState({
            leftFlag: !this.state.leftFlag
        })
    }



    render() {
        const { leftFlag, leftList } = this.state;
        const MenList = leftList.length && leftList.map((item, index) => {
            return item.children ?
                <SubMenu
                    key={index}
                    className='first-li'
                    title={
                        <span>
                            <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.menuIcon }}></i>
                            &nbsp;
                            <span>{item.menuName}</span>
                        </span>
                    }
                >
                    {
                        item.children.map((twoItem, twoIndex) => {
                            if (twoItem.children) {
                                return <SubMenu
                                    key={index + '-' + twoIndex}
                                    className='two-li'
                                    title={
                                        <span>
                                            <span>{twoItem.menuName}</span>
                                        </span>
                                    }
                                >
                                    {
                                        twoItem.children && twoItem.children.map((threeItem, threeIndex) => {

                                            return <Menu.Item className='three-li' key={index + '-' + twoIndex + '-' + threeIndex}>{threeItem.menuName}</Menu.Item>

                                        })
                                    }
                                </SubMenu>
                            } else {
                                return <Menu.Item className='two-li' key={index + '-' + twoIndex}>
                                {twoItem.menuName}
                                </Menu.Item>
                            }
                        })
                    }
                </SubMenu> :
                <Menu.Item key={index} className='first-li'>
                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.menuIcon }}></i>
                    &nbsp;
                    {item.menuName}
                </Menu.Item>
        })



        
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff' }} >
                    <span className="logo">
                        156464641
                    </span>
                    <Button type="" onClick={this.toggleSiderMenu}>
                        <i className="iconfont">&#xe602;</i>
                    </Button>
                </Header>

                <Sider
                    style={{
                        overflow: 'auto',
                        height: '93vh',
                        position: 'fixed',
                        background: '#fff',
                        left: leftFlag ? 0 : -200,
                        top: 65,
                    }}
                >
                    <Menu theme="" mode="inline"
                        defaultSelectedKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        openKeys={this.state.openKeys}
                    >
                        {MenList}
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: leftFlag ? 200 : 0 }}>

                    <Content style={{ margin: '65px 0 0 8px', overflow: 'initial' }}>
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
