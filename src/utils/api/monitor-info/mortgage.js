import service from '@/utils/service';

/**
 * 【动产抵押接口】
 * @returns {Promise<*>}
 * @param params
 */
// 动产抵押列表
export const getMortgageList = async (params) => {
	const response = await service.get('/yc/monitor/mortgage/list', { params });
	return response.data;
};

// 标记为已读
export const postMarkRead = async (params) => {
	const response = await service.post('/yc/monitor/mortgage/markRead', params);
	return response.data;
};

// 全部标记为已读
export const postMarkReadAll = async (params) => {
	const response = await service.post('/yc/monitor/mortgage/markReadAll', params);
	return response.data;
};

// 关注
export const postFollow = async (params) => {
	const response = await service.post('/yc/monitor/mortgage/follow', params);
	return response.data;
};

// 取消关注
export const postUnFollow = async (params) => {
	const response = await service.post('/yc/monitor/mortgage/unFollow', params);
	return response.data;
};

// 导出excel
export const exportList = '/yc/monitor/mortgage/export';
