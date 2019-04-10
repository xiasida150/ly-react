import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from '../Login';
import SelectHospital from '../SelectHospital';





export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route path="/select-hospital" component={SelectHospital} />
            </React.Fragment>
        )
    }
}
