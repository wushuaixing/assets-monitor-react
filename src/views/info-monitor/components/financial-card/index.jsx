import React, { PureComponent } from 'react';
import { Col, Row } from 'antd';
import { navigate } from '@reach/router';
import { promiseAll } from '@/utils/promise';
import { auctionBiddingCount, auctionFinanceCountMerchants, auctionFinanceCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '148px', marginBottom: '20px' };
export default class Finance extends PureComponent {
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
	toInfoCount = () => {
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		promiseArray.push(auctionBiddingCount(params));
		promiseArray.push(auctionFinanceCountMerchants(params));
		promiseArray.push(auctionFinanceCount(params));

		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			let total = 0;
			res.forEach((i) => {
				total += i.data || 0;
			});
			this.setState(() => ({
				unReadCount: total,
			}));
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	render() {
		const {
			url, financePropsData, financePropsData: {
				gmtUpdate, totalCount, dataSource,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="finance"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="金融资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(financePropsData).length !== 0 && (
					<Row gutter={24} className="risk-finance-container">
						{
							dataSource.map((item, index) => (
								<div>
									{
										index > 2 ? (
											(
												<Col className="gutter-row" span={12}>
													<div className="risk-finance-container-card">
														<span className="risk-finance-container-card-name">{item.typeName}</span>
														<span className="risk-finance-container-card-info">：</span>
														<span className={`risk-finance-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
														条
													</div>
												</Col>
											)
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-finance-container-card">
													<span className="risk-finance-container-card-name">{item.typeName}</span>
													<span className="risk-finance-container-card-info">：</span>
													<span className={`risk-finance-container-card-num  ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
													条
												</div>
											</Col>
										)
									}
								</div>
							))
						}
					</Row>
				)}
			</Card>
		);
	}
}
