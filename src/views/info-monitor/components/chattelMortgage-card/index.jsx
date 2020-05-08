import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Chattel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, mortgagePropsData, mortgagePropsData: {
				owner, people, peopleAmount, gmtUpdate, totalCount,
			},
		} = this.props;
		return (
			<Card
				IconType="chattel"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="动产抵押"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(mortgagePropsData).length !== 0 && (
					<div className="risk-chattel-container">
						<div className={`risk-chattel-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							抵押物所有人：
							<span className={`risk-chattel-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{owner}</span>
							条
						</div>

						<div className={`risk-chattel-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							抵押权人：
							<span className={`risk-chattel-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{people}</span>
							条
							{peopleAmount ? (
								<span style={{ paddingLeft: '5px' }}>
									(涉及债权额
									<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(peopleAmount)}</span>
									元)
								</span>
							) : null}
						</div>
					</div>
				)}
			</Card>
		);
	}
}
