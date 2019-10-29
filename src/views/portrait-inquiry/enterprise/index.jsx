import React from 'react';
import Router from '@/utils/Router';
import QueryView from '../common/queryView';
import { Tabs } from '@/common';
import Overview from './overview';
import Assets from './assets';
import Lawsuits from './lawsuits';
import Manage from './manage';
import Info from './info';
// import { navigate } from '@reach/router';
import TempImg from '@/views/portrait-inquiry/title.png';
import './style.scss';

const source = () => [
	{
		id: 101,
		name: '概况',
		field: 'totalCount',
	},
	{
		id: 102,
		name: '资产',
		number: 56,
		showNumber: true,
	},
	{
		id: 103,
		name: '涉诉',
		number: 82,
		showNumber: true,
		field: 'followingCount',
	},
	{
		id: 104,
		name: '经营',
		number: 26,
		showNumber: true,
		field: 'finishedCount',
	},
	{
		id: 105,
		name: '工商基本信息',
		field: 'ignoreCount',
	},
];

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
		};
	}

	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	onSourceType=(val) => {
		// navigate(`/inquiry/enterprise/${val}`);
		console.log(val);
	};

	render() {
		const { tabConfig, childDom } = this.state;
		return (
			<div className="yc-inquiry-enterprise">
				<QueryView type={1} />
				<div className="mark-line" />
				<div className="inquiry-enterprise-content">
					<div className="enterprise-intro">
						<img src={TempImg} alt="" style={{ width: '100%' }} />
						<Tabs.Simple
							onChange={this.onSourceType}
							source={tabConfig}
							field="process"
							defaultCurrent={-1}
						/>
						{childDom}
					</div>
					<Router>
						<Overview toPushChild={this.handleAddChild} path="/101/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/enterprise/102/*" />
						<Lawsuits toPushChild={this.handleAddChild} path="/inquiry/enterprise/103/*" />
						<Manage toPushChild={this.handleAddChild} path="/inquiry/enterprise/104/*" />
						<Info toPushChild={this.handleAddChild} path="/inquiry/enterprise/105/*" />
					</Router>
				</div>
			</div>
		);
	}
}
