import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Bidding extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, biddingPropsData, biddingPropsData: {
				bidding, gmtUpdate, totalCount,
			},
		} = this.props;
		return (
			<Card
				IconType="bidding"
				IconColor={{ color: '#3DBD7D' }}
				customStyle={hasCountStyle}
				text="招投标"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(biddingPropsData).length !== 0 && (
				<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
					<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{bidding || 0}</span>
					条相关匹配信息，请核实
				</div>
				)}
			</Card>
		);
	}
}
