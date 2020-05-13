import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { navigate } from '@reach/router';
import { infoCount } from '@/utils/api/monitor-info/assets';
import { toThousands } from '@/utils/changeTime';
import { Icon } from '@/common';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '754px', height: '155px', marginBottom: '20px' };
export default class Asset extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			unReadCount: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		infoCount(this.condition).then((res) => {
			if (res.code === 200) {
				this.setState({
					unReadCount: res.data.unfollowedCount,
				});
			}
		});
	};


	render() {
		const {
			url, auctionPropsData, auctionPropsData: {
				totalCount, auctionArray, assetTotal, loading, gmtUpdate,
			},
		} = this.props;
		const { unReadCount } = this.state;
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
					unReadText="条未跟进信息"
					unReadNum={unReadCount}
				>
					{Object.keys(auctionPropsData).length !== 0 && (
						<div className="risk-auction-container">
							<Row gutter={20} style={totalCount ? {} : { marginRight: '185px', marginLeft: '0' }}>

								{assetTotal && (
								<Col className="gutter-row" span={8}>
									<div className="risk-auction-container-price">
										<Icon className={`risk-auction-container-price-icon ${!totalCount && 'monitor-card-noCount-color'}`} type="icon-assets" style={{ color: '#FB8E3C' }} />
										<div>相关资产价值约</div>
										<div>
											<span style={!totalCount ? { color: '#7d8699' } : { color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>
												{assetTotal ? toThousands(assetTotal) : '0'}
											</span>
											元
										</div>
										<span className="risk-auction-container-price-line" />
									</div>
								</Col>
								)}

								{
								auctionArray.map((item, index) => (
									<div style={assetTotal ? {} : { paddingLeft: '34px' }}>
										{
											index > 2 ? (
												 (
													<Col className="gutter-row" span={totalCount ? 5 : 7}>
														<div className="risk-auction-container-card">
															<span className="risk-auction-container-card-name">{item.typeName}</span>
															<span className="risk-auction-container-card-info">：</span>
															<span className={`risk-auction-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
															条
														</div>
													</Col>
												)
											) : (
												<Col className="gutter-row" span={totalCount ? 5 : 7}>
													<div className="risk-auction-container-card">
														<span className="risk-auction-container-card-name">{item.typeName}</span>
														<span className="risk-auction-container-card-info">：</span>
														<span className={`risk-auction-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
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
