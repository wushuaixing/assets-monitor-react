import service from '@/utils/service';

const message = [
	{
		dataType: 10101,
		list: params => service.get('/yc/search/portrait/company/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/report/daily/auction/count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10201,
		name: '代位权-立案  ',
		params: { partiesName: '国网浙江省电力公司宁波供电公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/trial/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'subrogation' })),
	},
	{
		dataType: 10202,
		name: '代位权-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/court-notice/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/court-notice/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'openCourt' })),
	},
	{
		dataType: 10203,
		name: '代位权-文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'instrument' })),
	},
	{
		dataType: 10301,
		name: '土地数据-土地出让',
		list: params => service.get('/yc/search/portrait/company/asset/land/transfer', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transfer' })),
	},
	{
		dataType: 10302,
		name: '土地数据-土地转让',
		list: params => service.get('/yc/search/portrait/company/asset/land/transaction', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transaction' })),
	},
	{
		dataType: 10303,
		name: '土地数据-土地抵押',
		list: params => service.get('/yc/search/portrait/company/asset/land/mortgage', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mortgage' })),
	},
	{
		dataType: 10401,
		name: '招标中标',
		params: { obligorName: '上海浦东物流云计算有限公司', role: 0 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgor', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10501,
		name: '股权质押',
		params: { obligorName: '投资', role: 1 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgee', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10601,
		name: '金融资产-竞价项目',
		params: { obligorName: '沈阳铠龙兴业锻铸有限公司', role: 0, regDateStart: '2019-04-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/owner', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'competition' })),
	},
	{
		dataType: 10602,
		name: '金融资产-公示项目',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/people', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'public' })),
	},
	{
		dataType: 10701,
		name: '动产抵押',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/emission/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 10801,
		name: '无形资产-排污权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'pollution' })),
	},
	{
		dataType: 10802,
		name: '无形资产-矿业权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mining' })),
	},
	{
		dataType: 10803,
		name: '无形资产-商标专利',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/trademark/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'trademark' })),
	},
	{
		dataType: 10804,
		name: '无形资产-建筑建造资质',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'building' })),
	},
	{
		dataType: 10901,
		name: '涉诉监控-立案',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'case' })),
	},
	{
		dataType: 10902,
		name: '涉诉监控-开庭',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'court' })),
	},
	{
		dataType: 10903,
		name: '涉诉监控-文书',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'judgmentDocument' })),
	},
	{
		dataType: 11001,
		name: '企业破产重组',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11101,
		name: '失信记录',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11201,
		name: '税收违法',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		dataType: 11202,
		name: '环保处罚',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
];
export default message;
