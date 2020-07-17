import service from '@/utils/service';
//
// const message = {
// 	asset: {
// 		id: 10101,
// 		name: '资产拍卖',
// 		params: { companyId: 3280438 },
// 		list: params => service.get('/yc/search/portrait/company/asset/auction/precision/list', { params }).then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/auction/precision/list-count', { params })
// 			.then(res => Object.assign(res.data, { id })),
// 	},
// 	subrogation: {
// 		id: 10201,
// 		name: '代位权-代位权 ',
// 		params: { partiesName: '国网浙江省电力公司宁波供电公司' },
// 		list: params => service.get('/yc/search/portrait/company/asset/subrogation/trial/list', { params }).then(res => res.data),
// 		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/trial/list-count', { params })
// 			.then(res => Object.assign(res.data, { id })),
// 	},
// 	openCourt: {
// 		id: 10202,
// 		name: '代位权-开庭',
// 		params: { partiesName: '椰树集团有限公司' },
// 		list: params => service.get('/yc/search/portrait/company/asset/subrogation/court-notice/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/court-notice/list-count', { params })
// 			.then(res => Object.assign(res.data, { id })),
// 	},
// 	referee: {
// 		id: 10203,
// 		name: '代位权-文书',
// 		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
// 		list: params => service.get('/yc/search/portrait/company/asset/subrogation/judgment-document/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/judgment-document/list-count', { params })
// 			.then(res => Object.assign(res.data, { id })),
// 	},
// 	landSell: {
// 		id: 10301,
// 		name: '土地数据-土地出让',
// 		list: params => service.get('/yc/search/portrait/company/asset/land/transfer', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'transfer' })),
// 	},
// 	landTransfer: {
// 		id: 10302,
// 		name: '土地数据-土地转让',
// 		list: params => service.get('/yc/search/portrait/company/asset/land/transaction', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'transaction' })),
// 	},
// 	landMortgage: {
// 		id: 10303,
// 		name: '土地数据-土地抵押',
// 		list: params => service.get('/yc/search/portrait/company/asset/land/mortgage', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'mortgage' })),
// 	},
// 	tender: {
// 		id: 10401,
// 		name: '招标中标',
// 		params: { obligorName: '上海浦东物流云计算有限公司', role: 0 },
// 		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgor', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'pledgor' })),
// 	},
// 	equityPledge: {
// 		id: 10501,
// 		name: '股权质押',
// 		params: { obligorName: '投资', role: 1 },
// 		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgee', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'pledgee' })),
// 	},
// 	competitionProject: {
// 		id: 10601,
// 		name: '金融资产-竞价项目',
// 		params: { obligorName: '沈阳铠龙兴业锻铸有限公司', role: 0, regDateStart: '2019-04-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/mortgage/owner', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'owner' })),
// 	},
// 	publicProject: {
// 		id: 10602,
// 		name: '金融资产-公示项目',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/mortgage/people', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'people' })),
// 	},
// 	chattelMortgage: {
// 		id: 10701,
// 		name: '动产抵押',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/emission/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'emission' })),
// 	},
// 	emissionRights: {
// 		id: 10801,
// 		name: '无形资产-排污权',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'mining' })),
// 	},
// 	miningRights: {
// 		id: 10802,
// 		name: '无形资产-矿业权',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'mining' })),
// 	},
// 	trademarkPatent: {
// 		id: 10803,
// 		name: '无形资产-商标专利',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/trademark/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'trademark' })),
// 	},
// 	construction: {
// 		id: 10804,
// 		name: '无形资产-建筑建造资质',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	case: {
// 		id: 10901,
// 		name: '涉诉监控-立案',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	court: {
// 		id: 10902,
// 		name: '涉诉监控-开庭',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	instruments: {
// 		id: 10903,
// 		name: '涉诉监控-文书',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	bankruptcy: {
// 		id: 11001,
// 		name: '企业破产重组',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	dishonesty: {
// 		id: 11101,
// 		name: '失信记录',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	illegalTax: {
// 		id: 11201,
// 		name: '税收违法',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// 	environment: {
// 		id: 11301,
// 		name: '环保处罚',
// 		params: { role: 1, regDateStart: '2019-05-01' },
// 		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
// 			.then(res => res.data),
// 		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
// 			.then(res => Object.assign(res.data, { id, field: 'construct' })),
// 	},
// };
// export default message;


const message = [
	{
		id: 10101,
		name: '资产拍卖',
		params: { companyId: 3280438 },
		list: params => service.get('/yc/search/portrait/company/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/auction/precision/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		id: 10201,
		name: '代位权-代位权 ',
		params: { partiesName: '国网浙江省电力公司宁波供电公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/trial/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		id: 10202,
		name: '代位权-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/court-notice/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/court-notice/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		id: 10203,
		name: '代位权-文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/company/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/company/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	{
		id: 10301,
		name: '土地数据-土地出让',
		list: params => service.get('/yc/search/portrait/company/asset/land/transfer', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transfer' })),
	},
	{
		id: 10302,
		name: '土地数据-土地转让',
		list: params => service.get('/yc/search/portrait/company/asset/land/transaction', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'transaction' })),
	},
	{
		id: 10303,
		name: '土地数据-土地抵押',
		list: params => service.get('/yc/search/portrait/company/asset/land/mortgage', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/land/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mortgage' })),
	},
	{
		id: 10401,
		name: '招标中标',
		params: { obligorName: '上海浦东物流云计算有限公司', role: 0 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgor', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'pledgor' })),
	},
	{
		id: 10501,
		name: '股权质押',
		params: { obligorName: '投资', role: 1 },
		list: params => service.get('/yc/search/portrait/company/asset/stock/pledgee', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'pledgee' })),
	},
	{
		id: 10601,
		name: '金融资产-竞价项目',
		params: { obligorName: '沈阳铠龙兴业锻铸有限公司', role: 0, regDateStart: '2019-04-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/owner', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'owner' })),
	},
	{
		id: 10602,
		name: '金融资产-公示项目',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/mortgage/people', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'people' })),
	},
	{
		id: 10701,
		name: '动产抵押',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/emission/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/stock/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'emission' })),
	},
	{
		id: 10801,
		name: '无形资产-排污权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mining' })),
	},
	{
		id: 10802,
		name: '无形资产-矿业权',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/mining/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'mining' })),
	},
	{
		id: 10803,
		name: '无形资产-商标专利',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/trademark/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'trademark' })),
	},
	{
		id: 10804,
		name: '无形资产-建筑建造资质',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 10901,
		name: '涉诉监控-立案',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 10902,
		name: '涉诉监控-开庭',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 10903,
		name: '涉诉监控-文书',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 11001,
		name: '企业破产重组',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 11101,
		name: '失信记录',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 11201,
		name: '税收违法',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
	{
		id: 11301,
		name: '环保处罚',
		params: { role: 1, regDateStart: '2019-05-01' },
		list: params => service.get('/yc/search/portrait/company/asset/intangible/construct/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/mortgage/list-count', { params })
			.then(res => Object.assign(res.data, { id, field: 'construct' })),
	},
];
export default message;
