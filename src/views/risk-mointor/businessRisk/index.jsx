import React, { Component, Fragment } from 'react';
import {
	Tabs, Button, Spin, Download,
} from '@/common';
// query
import QueryBusinessChange from './query/businessChange';
import QueryAbnormalOperation from './query/abnormalOperation';
import QueryIllegal from './query/illegal';
import QueryTaxViolation from './query/taxViolation';
import QueryPenalties from './query/penalties';
import QueryEnvironmentalPunishment from './query/environmentalPunishment';
// table
import TableBusinessChange from './table/businessChange';
import TableAbnormalOperation from './table/abnormalOperation';
import TableIllegal from './table/illegal';
import TableTaxViolation from './table/taxViolation';
import TablePenalties from './table/penalties';
import TableEnvironmentalPunishment from './table/environmentalPunishment';
import './style.scss';

const toGetConfig = () => {
	// const { children } = rule;
	const base = [
		{
			id: 1,
			name: '经营异常',
			dot: false,
			number: 0,
			showNumber: false,
			status: false,
		},
		{
			id: 2,
			name: '工商变更',
			number: 0,
			dot: false,
			showNumber: false,
			status: true,
		},
		{
			id: 3,
			name: '严重违法',
			number: 0,
			dot: false,
			showNumber: false,
			status: false,
		},
		{
			id: 4,
			name: '税收违法',
			dot: false,
			number: 0,
			showNumber: false,
			status: false,
		},
		{
			id: 5,
			name: '行政处罚',
			number: 0,
			dot: false,
			showNumber: false,
			status: true,
		},
		{
			id: 6,
			name: '环保处罚',
			number: 0,
			dot: false,
			showNumber: false,
			status: false,
		},
	];
	return base.filter(item => item.status);
};

class BusinessRisk extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 2, // 切换id
			loading: false,
			manage: false,
			tabConfig: toGetConfig(),
		};
	}

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
		});
	};

	render() {
		const {
			tabConfig, sourceType, loading, manage,
		} = this.state;
		console.log(sourceType);

		return (
			<Fragment>
				<div>
					{sourceType === 1 ? <QueryAbnormalOperation onQueryChange={this.onQuery} /> : null}
					{sourceType === 2 ? <QueryBusinessChange onQueryChange={this.onQuery} /> : null}
					{sourceType === 3 ? <QueryIllegal onQueryChange={this.onQuery} /> : null}
					{sourceType === 4 ? <QueryTaxViolation onQueryChange={this.onQuery} /> : null}
					{sourceType === 5 ? <QueryPenalties onQueryChange={this.onQuery} /> : null}
					{sourceType === 6 ? <QueryEnvironmentalPunishment onQueryChange={this.onQuery} /> : null}
				</div>

				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				{
					!manage ? (
						<div className="yc-businessRisk-action">
							<Button
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								onClick={() => this.handleReadChange('unread')}
								title="只显示未读"
							/>
							<Button onClick={this.handleAllRead}>全部标为已读</Button>
							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>

							<Download
								all
								text="一键导出"
								condition={() => this.condition}
								api=""
								style={{ float: 'right' }}
							/>
						</div>
					) : (
						<div className="yc-businessRisk-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								text="导出"
								field="idList"
								api=""
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
							/>
							<Button
								onClick={() => {
									this.setState({ manage: false });
									this.selectRow = [];
								}}
								title="取消管理"
							/>
						</div>
					)
				}
				<Spin visible={loading}>
					{sourceType === 1 ? <TableAbnormalOperation /> : null}
					{sourceType === 2 ? <TableBusinessChange /> : null}
					{sourceType === 3 ? <TableIllegal /> : null}
					{sourceType === 4 ? <TableTaxViolation /> : null}
					{sourceType === 5 ? <TablePenalties onQueryChange={this.onQuery} /> : null}
					{sourceType === 6 ? <TableEnvironmentalPunishment /> : null}
				</Spin>
			</Fragment>
		);
	}
}

export default BusinessRisk;
