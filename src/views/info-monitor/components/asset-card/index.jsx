import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import { auctionCard } from '@/utils/api/monitor-info/excavate/index';
import getCount from '@/views/portrait-inquiry/common/getCount';
import { Icon } from '@/common';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '754px', height: '155px', marginBottom: '20px' };
export default class Asset extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			auctionArray: [],
			loading: false,
			totalCount: 0,
			assetTotal: 0,
			gmtUpdate: '',
		};
	}

	componentDidMount() {
		this.getCardData();
	}

	// 获取消息列表
	getCardData = () => {
		this.setState({ loading: true });
		auctionCard().then((res) => {
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.assetOwner || 0, typeName: '资产所有人' });
				dataSource.push({ count: res.data.bidder || 0, typeName: '竞买人' });
				dataSource.push({ count: res.data.creditor || 0, typeName: '债权人' });
				dataSource.push({ count: res.data.assetClue || 0, typeName: '财产线索' });
				dataSource.push({ count: res.data.unknown || 0, typeName: '未知角色' });
				const dataSourceNum = getCount(dataSource);
				this.setState({
					loading: false,
					auctionArray: dataSource,
					totalCount: dataSourceNum,
					assetTotal: res.data.assetTotal,
					gmtUpdate: res.data.gmtUpdate,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { url } = this.props;
		const {
			totalCount, auctionArray, assetTotal, loading, gmtUpdate,
		} = this.state;

		return (
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
														<span className="risk-auction-container-card-num">{item.count}</span>
														条
													</div>
												</Col>
											)
										) : (
											<Col className="gutter-row" span={5}>
												<div className="risk-auction-container-card">
													<span className="risk-auction-container-card-name">{item.typeName}</span>
													<span className="risk-auction-container-card-info">：</span>
													<span className="risk-auction-container-card-num">{item.count}</span>
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
			</Card>
		);
	}
}
