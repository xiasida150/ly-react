import React, { Component } from 'react';
import { Router, Route, Switch, exact, Redirect } from 'react-router-dom';
import Load from '@/util/lazy';



export default class Layout extends Component {
    render() {
        return (
            <Switch>
                <Route path="/index"  component={Load(() => import('../Index'))} />
                <Route path="/login" component={Load(() => import('../Login'))} />
                <Route path="/select-hospital" component={Load(() => import('../SelectHospital'))} />
                <Redirect to="/login" />
            </Switch>
        )
    }
}
