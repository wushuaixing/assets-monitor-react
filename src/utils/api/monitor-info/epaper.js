//  监控信息->电子报
import s from 'service';

const epaper = {
	// POST收藏
	attention: params => s.post('/yc/monitor/electronicNewspaper/follow', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/electronicNewspaper/export',
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/bidding/follow/list-count', {}).then(res => res.data),
	// POST列表
	list: params => s.post('/yc/monitor/electronicNewspaper/list', params).then(res => res.data),
	// POST数量
	listCount: params => s.post('/yc/monitor/electronicNewspaper/listCount', params).then(res => res.data),
	// POST已读 全部已读
	read: params => s.post('/yc/monitor/electronicNewspaper/markRead', params).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/electronicNewspaper/unfollow', params).then(res => res.data),
};
export default epaper;
