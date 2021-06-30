import React from 'react';
import { navigateDetailRisk } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Execute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				gmtModified, execPersonCount, removedCount, obligorTotal,
			},
		} = this.props;
		return (
			<React.Fragment>
				{execPersonCount > 0 ? (
					<Card
						Risk
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="beizhihangxinxi"
						IconColor={{ color: '#FF6133' }}
						customStyle={hasCountStyle}
						count={execPersonCount}
						gmtCreate={gmtModified}
						obligorName="人匹配到限制高消费信息"
						text="被执行信息"
						onClick={() => navigateDetailRisk('e-manage-execute')}
						styleName="execute-card"
					>
						<div className="execute-card-content">
							<div className="execute-card-content-card">
								未移除：
								<span className="execute-card-content-card-num">{execPersonCount}</span>
								条
							</div>
							<div className="execute-card-content-card">
								已移除：
								<span className="execute-card-content-card-num">{removedCount}</span>
								条
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
