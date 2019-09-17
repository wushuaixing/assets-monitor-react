import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【首页接口】
 * @returns {Promise<*>}
 * @param params
 */
// 首页列表
export const selfTree = async (params) => {
	const response = await service.get(`${baseUrl}/yc/statistics/organization/selfTree`, { params });
	return response.data;
};

// 未读消息数量提醒 [zhousai]
export const unreadCount = async (params) => {
	const response = await service.get(`${baseUrl}/yc/message/station/notify/unreadCount`, { params });
	return response.data;
};


// 导出Excel文件
export const exportFile = id => `${baseUrl}/yc/export/file/excel/${id}`;


// 导出Excel文件
export const normalGet = url => params => service.get(url, { params }).then(res => res.data);
