import service from '@/utils/service';

/**
 * 【概况接口】
 * @returns {Promise<*>}
 * @param params
 */
// 资产概况 => 相关资产拍卖
export const getAuction = async (params) => {
	const response = await service.get('/yc/search/portrait/personal/overview/asset/auction', { params });
	return response.data;
};

// 资产概览 => 代位权信息
export const getSubrogation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/subrogation', { params });
	return response.data;
};
