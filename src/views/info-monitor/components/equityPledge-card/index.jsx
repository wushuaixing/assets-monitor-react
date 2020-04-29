import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Stock extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			totalCount: 24,
		};
	}

	render() {
		const { url } = this.props;
		const { totalCount } = this.state;
		return (
			<Card
				IconType="stock"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="股权质押"
				totalCount={totalCount}
			>
				<div className="risk-stock-container">
					<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
						股权持有人：
						<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>12</span>
						条
					</div>

					<div className={`risk-stock-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						股权质权人：
						<span className={`risk-stock-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>12</span>
						条
					</div>
				</div>
			</Card>
		);
	}
}
