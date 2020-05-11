import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Finance extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, financePropsData, financePropsData: {
				auctionBidding, finance, gmtUpdate, totalCount,
			},
		} = this.props;
		return (
			<Card
				IconType="finance"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="金融资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(financePropsData).length !== 0 && (
					<div className="risk-finance-container">
						<div className={`risk-finance-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							竞价项目：
							<span className={`risk-finance-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{auctionBidding || 0}</span>
							条相关匹配信息
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
