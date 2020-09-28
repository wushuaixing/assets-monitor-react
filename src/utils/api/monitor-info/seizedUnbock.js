//  监控信息->经营风险->查解封资产
import service from '@/utils/service';

const seizedUnblock = {
	// 导出
	exportList: '/yc/monitor/unseal/export',
	// 关注/批量关注
	follow: params => service.post('/yc/monitor/unseal/follow', params).then(res => res.data),
	// 取消关注/批量取消关注
	unFollow: params => service.post('/yc/monitor/unseal/unFollow', params).then(res => res.data),
	// GET列表
	list: params => service.get('/yc/monitor/unseal/unsealList', { params }).then(res => res.data),
	// 已读
	read: params => service.post('/yc/monitor/unseal/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: params => service.post('/yc/monitor/unseal/markReadAll', params).then(res => res.data),
};
export default seizedUnblock;
