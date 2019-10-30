import React from 'react';
import { TimeLine } from '@/common';

export default class ChattelMortgage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
		};
	}

	render() {
		const { timeLineData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">8条</span>
					<span className="container-title-name"> 动产抵押信息</span>
				</div>
				<div className="overview-container-content">
					<TimeLine title="年份分布" Data={timeLineData} id="lostLetter" />
				</div>
			</div>
		);
	}
}
