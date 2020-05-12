import React from 'react';
import { navigate } from '@reach/router';
import { Icon, Spin } from '@/common';
import './style.scss';

class HomeOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNavigate = (val) => {
		const toNavigate = new Map([
			['auction', () => { navigate('/monitor?process=1'); }],
			['land', () => { navigate('/monitor/land'); }],
			['intangible', () => { navigate('/monitor/intangible'); }],
			['subrogation', () => { navigate('/monitor/subrogation'); }],
			['stock', () => { navigate('/monitor/pledge'); }],
			['chattel', () => { navigate('/monitor/mortgage'); }],
			['finance', () => { navigate('/monitor/financial'); }],
			['bidding', () => { navigate('/monitor/tender'); }],
			['bankruptcy', () => { navigate('/risk/bankruptcy'); }],
			['broken', () => { navigate('/risk/broken'); }],
			['lawsuit', () => { navigate('/risk'); }],
			['operation-risk', () => { navigate('/risk/operation'); }],
			['default', () => { console.log('未匹配'); }],
		]);
		const excavateMap = toNavigate.get(val.icon) || toNavigate.get('default');
		if (val && val.count !== 0) { excavateMap.call(this); }
	};

	isArray = arr => arr && Array.isArray(arr) && arr.length > 0;

	render() {
		const { assetArray, riskArray, loading } = this.props;
		const isAssetArray = this.isArray(assetArray);
		const isRiskArray = this.isArray(riskArray);
		const newAssetArray = assetArray && assetArray.filter(i => i.count !== null);
		const newRiskArray = riskArray && riskArray.filter(i => i.count !== null);

		return (
			<div className="home-overview-container">
				<div className="home-overview-container-header">
					监控概览
					<div className="home-overview-container-header-detail">
						<span className="home-overview-container-header-detail-text" onClick={() => navigate('/info/monitor/excavate')}>详情</span>
						<Icon type="icon-icon_arrow" className="home-overview-container-header-detail-icon" />
					</div>
				</div>
				<Spin visible={loading} minHeight={540}>
					{
						loading ? null :	(

							<div className="home-overview-container-content">
								{newAssetArray && newAssetArray.length > 0 && (
								<div>
									<div className="home-overview-container-content-title">
										<div className="content-title-item" />
										<div className="content-title-name">资产挖掘</div>
									</div>
									<div className="home-overview-container-content-asset">
										{
											isAssetArray && newAssetArray.map((item) => {
												const { color } = item;
												return (
													<div
														className={`home-overview-container-content-asset-item ${item.count === 0 && 'home-overview-container-default'}`}
														onClick={() => this.handleNavigate(item)}
													>
														<Icon type={`icon-${item.icon}`} className="home-overview-container-content-asset-item-icon" style={item.count === 0 ? { color: '#B2B8C9' } : { color }} />
														<div className="home-overview-container-content-asset-item-text">
															{item.count ? item.name : <span style={{ color: '#B2B8C9' }}>{item.name}</span>}
															{item.count ? `（${item.count}）` : null}
														</div>
													</div>
												);
											})
										}
									</div>
								</div>
								)}

								{
									newRiskArray && newRiskArray.length > 0 && (
										<div>
											<div className="home-overview-container-content-title">
												<div className="content-title-item" />
												<div className="content-title-name">风险参考</div>
											</div>
											<div className="home-overview-container-content-risk">
												{
													isRiskArray && newRiskArray.map((item) => {
														const { color } = item;
														return (
															<div
																className={`home-overview-container-content-asset-item ${item.count === 0 && 'home-overview-container-default'}`}
																onClick={() => this.handleNavigate(item)}
															>
																<Icon
																	type={`icon-${item.icon}`}
																	className="home-overview-container-content-asset-item-icon"
																	style={item.count === 0 ? { color: '#B2B8C9' } : { color }}
																/>
																<div className="home-overview-container-content-asset-item-text">
																	{item.count ? item.name : <span style={{ color: '#B2B8C9' }}>{item.name}</span>}
																	{item.count ? `（${item.count}）` : null}
																</div>
															</div>
														);
													})
												}
											</div>
										</div>
									)
								}
							</div>
						)
					}
				</Spin>
			</div>
		);
	}
}

export default HomeOverview;
