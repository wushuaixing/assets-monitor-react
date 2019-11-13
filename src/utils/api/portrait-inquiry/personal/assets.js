import service from '@/utils/service';

const assets = {
	auction: {
		name: '资产-资产拍卖-精准匹配',
		params: {
			obligorName: '重庆文化产业融资担保',
			updateTimeStart: '2019-10-01',
			process: 0,
		},
		list() {
			return service.get('/yc/monitor/auction/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/auction/list', { params: this.params }).then((res) => {
				const { code, data, message } = res.data;
				return {
					code,
					message,
					data: data.total,
				};
			});
		},
	},
	trial: {
		name: '资产-代位权-立案',
		params: {
			partiesName: '国网浙江省电力公司宁波供电公司',
		},
		list() {
			return service.get('/yc/monitor/trial/subrogation/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/trial/subrogation/list-count', { params: this.params }).then(res => res.data);
		},
	},
	court: {
		name: '资产-代位权-开庭',
		params: {
			partiesName: '椰树集团有限公司',
		},
		list() {
			return service.get('/yc/monitor/court/subrogation/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/court/subrogation/list-count', { params: this.params }).then(res => res.data);
		},
	},
	judgment: {
		name: '资产-代位权-裁判文书',
		params: {
			partiesName: '中国民生银行股份有限公司',
			caseNumber: '苏',
		},
		list() {
			return service.get('/yc/monitor/judgment/subrogation/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/judgment/subrogation/list-count', { params: this.params }).then(res => res.data);
		},
	},
	result: {
		name: '资产-土地信息-出让结果',
		params: {
			obligorName: '中国石油天然气股份有限公司山东销售分公司',
		},
		list() {
			return service.get('/yc/monitor/land/transfer/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/land/transfer/list-count', { params: this.params }).then(res => res.data);
		},
	},
	pledge: {
		name: '资产-股权质押-股权质押',
		params: {
			obligorName: '上海浦东物流云计算有限公司',
			role: 0,
		},
		list() {
			return service.get('/yc/monitor/finance/pledge/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/finance/pledge/list-count', { params: this.params }).then(res => res.data);
		},
	},
	mortgage: {
		name: '资产-股权质押-股权质权',
		params: {
			obligorName: '投资',
			role: 1,
		},
		list() {
			return service.get('/yc/monitor/finance/pledge/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/finance/pledge/list-count', { params: this.params }).then(res => res.data);
		},
	},
	pledgeD: {
		name: '资产-股权质押-股权质押',
		params: {
			obligorName: '沈阳铠龙兴业锻铸有限公司',
			role: 0,
			regDateStart: '2019-04-01',
		},
		list() {
			return service.get('/yc/monitor/mortgage/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/mortgage/list-count', { params: this.params }).then(res => res.data);
		},
	},
	mortgageD: {
		name: '资产-股权质押-股权质权',
		params: {
			role: 1,
			regDateStart: '2019-05-01',
		},
		list() {
			return service.get('/yc/monitor/mortgage/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/mortgage/list-count', { params: this.params }).then(res => res.data);
		},
	},
};
export default assets;
