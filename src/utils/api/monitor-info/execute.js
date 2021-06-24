//  监控信息->经营风险->被执行信息
import service from 'service';

const limitConsumption = {
	// 导出
	exportList: '/yc/monitor/execPerson/export',
	// 收藏/批量收藏
	follow: params => service.post('/yc/monitor/execPerson/follow', params).then(res => res.data),
	// 取消收藏/批量取消收藏
	unFollow: params => service.post('/yc/monitor/execPerson/unfollow', params).then(res => res.data),
	// 收藏列表
	followList: params => service.post('/yc/monitor/execPerson/follow/list', params).then(res => res.data),
	// POST列表1
	list: params => service.post('/yc/monitor/execPerson/list', params).then(res => res.data),
	// POST全部已读,已读
	read: params => service.post('/yc/monitor/execPerson/markRead', params).then(res => res.data),
	// POST全部已读
	listCount: params => service.post('/yc/monitor/execPerson/listCount', params).then(res => res.data),
};
export default limitConsumption;
