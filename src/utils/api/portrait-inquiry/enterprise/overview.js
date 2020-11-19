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
	// return {
	// 	...response.data,
	// 	data: {
	// 		auctionInfos: [
	// 			{
	// 				count: 111,
	// 				type: 1, // type === 1 精准匹配
	// 				roleDistributions: [
	// 					{ count: 89, type: 1 },
	// 					{ count: 13, type: 2 },
	// 					{ count: 14, type: 3 },
	// 					{ count: 121, type: 5 },
	// 				],
	// 				auctionResults: [
	// 					{ count: 89, type: 1 },
	// 					{ count: 13, type: 3 },
	// 					{ count: 14, type: 5 },
	// 					{ count: 121, type: 7 },
	// 					{ count: 13, type: 9 },
	// 					{ count: 14, type: 11 },
	// 				],
	// 			},
	// 			{
	// 				count: 222,
	// 				type: 2, // type === 2 模糊匹配
	// 				auctionResults: [
	// 					{ count: 22, type: 1 },
	// 					{ count: 3, type: 3 },
	// 					{ count: 33, type: 5 },
	// 					{ count: 33, type: 7 },
	// 					{ count: 33, type: 9 },
	// 					{ count: 14, type: 11 },
	// 				],
	// 			},
	// 		],
	// 	},
	// };
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

// 资产概览 => 金融资产信息
export const getFinancial = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/finance', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		auctionFinanceCount: 50,
	// 		financeCount: 51,
	// 		financeInvestmentCount: 52,
	// 		gmtModified: '2020-10-11',
	// 		financeInfos: [
	// 			{
	// 				projectStatus: [
	// 					{ count: 1, type: 1 },
	// 					{ count: 15, type: 3 },
	// 					{ count: 12, type: 5 },
	// 					{ count: 41, type: 7 },
	// 					{ count: 51, type: 9 },
	// 					{ count: 51, type: 11 },
	// 				],
	// 				type: 1, // 竞价项目
	// 				count: 11111,
	// 			},
	// 			{
	// 				investmentProjectType: [
	// 					{ count: 1, type: 200794003 },
	// 					{ count: 15, type: 50025970 },
	// 					{ count: 12, type: 50025975 },
	// 					{ count: 41, type: 50025974 },
	// 					{ count: 51, type: 122406001 },
	// 					{ count: 51, type: 56936003 },
	// 					{ count: 51, type: 50025973 },
	// 				],
	// 				yearDistribution: [
	// 					{ count: 5, year: 2020 },
	// 					{ count: 3, year: 2019 },
	// 					{ count: 66, year: 2018 },
	// 					{ count: 22, year: 2010 },
	// 					{ count: 1, year: 2011 },
	// 				],
	// 				type: 2, // 招商项目
	// 				count: 2222222,
	// 			},
	// 			{
	// 				financeProjectType: [
	// 					{ count: 1, type: 1 },
	// 					{ count: 15, type: 2 },
	// 					{ count: 12, type: 3 },
	// 					{ count: 41, type: 4 },
	// 					{ count: 51, type: 5 },
	// 					{ count: 51, type: 6 },
	// 					{ count: 51, type: -1 },
	// 				],
	// 				type: 3, // 公示项目
	// 				count: 33333,
	// 			},
	// 		],
	// 	},
	// };
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

// [2.6] 资产概况 => 查解封资产 [youyu]
export const getUnBlock = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/unseal', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		unsealCount: 13,
	// 		yearDistributions: [
	// 			{ count: 5, year: 2020 },
	// 			{ count: 22, year: 2019 },
	// 			{ count: 22, year: 2018 },
	// 			{ count: 22, year: 2010 },
	// 			{ count: 22, year: 2011 },
	// 		],
	// 	},
	// };
};

// [2.6] 资产概况 => 限制高消费 [youyu]
export const getLimitHeight = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/limitHeight', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		limitHeightCount: 13,
	// 		yearDistributions: [
	// 			{ count: 6, year: 2020 },
	// 			{ count: 66, year: 2019 },
	// 			{ count: 6, year: 2018 },
	// 			{ count: 6, year: 2010 },
	// 			{ count: 66, year: 2011 },
	// 		],
	// 	},
	// };
};

// [2.4] 资产概况 => 破产信息 [youyu]
export const getBankruptcy = async (params) => {
	const response = await service.get('/yc/search/portrait/company/overview/bankruptcy', { params });
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
