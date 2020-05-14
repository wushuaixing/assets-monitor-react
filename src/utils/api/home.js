import service from '@/utils/service';
import { serviceFile } from '@/utils/service';


/**
 * 【首页接口】
 * @returns {Promise<*>}
 * @param params
 */
// 首页列表
export const selfTree = async (params) => {
	const response = await service.get('/yc/statistics/organization/selfTree', { params });
	return response.data;
};

// 未读消息数量提醒 [zhousai]
export const unreadCount = async (params) => {
	const response = await service.get('/yc/message/station/notify/unreadCount', { params });
	return response.data;
};


// 导出Excel文件
export const exportFile = id => `/yc/export/file/excel/${id}`;


// 导出Excel文件
export const normalGet = url => params => serviceFile.get(url, { params }).then(res => res.data);

// 当前机构统计信息
export const currentOrganization = async (params) => {
	const response = await service.get('/yc/index/information/overview/currentOrganization', { params });
	return response.data;
};

// 资产挖掘
export const homeAssetDig = async (params) => {
	const response = await service.get('/yc/index/information/overview/assetDig', { params });
	return Object.assign(response.data, { name: 'homeAsset' });
};

// 风险参考
export const riskReference = async (params) => {
	const response = await service.get('/yc/index/information/overview/riskReference', { params });
	return Object.assign(response.data, { name: 'homeRisk' });
};

// [v2.0]重要信息提醒
// 资产拍卖
export const importantListAuction = async (params) => {
	const response = await service.get('/yc/monitor/auction/importantList', { params });
	return Object.assign(response.data, { name: 'action' });
};
// 土地出让结果
export const importantListLandTransfer = async (params) => {
	const response = await service.get('/yc/monitor/land/transfer/importantList', { params });
	return Object.assign(response.data, { name: 'LandTransfer' });
};
// 土地抵押
export const importantListLandMortgage = async (params) => {
	const response = await service.get('/yc/monitor/land/mortgage/importantList', { params });
	return Object.assign(response.data, { name: 'LandMortgage' });
};
// 土地转让
export const importantListLandTransaction = async (params) => {
	const response = await service.get('/yc/monitor/land/transaction/importantList', { params });
	return Object.assign(response.data, { name: 'LandTransaction' });
};
// 排污权发证
export const importantListIntangibleEmission = async (params) => {
	const response = await service.get('/yc/monitor/intangible/emission/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleEmission' });
};
// 采矿权发证
export const importantListIntangibleMining = async (params) => {
	const response = await service.get('/yc/monitor/intangible/mining/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleMining' });
};
// 商标专利
export const importantListIntangibleTrademarkRight = async (params) => {
	const response = await service.get('/yc/monitor/intangible/trademarkRight/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleTrademarkRight' });
};
// 建筑建造资质
export const importantListIntangibleConstruct = async (params) => {
	const response = await service.get('/yc/monitor/intangible/construct/importantList', { params });
	return Object.assign(response.data, { name: 'IntangibleConstruct' });
};
// 建筑建造资质
export const importantListMortgage = async (params) => {
	const response = await service.get('/yc/monitor/mortgage/importantList', { params });
	return Object.assign(response.data, { name: 'mortgage' });
};
