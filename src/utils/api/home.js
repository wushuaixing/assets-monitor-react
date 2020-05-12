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
