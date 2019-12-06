// 所有网络请求的api都放到这里封装
import service from '../service';


// 登录接口
export const login = params => service.post('/yc/open/login', params);

// authRule
export const authRule = params => service.get('/api/auth/authRule', { params })
	.then((res) => {
		global.authRule = (res.data || {}).data;
		return res.data;
	});
