import axios from 'axios';
import { message, Modal } from 'antd';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';

// 获取当前token
const cookies = new Cookies();
const axiosPromiseArr = []; // 储存cancel token
// 创建axios实例
const service = axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 5000 * 4,
	// transformRequest:[
	//     function(e){
	//         function setDate(e){
	//             var t, n, i, r, o, s, a, c = "";
	//             for (t in e)
	//             if (n = e[t], n instanceof Array)
	//                 for (a = 0; a < n.length; ++a)
	//                 o = n[a], i = t + "[]", s = {}, s[i] = o, c += setDate(s) + "&";
	//             else if (n instanceof Object)
	//                 for (r in n) o = n[r], i = t + "[" + r + "]", s = {}, s[i] = o, c += setDate(s) + "&";
	//             else void 0 !== n && null !== n && (c += encodeURIComponent(t) + "=" + encodeURIComponent(n) + "&");
	//             return c.length ? c.substr(0, c.length - 1) : c
	//         }
	//         return setDate(e);

	//     }
	// ],
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Content-Encoding': 'gzip,compress,deflate,identity',
	},
});

// request拦截  请求之前拦截
service.interceptors.request.use((config) => {
	// 在请求发出之前做拦截工作
	// 这块需要做一些用户验证的工作，需要带上用户凭证
	console.log(cookies, 1);


	const configNew = Object.assign({}, config);
	configNew.headers['Set-Cookie'] = cookies.get('SESSION');
	// 在发送请求设置cancel token
	configNew.cancelToken = new axios.CancelToken((cancel) => {
		axiosPromiseArr.push({ cancel });
	});
	if (config.cancelToken) {
		configNew.cancelToken = config.cancelToken;
	}

	const path = configNew.url.split('jms')[1];

	if (configNew.url.match(/\?/)) {
		configNew.url = `${configNew.url}&token=${cookies.get('token')}`;
	} else if (path !== '/open/login') {
		configNew.url = `${config.url}?token=${cookies.get('token')}`;
	}
	// configNew.headers['Access-Control-Allow-Origin'] = '*';
	return configNew;
}, (error) => {
	// 请求错误之后可以统一处理
	console.debug(`request error :${error}`);
	// return Promise.reject(error);
});


// 对象浅拷贝  主要用来对数据做一些映射工作
// function copyObj(obj) {
// 	const newObj = {};
// 	for (const attr in obj) {
// 		if (attr === 'returnCode') {
// 			newObj.retCode = obj[attr];
// 		} else if (attr === 'returnMessage') {
// 			newObj.retMsg = obj[attr];
// 		} else {
// 			newObj[attr] = obj[attr];
// 		}
// 	}
// 	return newObj;
// }

// response 拦截  请求相应之后的拦截
service.interceptors.response.use(
	(response) => {
		/**
		 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
		 * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
		 */
		const res = response.data;
		// 在login界面不弹弹框
		const hash = window.location.hash.slice(1);
		if (res.code === 401 && hash !== '/login') {
			// 把其余的请求取消掉
			axiosPromiseArr.forEach((ele, index) => {
				ele.cancel('请求取消');
				delete axiosPromiseArr[index];
			});
			Modal.confirm({
				title: '登陆验证失效',
				content: '你的登陆验证已经失效，可以取消继续留在该页面，或者重新登录',
				onOk() {
					/* 跳转到登陆页面 */
					navigate('/login');
				},
				onCancel() {},
			});
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

export default service;
