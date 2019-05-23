import React, { Component } from 'react'
import { Menu } from 'antd';
import { BrowserRouter, Route, Switch, exact, Redirect, Link, withRouter } from 'react-router-dom';


export default class Index extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            defaultActive:''
        };
      }
    
    
    onSelect(index,e,event,hh) {
        console.log('hh =>', hh)
        console.log('event =>', event)
        console.log('e =>', e)


    }
    onOpen(index,indexPath){
        console.log('indexPath =>', indexPath)
        console.log('index =>', index)
        this.setState({
            defaultActive:''+index
        })
    }
    render() {
        const { defaultActive } = this.state;
        console.log('defaultActive =>', defaultActive)
        const itme = ["/index", '', "/index/sign/query" ].map((m,index)=>(
        <Menu.Item index={"2-"+(index+1)}  key={index+1}><Link to={m}>选项{index+1}</Link></Menu.Item>
        ))


        return (
            <div>
            <Menu theme="dark" defaultActive={ defaultActive } className="el-menu-demo"  style={{width:200}}
             onSelect={this.onSelect.bind(this)}
             onOpen={this.onOpen.bind(this)}
             >
              <Menu.Item index="1">处理中心</Menu.Item>
              <Menu.SubMenu index="2" title="我的工作台">
                
                {itme}
                
              </Menu.SubMenu>
              <Menu.Item index="3">订单管理</Menu.Item>
            </Menu>




            <Route path='/index' exact component={()=>'index'} />
            <Route path='/index/sign/query'  component={()=>'666666'} />
          </div>
        )
    }
}
