import service from '@/utils/service';

const manage = {
	30201: {
		id: 30201,
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/obligor/monitor/bankruptcy/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/obligor/monitor/bankruptcy/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20601: {
		id: 20601,
		name: '风险-涉诉-立案',
		list: params => service.get('/yc/obligor/monitor/lawsuit/trial/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/lawsuit/trial/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20602: {
		id: 20602,
		name: '风险-涉诉-开庭',
		list: params => service.get('/yc/obligor/monitor/lawsuit/court-notice/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/lawsuit/court-notice/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20603: {
		id: 20603,
		name: '风险-涉诉-裁判文书',
		list: params => service.get('/yc/obligor/monitor/lawsuit/judgment-document/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/lawsuit/judgment-document/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30301: {
		id: 30301,
		name: '经营-经营异常',
		list: params => service.get('/yc/obligor/monitor/abnormal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/abnormal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30401: {
		id: 30401,
		name: '经营-严重违法',
		list: params => service.get('/yc/obligor/monitor/illegal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/illegal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30501: {
		id: 30501,
		name: '经营-税收违法',
		list: params => service.get('/yc/obligor/monitor/tax/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/tax/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30601: {
		id: 30601,
		name: '经营-行政处罚',
		list: params => service.get('/yc/obligor/monitor/punishment/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/punishment/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30701: {
		id: 30701,
		name: '经营-环保处罚',
		list: params => service.get('/yc/obligor/monitor/epb/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/obligor/monitor/epb/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};

export default manage;
