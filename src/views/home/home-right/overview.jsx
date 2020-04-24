import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="overview-container">
				<div className="overview-container-header">
					监控概览
					<div className="overview-container-header-detail">
						详情
						 <Icon type="icon-arrow-line-copy" className="overview-container-header-detail-icon" />
					</div>
				</div>
				<div className="overview-container-content">
					<div className="overview-container-content-title">
						<div className="content-title-item" />
						<div className="content-title-name">资产挖掘</div>
					</div>
					<div className="overview-container-content-asset">
						资产挖掘
					</div>
					<div className="overview-container-content-title">
						<div className="content-title-item" />
						<div className="content-title-name">风险参考</div>
					</div>
					<div className="overview-container-content-risk">
						风险参考
					</div>
				</div>
			</div>
		);
	}
}

export default HomeOverview;
