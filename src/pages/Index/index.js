import React, { Component } from 'react';
import { Menu, Badge, Dropdown, Layout } from 'element-react';
import { BrowserRouter, Route, Switch, exact, Redirect, Link, withRouter  } from 'react-router-dom';
import { getMenuLists } from "./api.js";
import { mergeMenu } from "@/util/tool";
import { routes } from '@/pages/Layout/routers';


import './index.less';

 class Index extends Component {
    constructor(props) {
        super(props)
        this.changeLeftPos = this.changeLeftPos.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onOpen = this.onOpen.bind(this)

        this.state = {
            indexTop: {
                leftWidth: 200
            },
            leftList: [],
            defaultActive:[]
        }
    }
    onSelect() {

    }
    onOpen() {
        console.log('index --> ', this.index)
    }

    onClose() {

    }

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
    render() {
        const { leftWidth } = this.state.indexTop;
        const { leftList } = this.state;
        const listNode = leftList && leftList.map((item, i) => {
            return (
                item.children ?
                    <Menu.SubMenu
                        index={`${i + 1}`}
                        key={`${i + 1}`}
                        title={<span><i className="el-icon-message"></i>{item.menuName}</span>}
                    >
                        {
                            item.children && item.children.map((value, num) => {
                                if (value.children) {
                                    return (
                                        <Menu.SubMenu
                                            index={`${i + 1}-${num}`}
                                            key={`${num + 1}`}
                                            className="sub-me-wrap"
                                            title={<span><i className="iconfont icon-dian"></i>{value.menuName}</span>}
                                        >
                                            {
                                                value.children && value.children.map((tvalue, tnum) => {
                                                    return (
                                                        <Menu.Item
                                                            index={`${i + 1}-${num}-${tnum}`}
                                                            key={`${tnum + 1}`}
                                                            className='th-li'
                                                        >
                                                            <i className="iconfont icon-dian"></i>
                                                            <Link to={tvalue.feUrl || ''}>{tvalue.menuName}</Link>
                                                        </Menu.Item>
                                                    )
                                                })
                                            }
                                        </Menu.SubMenu>
                                    )
                                } else {
                                    return (
                                        <Menu.Item index={`${i + 1}-${num}`} key={`${num + 1}`} className='th-li'>
                                            <i className="iconfont icon-dian"></i>
                                            <Link to={value.feUrl || ''}>{value.menuName}</Link>
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                    </Menu.SubMenu> :
                    <Menu.Item index={`${i + 1}`} key={`${i + 1}`} >
                        <i className="el-icon-menu"></i>
                        <Link to={item.feUrl || ''}>{item.menuName}</Link>
                    </Menu.Item>
            )
        })
        console.log('listNode --> ', listNode)

        return (
            <div className='index-container is-vertical'>
                <div className='index-header' style={{ height: 60 }}>
                    <div className="logo">四川成都医院</div>
                    <div className="left_open">
                        <i title="展开左侧栏"
                            className="iconfont icon-gengduo"
                            onClick={this.changeLeftPos}
                        ></i>
                    </div>
                    <ul className="right-nav right" >
                        <li className="right-nav-item noafter">
                            <Badge value={12} className='num-icon'>
                                <Link to=''>公卫日志</Link>
                            </Badge>
                        </li>
                        <li className="right-nav-item noafter">
                            <Link to='' style={{ borderRight: '1px #fff solid' }}>工作计划</Link>
                        </li>
                        <li className="right-nav-item to-index noafter">
                            <Link to=''>退出</Link>
                        </li>

                        <Dropdown trigger="click" className='user-top' menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item className="clearfix">
                                    <Link to=''><i className='iconfont icon-mima'></i> 设置密码</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <span className="el-dropdown-link">
                                点我查看<i className='iconfont icon-jiantou'></i>
                            </span>
                        </Dropdown>
                    </ul>
                </div>
                <div className='index-container'>
                    <div className='index-aside' style={{ width: leftWidth }}>

                        <Menu defaultActive="1"
                            className="el-menu-vertical-demo left-aside-wrap"
                            onOpen={this.onOpen}
                            onSelect={this.onSelect()}
                            uniqueOpened={true}
                        >
                            {listNode}
                        </Menu>

                    </div>
                    <div className='index-main'>
                        <BrowserRouter>
                            <Switch>
                                {
                                    routes.map((item, index) => {
                                        return (
                                            <Route path={item.feUrl} key={index} exact={item.exact} component={item.component} />
                                        )
                                    })
                                }
                                <Redirect to="/index" />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(Index)