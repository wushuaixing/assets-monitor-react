import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/*  监控信息=>金融资产=>竞价项目[C.H Wong] 6 */
// 破产监控列表页
export const infoListBid = params => service.get(`${baseUrl}/yc/monitor/auctionBidding/list`, { params })
	.then(res => res.data);

// 关注列表
export const attentionListBid = params => service.get(`${baseUrl}/yc/monitor/auctionBidding/attentionList`, { params })
	.then(res => res.data);

// 关注 [批量]
export const followBid = params => service.post(`${baseUrl}/yc/monitor/auctionBidding/followBatch`, params)
	.then(res => res.data);

// 关注 [单个]
export const followSingleBid = params => service.post(`${baseUrl}/yc/monitor/auctionBidding/follow`, params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingleBid = params => service.post(`${baseUrl}/yc/monitor/auctionBidding/unfollow`, params)
	.then(res => res.data);

// 导出excel
export const exportListBid = `${baseUrl}/yc/monitor/auctionBidding/exportExcel`;

/* 监控信息=>金融资产=>公示项目 监控[C.H Wong] 9 */

export const infoListPub = params => service.get(`${baseUrl}/yc/monitor/finance/list`, { params })
	.then(res => res.data);

// 关注列表
export const attentionListPub = params => service.get(`${baseUrl}/yc/monitor/finance/attentionList`, { params })
	.then(res => res.data);

// 已读
export const readStatus = params => service.post(`${baseUrl}/yc/monitor/finance/markRead`, params)
	.then(res => res.data);

// 全部标记已读
export const readStatusAll = params => service.post(`${baseUrl}/yc/monitor/finance/markReadAll`, params)
	.then(res => res.data);

// 批量标记已读
export const readStatusBatch = params => service.post(`${baseUrl}/yc/monitor/finance/markReadBatch`, params)
	.then(res => res.data);


// 关注 [批量]
export const followPub = params => service.post(`${baseUrl}/yc/monitor/finance/followBatch`, params)
	.then(res => res.data);

// 关注 [单个]
export const followSinglePub = params => service.post(`${baseUrl}/yc/monitor/finance/follow`, params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSinglePub = params => service.post(`${baseUrl}/yc/monitor/finance/unfollow`, params)
	.then(res => res.data);

// 导出excel
export const exportListPub = `${baseUrl}/yc/monitor/finance/exportExcel`;

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
};
