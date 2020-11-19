import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

export default class FinancialCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorTotal: 0,
		};
	}

	render() {
		const { obligorTotal } = this.state;
		const {
			portrait, dataSource: {
				auctionFinanceCount, financeCount, financeInvestmentCount, allNum, gmtModified,
			},
		} = this.props;
		return (
			<React.Fragment>
				{
					allNum > 0 ? (
						<Card
							IconType="finance"
							obligorTotal={obligorTotal}
							IconColor={{ color: '#948BFF' }}
							portrait={portrait}
							count={allNum}
							gmtCreate={gmtModified}
							obligorName="人匹配到代位权信息"
							customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
							onClick={() => navigateDetail('e-assets-financial')}
							text="金融资产"
							styleName="financial-card"
						>
							<div className="business-financial-container">
								{auctionFinanceCount ? (
									<div className="business-financial-container-card" style={{ paddingBottom: 16 }}>
										竞价项目：
										<span className="business-financial-container-card-num ">{auctionFinanceCount || 0}</span>
										条
									</div>
								) : null}
								{financeCount ? (
									<div className="business-financial-container-card" style={{ paddingBottom: 16 }}>
										公示项目：
										<span className="business-financial-container-card-num">{financeCount || 0}</span>
										条
									</div>
								) : null}
								{financeInvestmentCount ? (
									<div className="business-financial-container-card">
										招商项目：
										<span className="business-financial-container-card-num">{financeInvestmentCount || 0}</span>
										条
									</div>
								) : null}
							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
