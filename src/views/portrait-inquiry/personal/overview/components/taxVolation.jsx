import React from 'react';
import { RingEcharts } from '@/common';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			RingData: [
				{ value: 20, name: '作为纳税主体' },
				{ value: 7, name: '作为法人' },
				{ value: 10, name: '作为财务' },
			],
		};
	}

	render() {
		const { RingData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">8条</span>
					<span className="container-title-name">税收违法</span>
				</div>
				<div className="overview-container-content">
					<RingEcharts title="角色分布" Data={RingData} id="taxVolation" />
				</div>
			</div>
		);
	}
}
