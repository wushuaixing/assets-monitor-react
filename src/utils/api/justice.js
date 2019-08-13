import service from '../service';
import { baseUrl } from './index';
/**
 * 【查询】通用接口
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const justiceGet = async (id, type) => {
	// console.log(1111, `${baseUrl}/yc/process/justice/${type}/details/${id}`);
	const response = await service.get(`${baseUrl}/yc/process/justice/${type}/details/${id}`);
	return response.data;
};

export const justiceGetParams = async (params, id, type) => {
	const response = await service.get(`${baseUrl}/yc/process/justice/${type}/details/${id}`, { params });
	return response.data;
};

/**
 * 【保存】通用接口
 * @param params
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const justiceSave = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/justice/${type}/save/${id}`, params);
	return response.data;
};

/**
 * 【仲裁通用接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const arbitrationGet = async (id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/arbitration/${type}Detail/${id}`);
	return response.data;
};

export const arbitrationSave = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/arbitration/${type}/${id}`, params);
	return response.data;
};

/**
 * 【赋强公证通用接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
export const notarizationGet = async (id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/notarization/${type}Detail/${id}`);
	return response.data;
};

export const notarizationSave = async (params, id, type) => {
	const response = await service.post(`${baseUrl}/yc/process/notarization/${type}/${id}`, params);
	return response.data;
};
