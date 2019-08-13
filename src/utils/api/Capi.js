import service from '../service';
import { secUrl, baseUrl } from './index';

export const getCompanyList = async (companyName) => {
	const response = await service.get(`${secUrl}/bms/company/getCompanyList?companyName=${companyName}`);
	return response.data;
};

export const searchAsset = async (body) => {
	const response = await service.post(`${secUrl}/bms/assetSearch/searchAsset/`,
		body);
	return response.data;
};
export const searchExtractAsset = async (body) => {
	const response = await service.post(`${secUrl}/bms/assetSearch/searchExtractAsset`,
		body);
	return response.data;
};
export const searchFinancePublic = async (body) => {
	const response = await service.post(`${secUrl}/bms/assetSearch/searchFinancePublic/`,
		body);
	return response.data;
};
export const searchFinanceAuction = async (body) => {
	const response = await service.post(`${secUrl}/bms/assetSearch/searchFinanceAuction/`,
		body);
	return response.data;
};
export const searchCompanyInfo = async (body) => {
	const response = await service.post(`${secUrl}/bms/company/searchCompanyInfo/`,
		body);
	return response.data;
};
export const searchEquityInfo = async (body) => {
	const response = await service.post(`${secUrl}/bms/company/searchEquityInfo/`,
		body);
	return response.data;
};
export const searchMortgageInfo = async (body) => {
	const response = await service.post(`${secUrl}/bms/company/searchMortgageInfo/`,
		body);
	return response.data;
};
export const searchPunishmentInfo = async (body) => {
	const response = await service.post(`${secUrl}/bms/company/searchPunishmentInfo/`,
		body);
	return response.data;
};
export const searchBankRuptcy = async (body) => {
	const response = await service.post(`${secUrl}/bms/match/searchBankRuptcy`,
		body);
	return response.data;
};
export const searchBidding = async (body) => {
	const response = await service.post(`${secUrl}/bms/match/searchBidding`,
		body);
	return response.data;
};
export const searchTax = async (body) => {
	const response = await service.post(`${secUrl}/bms/match/searchTax`,
		body);
	return response.data;
};
export const searchLimitHigh = async (body) => {
	const response = await service.post(`${secUrl}/bms/match/searchLimitHigh`,
		body);
	return response.data;
};
export const getKeyList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/node/common/getKeyList`, { params });
	return response.data;
};
