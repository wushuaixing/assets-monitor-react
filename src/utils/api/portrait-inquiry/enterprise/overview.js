import service from '@/utils/service';

/**
 * 【概况接口】
 * @returns {Promise<*>}
 * @param params
 */
// 资产概况 => 相关资产拍卖
export const getAuction = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/auction', { params });
	return response.data;
};

// 主要人员
export const getMainPerson = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/mainPerson', { params });
	return response.data;
};

// 股东信息
export const getStockholder = async (params) => {
	const response = await service.get('/yc/search/portrait/company/baseInfo/stockholder', { params });
	return response.data;
};
