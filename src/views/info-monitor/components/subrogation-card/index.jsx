import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

export default class Subrogation extends PureComponent {
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
				IconType="subrogation"
				onClick={() => navigate(url)}
				IconColor={{ color: '#948BFF' }}
				customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
				text="代位权"
				totalCount={totalCount}
			>
				<div className="risk-subrogation-container">
					<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
						执行案件：
						<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>12</span>
						笔
					</div>

					<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
						其他案件：
						<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>12</span>
						笔
					</div>
				</div>
			</Card>

		);
	}
}
