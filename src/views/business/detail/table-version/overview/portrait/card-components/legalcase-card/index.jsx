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
				gmtModified, endCaseCount, removeCount, obligorTotal, total,
			},
		} = this.props;
		return (
			<React.Fragment>
				{total > 0 ? (
					<Card
						Risk
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="zhongbenanjian"
						IconColor={{ color: '#5A6BFB' }}
						customStyle={hasCountStyle}
						count={total}
						gmtCreate={gmtModified}
						obligorName="匹配到终本案件信息"
						text="终本案件"
						onClick={() => navigateDetailRisk('e-manage-legalCase')}
						styleName="legalcase-card"
					>
						<div className="legalcase-card-content">
							<div className="legalcase-card-content-card">
								未移除：
								<span className="legalcase-card-content-card-num">{endCaseCount}</span>
								条
							</div>
							<div className="legalcase-card-content-card">
								已移除：
								<span className="legalcase-card-content-card-num">{removeCount}</span>
								条
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
