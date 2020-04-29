import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Lawsuit extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			totalCount: 12,
		};
	}

	render() {
		const { url } = this.props;
		const { totalCount } = this.state;
		return (
			<Card
				Risk
				IconType="lawsuit"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="涉诉信息"
				totalCount={totalCount}
			>
				<div className="risk-lawsuit-card">
					涉诉风险债务人：
					<span className="risk-lawsuit-card-num">12</span>
					名，点击查看涉诉详情
				</div>
			</Card>
		);
	}
}
