/* global localStore */

import React, { Component } from 'react';
import { Router, Route, Switch, exact, Redirect } from 'react-router-dom';
import Load from '@/util/lazy';
import Index from '../Index'



export default class Layout extends Component {

    authLogin = () => {
        const token = localStore.get('token');
        return token ? <Index /> : <Redirect to={{ pathname: '/login' }} />
    }
    render() {
        return (
            <Switch>
                <Route path="/login" component={Load(() => import('../Login'))} />
                <Route path="/select-hospital" component={Load(() => import('../SelectHospital'))} />
                <Route path="/404" component={() => '404'} />
                <Route path="/" render={this.authLogin} />
            </Switch>
        )
    }
}
