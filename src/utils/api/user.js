import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【登陆接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */

// 银行个性配置
export const bankConf = async () => {
	const response = await service.get(`${baseUrl}/yc/open/conf/bankConf`);
	return response.data;
};
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


// 忘记密码获取验证短信-step2
export const forgetPasswordStep2Sms = async (params) => {
	const response = await service.get(`${baseUrl}/api/auth/open/forgetPassword/step2/sms`, { params });
	return response.data;
};

// 验证短信验证-step2
export const smsValid = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/open/forgetPassword/step2/smsValid`, params);
	return response.data;
};

// 忘记密码-step3 修改密码
export const forgetPasswordStep3 = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/open/forgetPassword/step3`, params);
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

// 修改密码
export const changePassword = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/user/changePassword`, params);
	return response.data;
};

// 登录前校验
export const loginPreCheck = async (params) => {
	const response = await service.get(`${baseUrl}/api/auth/open/loginPreCheck`, { params });
	return response.data;
};

// 初始账号(初始修改密码) [zhousai]
export const initUser = async (params) => {
	const response = await service.post(`${baseUrl}/api/auth/initUser`, params);
	return response.data;
};
