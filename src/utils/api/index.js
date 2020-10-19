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

// [v2.4]文书详情页 [youyu]
export const judgmentDetail = async (params) => {
	const response = await service.get('/yc/monitor/judgment/subrogation/detail', { params });
	return response.data;
};
