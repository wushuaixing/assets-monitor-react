import React from 'react';
import { navigateDetailRisk } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class LegalCaseCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				gmtModified, endCaseCount, removeCount, obligorTotal,
			},
		} = this.props;
		return (
			<React.Fragment>
				{endCaseCount > 0 ? (
					<Card
						Risk
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="zhongbenanjian"
						IconColor={{ color: '#5A6BFB' }}
						customStyle={hasCountStyle}
						count={endCaseCount}
						gmtCreate={gmtModified}
						obligorName="匹配到终本案件信息"
						text="终本案件"
						onClick={() => navigateDetailRisk('e-manage-limitHeight')}
						styleName="limit-card"
					>
						<div className="business-limit-card">
							终本案件信息数：
							<span className="business-limit-card-num">{endCaseCount}</span>
						</div>
						<div className="business-limit-card">
							其中已移除：
							<span className="business-limit-card-num">{removeCount}</span>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
