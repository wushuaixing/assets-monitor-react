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
};
export default assets;
