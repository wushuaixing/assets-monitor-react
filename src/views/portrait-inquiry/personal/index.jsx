import React from 'react';
import Router from '@/utils/Router';
import { navigate } from '@reach/router';
import QueryView from '../common/queryView';
import { Tabs } from '@/common';
import OverView from './overview';
import Assets from './assets';
import Risk from './risk';
import TempImg from '../title.png';
import './style.scss';

const source = () => [
	{
		id: 201,
		name: '　概况　',
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
		const defaultSourceType = window.location.hash.match(/\d{3}?/);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[0]) : 201,
		};
	}

	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/personal/${val}`);
			});
		}
	};


	render() {
		const { tabConfig, sourceType, childDom } = this.state;
		return (
			<div className="yc-inquiry-personal">
				<QueryView type={2} />
				<div className="mark-line" />
				<div className="inquiry-personal-content">
					<div className={`personal-intro ${childDom ? '' : 'personal-intro-child'}`}>
						<img src={TempImg} alt="" style={{ width: '100%' }} />
						<Tabs.Simple
							onChange={this.onSourceType}
							source={tabConfig}
							defaultCurrent={sourceType}
						/>
						{childDom}
					</div>
					<Router>
						<OverView toPushChild={this.handleAddChild} path="/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/personal/202/*" />
						<Risk toPushChild={this.handleAddChild} path="/inquiry/personal/203/*" />
					</Router>

				</div>
			</div>
		);
	}
}
