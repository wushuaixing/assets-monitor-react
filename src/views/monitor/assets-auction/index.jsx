import React from 'react';
import Query from './query';
import './style.scss';
import { Tabs, Button } from '@/common';

import imgRecovery from '@/assets/img/icon/icon_recovery_n.png';
import imgExport from '@/assets/img/icon/icon_export.png';

const source = [
	{
		id: 1,
		name: '全部',
	},
	{
		id: 2,
		name: '未跟进',
		number: 0,
		showNumber: true,
	},
	{
		id: 3,
		name: '跟进中',
		number: 0,
		showNumber: true,
	},
	{
		id: 4,
		name: '已完成',
		number: 0,
		showNumber: true,
	},
	{
		id: 5,
		name: '已忽略',
		number: 0,
	},
	{
		id: 6,
		name: '已放弃',
		number: 0,
	},
];

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="yc-assets-auction">
				<Query />
				<Tabs
					rightRender={() => (
						<div className="assets-tabs-right">
							<li>
								<img src={imgRecovery} alt="" />
								<span>资产清收流程</span>
							</li>
							<li>
								<img src={imgExport} alt="" />
								<span>一键导出</span>
							</li>
						</div>
					)}
					source={source}
					simple
					field="process"
				/>
				<div className="assets-auction-action">
					<Button>批量管理</Button>
				</div>
				<div style={{ height: 600 }} />
			</div>
		);
	}
}
