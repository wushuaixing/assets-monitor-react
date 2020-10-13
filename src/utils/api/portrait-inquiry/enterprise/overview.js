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

// [V2.3] 资产概览 => 无形资产信息 [youyu]
export const getIntangible = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/intangible', { params });
	return response.data;
};

// 资产概览 => 代位权信息
export const getSubrogation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/subrogation', { params });
	return response.data;
};

// 资产概况 => 土地信息
export const getLand = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/land', { params });
	return response.data;
};

// 资产概况 => 股权质押
export const getStock = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/stock', { params });
	return response.data;
};

// 资产概况 => 动产抵押
export const getMortgage = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/asset/mortgage', { params });
	return response.data;
};

// [2.3] 资产概况 => 相关招投标信息 [youyu]
export const getBidding = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/bidding', { params });
	return response.data;
};

// [2.4] 资产概况 => 相关破产信息 [youyu]
export const getBankruptcy = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/bidding', { params });
	return response.data;
};

// 风险情况
export const getRisk = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/risk', { params });
	return response.data;
};

// 涉诉情况
export const getLitigation = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/litigation', { params });
	return response.data;
};

// 工商基本情况
export const getBusiness = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/business', { params });
	return response.data;
};
