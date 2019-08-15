import React from 'react';
import QueryBid from './query/bid';
import QueryIllegal from './query/illegal';
import QueryPunish from './query/punish';
import { Tabs, Button } from '@/common';

import imgExport from '@/assets/img/icon/icon_export.png';
import './style.scss';

const source = [
	{
		id: 1,
		name: '招标中标',
		dot: false,
		number: 0,
		showNumber: false,
	},
	{
		id: 2,
		name: '重大税收违法',
		number: 0,
		dot: false,
		showNumber: false,
	},
	{
		id: 3,
		name: '环境行政处罚',
		number: 0,
		dot: false,
		showNumber: false,
	},
];

export default class Lawsuits extends React.Component {
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
				{childChoose === 1 ?	<QueryBid /> : null}
				{childChoose === 2 ?	<QueryIllegal /> : null}
				{childChoose === 3 ?	<QueryPunish /> : null}
				<Tabs
					rightRender={() => (
						<div className="assets-tabs-right">
							<li>
								<img src={imgExport} alt="" />
								<span>一键导出</span>
							</li>
						</div>
					)}
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
