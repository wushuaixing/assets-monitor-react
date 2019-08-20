import React from 'react';
import { Modal } from 'antd';

import QueryCourt from './query/court';
import TableCourt from './table/court';
import QueryRegister from './query/register';
import TableRegister from './table/register';

import { Button, Tabs } from '@/common';
import { infoCount, infoList, readStatus } from '@/utils/api/monitor';
import './style.scss';

export default class Subrogation extends React.Component {
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
	}

	componentDidMount() {
		this.onQueryChange({});
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		infoCount({ type: 1 }).then((res) => {
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
			title: '确认将代位权——立案信息标记为全部已读？',
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

	onSelect=(val) => {
		console.log(val);
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
		const { sourceType, isRead } = this.state;
		// console.log(val, _sourceType, _isRead);

		this.condition = Object.assign(val || this.condition, {
			sourceType: _sourceType || sourceType,
			isRead: _isRead || isRead,
			type: 1,
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
				{sourceType === 1 ?	<QueryRegister onQueryChange={this.onQueryChange} /> :	<QueryCourt />}
				<Tabs
					onChange={e => this.onSourceType(e.id)}
					source={tabConfig}
					defaultCurrent={sourceType}
					simple
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
							<Button onClick={() => this.handleReadChange('')} title="关注" />
							<Button onClick={() => this.handleReadChange('')} title="导出" />
							<Button onClick={() => this.setState({ manage: false })} title="取消管理" />
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
