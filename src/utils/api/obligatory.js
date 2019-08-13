import service from '../service';
import { baseUrl } from './index';

/**
 * 【核销管理接口】
 * @param id
 * @param type
 */

// 可核销记录列表
export const getVerificationRecordListData = async (params) => {
	const response = await service.get(`${baseUrl}/yc/obligatory/getVerificationRecordList`, { params });
	return response.data;
};

// 导出可核销记录列表
export const getexportVerificationRecordList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/obligatory/exportVerificationRecordList`, { params });
	return response.request;
};
