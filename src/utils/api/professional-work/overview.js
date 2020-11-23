import service from '@/utils/service';

// 债务人-业务列表
export const obligorList = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/relation', { params });
	return response.data;
};

// 业务-业务列表
export const businessList = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/relation', { params });
	return response.data;
};
// 资产拍卖
export const overviewAuction = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/auction', { params });
	return response.data;
};

// 业务资产拍卖
export const businessOverviewAuction = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/auction', { params });
	return response.data;
};

// 债务人土地信息
export const overviewLand = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/land', { params });
	return response.data;
};

// 业务详情土地信息
export const businessOverviewLand = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/land', { params });
	return response.data;
};

// 债务人无形资产
export const overviewIntangible = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/intangible', { params });
	return response.data;
};

// 业务无形资产
export const businessOverviewIntangible = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/intangible', { params });
	return response.data;
};

// 债务人代位权
export const overviewSubrogation = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/subrogation', { params });
	return response.data;
};

// 债务人查解封资产
export const overviewUnBlock = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/unseal', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		unsealCount: 50,
	// 		gmtModified: '2020-10-10',
	// 		yearDistributions: [
	// 			{ count: 5, year: 2020 },
	// 			{ count: 3, year: 2019 },
	// 			{ count: 66, year: 2018 },
	// 			{ count: 22, year: 2010 },
	// 			{ count: 1, year: 2011 },
	// 		],
	// 	},
	// };
};

// 业务查解封资产 （只是占位，待修改）
export const businessOverviewUnBlock = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/unseal', { params });
	return response.data;
};

// 债务人金融资产
export const overviewFinancial = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/finance', { params });
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
// 业务金融资产（未添加这个需求， 待修改）
export const businessOverviewFinancial = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/finance', { params });
	return response.data;
};

// 业务代位权
export const businessOverviewSubrogation = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/subrogation', { params });
	return response.data;
};

// 债务人股权质押
export const overviewStock = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/stock', { params });
	return response.data;
};

// 业务股权质押
export const businessOverviewStock = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/stock', { params });
	return response.data;
};

// 债务人动产抵押
export const overviewMortgage = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/mortgage', { params });
	return response.data;
};

// 业务动产抵押
export const businessOverviewMortgage = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/mortgage', { params });
	return response.data;
};

// 债务人招标中标
export const overviewBidding = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/bidding', { params });
	return response.data;
};

// 业务招标中标
export const businessOverviewBidding = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/bidding', { params });
	return response.data;
};

// 债务人破产重组
export const overviewBankruptcy = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/bankruptcy', { params });
	return response.data;
};

// 业务破产重组
export const businessOverviewBankruptcy = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/bankruptcy', { params });
	return response.data;
};

// 债务人涉诉
export const overviewLitigation = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/litigation', { params });
	return response.data;
};

// 业务涉诉
export const businessOverviewLitigation = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/litigation', { params });
	return response.data;
};

// 债务人失信
export const overviewDishonest = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/dishonest', { params });
	return response.data;
};

// 业务失信
export const businessOverviewDishonest = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/dishonest', { params });
	return response.data;
};

// 债务人经营风险
export const overviewRisk = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/risk', { params });
	return response.data;
};

// 业务经营风险
export const businessOverviewRisk = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/risk', { params });
	return response.data;
};

// 个人债务人税收违法
export const OverviewTax = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/tax', { params });
	return response.data;
};

// 债务人限制高消费(企业 + 个人)
export const overviewLimitHeight = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/limitHeight', { params });
	return response.data;
	// return {
	// 	...response.data,
	// 	data: {
	// 		limitHeightCount: 565,
	// 		haveRemovedCount: 40,
	// 		gmtModified: '2020-10-11',
	// 		status: 1,
	// 		yearDistributions: [
	// 			{ count: 5, year: 2020 },
	// 			{ count: 3, year: 2019 },
	// 			{ count: 66, year: 2018 },
	// 			{ count: 22, year: 2010 },
	// 			{ count: 1, year: 2011 },
	// 		],
	// 	},
	// };
};

// 业务视图限制高消费 (企业 + 个人)
export const businessOverviewLimitHeight = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/limitHeight', { params });
	return response.data;
};

// 债务人工商基本情况
export const overviewBusiness = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/business', { params });
	return response.data;
};
