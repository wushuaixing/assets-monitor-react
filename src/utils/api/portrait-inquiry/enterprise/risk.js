import service from '@/utils/service';

const risk = {
	bankruptcy: {
		id: 20101,
		name: '风险-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/search/portrait/company/management/bankruptcy/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/bankruptcy/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	dishonest: {
		id: 20201,
		name: '风险-失信记录',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/dishonest/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/dishonest/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	trial: {
		id: 20301,
		name: '风险-涉诉信息-立案',
		params: { },
		list: params => service.get('/yc/search/portrait/company/lawsuit/trial/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/lawsuit/lawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'trialCount' })),
	},
	court: {
		id: 20302,
		name: '风险-涉诉信息-开庭',
		params: { partiesName: '椰树集团有限公司' },
		list: params => service.get('/yc/search/portrait/company/lawsuit/court-notice/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/lawsuit/lawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'courtCount' })),
	},
	judgment: {
		id: 20303,
		name: '风险-涉诉信息-文书',
		params: {},
		list: params => service.get('/yc/search/portrait/company/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/lawsuit/lawsuitCount', { params })
			.then(res => Object.assign(res.data, { id, field: 'judgementCount' })),
	},
	abnormal: {
		id: 20401,
		name: '风险-经营异常',
		params: {
			putDepartment: '杭州市富阳区',
		},
		list: params => service.get('/yc/search/portrait/company/management/abnormal/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/abnormal/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	illegal: {
		id: 20501,
		name: '风险-严重违法',
		params: {
			name: '河南永通投资有限公司',
			putDepartment: '工商',
		},
		list: params => service.get('/yc/search/portrait/company/management/illegal/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/illegal/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	tax: {
		id: 20601,
		name: '风险-税收违法',
		params: {
			obName: '贸易',
		},
		list: params => service.get('/yc/search/portrait/company/management/tax/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/tax/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	punishment: {
		id: 20701,
		name: '风险-行政处罚',
		params: {
			obligorName: '特易购',
			departmentName: '上海',
		},
		list: params => service.get('/yc/search/portrait/company/management/punishment/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/punishment/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	environmentPunishment: {
		id: 20801,
		name: '风险-环保处罚',
		params: {
			obligorName: '特易购',
			departmentName: '上海',
		},
		list: params => service.get('/yc/search/portrait/company/management/epb/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/epb/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	limitHeight: {
		id: 20901,
		name: '风险-限制高消费',
		list: params => service.get('/yc/search/portrait/company/lawsuit/limitHeight/limitHeightList', { params }).then(res => res.data),
		// list: params => service.get('/yc/search/portrait/company/lawsuit/limitHeight/limitHeightList', { params }).then(res => Object.assign(res.data, {
		// 	code: 200,
		// 	data: {
		// 		list: [
		// 			{
		// 				caseNumber: '(2020)川0793执1003号',
		// 				companyName: 'companyName1111111',
		// 				gmtCreate: '2020-11-20',
		// 				id: 8043,
		// 				obligorId: 955591,
		// 				obligorType: 2,
		// 				personName: '张兵11111111',
		// 				personNumber: '510702197710085014',
		// 				registerDate: '2020-10-19',
		// 				status: 1,
		// 				url: '/5038/2020-10-29/05119e43ce2e4023a18c209fb3ec4332.pdf',
		// 			},
		// 			{
		// 				caseNumber: '(2020)川0793执1003号',
		// 				companyName: 'companyName222222222',
		// 				gmtCreate: '2020-11-20',
		// 				id: 8043,
		// 				obligorId: 955591,
		// 				obligorType: 1,
		// 				personName: '张兵2222222222222',
		// 				personNumber: '510702197710085014',
		// 				registerDate: '2020-10-19',
		// 				status: 0,
		// 				url: '/5038/2020-10-29/05119e43ce2e4023a18c209fb3ec4332.pdf',
		// 			},
		// 		],
		// 	},
		// })),
		count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/limitHeight/limitHeightListCount', { params })
			.then(res => Object.assign(res.data, { id })),
		// count: (params, id) => service.get('/yc/search/portrait/company/lawsuit/limitHeight/limitHeightListCount', { params })
		// 	.then(res => Object.assign(res.data, { id, code: 200, data: 60 })),
	},
};


export default risk;
