/*
* 这个数组里面的count 类型的接口没有调用，因为之前已经把各类的信息返回给我了
* 但是后端提供了这个接口，是可以使用的。
* */
import service from '@/utils/service';

const message = [
	{
		dataType: 10101,
		name: '资产拍卖',
		list: params => service.get('/yc/report/daily/auction/auctionList', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/auction/count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10201,
		name: '代位权-立案  ',
		list: params => service.get('/yc/report/daily/trial/trialLawsuitList', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/trial/trialLawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'subrogation' })),
	},
	{
		dataType: 10202,
		name: '代位权-开庭',
		list: params => service.get('/yc/report/daily/courtNotice/courtNoticeLawsuitList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/courtNotice/courtNoticeLawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'openCourt' })),
	},
	{
		dataType: 10203,
		name: '代位权-文书',
		list: params => service.get('/yc/report/daily/judgement/judgementLawsuitList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/judgement/judgementLawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'instrument' })),
	},
	{
		dataType: 10301,
		name: '土地数据-土地出让',
		list: params => service.get('/yc/report/daily/landTransfer/landTransferList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/landTransfer/landTransferCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'transfer' })),
	},
	{
		dataType: 10302,
		name: '土地数据-土地转让',
		list: params => service.get('/yc/report/daily/landTransaction/landTransactionList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/landTransaction/landTransactionCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'transaction' })),
	},
	{
		dataType: 10303,
		name: '土地数据-土地抵押',
		list: params => service.get('/yc/report/daily/landMortgage/landMortgageList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/landMortgage/landMortgageCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'mortgage' })),
	},
	{
		dataType: 10401,
		name: '招标中标',
		list: params => service.get('/yc/report/daily/bidding/biddingList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/bidding/biddingCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10501,
		name: '股权质押',
		list: params => service.get('/yc/report/daily/stockPledge/stockPledgeList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/stockPledge/stockPledgeCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10601,
		name: '金融资产-竞价项目',
		list: params => service.get('/yc/report/daily/auctionBidding/auctionBiddingList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/auctionBidding/auctionBiddingCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'competition' })),
	},
	{
		dataType: 10602,
		name: '金融资产-公示项目',
		list: params => service.get('/yc/report/daily/finance/financeList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/finance/financeCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'public' })),
	},
	{
		dataType: 10701,
		name: '动产抵押',
		list: params => service.get('/yc/report/daily/mortgage/mortgageList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/mortgage/mortgageCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10801,
		name: '无形资产-排污权',
		list: params => service.get('/yc/report/daily/emission/emissionList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/emission/emissionCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'pollution' })),
	},
	{
		dataType: 10802,
		name: '无形资产-矿业权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/report/daily/mining/miningList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/mining/miningCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'mining' })),
	},
	{
		dataType: 10803,
		name: '无形资产-商标专利',
		list: params => service.get('/yc/report/daily/trademarkRight/trademarkRightList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/trademarkRight/trademarkRightCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'trademark' })),
	},
	{
		dataType: 10804,
		name: '无形资产-建筑建造资质',
		list: params => service.get('/yc/report/daily/construct/constructList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/construct/constructCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'building' })),
	},
	{
		dataType: 10901,
		name: '涉诉监控-立案',
		list: params => service.get('/yc/report/daily/trial/trialLawsuitList', { params, sourceType: 2 })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'case' })),
	},
	{
		dataType: 10902,
		name: '涉诉监控-开庭',
		list: params => service.get('/yc/report/daily/courtNotice/courtNoticeLawsuitList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/courtNotice/courtNoticeLawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'court' })),
	},
	{
		dataType: 10903,
		name: '涉诉监控-文书',
		list: params => service.get('/yc/report/daily/judgement/judgementLawsuitList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/judgement/judgementLawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'judgmentDocument' })),
	},
	{
		dataType: 11001,
		name: '企业破产重组',
		list: params => service.get('/yc/report/daily/bankruptcy/bankruptcyList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/bankruptcy/bankruptcyCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11101,
		name: '失信记录',
		list: params => service.get('/yc/report/daily/dishonest/dishonestList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/dishonest/dishonestCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11201,
		name: '税收违法',
		list: params => service.get('/yc/report/daily/tax/taxList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/tax/taxCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11202,
		name: '环保处罚',
		list: params => service.get('/yc/report/daily/epb/epbList', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/epb/epbCount', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	// {
	// 	dataType: 11301,
	// 	name: '查解封资产',
	// 	list: params => service.get('/yc/report/daily/unseal/unsealList', { params })
	// 		.then(res => res.data),
	// 	count: (params, id) => service.get('/yc/report/daily/unseal/unsealCount', { params })
	// 		.then(res => Object.assign(res.data, { id })),
	// },
	// {
	// 	dataType: 11401,
	// 	name: '限制高消费',
	// 	list: params => service.get('/yc/monitor/limitHeight/LimitHeightList', { params })
	// 		.then(res => res.data),
	// 	count: (params, id) => service.get('/yc/report/daily/unseal/unsealCount', { params })
	// 		.then(res => Object.assign(res.data, { id })),
	// },
];
export default message;
