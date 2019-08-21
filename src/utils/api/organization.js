import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【机构管理接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 推送设置列表[C.H Wong]
export const pushManagerList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/pushManager/list`, { params });
	return response.data;
};

// 删除[C.H Wong]
export const deleteList = async (params) => {
	const response = await service.post(`${baseUrl}/yc/pushManager/delete`, params);
	return response.data;
};

// 修改及保存
export const saveList = async (params) => {
	const response = await service.post(`${baseUrl}/yc/pushManager/save`, params);
	return response.data;
};
