// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import { message, Modal } from 'antd';
// import { navigate } from '@reach/router';
//
// const cookies = new Cookies();
// const axiosPromiseArr = []; // 储存cancel token
// /* 请求拦截前的处理 */
// const defaultRequestMethods = {
// 	onFulfilled: (config) => {
// 		// 在请求发出之前做拦截工作
// 		// 这块需要做一些用户验证的工作，需要带上用户凭证
// 		const _params = Object.assign({}, config.params);
// 		// eslint-disable-next-line radix
// 		if (_params.page)_params.page = parseInt(_params.page);
// 		const configNew = Object.assign({}, config, { params: _params });
// 		// 在发送请求设置cancel token
// 		configNew.cancelToken = new axios.CancelToken((cancel) => {
// 			axiosPromiseArr.push({ cancel });
// 		});
// 		if (config.cancelToken) {
// 			configNew.cancelToken = config.cancelToken;
// 		}
//
// 		const path = configNew.url.split('jms')[1];
// 		const _token = cookies.get('token') || '';
// 		if (configNew.url.match(/\?/)) {
// 			configNew.url = `${configNew.url}${_token ? `&token=${_token}` : ''}`;
// 		} else if (path !== '/open/login') {
// 			configNew.url = `${config.url}${_token ? `?token=${_token}` : ''}`;
// 		}
// 		// configNew.headers['Access-Control-Allow-Origin'] = '*';
// 		return configNew;
// 	},
// 	onRejected: (error) => {
// 		// 请求错误之后可以统一处理
// 		console.debug(`request error :${error}`);
// 		// return Promise.reject(error);
// 	},
// };
// /* 请求返回后的处理 */
// const defaultResponseMethods = {
// 	onFulfilled:	(response) => {
// 		/**
// 		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
// 		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
// 		 */
// 		const res = response.data;
// 		console.log('defualt response === ', response);
// 		// 在login界面不弹弹框
// 		const hash = window.location.hash.slice(1);
// 		// console.log(response);
// 		if (res.code === 401) {
// 			navigate('/login');
// 			window.location.reload();
// 			return response;
// 		}
// 		if (res.code === 403) {
// 			navigate('/');
// 			window.location.reload();
// 			return response;
// 		}
// 		if ((res.code === 15002 || res.code === 5002 || res.code === 15003 || res.code === 20039) && hash !== '/login') {
// 			axiosPromiseArr.forEach((ele, index) => {
// 				ele.cancel('请求取消');
// 				delete axiosPromiseArr[index];
// 			});
// 			const reqUrl = response.request.responseURL;
// 			let titleText = '';
// 			global.REQ_STATUS = 'stop';
// 			if (res.code === 15002) { titleText = '您的账号已过期，请联系客服'; }
// 			if (res.code === 5002 || res.code === 15003) { titleText = '登录失效，请重新登录'; }
// 			if (res.code === 20039) { titleText = '账号与当前域名对应机构不匹配，请切换到对应机构二级域名下登录'; }
// 			if (/api\/auth\/logout/.test(reqUrl)) {
// 				navigate('/login');
// 				return Promise.reject(new Error(null));
// 			}
// 			if (/api\/auth\/authRule/.test(reqUrl)) {
// 				//	权限接口
// 				navigate('/login');
// 				Modal.warning({
// 					title: titleText,
// 					onOk() {},
// 				});
// 			} else {
// 				// 非权限接口
// 				Modal.warning({
// 					title: titleText,
// 					onOk() { navigate('/login'); },
// 				});
// 			}
// 			return Promise.reject(new Error(null));
// 		}
// 		return response;
// 	},
// 	onRejected: (error) => {
// 		const notShow = (error.config.params || {}).event === 'loop';
// 		// 如果没有token直接返回到登陆界面
// 		if (cookies.get('token') === undefined) {
// 			navigate('/login');
// 		} else if (axios.isCancel(error)) {
// 			console.log('isCancel error:', error);
// 		} else if (error && !notShow) {
// 			message.error(error.message);
// 		}
// 	},
// };
//
// export { defaultRequestMethods, defaultResponseMethods };
