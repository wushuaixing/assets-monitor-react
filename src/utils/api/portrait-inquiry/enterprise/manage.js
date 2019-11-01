import service from '@/utils/service';

const manage = {
	bidding: {
		name: '经营-招投标',
		params: {
			obName: '浙江',
			title: '河口区新户镇果园村坑塘治理工程',
		},
		list() {
			return service.get('/yc/monitor/bidding/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/bidding/list-count', { params: this.params }).then(res => res.data);
		},
	},
	bankruptcy: {
		name: '经营-破产重组',
		params: {
			obligorName: '杭州',
			title: '2015',
		},
		list() {
			return service.get('/yc/monitor/bankruptcy/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/bankruptcy/list', { params: this.params }).then(res => res.data);
		},
	},
	abnormal: {
		name: '经营-经营异常',
		params: {
			putDepartment: '杭州市富阳区',
		},
		list() {
			return service.get('/yc/monitor/risk/abnormal/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/risk/abnormal/list-count', { params: this.params }).then(res => res.data);
		},
	},
	illegal: {
		name: '经营-严重违法',
		params: {
			name: '江苏',
			putDepartment: '江苏',
		},
		list() {
			return service.get('/yc/monitor/risk/illegal/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/risk/illegal/list-count', { params: this.params }).then(res => res.data);
		},
	},
	tax: {
		name: '经营-税收违法',
		params: {
			obName: '杭州',
		},
		list() {
			return service.get('/yc/monitor/risk/tax/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/risk/tax/list-count', { params: this.params }).then(res => res.data);
		},
	},
	punishment: {
		name: '经营-税收违法',
		params: {
			obligorName: '特易购',
			departmentName: '上海',
		},
		list() {
			return service.get('/yc/monitor/risk/punishment/list', { params: this.params }).then(res => res.data);
		},
		count() {
			return service.get('/yc/monitor/risk/punishment/list-count', { params: this.params }).then(res => res.data);
		},
	},
};

export default manage;
