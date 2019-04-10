import Axios from "axios";
import qs from 'qs';
import { BrowserRouter } from 'react-router-dom';

import { aesEdd } from './DES';

export const sso = `/a/sso/v1`;
export const img = `/f/v1`;

Axios.defaults.timeout = 5000;
Axios.defaults.baseURL = process.env.REACT_APP_URL; //这是调用数据接口
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


Axios.interceptors.request.use(
    config => {
        // console.log("token:"+token);
        config.data = qs.stringify(config.data);
        return config;
    },

    err => {
        return Promise.reject(err);
    }
);


// http response 拦截器
Axios.interceptors.response.use(
    response => {
        //response.data.error_code是我接口返回的值，如果值为10004，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
        if (response.code === 500) {
            console.log("没有权限 ");
            BrowserRouter.push({
                path: '/login',
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    }
);

export default Axios;

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {

    return new Promise((resolve, reject) => {
        Axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}
