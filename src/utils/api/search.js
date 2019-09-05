import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/**
 * 【首页接口】
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
// 金融全文搜索
export const finance = async (params) => {
	const response = await service.get(`${baseUrl}/yc/finance/search`, { params });
	return response.data;
};

// 文书金融全文搜索
export const judgement = async (params) => {
	const response = await service.get(`${baseUrl}/yc/judgement/search`, { params });
	return response.data;
};

// 文书全部导出(前1000条数据)
export const exportAll = async (params) => {
	const response = await service.get(`${baseUrl}/yc/judgement/exportAll`, { params });
	return response.request;
};
// 文书本页导出
export const exportCurrent = async (params) => {
	const response = await service.get(`${baseUrl}/yc/judgement/export`, { params });
	return response.request;
};
