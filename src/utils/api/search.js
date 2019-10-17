import service from '@/utils/service';

import { urlEncode } from '@/utils';
/**
 * 【首页接口】
 * @returns {Promise<*>}
 * @param params
 */
// 金融全文搜索
export const finance = async (params) => {
	const response = await service.get('/yc/information/finance/search', { params });
	return response.data;
};
// 金融全部导出(前1000条数据)
export const exportFinanceAll = '/yc/information/finance/exportAll';

// 金融本页导出
export const exportFinanceCurrent = '/yc/information/finance/export';

// 文书金融全文搜索
export const judgement = async (params) => {
	const response = await service.get('/yc/information/judgement/search', { params });
	return response.data;
};

// 文书全部导出(前1000条数据)
export const exportWritAll = '/yc/information/judgement/exportAll';

// 文书本页导出
export const exportWritCurrent = '/yc/information/judgement/export';

// 拍卖信息搜索 [zhousai]
export const fullAssetSearch = async (params) => {
	const response = await service.get('/yc/doc/search/fullAssetSearch', { params });
	return response.data;
};
// 拍卖信息导出(前1000条数据)
export const fullAssetSearchExport = '/yc/doc/search/fullAssetSearchExport';

// 涉诉信息 => 数量 [zhousai]
export const relationSearchCount = async (params) => {
	const response = await service.get('/yc/doc/search/relationSearchCount',
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
	const response = await service.get('/yc/doc/search/ktggRelationSearch',
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
// 涉诉信息 => 开庭公告导出 [zhousai]
export const ktggRelationSerachExport = '/yc/doc/search/ktggRelationSerachExport';

// 涉诉信息 => 立案信息 [zhousai]
export const trialRelationSearch = async (params) => {
	const response = await service.get('/yc/doc/search/trialRelationSearch',
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
// 涉诉信息 => 立案信息导出 [zhousai]
export const trialRelationSearchExport = '/yc/doc/search/trialRelationSearchExport';
