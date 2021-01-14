// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import { message, Modal } from 'antd';
//
// function closeWindow() {
// 	if (navigator.userAgent.indexOf('MSIE') > 0) {
// 		if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
// 			window.opener = null;
// 			window.close();
// 		} else {
// 			window.open('', '_top');
// 			window.top.close();
// 		}
// 	} else if (navigator.userAgent.indexOf('Firefox') > 0) {
// 		window.location.href = 'about:blank ';
// 	} else {
// 		window.opener = null;
// 		window.open('', '_self', '');
// 		window.close();
// 	}
// }
//
// const cookies = new Cookies();
// const axiosPromiseArr = []; // 储存cancel token
// /* 请求拦截前的处理 */
// const specialRequestMethods = {
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
// const specialResponseMethods = {
// 	onFulfilled:	(response) => {
// 		/**
// 		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
// 		 * 如通过 xmlHttpRequest 状态码标识 逻辑可写在下面error中
// 		 */
// 		const res = response.data;
// 		const reqUrl = response.request.responseURL;
// 		// 在login界面不弹弹框
// 		const hash = window.location.hash.slice(1);
// 		// /api\/auth\/special\/login/.test(reqUrl) ||
// 		if ( res.code === 401 || res.code === 403 || res.code === 15002 || res.code === 5002 || res.code === 15003 || res.code === 20039) {
// 			axiosPromiseArr.forEach((ele, index) => {
// 				ele.cancel('请求取消');
// 				delete axiosPromiseArr[index];
// 			});
// 			let titleText = '';
// 			global.REQ_STATUS = 'stop';
// 			console.log('res === ', res);
// 			if (res.code === 401) { titleText = '没有访问权限，即将退出登录。'; }
// 			if (res.code === 403) { titleText = '权限不足'; }
// 			if (res.code === 15002) { titleText = '账号已过期，即将退出登录，如有疑问，请联系管理员'; }
// 			if (res.code === 5002 || res.code === 15003) { titleText = '本次登录已失效，请重新登录监控平台。'; }
// 			if (res.code === 20039) { titleText = '账号与当前域名对应机构不匹配，请切换到对应机构二级域名下登录'; }
// 			Modal.warning({
// 				title: '提示',
// 				className: 'yc-close-waring',
// 				content: titleText,
// 				okText: '我知道了',
// 				onOk() {
// 					closeWindow();
// 				},
// 			});
// 			// return Promise.reject(new Error(null));
// 		}
// 		return response;
// 	},
// 	onRejected: (error) => {
// 		const notShow = (error.config.params || {}).event === 'loop';
// 		// 如果没有token的时候提示给专线客户，从跳转页面之前重新进入
// 		if (cookies.get('token') === undefined) {
// 			Modal.warning({
// 				title: '提示',
// 				className: 'yc-close-waring',
// 				content: '本次登录已失效，请重新登录监控平台。',
// 				okText: '我知道了',
// 				onOk() {
// 					closeWindow();
// 				},
// 			});
// 		} else if (axios.isCancel(error)) {
// 			console.log('isCancel error:', error);
// 		} else if (error && !notShow) {
// 			message.error(error.message);
// 		}
// 	},
// };
//
// export { specialRequestMethods, specialResponseMethods };
