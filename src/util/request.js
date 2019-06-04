/* global localStore */
import Axios from "axios";
import qs from 'qs';
import { aesAdd, aesEdd, getAesKey } from '@/util/DES';

export const sso = '/a/sso/v1';
export const auth = '/a/auth/v1';
export const sign = '/c/sign/v1';
export const img = '/f/v1';
export const buss = '/b/v1';
export const follow = '/h/v1';
export const t = '/t/v1';
export const m = '/m/v1';
export const log = '/m/v1/log';

const AesKeyStr = localStore.get('user') ? JSON.parse(localStore.get('user')).aeskey : '' || getAesKey();

const AesKey = AesKeyStr.slice(0, 16)
const IV = AesKeyStr.slice(16, 32)

Axios.defaults.timeout = 5000;
Axios.defaults.baseURL = process.env.REACT_APP_URL; //这是调用数据接口
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

Axios.interceptors.request.use(
    config => {
        if (!(config.url.includes(`/rsakey`) || config.url.includes(`/login`))) {
            let data = {
                token: localStore.get('token') || ''
            };
            if (config.method === 'get') {
                data.data = aesAdd(JSON.stringify(config.params), AesKey, IV);
                config.params = data;
            }
            if (config.method === 'post') {
                config.data.token = data.token;
            }
        }
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
        //response.data.error_code是我接口返回的值，如果值为10004，
        //说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
        let { url } = response.config
        let { data, code, message } = response.data
        if (!(url.includes(`/rsakey`) || url.includes(`/login`))) {
            if (code === 500) {
                // const history = createHashHistory();
                // history.push('/login')

                // const history = createBrowserHistory({});
                // console.log("history ", history.replace);

                window.location.replace('/login');
            }
            data = data ? (data.replace(/[\r\n]/g, '')).trim() : '';
            return code === 200 && typeof data == 'string' ?
                { code, data: JSON.parse(aesEdd(data, AesKey, IV)), message } :
                { code, data: {}, message };
        }
        return response
    },
    error => {
        return Promise.reject(error.response)
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
