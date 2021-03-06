import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';//redux的store
import { BrowserRouter, Route, HashRouter, Router } from 'react-router-dom';
import { withRouter } from 'react-router';
import 'antd/dist/antd.css';
import Layout from './pages/Layout';

const LayoutRouter = withRouter(Layout)

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter >
            <LayoutRouter />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
