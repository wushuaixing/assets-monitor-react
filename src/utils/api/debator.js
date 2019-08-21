import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【业务管理接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 债务人列表[C.H Wong]
export const obligorList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/obligor/list`, { params });
	return response.data;
};

// 开启推送[C.H Wong]
export const openPush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/obligor/openPush`, params);
	return response.data;
};

// 关闭推送[C.H Wong]
export const closePush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/obligor/closePush`, params);
	return response.data;
};

// 列表页导出excel[C.H Wong]
export const exportExcel = async (params) => {
	const response = await service.get(`${baseUrl}/yc/obligor/exportExcel`, { params });
	return response.request;
};
