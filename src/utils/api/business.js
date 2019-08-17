import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【业务管理接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 业务列表[C.H Wong]
export const businessList = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/list`, params);
	return response.data;
};

// 开启推送[C.H Wong]
export const openPush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/openPush`, params);
	return response.data;
};

// 关闭推送[C.H Wong]
export const closePush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/closePush`, params);
	return response.data;
};

// 删除一条记录[C.H Wong]
export const postDelete = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/delete`, params);
	return response.data;
};

// 批量删除记录[C.H Wong]
export const postDeleteBatch = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/deleteBatch`, params);
	return response.data;
};

// 获取业务基本详情[C.H Wong]
export const getDetail = async (id) => {
	const response = await service.get(`${baseUrl}/yc/business/detail/${id}`);
	return response.data;
};

// 列表页导出excel[C.H Wong]
export const exportExcel = async (params) => {
	const response = await service.get(`${baseUrl}/yc/business/exportExcel`, { params });
	console.log(response, 1);

	return response.request;
};
