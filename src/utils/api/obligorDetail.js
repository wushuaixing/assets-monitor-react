import service from '../service';
import { baseUrl } from './index';


// 获取档案信息详情
export const getObligorArchivesInfo = async (params) => {
	const response = await service.get(`${baseUrl}/jms/archives/getObligorArchivesInfo`, { params });
	return response.data;
};

// 获取档案信息历史版本查询记录列表
export const getObligorArchivesLogList = async (params) => {
	const response = await service.get(`${baseUrl}/jms/archives/getObligorArchivesLogList`, { params });
	return response.data;
};

// 信息查询债务人历史数据
export const getQueryInfo = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getQueryInfo`, { params });
	return response.data;
};

// 保存监控规则
export const saveMonitorRule = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/saveMonitorRule`, { params });
	return response.data;
};
// 导出监控规则数据
export const exportMonitorRule = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/exportMonitorRule`, { params });
	return response.data;
};
// 获取用户下机构名称
export const getCompanyName = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/getCompanyName`, { params });
	return response.data;
};
// 获取机构名称
export const getRoleName = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/getRoleName`, { params });
	return response.data;
};
// 保存监控消息
export const saveMonitorMessage = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/saveMonitorMessage`, { params });
	return response.data;
};
// 获取所有机构
export const getOrgList = async (params) => {
	const response = await service.get(`${baseUrl}/jms/monitor/monitor/getOrgList`, { params });
	return response.data;
};
// 获取档案跟进信息
export const getObligorProcessList = async (params) => {
	const response = await service.get(`${baseUrl}/jms/archives/getObligorProcessList`, { params });
	return response.data;
};
// 获取档案跟进信息
export const getQueryHistoryCount = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getQueryHistoryCount`, { params });
	return response.data;
};
// 常规信息查询结果
export const getManualInfo = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getManualInfo`, { params });
	return response.data;
};
// 文书信息查询结果
export const getDocumentList = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getDocumentList`, { params });
	return response.data;
};
// 发送查询结果
export const sendMessage = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/sendMessage`, { params });
	return response.data;
};
// 获取同机构下的所有用户信息
export const getAllUserByOrgIdshihao = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getAllUserByOrgIdshihao`, { params });
	return response.data;
};
// 下载全部文书信息
export const downloadAll = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/downloadAll`, { params });
	return response.data;
};
// 导出PDF文件
export const downloadPDF = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/downloadPDF`, { params } );
	return response.data;
};
// 文书信息查询详情
export const getDocumentDetail = async (params) => {
	const response = await service.get(`${baseUrl}/jms/court/query/getDocumentDetail`, { params });
	return response.data;
};
