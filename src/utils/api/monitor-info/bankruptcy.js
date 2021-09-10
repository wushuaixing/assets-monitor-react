import service from 'service';


/*  监控信息=>破产监控相关接口 */

// 破产监控列表页
export const infoList = params => service.post('/yc/monitor/bankruptcyNew/list', params)
	.then(res => res.data);

// 收藏列表
export const attentionList = params => service.post('/yc/monitor/bankruptcyNew/follow/list', params)
	.then(res => res.data);

// 标记已读[批量]
export const readStatus = params => service.post('/yc/monitor/bankruptcyNew/markRead', params)
	.then(res => res.data);

// // 收藏 [批量]
// export const follow = params => service.post('/yc/monitor/bankruptcy/followBatch', params)
// 	.then(res => res.data);

// 收藏 [单个]
export const follow = params => service.post('/yc/monitor/bankruptcyNew/follow', params)
	.then(res => res.data);

// 取消收藏 [单个]
export const unFollow = params => service.post('/yc/monitor/bankruptcyNew/unfollow', params)
	.then(res => res.data);

// 导出excel
export const exportList = '/yc/monitor/bankruptcyNew/export';

// 立案弹窗
export const trialDetail = params => service.get('/yc/monitor/bankruptcy/trialDetail', { params })
	.then(res => res.data);

// 信息立案
export const infoTrialDetail = params => service.get('/yc/information/bankruptcy/trialDetail', { params })
	.then(res => res.data);


// 关联公告
export const relationNotice = params => service.get('/yc/monitor/bankruptcyNew/notices', { params })
	.then(res => res.data);

// 关联公告
export const markReadNotice = params => service.post('/yc/monitor/bankruptcyNew/markReadNotice', params)
	.then(res => res.data);

// 关联公告
export const listCount = () => service.post('/yc/monitor/bankruptcyNew/listCount', { isRead: 0 })
	.then(res => res.data);
