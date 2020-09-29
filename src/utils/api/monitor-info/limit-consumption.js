//  监控信息->经营风险->限制高消费
import service from '@/utils/service';

const limitConsumption = {
	// 导出
	exportList: '/yc/monitor/limitHeight/export',
	// 关注/批量关注
	follow: params => service.post('/yc/monitor/limitHeight/follow', params).then(res => res.data),
	// 取消关注/批量取消关注
	unFollow: params => service.post('/yc/monitor/limitHeight/unFollow', params).then(res => res.data),
	// GET列表
	list: params => service.get('/yc/monitor/limitHeight/LimitHeightList', { params }).then(res => res.data),
	// 已读
	read: params => service.post('/yc/monitor/limitHeight/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: params => service.post('/yc/monitor/limitHeight/markReadAll', params).then(res => res.data),
};
export default limitConsumption;
