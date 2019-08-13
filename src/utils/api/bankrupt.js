import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【破产通用接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const bankruptGet = async (id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/bankruptcy/${type}Detail/${id}`);
	return response.data;
};

export const bankruptSave = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/bankruptcy/${type}/${id}`, params);
	return response.data;
};

export const bankruptGetParams = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/bankruptcy/${type}Detail/${id}`, params);
	return response.data;
};
