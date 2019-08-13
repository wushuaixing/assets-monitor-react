import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【消息中心接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 消息中心列表
export const centerList = async (messageType, params) => {
	const response = await service.get(`${baseUrl}/jms/message/center/list/${messageType}`, { params });
	return response.data;
};


// 下载风险变动消息附件下载 zhousai
export const attach = async (id, params) => {
	const response = await service.get(`${baseUrl}/jms/message/center/risk/attach/${id}`, { params });
	return response.request;
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
