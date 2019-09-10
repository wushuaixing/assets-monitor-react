import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';
import { urlEncode } from '@/utils';
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

// 拍卖信息搜索 [zhousai]
export const fullAssetSearch = async (params) => {
	const response = await service.get(`${baseUrl}/yc/doc/search/fullAssetSearch`, { params });
	return response.data;
};
// 拍卖信息导出(前1000条数据)
export const fullAssetSearchExport = async (params) => {
	const response = await service.get(`${baseUrl}/yc/doc/search/fullAssetSearchExport`, { params });
	return response.request;
};
// 涉诉信息 => 数量 [zhousai]
export const relationSearchCount = async (params) => {
	const response = await service.get(`${baseUrl}/yc/doc/search/relationSearchCount`,
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 开庭公告 [zhousai]
export const ktggRelationSearch = async (params) => {
	const response = await service.get(`${baseUrl}/yc/doc/search/ktggRelationSearch`,
		{
			params,
			paramsSerializer: () => {
			// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
// 涉诉信息 => 立案信息 [zhousai]
export const trialRelationSearch = async (params) => {
	const response = await service.get(`${baseUrl}/yc/doc/search/trialRelationSearch`,
		{
			params,
			paramsSerializer: () => {
				// 拼接对象到url
				let NewParams = urlEncode(params);
				NewParams = NewParams.substr(1); // 删除第一个字符
				return NewParams;
			},
		});
	return response.data;
};
