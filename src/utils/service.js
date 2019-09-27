import axios from 'axios';
import { message } from 'antd';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';

// 获取当前token
const cookies = new Cookies();
const axiosPromiseArr = []; // 储存cancel token
// 创建axios实例
// axios.defaults.headers['Content-Type'] = 'image/jpeg;charset=UTF-8'; // 此处是增加的代码，设置请求头的类型
// axios.defaults.withCredentials = true;

const service = axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 5000 * 4,
	withCredentials: true,
	credentials: 'include',
	// transformRequest: [
	// 	function (e) {
	//         function setDate(e) {
	//             let t; let n; let i; let r; let o; let s; let a; let
	// 				c = '';
	//             for (t in e) {
	// 				if (n = e[t], n instanceof Array) {
	// 					for (a = 0; a < n.length; ++a) { o = n[a], i = `${t}[]`, s = {}, s[i] = o, c += `${setDate(s)}&`; }
	// 				} else if (n instanceof Object) { for (r in n) o = n[r], i = `${t}[${r}]`, s = {}, s[i] = o, c += `${setDate(s)}&`; } else void 0 !== n && n !== null && (c += `${encodeURIComponent(t)}=${encodeURIComponent(n)}&`);
	// 			}
	//             return c.length ? c.substr(0, c.length - 1) : c;
	//         }
	//         return setDate(e);
	//     },
	// ],
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',

	},
});
// request拦截  请求之前拦截
service.interceptors.request.use(
	(config) => {
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
	(error) => {
	// 请求错误之后可以统一处理
		console.debug(`request error :${error}`);
	// return Promise.reject(error);
	},
);

service.interceptors.response.use(
	(response) => {
		/**
		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
		 */

		const res = response.data;
		// 在login界面不弹弹框
		const hash = window.location.hash.slice(1);
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
	(error) => {
		// 如果没有token直接返回到登陆界面
		if (cookies.get('token') === undefined) {
			navigate('/login');
		} else if (axios.isCancel(error)) {
			console.log('isCancel error:', error);
		} else {
			message.error(error.message);
		}
	},
);

const serviceFile = axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 1000 * 5 * 60,
	withCredentials: true,
	credentials: 'include',
	// transformRequest: [
	// 	function (e) {
	//         function setDate(e) {
	//             let t; let n; let i; let r; let o; let s; let a; let
	// 				c = '';
	//             for (t in e) {
	// 				if (n = e[t], n instanceof Array) {
	// 					for (a = 0; a < n.length; ++a) { o = n[a], i = `${t}[]`, s = {}, s[i] = o, c += `${setDate(s)}&`; }
	// 				} else if (n instanceof Object) { for (r in n) o = n[r], i = `${t}[${r}]`, s = {}, s[i] = o, c += `${setDate(s)}&`; } else void 0 !== n && n !== null && (c += `${encodeURIComponent(t)}=${encodeURIComponent(n)}&`);
	// 			}
	//             return c.length ? c.substr(0, c.length - 1) : c;
	//         }
	//         return setDate(e);
	//     },
	// ],
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',
		'Axios-Request-Type': 'export,files',
	},
});
// request拦截  请求之前拦截
serviceFile.interceptors.request.use(
	(config) => {
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
	(error) => {
		// 请求错误之后可以统一处理
		console.debug(`request error :${error}`);
		// return Promise.reject(error);
	},
);

// response 拦截  请求相应之后的拦截webp
serviceFile.interceptors.response.use(
	(response) => {
		/**
		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
		 */

		const res = response.data;
		// 在login界面不弹弹框
		const hash = window.location.hash.slice(1);
		if ((res.code === 401 || res.code === 5002) && hash !== '/login') {
			// 把其余的请求取消掉
			axiosPromiseArr.forEach((ele, index) => {
				ele.cancel('请求取消');
				delete axiosPromiseArr[index];
			});
			message.error(res.message);
			navigate('/login');
			return Promise.reject(new Error('token失效'));
		}
		return response;
	},
	(error) => {
		if (axios.isCancel(error)) {
			console.log('isCancel error:', error);
		} else {
			message.error(error.message);
		}
	},
);
export { serviceFile };
export default service;
