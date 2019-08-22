import React from 'react';
import { Modal, message } from 'antd';

import { Tabs, Button } from '@/common';
import QueryCourt from './query/court';
import QueryRegister from './query/register';
import TableCourt from '../subrogation/table/court';
import TableRegister from '../subrogation/table/register';

import {
	infoCount, infoList, readStatus, attention,
} from '@/utils/api/monitor-info/monitor';
import './style.scss';

export default class Lawsuits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			isRead: '',
			dataSource: '',
			current: 1,
			total: 0,
			manage: false,
			tabConfig: [
				{
					id: 1,
					name: '立案信息',
					dot: false,
					number: 0,
					showNumber: false,
				},
				{
					id: 2,
					name: '开庭公告',
					number: 0,
					dot: false,
					showNumber: false,
				},
			],
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentDidMount() {
		this.onQueryChange({});
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		infoCount({ type: 0 }).then((res) => {
			if (res.code === 200) {
				const { tabConfig } = this.state;
				let _tabConfig = tabConfig;
				res.data.forEach((item) => {
					if (item.sourceType === 1 || item.sourceType === 2) {
						_tabConfig = _tabConfig.map((itemChild) => {
							if (itemChild.id === item.sourceType && item.count) {
								return {
									id: itemChild.id,
									name: itemChild.name,
									number: item.count,
									dot: Boolean(item.count),
									showNumber: Boolean(item.count),
								};
							}
							return itemChild;
						});
					}
				});
				this.setState({
					tabConfig: _tabConfig,
				});
			}
		});
	};

	// 切换列表类型
	handleReadChange=(val) => {
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val);
	};

	// 全部标记为已读
	handleAllRead=() => {
		Modal.confirm({
			title: '确认将代位权—立案信息标记为全部已读？',
			content: '点击确定，将为您标记为全部已读。',
			iconType: 'exclamation-circle',
			onOk() {
				readStatus({}).then((res) => {
					if (res.code === 200) {
						this.onQueryChange();
					}
				});
			},
			onCancel() {},
		});
	};

	// 批量导出
	handleExport=() => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			Modal.confirm({
				title: '确认导出选中的所有信息吗？',
				content: '点击确定，将为您导出所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					attention({ idList }, true).then((res) => {
						if (res.code === 200) {
							message.success('操作成功！');
						}
					});
				},
				onCancel() {},
			});
		} else {
			message.warning('未选中业务');
		}
	};

	// 批量关注
	handleAttention=() => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			Modal.confirm({
				title: '确认关注选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					attention({ idList }, true).then((res) => {
						if (res.code === 200) {
							message.success('操作成功！');
						}
					});
				},
				onCancel() {},
			});
		} else {
			message.warning('未选中业务');
		}
	};

	// 批量管理☑️结果
	onSelect=(val) => {
		console.log(val);
		this.selectRow = val;
	};

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// sourceType变化
	onSourceType=(val) => {
		const { isRead } = this.state;
		this.setState({ sourceType: val, dataSource: '' });
		this.onQueryChange(null, val, isRead);
	};

	// 查询条件变化
	onQueryChange=(val, _sourceType, _isRead) => {
		console.log();
		const { sourceType, isRead } = this.state;
		// console.log(val, _sourceType, _isRead);

		this.condition = Object.assign(val || this.condition, {
			sourceType: _sourceType || sourceType,
			isRead: _isRead || isRead,
			type: 0,
			num: 10,
		});
		// console.log(condition);
		infoList(this.condition).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
				});
			}
		});
	};

	render() {
		const {
			sourceType, isRead, dataSource, current, total, tabConfig, manage,
		} = this.state;
		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: this.onSelect,
		};
		return (
			<div className="yc-assets-auction">
				{sourceType === 1
					?	<QueryRegister onQueryChange={this.onQueryChange} />
					:	<QueryCourt onQueryChange={this.onQueryChange} />}
				<Tabs.Simple
					onChange={e => this.onSourceType(e.id)}
					source={tabConfig}
					field="process"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								active={!isRead}
								onClick={() => this.handleReadChange('')}
								title="全部"
							/>
							<Button
								active={isRead === 1}
								onClick={() => this.handleReadChange(1)}
								title="只显示未读"
							/>
							<Button onClick={this.handleAllRead}>全部标为已读</Button>
							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>
						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Button onClick={this.handleExport} title="导出" />
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
				{
					sourceType === 1 ? <TableCourt {...tableProps} /> : <TableRegister {...tableProps} />
				}
			</div>
		);
	}
}
