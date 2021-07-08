//  监控信息->经营风险->限制高消费
import service from 'service';

const limitConsumption = {
	// 导出
	exportList: '/yc/monitor/execEndCase/export',
	// 收藏/批量收藏
	follow: params => service.post('/yc/monitor/execEndCase/follow', params).then(res => res.data),
	// 取消收藏/批量取消收藏
	unFollow: params => service.post('/yc/monitor/execEndCase/unfollow', params).then(res => res.data),
	// 收藏列表
	followList: params => service.post('/yc/monitor/execEndCase/follow/list', params).then(res => res.data),
	// GET列表
	list: params => service.post('/yc/monitor/execEndCase/list', params).then(res => res.data),
	// 已读
	read: params => service.post('/yc/monitor/execEndCase/markRead', params).then(res => res.data),
};
export default limitConsumption;
