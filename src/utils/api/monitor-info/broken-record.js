import service from '@/utils/service';


/*  风险监控=>失信记录相关接口 */

// 破产监控列表页
export const infoList = params => service.get('/yc/monitor/dishonest/list', { params })
	.then(res => res.data);

// 关注列表
export const attentionList = params => service.get('/yc/monitor/dishonest/follow/list', { params })
	.then(res => res.data);

// 标记已读[批量]
export const readStatus = params => service.post('/yc/monitor/dishonest/read', params)
	.then(res => res.data);

// 全部已读
export const readAll = params => service.post('/yc/monitor/dishonest/read-all', params)
	.then(res => res.data);

// 关注 [批量]
export const follow = params => service.post('/yc/monitor/dishonest/attention', params)
	.then(res => res.data);

// 关注 [单个]
export const followSingle = params => service.post('/yc/monitor/dishonest/attention', params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingle = params => service.post('/yc/monitor/dishonest/un-attention', params)
	.then(res => res.data);

// 导出excel
export const exportList = '/yc/monitor/dishonest/export';
