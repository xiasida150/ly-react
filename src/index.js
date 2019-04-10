import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';//redux的store
import { BrowserRouter, Route, } from 'react-router-dom';
import Layout from './pages/Layout';

import 'element-theme-default';


ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
