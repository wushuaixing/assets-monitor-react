import axios from 'axios';
import { message } from 'antd';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';
import BASE_URL_INDEX from './api/config';
import BASE_URL_LOCAL from './api/config/local';

// eslint-disable-next-line no-undef
const BASE_URL = ENV === 'local' ? BASE_URL_LOCAL : BASE_URL_INDEX;

/* 获取当前token */
const cookies = new Cookies();
const axiosPromiseArr = []; // 储存cancel token

/* 请求拦截前的处理 */
const requestMethods = {
	onFulfilled: (config) => {
		// 在请求发出之前做拦截工作
		// 这块需要做一些用户验证的工作，需要带上用户凭证
		const configNew = Object.assign({}, config);
		// 在发送请求设置cancel token
		configNew.cancelToken = new axios.CancelToken((cancel) => {
			axiosPromiseArr.push({ cancel });
		});
		if (config.cancelToken) {
			configNew.cancelToken = config.cancelToken;
		}

		const path = configNew.url.split('jms')[1];
		const _token = cookies.get('token') || '';
		if (configNew.url.match(/\?/)) {
			configNew.url = `${configNew.url}${_token ? `&token=${_token}` : ''}`;
		} else if (path !== '/open/login') {
			configNew.url = `${config.url}${_token ? `?token=${_token}` : ''}`;
		}
		// configNew.headers['Access-Control-Allow-Origin'] = '*';
		return configNew;
	},
	onRejected: (error) => {
		// 请求错误之后可以统一处理
		console.debug(`request error :${error}`);
		// return Promise.reject(error);
	},
};
/* 请求返回后的处理 */
const responseMethods = {
	onFulfilled:	(response) => {
		/**
		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
		 */
		const res = response.data;
		// 在login界面不弹弹框
		const hash = window.location.hash.slice(1);
		// console.log(response);
		if (res.code === 403) {
			window.location.reload();
			return false;
		}
		if ((res.code === 401 || res.code === 5002) && hash !== '/login') {
			// 把其余的请求取消掉
			axiosPromiseArr.forEach((ele, index) => {
				ele.cancel('请求取消');
				delete axiosPromiseArr[index];
			});

			// 如果没有token直接返回到登陆界面
			if (cookies.get('token') !== undefined) {
				message.error(res.message);
			}
			navigate('/login');
			return Promise.reject(new Error('token失效'));
		}
		return response;
	},
	onRejected: (error) => {
		// console.log(error);
		// 如果没有token直接返回到登陆界面
		if (cookies.get('token') === undefined) {
			navigate('/login');
		} else if (axios.isCancel(error)) {
			console.log('isCancel error:', error);
		} else {
			message.error(error.message);
		}
	},
};

/* =========  常规请求   ========= */
const service = axios.create({
	baseURL: BASE_URL || process.env.BASE_URL,
	timeout: 5000 * 4,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',

	},
});

/* eslint-disable no-proto */
service.__proto__ = axios;
/* eslint-enable */

// request拦截  请求之前拦截
service.interceptors.request.use(requestMethods.onFulfilled, requestMethods.onRejected);
service.interceptors.response.use(responseMethods.onFulfilled, responseMethods.onRejected);


/* =========  文件服务请求   ========= */
const serviceFile = axios.create({
	baseURL: BASE_URL || process.env.BASE_URL,
	timeout: 1000 * 5 * 60,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',
		'Axios-Request-Type': 'export,files',
	},
});
// request拦截  请求之前拦截
serviceFile.interceptors.request.use(requestMethods.onFulfilled, requestMethods.onRejected);
serviceFile.interceptors.response.use(responseMethods.onFulfilled, responseMethods.onRejected);


export { serviceFile };
export default service;
