import service from 'service';

const debtorRisk = {
	30201: {
		id: 30201,
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/obligor/monitor/overview/bankruptcyNew', { params }).then(res => res.data),
		// count: (params, id) => service.get('/yc/obligor/monitor/risk/bankruptcy/list-count', { params })
		// 	.then(res => Object.assign(res.data, { id })),
		count: (params, id) => service.get('/yc/obligor/monitor/overview/bankruptcyNew', { params }).then((res) => {
			const { data, code } = res.data || {};
			const { bankruptcyNum } = data || {};
			return ({ code, data: bankruptcyNum, id });
		}),
	},
	20301: {
		id: 20301,
		name: '风险-终本案件-列入',
		list: params => service.post('/yc/obligor/monitor/risk/execEndCase/execEndCaseList', { ...params, status: 0 }).then(res => res.data),
		count(params) {
			return service.post('/yc/obligor/monitor/risk/execEndCase/execEndCaseListCount', { ...params, status: 0 })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20302: {
		id: 20302,
		name: '风险-终本案件-已移除',
		list: params => service.post('/yc/obligor/monitor/risk/execEndCase/execEndCaseList', { ...params, status: 1 }).then(res => res.data),
		count(params) {
			return service.post('/yc/obligor/monitor/risk/execEndCase/execEndCaseListCount', { ...params, status: 1 })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20401: {
		id: 20401,
		name: '风险-失信记录-列入',
		params: {},
		list: params => service.get('/yc/obligor/monitor/risk/dishonest/list?removeStatus=false', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/obligor/monitor/risk/dishonest/list-count?removeStatus=false', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20402: {
		id: 20402,
		name: '风险-失信记录-已移除',
		params: {},
		list: params => service.get('/yc/obligor/monitor/risk/dishonest/list?removeStatus=true', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/obligor/monitor/risk/dishonest/list-count?removeStatus=true', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20701: {
		id: 20701,
		name: '风险-被执行信息-列入',
		params: {},
		list: params => service.post('/yc/obligor/monitor/risk/execPerson/list', { ...params, status: 0 }).then(res => res.data),
		count: (params, id) => service.post('/yc/obligor/monitor/risk/execPerson/listCount', { ...params, status: 0 })
			.then(res => Object.assign(res.data, { id })),
	},
	20702: {
		id: 20702,
		name: '风险-被执行信息-已移除',
		params: {},
		list: params => service.post('/yc/obligor/monitor/risk/execPerson/list', { ...params, status: 1 }).then(res => res.data),
		count: (params, id) => service.post('/yc/obligor/monitor/risk/execPerson/listCount', { ...params, status: 1 })
			.then(res => Object.assign(res.data, { id })),
	},
	20501: {
		id: 20501,
		name: '风险-限制高消费-列入',
		params: {},
		list: params => service.get('/yc/obligor/monitor/risk/limitHeight/limitHeightList?status=0', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/obligor/monitor/risk/limitHeight/limitHeightCount?status=0', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20502: {
		id: 20502,
		name: '风险-限制高消费-已移除',
		params: {},
		list: params => service.get('/yc/obligor/monitor/risk/limitHeight/limitHeightList?status=1', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/obligor/monitor/risk/limitHeight/limitHeightCount?status=1', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20601: {
		id: 20601,
		name: '风险-涉诉-立案',
		list: params => service.get('/yc/obligor/monitor/risk/lawsuit/trial/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/lawsuit/trial/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20602: {
		id: 20602,
		name: '风险-涉诉-开庭',
		list: params => service.get('/yc/obligor/monitor/risk/lawsuit/court-notice/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/lawsuit/court-notice/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20603: {
		id: 20603,
		name: '风险-涉诉-裁判文书',
		list: params => service.get('/yc/obligor/monitor/risk/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/lawsuit/judgment-document/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30301: {
		id: 30301,
		name: '经营-经营异常',
		list: params => service.get('/yc/obligor/monitor/risk/abnormal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/abnormal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30401: {
		id: 30401,
		name: '经营-严重违法',
		list: params => service.get('/yc/obligor/monitor/risk/illegal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/illegal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30501: {
		id: 30501,
		name: '经营-税收违法',
		list: params => service.get('/yc/obligor/monitor/risk/tax/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/tax/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30601: {
		id: 30601,
		name: '经营-行政处罚',
		list: params => service.get('/yc/obligor/monitor/risk/punishment/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/punishment/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30701: {
		id: 30701,
		name: '经营-环保处罚',
		list: params => service.get('/yc/obligor/monitor/risk/epb/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/risk/epb/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},

};

export default debtorRisk;
