import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { auctionBiddingCount, auctionFinanceCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';
import { promiseAll } from '@/utils/promise';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
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
	toInfoCount=() => {
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		promiseArray.push(auctionBiddingCount(params));
		promiseArray.push(auctionFinanceCount(params));
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			let total = 0;
			res.forEach((i) => {
				total += i.data;
			});
			this.setState(() => ({
				unReadCount: total,
			}));
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	render() {
		const {
			url, financePropsData, financePropsData: {
				auctionBidding, finance, gmtUpdate, totalCount,
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
					<div className="risk-finance-container">
						<div className={`risk-finance-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							竞价项目：
							<span className={`risk-finance-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{auctionBidding || 0}</span>
							条相关匹配信息
							{totalCount ? '，请核实' : ''}
						</div>

						<div className={`risk-finance-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							公示项目：
							<span className={`risk-finance-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{finance || 0}</span>
							条相关匹配信息
							{totalCount ? '，请核实' : ''}
						</div>
					</div>
				)}
			</Card>
		);
	}
}
