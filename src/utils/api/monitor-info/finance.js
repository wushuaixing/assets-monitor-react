import service from '@/utils/service';


/*  监控信息=>金融资产=>竞价项目[C.H Wong] 6 */
// 破产监控列表页
export const infoListBid = params => service.get('/yc/monitor/finance/auctionBidding/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionListBid = params => service.get('/yc/monitor/finance/auctionBidding/follow/list', { params })
	.then(res => res.data);

// 标记为已读
export const readStatusBid = async (params) => {
	const response = await service.post('/yc/monitor/finance/auctionBidding/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusBid = async (params) => {
	const response = await service.post('/yc/monitor/finance/auctionBidding/markReadAll', params);
	return response.data;
};

// 关注 [批量]
export const followBid = params => service.post('/yc/monitor/finance/auctionBidding/followBatch', params)
	.then(res => res.data);

// 关注 [单个]
export const followSingleBid = params => service.post('/yc/monitor/finance/auctionBidding/follow', params)
	.then(res => res.data);

// 竞价项目 关注列表数量统计
export const attentionFollowBidCount = params => service.get('/yc/monitor/finance/auctionBidding/follow/listCount', { params })
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingleBid = params => service.post('/yc/monitor/finance/auctionBidding/unFollow', params)
	.then(res => res.data);

// 导出excel
export const exportListBid = '/yc/monitor/finance/auctionBidding/export';


/* 监控信息=>金融资产=>公示项目 监控[C.H Wong] 9 */

export const infoListPub = params => service.get('/yc/monitor/finance/finance/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionListPub = params => service.get('/yc/monitor/finance/finance/follow/list', { params })
	.then(res => res.data);

// 公示项目 数量统计
export const attentionFollowPubCount = params => service.get('/yc/monitor/finance/finance/follow/listCount', { params })
	.then(res => res.data);

// 已读
export const readStatus = params => service.post('/yc/monitor/finance/finance/markRead', params)
	.then(res => res.data);

// 全部标记已读
export const readStatusAll = params => service.post('/yc/monitor/finance/finance/markReadAll', params)
	.then(res => res.data);

// 批量标记已读
export const readStatusBatch = params => service.post('/yc/monitor/finance/finance/markReadBatch', params)
	.then(res => res.data);


// 关注 [批量]
export const followPub = params => service.post('/yc/monitor/finance/finance/follow', params)
	.then(res => res.data);

// 关注 [单个]
export const followSinglePub = params => service.post('/yc/monitor/finance/finance/follow', params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSinglePub = params => service.post('/yc/monitor/finance/finance/unFollow', params)
	.then(res => res.data);

// 导出excel
export const exportListPub = '/yc/monitor/finance/finance/export';

// =============== 金融资产 ==============

// 金融资产 股权质押 列表 ===========
// 股权质押 列表
export const infoListResult = async (params) => {
	const response = await service.get('/yc/monitor/finance/pledge/list', { params });
	return response.data;
};
// 股权质押 关注列表
export const attentionFollowListResult = async (params) => {
	const response = await service.get('/yc/monitor/finance/pledge/follow/list', { params });
	return response.data;
};

// 关注list数量
export const attentionFollowResultCount = async (params) => {
	const response = await service.get('/yc/monitor/finance/pledge/follow/list-count', { params });
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
	attentionFollowBidCount,
	exportListBid,
	infoListPub,
	attentionListPub,
	followPub,
	followSinglePub,
	unFollowSinglePub,
	attentionFollowPubCount,
	exportListPub,
	infoListResult,
	attentionFollowListResult,
	attentionFollowResultCount,
	readStatusResult,
	readAllStatusResult,
	followResult,
	unFollowResult,
	exportListResult,
};
