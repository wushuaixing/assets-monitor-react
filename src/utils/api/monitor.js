import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【司法风险跟进接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 保存跟进记录
export const saveProcess = async (params) => {
	const response = await service.post(`${baseUrl}/jms/monitor/process/saveProcess`, params);
	return response.data;
};

// 跟进记录列表
export const listProcess = async (params) => {
	const response = await service.post(`${baseUrl}/jms/monitor/process/listProcess`, params);
	return response.data;
};

// 侧边栏统计数字[wangconghui]
export const count = async (params) => {
	const response = await service.post(`${baseUrl}/jms/monitor/result/count`, params);
	return response.data;
};

// 根据债务人获取最新的监控查询记录[wangconghui]
export const getNewestMonitorLogId = async (params) => {
	const response = await service.post(`${baseUrl}/jms/monitor/result/getNewestMonitorLogId`, params);
	return response.data;
};
