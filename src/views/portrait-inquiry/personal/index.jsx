import React from 'react';
// import { Button } from '@/common';
// import { navigate } from '@reach/router';
import QueryView from '../common/queryView';
import { Tabs } from '@/common';
import OverView from './overview';
import TempImg from '../title.png';
import './style.scss';

const source = () => [
	{
		id: 201,
		name: '概况',
		field: 'totalCount',
	},
	{
		id: 202,
		name: '资产',
		number: 56,
		showNumber: true,
	},
	{
		id: 203,
		name: '风险',
		number: 82,
		showNumber: true,
		field: 'followingCount',
	},
];

export default class Personal extends React.Component {
	constructor(props) {
		document.title = '个人详情-画像查询';
		super(props);
		this.state = {
			tabConfig: source(),
		};
	}

	render() {
		const { tabConfig } = this.state;
		return (
			<div className="yc-inquiry-personal">
				<QueryView type={2} />
				<div className="mark-line" />
				<div className="inquiry-personal-content">
					<div className="personal-intro">
						<img src={TempImg} alt="" style={{ width: '100%' }} />
						<Tabs.Simple
							onChange={this.onSourceType}
							source={tabConfig}
							field="process"
							defaultCurrent={-1}
						/>
					</div>
					<OverView />
				</div>
			</div>
		);
	}
}
