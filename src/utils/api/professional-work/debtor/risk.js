import service from '@/utils/service';

const manage = {
	30201: {
		id: 30201,
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list: params => service.get('/yc/monitor/bankruptcy/list', { params }).then(res => res.data),
		count: (params, id) => service.get('/yc/monitor/bankruptcy/list-count', { params })
			.then(res => Object.assign(res.data, { id })),
	},
	20601: {
		id: 20601,
		name: '风险-涉诉-立案',
		list: params => service.get('/yc/monitor/trial/lawsuit/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/trial/lawsuit/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20602: {
		id: 20602,
		name: '风险-涉诉-开庭',
		list: params => service.get('/yc/monitor/court/lawsuit/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/court/lawsuit/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	20603: {
		id: 20603,
		name: '风险-涉诉-裁判文书',
		list: params => service.get('/yc/monitor/judgment/lawsuit/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/judgment/lawsuit/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30301: {
		id: 30301,
		name: '经营-经营异常',
		list: params => service.get('/yc/monitor/risk/abnormal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/risk/abnormal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30401: {
		id: 30401,
		name: '经营-严重违法',
		list: params => service.get('/yc/monitor/risk/illegal/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/risk/illegal/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30501: {
		id: 30501,
		name: '经营-税收违法',
		list: params => service.get('/yc/monitor/risk/tax/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/risk/tax/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30601: {
		id: 30601,
		name: '经营-行政处罚',
		list: params => service.get('/yc/monitor/risk/punishment/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/risk/punishment/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
	30701: {
		id: 30701,
		name: '经营-环保处罚',
		list: params => service.get('/yc/monitor/risk/epb/list', { params }).then(res => res.data),
		count(params) {
			return service.get('/yc/monitor/risk/epb/list-count', { params })
				.then(res => Object.assign(res.data, { id: this.id }));
		},
	},
};

export default manage;
