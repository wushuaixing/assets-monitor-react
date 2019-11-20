import service from '@/utils/service';

const risk = {
	judgment: {
		id: 20101,
		name: '风险-涉诉文书',
		params: {},
		list: params => service.get('/yc/search/portrait/personal/risk/judgment-document/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/risk/lawsuit/judgment-document/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	dishonest: {
		id: 20201,
		name: '风险-失信记录',
		params: {},
		list: params => service.get('/yc/search/portrait/personal/risk/dishonest/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/risk/dishonest/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	tax: {
		id: 20301,
		name: '风险-税收违法',
		params: { obName: '贸易' },
		list: params => service.get('/yc/search/portrait/personal/risk/tax/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/personal/risk/tax/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};

export default risk;
