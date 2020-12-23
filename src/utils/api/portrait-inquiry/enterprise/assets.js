import service from '@/utils/service';

const assets = {
	auction: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		params: { companyId: 3280438 },
		list: params => service.get('/yc/search/portrait/company/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/auction/precision/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	blurry: {
		id: 10102,
		name: '资产-资产拍卖-模糊匹配',
		params: { companyId: 3280438 },
		list: params => service.get('/yc/search/portrait/company/asset/auction/vague/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/auction/vague/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	trial: {
		id: 10201,
		name: '资产-代位权-立案',
		params: { partiesName: '国网浙江省电力公司宁波供电公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/trial/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	court: {
		id: 10202,
		name: '资产-代位权-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/court-notice/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/court-notice/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	judgment: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	result: {
		id: 10301,
		name: '资产-土地信息-出让结果',
		list: params => service.get('/yc/search/portrait/company/asset/land/transfer', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transfer' })),
	},
	transfer: {
		id: 10302,
		name: '资产-土地信息-土地转让',
		list: params => service.get('/yc/search/portrait/company/asset/land/transaction', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transaction' })),
	},
	landMortgage: {
		id: 10303,
		name: '资产-土地信息-土地抵押',
		list: params => service.get('/yc/search/portrait/company/asset/land/mortgage', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mortgage' })),
	},
	pledge: {
		id: 10401,
		name: '资产-股权质押-股权质押',
		params: { obligorName: '上海浦东物流云计算有限公司', role: 0 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgor', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'pledgor' })),
	},
	mortgage: {
		id: 10402,
		name: '资产-股权质押-股权质权',
		params: { obligorName: '投资', role: 1 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgee', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'pledgee' })),
	},
	pledgeD: {
		id: 10501,
		name: '资产-动产抵押-抵押',
		params: { obligorName: '沈阳铠龙兴业锻铸有限公司', role: 0, regDateStart: '2019-04-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/owner', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'owner' })),
	},
	mortgageD: {
		id: 10502,
		name: '资产-动产抵押-抵押权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/people', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'people' })),
	},
	emission: {
		id: 10601,
		name: '资产-无形资产-排污权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/emission/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/intangible/listCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'emission' })),
	},
	mining: {
		id: 10602,
		name: '资产-无形资产-矿业权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/intangible/listCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'mining' })),
	},
	trademark: {
		id: 10603,
		name: '资产-无形资产-商标专利',
		list: params => service.get('/yc/search/portrait/company/asset/intangible/trademark/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/intangible/listCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'trademark' })),
	},
	construct: {
		id: 10604,
		name: '资产-无形资产-建筑建造资质',
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/intangible/listCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	bidding: {
		id: 10701,
		name: '资产-招投标',
		list: params => service.get('/yc/search/portrait/company/asset/bidding/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/bidding/listCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	financialBidding: {
		id: 10801,
		name: '资产-金融资产-竞价项目',
		list: params => service.get('/yc/search/portrait/company/asset/finance/auctionFinanceList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/finance/financeCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'auctionFinance' })),
	},
	financialMerchants: {
		id: 10802,
		name: '资产-金融资产-招商项目',
		list: params => service.get('/yc/search/portrait/company/asset/finance/financeInvestmentList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/finance/financeCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'financeInvestment' })),
	},
	financialPublicity: {
		id: 10803,
		name: '资产-金融资产-公示项目',
		list: params => service.get('/yc/search/portrait/company/asset/finance/financeList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/finance/financeCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'finance' })),
	},
	unblock: {
		id: 10901,
		name: '资产-查解封资产',
		list: params => service.get('/yc/search/portrait/company/asset/unseal/unsealList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/unseal/unsealCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	// constructUnit: {
	// 	id: 11201,
	// 	name: '资产-在建工程-建设单位',
	// 	list: params => service.get('/yc/search/portrait/company/asset/onBuild/onBuildUnitList', { params })
	// 		.then(res => Object.assign(res.data, {
	// 			code: 200,
	// 			data: {
	// 				total: 222,
	// 				page: 11,
	// 				list: [
	// 					{
	// 						title: '潍坊宝通街绿化养护管理和完善提升',
	// 						nature: '改建',
	// 						totalInvestment: 85522222,
	// 						approvalTime: '2020-11-11',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						planBeginTime: '2020-11-11',
	// 					},
	// 					{
	// 						title: '潍坊宝通街绿化养护管理和完善提升',
	// 						nature: '改建',
	// 						totalInvestment: 85522222,
	// 						approvalTime: '2020-11-11',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						planBeginTime: '2020-11-11',
	// 					},
	// 					{
	// 						title: '潍坊宝通街绿化养护管理和完善提升',
	// 						nature: '改建',
	// 						totalInvestment: 85522222,
	// 						approvalTime: '2020-11-11',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						planBeginTime: '2020-11-11',
	// 					},
	// 					{
	// 						title: '潍坊宝通街绿化养护管理和完善提升',
	// 						nature: '改建',
	// 						totalInvestment: 85522222,
	// 						approvalTime: '2020-11-11',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						planBeginTime: '2020-11-11',
	// 					},
	// 				],
	// 			},
	// 		})),
	// 	count: (params, id) => service.get('/yc/search/portrait/company/asset/onBuild/onBuildCount', { params })
	// 		.then(res => Object.assign(res.data, { id, field: 'onBuildInfo', data: { onBuildBid: 11, onBuildConst: 22, onBuildInfo: 322 } })),
	// },
	// winbidUnit: {
	// 	id: 11202,
	// 	name: '资产-在建工程-中标单位',
	// 	list: params => service.get('/yc/search/portrait/company/asset/onBuild/onBuildBidList', { params })
	// 		.then(res => Object.assign(res.data, {
	// 			code: 200,
	// 			data: {
	// 				total: 500,
	// 				page: 2,
	// 				list: [
	// 					{
	// 						id: '1',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						biddingType: '施工',
	// 						biddingMode: '公开招标',
	// 						approvalTime: '2020-11-11',
	// 						winningPrice: 565626262,
	// 						winningTime: '2020-11-11',
	// 					},
	// 					{
	// 						id: '2',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						biddingType: '施工',
	// 						biddingMode: '公开招标',
	// 						approvalTime: '2020-11-11',
	// 						winningPrice: 565626262,
	// 						winningTime: '2020-11-11',
	// 					},
	// 					{
	// 						id: '3',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						biddingType: '施工',
	// 						biddingMode: '公开招标',
	// 						approvalTime: '2020-11-11',
	// 						winningPrice: 565626262,
	// 						winningTime: '2020-11-11',
	// 					},
	// 					{
	// 						id: '3',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						biddingType: '施工',
	// 						biddingMode: '公开招标',
	// 						approvalTime: '2020-11-11',
	// 						winningPrice: 565626262,
	// 						winningTime: '2020-11-11',
	// 					},
	// 				],
	// 			},
	// 		})),
	// 	count: (params, id) => service.get('/yc/search/portrait/company/asset/onBuild/onBuildCount', { params })
	// 		.then(res => Object.assign(res.data, { id, field: 'onBuildBid', data: { onBuildBid: 11, onBuildConst: 22, onBuildInfo: 322 } })),
	// },
	// underwayUnit: {
	// 	id: 11203,
	// 	name: '资产-在建工程-施工单位',
	// 	list: params => service.get('/yc/search/portrait/company/asset/onBuild/onBuildConstList', { params })
	// 		.then(res => Object.assign(res.data, {
	// 			code: 200,
	// 			data: {
	// 				total: 500,
	// 				page: 2,
	// 				list: [
	// 					{
	// 						id: '1',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						role: [1, 2],
	// 						contractPrice: 565626262,
	// 						projectPeriod: '2020-11-11至2020-11-20',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						issuingTime: '2020-11-17',
	// 					},
	// 					{
	// 						id: '2',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						role: [1, 2],
	// 						contractPrice: 565626262,
	// 						projectPeriod: '2020-11-11至2020-11-20',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						issuingTime: '2020-11-17',
	// 					},
	// 					{
	// 						id: '3',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						role: [1, 2],
	// 						contractPrice: 565626262,
	// 						projectPeriod: '2020-11-11至2020-11-20',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						issuingTime: '2020-11-17',
	// 					},
	// 					{
	// 						id: '3',
	// 						title: '水生态建设项目五期工程谢岗镇2018-2020批次截污管网',
	// 						url: 'http://www.baidu.com',
	// 						role: [1, 2],
	// 						contractPrice: 565626262,
	// 						projectPeriod: '2020-11-11至2020-11-20',
	// 						projectLocation: '广东省佛山市南海区桂城街道半岛路',
	// 						issuingTime: '2020-11-17',
	// 					},
	// 				],
	// 			},
	// 		})),
	// 	count: (params, id) => service.get('/yc/search/portrait/company/asset/onBuild/onBuildCount', { params })
	// 		.then(res => Object.assign(res.data, { id, field: 'onBuildConst', data: { onBuildBid: 11, onBuildConst: 22, onBuildInfo: 322 } })),
	// },
};
export default assets;
