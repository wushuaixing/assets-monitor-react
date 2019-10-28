//  监控信息->经营风险->税收违法
import s from '@/utils/service';

const bidding = {
	// POST收藏
	attention: params => s.post('/yc/monitor/bidding/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/bidding/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/bidding/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/bidding/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/bidding/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/bidding/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/bidding/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/bidding/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/bidding/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/bidding/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/bidding/un-attention', params).then(res => res.data),
};
export default bidding;
