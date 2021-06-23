//  监控信息->经营风险->被执行信息
import service from 'service';

const limitConsumption = {
	// 导出
	exportList: '/yc/monitor/limitHeight/export',
	// 收藏/批量收藏
	follow: params => service.post('/yc/monitor/limitHeight/follow', params).then(res => res.data),
	// 取消收藏/批量取消收藏
	unFollow: params => service.post('/yc/monitor/limitHeight/unFollow', params).then(res => res.data),
	// 收藏列表
	followList: params => service.get('/yc/monitor/limitHeight/follow/list', { params }).then(res => res.data),
	// POST列表1
	list: params => service.post('/yc/obligor/monitor/risk/execPerson/list', { params }).then(res => res.data),
	// 已读
	read: params => service.post('/yc/monitor/limitHeight/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: params => service.post('/yc/monitor/limitHeight/markReadAll', params).then(res => res.data),
};
export default limitConsumption;
