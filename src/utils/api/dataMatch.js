import message from 'antd/lib/message';
import service from '../service';
import { baseUrl } from './index';

/**
 * 【查询】业务的各种数据类型的数据数量
 * @param id
 * @returns {Promise<*>}
 */
export const getBusinessDataCount = async (id) => {
	// console.log(1111, `${baseUrl}/yc/process/justice/${type}/details/${id}`);
	const response = await service.get(`${baseUrl}/yc/match/detail/getBusinessDataCount?businessId=${id}`);
	if (response.data.code === 200) {
		return response.data.data;
	}
	message.error(response.data.message);
	return Promise.reject(new Error('error'));
};

/**
 * 【保存】通用接口
 * @param params
 * @param type
 * @returns {Promise<*>}
 */
export const matchGet = async (params, type) => {
	const response = await service.post(`${baseUrl}/yc/match/detail/${type}`, params);
	if (response.data.code === 200) {
		return response.data.data;
	}
	message.error(response.data.message);
	return false;
};
