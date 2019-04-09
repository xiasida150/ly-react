import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, } from 'react-router-dom';
import Layout from './pages/Layout';

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
