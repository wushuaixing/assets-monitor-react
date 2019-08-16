import React from 'react';
import QueryBidding from '../assets-auction/query';
import QueryPublicity from './query/publicity';
import './style.scss';
import { Tabs, Button } from '@/common';

const source = [
	{
		id: 1,
		name: '竞价项目',
		dot: true,
		number: 0,
		showNumber: false,
	},
	{
		id: 2,
		name: '公示项目',
		number: 0,
		dot: true,
		showNumber: false,
	},
];

export default class Financial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			childChoose: 1,
		};
	}

	render() {
		const { childChoose } = this.state;
		return (
			<div className="yc-assets-auction">
				{childChoose === 1 ?	<QueryBidding /> :	<QueryPublicity />}
				<Tabs
					onChange={e => this.setState({ childChoose: e.id })}
					source={source}
					simple
					field="process"
				/>
				<div className="assets-auction-action">
					<Button>全部</Button>
					<Button>只显示未读</Button>
					<Button>全部标为已读</Button>
					<Button>批量管理</Button>
				</div>
			</div>
		);
	}
}
