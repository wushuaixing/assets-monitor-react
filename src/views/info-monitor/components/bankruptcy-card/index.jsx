import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Bankruptcy extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			totalCount: 0,
		};
	}

	render() {
		const { url } = this.props;
		const { totalCount } = this.state;
		return (
			<Card
				Risk
				IconType="bankruptcy"
				IconColor={{ color: '#1C80E1' }}
				customStyle={hasCountStyle}
				text="破产重组"
				onClick={() => navigate(url)}
				totalCount={totalCount}
			>
				<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						破产/重整风险企业：
					<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>0</span>
						家
				</div>
			</Card>
		);
	}
}
