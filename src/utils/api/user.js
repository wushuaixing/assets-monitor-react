import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【登陆接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 登陆
export const login = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/login`, params);
	return response.data;
};


// 退出登陆
export const loginOut = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/logout`, params);
	return response.data;
};

// 发送验证短信
export const sendVerificationSms = async (params) => {
	const response = await service.get(`${baseUrl}/yc/open/sendVerificationSms`, { params });
	return response.data;
};
