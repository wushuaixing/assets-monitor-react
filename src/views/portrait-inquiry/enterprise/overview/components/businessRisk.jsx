import React from 'react';
import { ColumnarEcharts } from '@/common';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnarData: [
				{ value: 8, name: '民间借贷纠纷' },
				{ value: 9, name: '买卖合同纠纷' },
				{ value: 6, name: '对外追偿权纠纷' },
				{ value: 6, name: '企业借贷纠纷' },
				{ value: 8, name: '股权转让纠纷' },
			],
		};
	}

	render() {
		const { columnarData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">29条</span>
					<span className="container-title-name">经营风险信息</span>
				</div>
				<div className="overview-container-content">
					<ColumnarEcharts title="案由分布" Data={columnarData} id="involved" />
				</div>
			</div>
		);
	}
}
