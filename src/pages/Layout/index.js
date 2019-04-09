import React, { Component } from 'react';
import { Router, Route, } from 'react-router-dom';
import Login from '../Login';





export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login}/>
            </React.Fragment>
        )
    }
}
