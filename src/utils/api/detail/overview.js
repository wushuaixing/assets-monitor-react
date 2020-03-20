import service from '@/utils/service';

// 债务人-业务列表
export const businessList = async params => service.get('/yc/obligor/monitor/overview/relation', { params }).then(res => res.data);
// const response = await service.get('/yc/obligor/monitor/overview/relation', { params });
// return response.data;

// 资产拍卖
export const overviewAuction = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/auction', { params });
	return response.data;
};

// 土地信息
export const overviewLand = async params => service.get('/yc/obligor/monitor/overview/land', { params }).then(res => res.data);
// export const overviewLand = async (params) => {
// 	const response = await service.get('/yc/obligor/monitor/overview/land', { params });
// 	return response.data;
// };

// 无形资产
export const overviewIntangible = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/intangible', { params });
	return response.data;
};

// 代位权
export const overviewSubrogation = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/subrogation', { params });
	return response.data;
};

// 股权质押
export const overviewStock = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/stock', { params });
	return response.data;
};

// 动产抵押
export const overviewMortgage = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/mortgage', { params });
	return response.data;
};

// 招标中标
export const overviewBidding = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/bidding', { params });
	return response.data;
};

// 破产重组
export const overviewBankruptcy = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/bankruptcy', { params });
	return response.data;
};

// 涉诉
export const overviewLitigation = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/litigation', { params });
	return response.data;
};

// 经营风险
export const overviewRisk = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/risk', { params });
	return response.data;
};

// 工商基本情况
export const overviewBusiness = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/business', { params });
	return response.data;
};

// 业务详情-土地信息
export const businessOverviewLand = async (params) => {
	const response = await service.get('/yc/business/monitor/overview/land', { params });
	return response.data;
};
