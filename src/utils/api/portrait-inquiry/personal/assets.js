import service from '@/utils/service';

const assets = {
	auction: {
		id: 10101,
		name: '资产-资产拍卖-精准匹配',
		params: { personalId: 3280438 },
		list: params => service.get('/yc/search/portrait/personal/asset/auction/precision/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/asset/auction/precision/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	trial: {
		id: 10201,
		name: '资产-代位权-立案',
		params: { partiesName: '国网浙江省电力公司宁波供电公司' },
		list: params => service.get('/yc/search/portrait/personal/asset/subrogation/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/subrogation/trial/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	court: {
		id: 10202,
		name: '资产-代位权-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/personal/asset/subrogation/court-notice/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/asset/subrogation/court-notice/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	judgment: {
		id: 10203,
		name: '资产-代位权-裁判文书',
		params: { partiesName: '中国民生银行股份有限公司', caseNumber: '苏' },
		list: params => service.get('/yc/search/portrait/personal/asset/subrogation/judgment-document/list', { params })
			.then(res => res.data),
		count: (params, id) => service.get('yc/search/portrait/personal/asset/subrogation/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};
export default assets;
