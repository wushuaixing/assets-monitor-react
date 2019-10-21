import s from '@/utils/service'; // axios

//  风险监控 => 经营风险 => 经营异常[zhousai]11
const Abnormal = {
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/abnormal/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/risk/abnormal/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/abnormal/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/risk/abnormal/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/abnormal/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/risk/abnormal/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/abnormal/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/risk/abnormal/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/risk/abnormal/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/abnormal/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/risk/abnormal/un-attention', params).then(res => res.data),
};

//   监控信息->经营风险->工商变更[huxin]11
const Change = {
	// GET导出
	exportList: '/yc/monitor/risk/change/export',
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/change/follow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/change/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/risk/change/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/risk/change/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/change/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/risk/change/unFollow', params).then(res => res.data),
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/change/follow/follow', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/risk/change/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/change/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/risk/change/follow/unFollow', params).then(res => res.data),
};

//  风险监控 => 经营风险 => 经营异常[zhousai]11
const Illegal = {
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/illegal/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/risk/illegal/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/illegal/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/risk/illegal/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/illegal/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/risk/illegal/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/illegal/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/risk/illegal/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/risk/illegal/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/illegal/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/risk/illegal/un-attention', params).then(res => res.data),
};

//  监控信息->经营风险->行政处罚[huxin]11
const Punishment = {
	// GET导出
	exportList: '/yc/monitor/risk/punishment/export',
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/punishment/follow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/punishment/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/risk/punishment/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/risk/punishment/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/punishment/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/risk/punishment/unFollow', params).then(res => res.data),
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/punishment/follow/follow', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/risk/punishment/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/punishment/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/risk/punishment/follow/unFollow', params).then(res => res.data),
};

// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 'YC030301') return Abnormal[res];
	if (type === 'YC030302') return Change[res];
	if (type === 'YC030303') return Illegal[res];
	if (type === 'YC030305') return Punishment[res];
	return Abnormal[res];
};
export {
	Abnormal, Change, Illegal, Punishment,
};
export default Api;
