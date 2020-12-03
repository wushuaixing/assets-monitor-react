import React from 'react';
import { navigateDetail } from '@/utils';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class UnBlockCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { portrait, dataSource: { unsealCount, gmtModified, obligorTotal } } = this.props;
		return (
			<React.Fragment>
				{unsealCount > 0 ? (
					<Card
						portrait={portrait}
						obligorTotal={obligorTotal}
						IconType="cheliangxinxi"
						IconColor={{ color: '#3DBD7D' }}
						customStyle={hasCountStyle}
						count={unsealCount}
						gmtCreate={gmtModified}
						obligorName="条相关匹配信息"
						text="车辆信息"
						onClick={() => navigateDetail('e-assets-unblock')}
						styleName="unblock-card"
					>
						<div className="business-unblock-card">
							<span className="business-unblock-card-num">{unsealCount || 0}</span>
							条相关匹配信息
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
