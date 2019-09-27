import service from '@/utils/service';


/*  监控信息=>破产监控相关接口 */

// 破产监控列表页
export const infoList = params => service.get('/yc/monitor/bankruptcy/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionList = params => service.get('/yc/monitor/bankruptcy/attentionList', { params })
	.then(res => res.data);

// 标记已读[批量]
export const readStatus = params => service.post('/yc/monitor/bankruptcy/markReadBatch', params)
	.then(res => res.data);

// 关注 [批量]
export const follow = params => service.post('/yc/monitor/bankruptcy/followBatch', params)
	.then(res => res.data);

// 关注 [单个]
export const followSingle = params => service.post('/yc/monitor/bankruptcy/follow', params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingle = params => service.post('/yc/monitor/bankruptcy/unfollow', params)
	.then(res => res.data);

// 导出excel
export const exportList = '/yc/monitor/bankruptcy/exportExcel';
