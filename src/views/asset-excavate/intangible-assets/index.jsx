import React from 'react';
import api from '@/utils/api/monitor-info/intangible';

console.log(api);
export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return '无形资产 default Text;具体的页面内容，可以参考 风险监控-经营风险';
	}
}
