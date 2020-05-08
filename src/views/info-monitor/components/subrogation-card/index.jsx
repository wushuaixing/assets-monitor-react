import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

export default class Subrogation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, subrogationPropsData, subrogationPropsData: {
				restore, execute, otherCase, gmtUpdate, totalCount,
			},
		} = this.props;
		return (
			<Card
				IconType="subrogation"
				onClick={() => navigate(url)}
				IconColor={{ color: '#948BFF' }}
				customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
				text="代位权"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(subrogationPropsData).length !== 0 && (
					<div className="risk-subrogation-container">
						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							执行案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{execute || 0}</span>
							笔

							{restore > 0 ? (
								<div className="card-content-left-arrow">
									<div className="card-content-popover-content">
										{restore}
										笔执恢案件
									</div>
								</div>
							) : null}
						</div>

						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							其他案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{otherCase || 0}</span>
							笔
						</div>
					</div>
				)}
			</Card>

		);
	}
}
