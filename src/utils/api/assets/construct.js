import s from '@/utils/service'; // axios

//  在建工程 - 建设单位
const ConstructApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/projectInfo/follow', params).then(res => res.data),
	// 导出
	exportList: '/yc/monitor/onBuild/projectInfo/export',
	// POST收藏 => 收藏
	followAttention: params => s.post('/yc/monitor/onBuild/projectInfo/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/projectInfo/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/projectInfo/follow/list-count', {}).then(res => Object.assign(res.data, { code: 200, data: 122 })),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/projectInfo/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/risk/abnormal/list', { params }).then(res => Object.assign(res.data, {
		code: 200,
		data: {
			list: [
				{
					title: '潍坊宝通街绿化养护管理和完善提升',
					id: 1,
					projectType: 1,
					nature: '改建',
					totalInvestment: 222222221,
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
					planBeginTime: '2020-12-02',
					approvalTime: '2020-03-23',
					gmtModified: '2020-02-22',
					isRead: 0,
					parties: [
						{
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
						},
					],
				},
				{
					title: '潍坊宝通街绿化养护管理和完善提升',
					nature: '改建',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
					totalInvestment: 7857878787,
					planBeginTime: '2020-12-02',
					approvalTime: '2020-03-23',
					gmtModified: '2020-02-22',
					url: 'http://www.baidu.com',
					id: 2,
					isRead: 1,
					projectType: 3,
					parties: [
						{
							obligorId: '90930',
							obligorName: '天喔食品（集团）有限公司',
						},
					],
				},
				{
					title: '潍坊宝通街绿化养护管理和完善提升',
					nature: '改建',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
					totalInvestment: 7857878787,
					planBeginTime: '2020-12-02',
					approvalTime: '2020-03-23',
					gmtModified: '2020-02-22',
					url: 'http://www.baidu.com',
					id: 2,
					isRead: 0,
					projectType: 3,
					parties: [
						{
							obligorId: '90930',
							obligorName: '天喔食品（集团）有限公司',
						},
					],
				},
			],
			total: 2233,
		},
	})),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/projectInfo/follow/list-count', { params }).then(res => Object.assign(res.data, { code: 200, data: 80, id: 'YC021201' })),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/projectInfo/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/projectInfo/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/projectInfo/unFollow', params).then(res => res.data),
};

//  在建工程 - 中标单位
const WinbidApi = {
	// GET导出
	exportList: '/yc/monitor/onBuild/bidding/export',
	// GET列表
	list: params => s.get('/yc/monitor/onBuild/bidding/projectBiddingList', { params }).then(res => Object.assign(res.data, {
		code: 200,
		data: {
			list: [
				{
					winningTime: '202-11-11',
					parties: [
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',
						},
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',

						},
					],
					isRead: 0,
					biddingType: '施工',
					title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
					biddingMode: '公开招标',
					winningPrice: 22212121212,
					gmtModified: '2020-11-02',
					url: 'http://www.baidu.com',
				},
				{
					isRead: 0,
					winningTime: '202-11-11',
					parties: [
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',
						},
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',

						},
					],
					biddingType: '施工',
					title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
					biddingMode: '公开招标',
					winningPrice: 22212121212,
					gmtModified: '2020-11-02',
				},
				{
					winningTime: '202-11-11',
					isRead: 1,
					parties: [
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',
						},
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',

						},
					],
					biddingType: '施工',
					title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
					biddingMode: '公开招标',
					winningPrice: 22212121212,
					gmtModified: '2020-11-02',
				},
				{
					winningTime: '202-11-11',
					isRead: 0,
					parties: [
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',
						},
						{
							obligorId: '38293829',
							obligorName: '天喔食品（集团）有限公司',

						},
					],
					biddingType: '施工',
					title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
					biddingMode: '公开招标',
					winningPrice: 22212121212,
					gmtModified: '2020-11-02',
				},
			],
			total: 4343,
		},
	})),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/bidding/projectBiddingCount', { params }).then(res => Object.assign(res.data, { code: 200, data: 4390, id: 'YC021202' })),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/bidding/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/bidding/markReadAll', {}).then(res => res.data),
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/bidding/follow', params).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/bidding/unFollow', params).then(res => res.data),
	// POST收藏 => 收藏<
	followAttention: params => s.post('/yc/monitor/onBuild/bidding/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/bidding/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/bidding/follow/list-count', {}).then(res => Object.assign(res.data, { code: 200, data: 899 })),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/bidding/follow/unFollow', params).then(res => res.data),
};

//  在建工程 - 施工单位
const UnderwayApi = {
	// POST收藏
	attention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow', params).then(res => res.data),
	// GET导出
	exportList: '/yc/monitor/onBuild/constructionLicence/export',
	// POST收藏 => 收藏
	followAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow/follow', params).then(res => res.data),
	// GET收藏 => 列表
	followList: params => s.get('/yc/monitor/onBuild/constructionLicence/follow/list', { params }).then(res => res.data),
	// GET收藏 => 列表Count
	followListCount: () => s.get('/yc/monitor/onBuild/constructionLicence/follow/list-count', {}).then(res => Object.assign(res.data, { code: 200, data: 332 })),
	// POST收藏 => 取消收藏
	followUnAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/follow/unFollow', params).then(res => res.data),
	// GET列表
	list: params => s.get('/yc/monitor/onBuild/constructionLicence/constructionLicenceList', { params }).then(res => Object.assign(res.data, {
		code: 200,
		data: {
			list: [
				{
					isRead: 0,
					url: 'http://www.baidu.com',
					gmtModified: '2020-12-11',
					issuingTime: '2019-11-02',
					parties: [
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [0, 1],
						},
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [0, 1],
						},
					],
					title: '金光大道东段及海旺路工程工程总承包',
					contractPrice: 28983974987,
					projectPeriod: '2019.10.01 至 2019.12.30',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
				},
				{
					isRead: 0,
					gmtModified: '2020-12-11',
					issuingTime: '2019-11-02',
					parties: [
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [0, 1],
						},
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [0, 1],
						},
					],
					title: '金光大道东段及海旺路工程工程总承包',
					contractPrice: 28983974987,
					projectPeriod: '2019.10.01 至 2019.12.30',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
				},
				{
					isRead: 1,
					gmtModified: '2020-12-11',
					issuingTime: '2019-11-02',
					parties: [
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [0, 1],
						},
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [6, 1],
						},
					],
					title: '金光大道东段及海旺路工程工程总承包',
					contractPrice: 28983974987,
					projectPeriod: '2019.10.01 至 2019.12.30',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
				},
				{
					isRead: 1,
					gmtModified: '2020-12-11',
					issuingTime: '2019-11-02',
					parties: [
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [3, 4],
						},
						{
							obligorName: '天喔食品（集团）有限公司',
							obligorId: '4829843',
							role: [4, 11],
						},
					],
					title: '金光大道东段及海旺路工程工程总承包',
					contractPrice: 28983974987,
					projectPeriod: '2019.10.01 至 2019.12.30',
					projectLocation: '广东省佛山市南海区桂城街道半岛路',
				},
			],
			total: 9092123,
		},
	})),
	// GET列表count
	listCount: params => s.get('/yc/monitor/onBuild/constructionLicence/constructionLicenceCount', { params }).then(res => Object.assign(res.data, {
		code: 200, data: 390, id: 'YC021203',
	})),
	// POST已读
	read: params => s.post('/yc/monitor/onBuild/constructionLicence/markRead', params).then(res => res.data),
	// POST全部已读
	readAll: () => s.post('/yc/monitor/onBuild/constructionLicence/markReadAll', {}).then(res => res.data),
	// POST取消收藏
	unAttention: params => s.post('/yc/monitor/onBuild/constructionLicence/unFollow', params).then(res => res.data),
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
