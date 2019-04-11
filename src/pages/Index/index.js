import React, { Component } from 'react';
import { Menu, Badge, Dropdown } from 'element-react';
import { Link } from 'react-router-dom';
import './index.less';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.changeLeftPos = this.changeLeftPos.bind(this)

        this.state = {
            indexTop: {
                leftWidth: 200
            }
        }
    }
    onSelect() {

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
                    <div className='index-aside' style={{ width: leftWidth }}>Aside</div>
                    <div className='index-main'>Main</div>
                </div>
            </div>
        )
    }
}
