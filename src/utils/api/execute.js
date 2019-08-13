import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【执行通用接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const ExecuteGet = async (id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/enforce/${type}Detail/${id}`);
	return response.data;
};

export const ExecuteSave = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/enforce/${type}/${id}`, params);
	return response.data;
};

export const ExecuteGetParams = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/enforce/${type}Detail/${id}`, params);
	return response.data;
};
