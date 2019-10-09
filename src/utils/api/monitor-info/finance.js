import service from '@/utils/service';


/*  监控信息=>金融资产=>竞价项目[C.H Wong] 6 */
// 破产监控列表页
export const infoListBid = params => service.get('/yc/monitor/auctionBidding/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionListBid = params => service.get('/yc/monitor/auctionBidding/attentionList', { params })
	.then(res => res.data);

// 关注 [批量]
export const followBid = params => service.post('/yc/monitor/auctionBidding/followBatch', params)
	.then(res => res.data);

// 关注 [单个]
export const followSingleBid = params => service.post('/yc/monitor/auctionBidding/follow', params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingleBid = params => service.post('/yc/monitor/auctionBidding/unfollow', params)
	.then(res => res.data);

// 导出excel
export const exportListBid = '/yc/monitor/auctionBidding/exportExcel';

/* 监控信息=>金融资产=>公示项目 监控[C.H Wong] 9 */

export const infoListPub = params => service.get('/yc/monitor/finance/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionListPub = params => service.get('/yc/monitor/finance/attentionList', { params })
	.then(res => res.data);

// 已读
export const readStatus = params => service.post('/yc/monitor/finance/markRead', params)
	.then(res => res.data);

// 全部标记已读
export const readStatusAll = params => service.post('/yc/monitor/finance/markReadAll', params)
	.then(res => res.data);

// 批量标记已读
export const readStatusBatch = params => service.post('/yc/monitor/finance/markReadBatch', params)
	.then(res => res.data);


// 关注 [批量]
export const followPub = params => service.post('/yc/monitor/finance/followBatch', params)
	.then(res => res.data);

// 关注 [单个]
export const followSinglePub = params => service.post('/yc/monitor/finance/follow', params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSinglePub = params => service.post('/yc/monitor/finance/unfollow', params)
	.then(res => res.data);

// 导出excel
export const exportListPub = '/yc/monitor/finance/exportExcel';

// =============== 金融资产 ==============

// 金融资产列表 ===========
export const infoListResult = async (params) => {
	const response = await service.get('/yc/monitor/finance/pledge/list', { params });
	return response.data;
};

// 标记为已读
export const readStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/finance/pledge/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/finance/pledge/markReadAll', params);
	return response.data;
};

// 关注
export const followResult = async (params) => {
	const response = await service.post('/yc/monitor/finance/pledge/follow', params);
	return response.data;
};

// 取消关注
export const unFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/finance/pledge/unFollow', params);
	return response.data;
};

// 导出excel
export const exportListResult = '/yc/monitor/finance/pledge/export';

export default {
	infoListBid,
	attentionListBid,
	followBid,
	followSingleBid,
	unFollowSingleBid,
	exportListBid,
	infoListPub,
	attentionListPub,
	followPub,
	followSinglePub,
	unFollowSinglePub,
	exportListPub,
	infoListResult,
	readStatusResult,
	readAllStatusResult,
	followResult,
	unFollowResult,
	exportListResult,
};
