import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【消息中心接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 消息中心列表
export const centerList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/message/station/list`, { params });
	return response.data;
};


// 消息提醒
export const notify = async (params) => {
	const response = await service.get(`${baseUrl}/yc/message/station/notify`, { params });
	return response.data;
};

// 已读
export const isRead = async (messageType, id) => {
	const response = await service.get(`${baseUrl}/jms/message/center/read/${messageType}/${id}`);
	return response.data;
};

// 小铃铛提醒。 是否含有未读消息
export const hasUnreadMessage = async () => {
	const response = await service.get(`${baseUrl}/jms/message/center/hasUnreadMessage`);
	return response.data;
};
