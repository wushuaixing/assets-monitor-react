import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assestArray: [
				{ name: '资产挖掘', count: 103 },
				{ name: '土地信息', count: 26 },
				{ name: '无形资产', count: 13 },
				{ name: '代位权', count: 73 },
				{ name: '股权质押', count: 11 },
				{ name: '动产抵押', count: 103 },
				{ name: '金融资产', count: 13 },
				{ name: '招投标', count: 63 },
			],
		};
	}

	render() {
		const { assestArray } = this.state;
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
						{
							assestArray.map(item => (
								<div className="overview-container-content-asset-item">
									<Icon type="icon-checked" className="overview-container-content-asset-item-icon" />
									<div className="overview-container-content-asset-item-text">
										{item.name}
										{item.count ? `（${item.count}）` : null}
									</div>
								</div>
							))
						}

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
