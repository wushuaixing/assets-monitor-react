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

// 忘记密码-step1
export const forgetPasswordStep1 = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/open/forgetPassword/step1`, params);
	return response.data;
};

// 忘记密码-step2
export const forgetPasswordStep2 = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/open/forgetPassword/step2`, params);
	return response.data;
};

// 忘记密码验证短信-step2
export const forgetPasswordStep2Sms = async (params) => {
	const response = await service.get(`${baseUrl}/api/auth/open/forgetPassword/step2/sms`, { params });
	return response.data;
};

// userInfo
export const userInfo = async (params) => {
	const response = await service.get(`${baseUrl}/yc/user/info`, { params });
	return response.data;
};

// api/auth/switchOrg
export const switchOrg = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/switchOrg`, params);
	return response.data;
};
