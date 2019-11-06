import React from 'react';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';

export default class Involved extends React.Component {
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
			RingData: [
				{ value: 20, name: '普通案件' },
				{ value: 14, name: '执行案件' },
				{ value: 10, name: '终本案件' },
				{ value: 5, name: '破产案件' },
			],
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
		};
	}

	render() {
		const { columnarData, RingData, timeLineData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">29条</span>
					<span className="container-title-name"> 涉诉信息 (涉诉文书)</span>
				</div>
				<div className="overview-container-content">
					<TimeLine title="年份分布" Data={timeLineData} id="involved" />
					<ColumnarEcharts title="案由分布" Data={columnarData} id="involved" />
					<RingEcharts title="案件类型分布" Data={RingData} id="involved" />
				</div>
			</div>
		);
	}
}
