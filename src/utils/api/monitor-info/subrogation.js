import s from '@/utils/service';

// (新)监控信息 => 代位权 => 立案监控 [ZhouSai]11
const Trial = {
	// POST收藏
	attention: params => s.post('/yc/monitor/trial/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/trial/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/trial/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/trial/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/trial/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/trial/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/trial/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/trial/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/trial/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/trial/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/trial/un-attention', params).then(res => res.data),
};
// (新)监控信息 => 代位权 => 开庭公告 [ZhouSai]11
const Court = {
	// POST收藏
	attention: params => s.post('/yc/monitor/court/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/court/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/court/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/court/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/court/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/court/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/court/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/court/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/court/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/court/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/court/un-attention', params).then(res => res.data),
};
// (新)监控信息 => 代位权 => 裁判文书 [ZhouSai]11
const Judgment = {
	// POST收藏
	attention: params => s.post('/yc/monitor/judgment/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/judgment/export',
	// POST关注 => 收藏<
	followAttention: params => s.post('/yc/monitor/judgment/follow/attention', params).then(res => res.data),
	// GET关注 => 列表
	followList: params => s.get('/yc/monitor/judgment/follow/list', { params }).then(res => res.data),
	// GET关注 => 列表Count
	followListCount: () => s.get('/yc/monitor/judgment/follow/list-count', {}).then(res => res.data),
	// POST关注 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/judgment/follow/un-attention', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/judgment/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/judgment/list-count', { params }).then(res => res.data),
	// POST已读
	read: params => s.post('/yc/monitor/judgment/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/judgment/read-all', { }).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/judgment/un-attention', params).then(res => res.data),
};
// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 1) return Trial[res];
	if (type === 2) return Court[res];
	if (type === 2) return Judgment[res];
	return Trial[res];
};
export { Court, Trial, Judgment };
export default Api;
