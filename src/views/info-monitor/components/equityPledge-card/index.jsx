import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Stock extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, stockPropsData, stockPropsData: {
				stockOwner, stockUser, gmtUpdate, totalCount,
			},
		} = this.props;
		return (
			<Card
				IconType="stock"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="股权质押"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(stockPropsData).length !== 0 && (
					<div className="risk-stock-container">
						<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							股权持有人：
							<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{stockOwner}</span>
							条
						</div>

						<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							股权质权人：
							<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{stockUser}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
