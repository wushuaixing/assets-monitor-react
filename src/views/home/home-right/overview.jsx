import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assetArray: [
				{
					name: '资产挖掘', count: 103, color: '#FB8E3C', icon: 'auction',
				},
				{
					name: '土地信息', count: 26, color: '#1C80E1', icon: 'land',
				},
				{
					name: '无形资产', count: 13, color: '#FFC531', icon: 'intangible',
				},
				{
					name: '代位权', count: null, color: '#B2B8C9', icon: 'subrogation',
				},
				{
					name: '股权质押', count: 11, color: '#FB5A5C', icon: 'auction',
				},
				{
					name: '动产抵押', count: 0, color: '#B2B8C9', icon: 'auction',
				},
				{
					name: '金融资产', count: 13, color: '#FB8E3C', icon: 'auction',
				},
				{
					name: '招投标', count: 11163, color: '#3DBD7D', icon: 'auction',
				},
			],
			riskArray: [
				{
					name: '破产重组', count: 103, color: '#948BFF', icon: 'auction',
				},
				{
					name: '失信记录', count: 26, color: '#FB5A5C', icon: 'auction',
				},
				{
					name: '涉诉信息', count: 13, color: '#FB8E3C', icon: 'auction',
				},
				{
					name: '经营风险', count: null, color: '#B2B8C9', icon: 'auction',
				},
			],
		};
	}

	render() {
		const { assetArray, riskArray } = this.state;
		return (
			<div className="overview-container">
				<div className="overview-container-header">
					监控概览
					<div className="overview-container-header-detail">
						详情
						 {/* <Icon type="icon-arrow-line-copy" className="overview-container-header-detail-icon" /> */}
					</div>
				</div>
				<div className="overview-container-content">
					<div className="overview-container-content-title">
						<div className="content-title-item" />
						<div className="content-title-name">资产挖掘</div>
					</div>
					<div className="overview-container-content-asset">
						{
							assetArray.map((item) => {
								const { color } = item;
								return (
									<div className="overview-container-content-asset-item">
										<Icon type={`icon-${item.icon}`} className="overview-container-content-asset-item-icon" style={{ color }} />
										<div className="overview-container-content-asset-item-text">
											{item.count ? item.name : <span style={{ color: '#B2B8C9' }}>{item.name}</span>}
											{item.count ? `（${item.count}）` : null}
										</div>
									</div>
								);
							})
						}
					</div>
					<div className="overview-container-content-title">
						<div className="content-title-item" />
						<div className="content-title-name">风险参考</div>
					</div>
					<div className="overview-container-content-risk">
						{
							riskArray.map((item) => {
								const { color } = item;
								return (
									<div className="overview-container-content-asset-item">
										<Icon type="icon-checked" className="overview-container-content-asset-item-icon" style={{ color }} />
										<div className="overview-container-content-asset-item-text">
											{item.count ? item.name : <span style={{ color: '#B2B8C9' }}>{item.name}</span>}
											{item.count ? `（${item.count}）` : null}
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

export default HomeOverview;
