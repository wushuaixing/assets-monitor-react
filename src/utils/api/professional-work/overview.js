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
// 债务人工商基本情况
export const overviewBusiness = async (params) => {
	const response = await service.get('/yc/obligor/monitor/overview/business', { params });
	return response.data;
};
