import React from 'react';
import { Modal, message } from 'antd';
import QueryBidding from './query/bidding';
import TableBidding from './table/bidding';
import QueryPublicity from './query/publicity';
import TablePublicity from './table/publicity';

import { Button, Tabs, Spin } from '@/common';
import { readStatusAll } from '@/utils/api/monitor-info/finance';
import Apis from '@/utils/api/monitor-info/finance';
import { clearEmpty, changeURLArg } from '@/utils';
import { fileExport } from '@/views/monitor/table-common';
import { unReadCount } from '@/utils/api/monitor-info';

const api = (field, type) => Apis[`${field}${type === 1 ? 'Bid' : 'Pub'}`];

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		// 获取当前页面路由配置
		const _rule = rule => ([
			{
				id: 1,
				name: '竞价项目',
				dot: false,
				status: Boolean(rule.jkxxjrzcjjxm),
			},
			{
				id: 2,
				name: '公示项目',
				dot: false,
				status: Boolean(rule.jkxxjrzcgsxm),
			},
		]).filter(item => item.status);

		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: _rule(props.rule.children),
		};
		this.condition = {
			num: 10,
		};
		this.selectRow = [];
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'project');
		this.setState({
			sourceType,
		});
		this.onQueryChange({}, sourceType);
		this.onUnReadCount();
		this.setUnReadCount = setInterval(() => {
			this.onUnReadCount();
		}, 30 * 1000);
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 切换列表类型[仅公示项目]
	handleReadChange=(val) => {
		const { tabConfig } = this.state;
		const _tabConfig = tabConfig.map((item) => {
			const _item = Object.assign({}, item);
			_item.number = 0;
			_item.dot = false;
			return _item;
		});
		this.setState({ isRead: val, tabConfig: _tabConfig });
		this.onQueryChange(this.condition, '', val);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		Modal.confirm({
			title: '确认将代位权—立案信息标记为全部已读？',
			content: '点击确定，将为您标记为全部已读。',
			iconType: 'exclamation-circle',
			onOk() {
				readStatusAll({}).then((res) => {
					if (res.code === 200) {
						_this.onQueryChange();
					}
				});
			},
			onCancel() {},
		});
	};

	// 一键导出 & 批量导出
	handleExport=(type) => {
		const { sourceType } = this.state;
		const exportList = api('exportList', sourceType);
		if (type === 'all') {
			fileExport(exportList, this.condition);
		} else if (this.selectRow.length > 0) {
			fileExport(exportList, this.condition, { idList: this.selectRow }, 'warning');
		} else {
			message.warning('未选中业务');
		}
	};

	// 批量关注
	handleAttention=() => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const { dataSource, sourceType } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认关注选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					api('follow', sourceType)({ idList }, true).then((res) => {
						if (res.code === 200) {
							message.success('操作成功！');
							const _dataSource = dataSource.map((item) => {
								const _item = item;
								idList.forEach((it) => { if (it === item.id) _item.isAttention = 1; });
								return _item;
							});
							_this.setState({
								dataSource: _dataSource,
								manage: true,
							});
						}
					});
				},
				onCancel() {},
			});
		} else {
			message.warning('未选中业务');
		}
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
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
		});
		this.toClearSortStatus();
		this.onQueryChange(null, val, 'all', 1);
		window.location.href = changeURLArg(window.location.href, 'project', val);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		this.condition = Object.assign(con || this.condition, {
			page: page || current,
		});
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'else') this.condition.isRead = 0;
		this.setState({ loading: true, manage: _manage || false });
		// delete this.condition.sourceType;
		api('infoList', _sourceType || sourceType)(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
				message.error(res.message || '网络请求异常请稍后再试！');
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 查询是否有未读消息
	onUnReadCount=() => {
		const { tabConfig } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _tabConfig = tabConfig.map((item) => {
					const _item = item;
					if (_item.id === 2)_item.dot = data.financeCount;
					return _item;
				});
				this.setState({ tabConfig: _tabConfig });
			}
		});
	};

	render() {
		const {
			sourceType, isRead, dataSource, current, total, tabConfig, manage, loading,
		} = this.state;
		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: val => this.selectRow = val,
			selectRow: this.selectRow,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-assets-auction">
				{
					sourceType === 1
						?	<QueryBidding onQueryChange={this.onQuery} />
						:	<QueryPublicity onQueryChange={this.onQuery} />
				}
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="project"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							{
								sourceType === 2 ? [
									<Button
										active={isRead === 'all'}
										onClick={() => this.handleReadChange('all')}
										title="全部"
									/>,
									<Button
										active={isRead === 'else'}
										onClick={() => this.handleReadChange('else')}
										title="只显示未读"
									/>,
									<Button onClick={this.handleAllRead}>全部标为已读</Button>,
								] : null
							}

							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>
							<Button onClick={() => this.handleExport('all')} style={{ float: 'right' }}>
								<span className="yc-export-img" />
								<span> 一键导出</span>
							</Button>
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
				<Spin visible={loading}>
					{
						sourceType === 1 ? <TableBidding {...tableProps} /> : <TablePublicity {...tableProps} />
					}
				</Spin>

			</div>
		);
	}
}
