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
	const response = await service.post(`${baseUrl}/jms/open/login`, params);
	return response.data;
};


// 退出登陆
export const loginOut = async (params) => {
	const response = await service.post(`${baseUrl}/jms/user/logout`, params);
	return response.data;
};
