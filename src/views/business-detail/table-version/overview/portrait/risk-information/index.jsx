import React from 'react';
import Bankruptcy from '../cardComponents/Bankruptcy-card';
import Involved from '../cardComponents/Involved-card';
import Information from '../cardComponents/Information-card';
import './style.scss';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div className="overview-container-title" style={{ marginTop: '20px' }}>
					<div className="overview-left-item" />
					<span className="container-title-name">风险信息</span>
				</div>
				<div className="overview-container-cardContent">
					{/* 破产重组 */}
					<Bankruptcy />
					{/* 涉诉信息 */}
					<Involved />
					{/* 经营风险 */}
					<Information />
				</div>
			</div>
		);
	}
}
