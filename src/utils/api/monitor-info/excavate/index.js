import service from '@/utils/service';
/*
* 2.0 信息概览资产挖掘卡片接口
*
*/

// 资产拍卖
export const auctionCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/auction', { params });
	return Object.assign(response.data, { name: 'asset' });
};

// 土地数据
export const landCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/land', { params });
	return Object.assign(response.data, { name: 'land' });
};

// 无形资产
export const intangibleCard = async (params) => {
	const response = await service.get('/yc/index/information/overview/intangible', { params });
	return Object.assign(response.data, { name: 'intangible' });
};
