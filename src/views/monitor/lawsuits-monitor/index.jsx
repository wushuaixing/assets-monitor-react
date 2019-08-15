import React from 'react';
import QueryCourt from './query/court';
import QueryRegister from './query/register';
import { Tabs, Button } from '@/common';

import imgExport from '@/assets/img/icon/icon_export.png';
import './style.scss';

const source = [
	{
		id: 1,
		name: '立案信息',
		dot: true,
		number: 0,
		showNumber: true,
	},
	{
		id: 2,
		name: '开庭公共',
		number: 0,
		dot: true,
		showNumber: true,
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
				{childChoose === 1 ?	<QueryRegister /> :	<QueryCourt />}
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
