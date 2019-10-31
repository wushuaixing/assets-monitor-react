import React from 'react';
import { TimeLine } from '@/common';
import './style.scss';

export default class EquityPledge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeLineData: [
				{ num: 2, year: 2017 },
				{ num: 6, year: 2018 },
			],
			roleData: [
				{ value: 8, name: '资产所有人', description: '其中3条质押登记状态为无效' },
				{ value: 12, name: '债权人', description: '其中3条质押登记状态为无效' },
			],
		};
	}

	render() {
		const { timeLineData, roleData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-num">8条</span>
					<span className="container-title-name"> 股权质押信息</span>
				</div>
				<div className="overview-container-content">
					<div className="yc-timeline-title">角色分布</div>
					{
						roleData && roleData.map(item => (
							<div className="yc-role-container">
								<span className="yc-role-icon" />
								<div className="yc-role-name">
									{item.name}
								</div>
								<div className="yc-role-num">
									{`${item.value} 条`}
								</div>
								<div className="yc-role-description">{`(${item.description})`}</div>
							</div>
						))
					}
					<TimeLine title="年份分布" Data={timeLineData} id="lostLetter" />
				</div>
			</div>
		);
	}
}
