import service from '@/utils/service';


/*  监控信息 => 公示公告 */

/* 招标中标 */
// 列表
export const infoListBid = params => service.get('/yc/monitor/bulletin/bidding/list', { params })
	.then(res => res.data);
// 关注列表
export const focusListBid = params => service.get('/yc/bulletin/focus/bidding/list', { params })
	.then(res => res.data);
// 已读
export const readStatusBid = params => service.post('/yc/monitor/bulletin/bidding/read', params)
	.then(res => res.data);
// 关注/取消关注
export const attentionBid = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/bidding/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListBid = '/yc/monitor/bulletin/bidding/exportExcel';

/* 重大税收违法 */
// 列表
export const infoListIllegal = params => service.get('/yc/monitor/bulletin/tax/list', { params })
	.then(res => res.data);
// 已读
export const readStatusIllegal = params => service.post('/yc/monitor/bulletin/tax/read', params)
	.then(res => res.data);
// 关注/取消关注
export const attentionIllegal = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/tax/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListIllegal = '/yc/monitor/bulletin/tax/exportExcel';

// 关注列表
export const focusListIllegal = params => service.get('/yc/bulletin/focus/tax/list', { params })
	.then(res => res.data);


/* 环境行政处罚 */
// 列表
export const infoListPunish = params => service.get('/yc/monitor/bulletin/epb/list', { params })
	.then(res => res.data);
// 已读
export const readStatusPunish = params => service.post('/yc/monitor/bulletin/epb/read', params)
	.then(res => res.data);
// 关注/取消关注
export const attentionPunish = (params, isAttention) => service
	.post(`/yc/monitor/bulletin/epb/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListPunish = '/yc/monitor/bulletin/epb/exportExcel';

// 关注列表
export const focusListPunish = params => service.get('/yc/bulletin/focus/epb/list', { params })
	.then(res => res.data);

// 统计
export const infoCount = params => service.get('/yc/monitor/bulletin/unreadCountList', { params })
	.then(res => res.data);

/* 土地数据 */
// 出让结果列表 ===========
export const infoListResult = async (params) => {
	const response = await service.get('/yc/monitor/land/result/list', { params });
	return response.data;
};

// 标记为已读
export const readStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/land/result/markRead', params);
	return response.data;
};

// 全部标记为已读
export const readAllStatusResult = async (params) => {
	const response = await service.post('/yc/monitor/land/result/markReadAll', params);
	return response.data;
};

// 关注
export const attentionFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/land/result/follow', params);
	return response.data;
};

// 取消关注
export const attentionUnFollowResult = async (params) => {
	const response = await service.post('/yc/monitor/land/result/unFollow', params);
	return response.data;
};

// 导出excel
export const exportListResult = '/yc/monitor/land/result/export';

// =======================
export default {
	infoListBid,
	readStatusBid,
	attentionBid,
	exportListBid,
	focusListBid,
	infoListIllegal,
	readStatusIllegal,
	attentionIllegal,
	exportListIllegal,
	focusListIllegal,
	infoListPunish,
	readStatusPunish,
	attentionPunish,
	exportListPunish,
	focusListPunish,
	infoCount,
	infoListResult,
	readStatusResult,
	readAllStatusResult,
	attentionFollowResult,
	attentionUnFollowResult,
	exportListResult,
};
