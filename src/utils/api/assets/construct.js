import s from '@/utils/service'; // axios

//  在建工程 - 建设单位
const ConstructApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/abnormal/attention', params).then(res => res.data),
	// 导出
	exportList: '/yc/monitor/onBuild/projectInfo/export',
	// POST收藏 => 收藏
	followAttention: params => s.post('/yc/monitor/risk/abnormal/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/risk/abnormal/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/abnormal/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/projectInfo/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/abnormal/list', { params }).then(res => Object.assign(res.data, {
		code: 200,
		data: [{
			title: '潍坊宝通街绿化养护管理和完善提升',
			id: 1,
			parties: [{
				obligorId: '90930',
				obligorName: '天喔食品（集团）有限公司',
			},
			{
				obligorId: '90930',
				obligorName: '天喔食品（集团）有限公司',
			},
			{
				obligorId: '90930',
				obligorName: '天喔食品（集团）有限公司',
			}],

		}],
	})),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/projectInfo/follow/list-count', { params }).then(res => Object.assign(res.data, { code: 200, data: 80 })),
	// POST已读
	read: params => s.post('/yc/monitor/risk/abnormal/read', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/abnormal/read-all', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/projectInfo/unFollow', params).then(res => res.data),
};

//  在建工程 - 中标单位
const WinbidApi = {
	// GET导出
	exportList: '/yc/monitor/risk/change/export',
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/change/follow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/change/list', { params }).then(res => res.data),
	// GET列表count
	listCount: params => s.get('/yc/monitor/risk/change/list-count', { params }).then(res => Object.assign(res.data, {code: 200})),
	// POST已读
	read: params => s.post('/yc/monitor/risk/change/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/risk/change/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/risk/change/unFollow', params).then(res => res.data),
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/change/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/risk/change/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/change/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/risk/change/follow/unFollow', params).then(res => res.data),
};

//  在建工程 - 施工单位
const UnderwayApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/risk/illegal/attention', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/risk/illegal/export',
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/risk/illegal/follow/attention', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/risk/illegal/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/risk/illegal/follow/list-count', {}).then(res => res.data),
	// POST收藏 => 取消收藏
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

// 获取不同类型的 api 接口
const Api = (type, res) => {
	if (type === 'YC021201') return ConstructApi[res];
	if (type === 'YC021202') return WinbidApi[res];
	if (type === 'YC021203') return UnderwayApi[res];
	return ConstructApi[res];
};
export {
	ConstructApi, WinbidApi, UnderwayApi,
};
export default Api;
