import service from '@/utils/service';

const manage = {
	// bidding: {
	// 	id: 30101,
	// 	name: '经营-招投标',
	// 	params: {
	// 		obName: '浙江',
	// 		title: '河口区新户镇果园村坑塘治理工程',
	// 	},
	// 	list: params => service.get('/yc/search/portrait/company/management/bankruptcy/list', { params }).then(res => res.data),
	// 	count: (params, id) => service.get('/yc/search/portrait/company/management/bankruptcy/list-count', { params })
	// 		.then(res => Object.assign(res.data, { id })),
	// },
	bankruptcy: {
		id: 30102,
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/search/portrait/company/management/bankruptcy/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/bankruptcy/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	abnormal: {
		id: 30103,
		name: '经营-经营异常',
		params: {
			putDepartment: '杭州市富阳区',
		},
		list: params => service.get('/yc/search/portrait/company/management/abnormal/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/abnormal/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	illegal: {
		id: 30104,
		name: '经营-严重违法',
		params: {
			name: '河南永通投资有限公司',
			putDepartment: '工商',
		},
		list: params => service.get('/yc/search/portrait/company/management/illegal/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/illegal/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	tax: {
		id: 30105,
		name: '经营-税收违法',
		params: {
			obName: '贸易',
		},
		list: params => service.get('/yc/search/portrait/company/management/tax/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/tax/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	punishment: {
		id: 30106,
		name: '经营-行政处罚',
		params: {
			obligorName: '特易购',
			departmentName: '上海',
		},
		list: params => service.get('/yc/search/portrait/company/management/punishment/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/search/portrait/company/management/punishment/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
};

export default manage;
