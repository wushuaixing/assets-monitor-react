import service from '@/utils/service';

const lawsuits = {
	trial: {
		name: '涉诉-立案',
		params: {
			// startGmtRegister: '2017-05-01',
			partiesName: '浙江中味酿造有限公司',
			filterCurrentOrg: false,
		},
		list() {
			return service.get('/yc/monitor/trial/lawsuit/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/trial/lawsuit/list-count', { params: this.params }).then(res => res.data);
		},
	},
	court: {
		name: '涉诉-开庭',
		params: {
			partiesName: '椰树集团有限公司',
		},
		list() {
			return service.get('/yc/monitor/court/lawsuit/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/court/lawsuit/list-count', { params: this.params }).then(res => res.data);
		},
	},
	judgment: {
		name: '涉诉-文书',
		params: {
		},
		list() {
			return service.get('/yc/monitor/judgment/lawsuit/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/judgment/lawsuit/list-count', { params: this.params }).then(res => res.data);
		},
	},
	dishonest: {
		name: '涉诉-失信记录',
		params: {},
		list: obligorId => service.get(`/yc/obligor/monitor/dishonestList/${obligorId || 323151}`).then(res => res.data),
		count: obligorId => service.get(`/yc/obligor/monitor/dishonestList/${obligorId || 323151}`).then(res => res.data),
	},
};


export default lawsuits;
