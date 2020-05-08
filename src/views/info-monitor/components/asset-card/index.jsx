import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import { Icon } from '@/common';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '754px', height: '155px', marginBottom: '20px' };
export default class Asset extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, auctionPropsData, auctionPropsData: {
				totalCount, auctionArray, assetTotal, loading, gmtUpdate,
			},
		} = this.props;
		// const {
		// 	totalCount, auctionArray, assetTotal, loading, gmtUpdate,
		// } = this.state;
		// console.log(auctionPropsData);
		return (
			<React.Fragment>
				<Card
					asset
					IconType="auction"
					Loading={loading}
					onClick={() => navigate(url)}
					IconColor={{ color: '#FB8E3C' }}
					customStyle={hasCountStyle}
					text="资产拍卖"
					totalCount={totalCount}
					updateTime={gmtUpdate}
				>
					{Object.keys(auctionPropsData).length !== 0 && (
						<div className="risk-auction-container">
							<Row gutter={20}>
								<Col className="gutter-row" span={8}>
									<div className="risk-auction-container-price">
										<Icon className={`risk-auction-container-price-icon ${!totalCount && 'monitor-card-noCount-color'}`} type="icon-assets" style={{ color: '#FB8E3C' }} />
										<div>相关资产价值约</div>
										<div>
											<span style={{ color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>
												{assetTotal ? toThousands(assetTotal) : '-'}
											</span>
										元
										</div>
										<span className="risk-auction-container-price-line" />
									</div>
								</Col>
								{
								auctionArray.map((item, index) => (
									<div>
										{
											index > 2 ? (
												 (
													<Col className="gutter-row" span={5}>
														<div className="risk-auction-container-card">
															<span className="risk-auction-container-card-name">{item.typeName}</span>
															<span className="risk-auction-container-card-info">：</span>
															<span className="risk-auction-container-card-num">{item.count || 0}</span>
															条
														</div>
													</Col>
												)
											) : (
												<Col className="gutter-row" span={5}>
													<div className="risk-auction-container-card">
														<span className="risk-auction-container-card-name">{item.typeName}</span>
														<span className="risk-auction-container-card-info">：</span>
														<span className="risk-auction-container-card-num">{item.count || 0}</span>
														条
													</div>
												</Col>
											)
										}
									</div>
								))
							}
							</Row>
						</div>
					)}
				</Card>
			</React.Fragment>
		);
	}
}
