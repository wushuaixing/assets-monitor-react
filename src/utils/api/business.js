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


// 下载风险变动消息附件下载 zhousai
export const attach = async (id, params) => {
	const response = await service.get(`${baseUrl}/jms/message/center/risk/attach/${id}`, { params });
	return response.request;
};
