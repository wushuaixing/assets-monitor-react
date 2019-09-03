import React from 'react';
import { Modal, message } from 'antd';
import Cookies from 'universal-cookie';
import { Tabs, Button, Spin } from '@/common';
import QueryView from './queryView';
import TableView from './table';

import {
	infoCount, infoList, readStatus, attention, exportList,
} from '@/utils/api/monitor-info/monitor';
import { clearEmpty, urlEncode } from '@/utils';

const cookies = new Cookies();

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: [
				{
					id: 1,
					name: '立案信息',
					dot: false,
					number: 0,
					showNumber: true,
				},
				{
					id: 2,
					name: '开庭公告',
					number: 0,
					dot: false,
					showNumber: true,
				},
			],
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentDidMount() {
		this.onQueryChange({});
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.field = '';
		this.condition.order = '';
	};

	// 获取统计信息
	toInfoCount=(isRead) => {
		const params = Object.assign(this.condition, { type: 0, isRead });
		infoCount(clearEmpty(params)).then((res) => {
			if (res.code === 200) {
				const { tabConfig } = this.state;
				let _tabConfig = tabConfig;
				res.data.forEach((item) => {
					if (item.sourceType === 1 || item.sourceType === 2) {
						_tabConfig = _tabConfig.map((itemChild) => {
							if (itemChild.id === item.sourceType && item.count >= 0) {
								return {
									id: itemChild.id,
									name: itemChild.name,
									number: item.count,
									dot: Boolean(item.unreadCount),
									showNumber: true,
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
		const { tabConfig } = this.state;
		const _tabConfig = tabConfig.map((item) => {
			const _item = Object.assign({}, item);
			_item.number = 0;
			_item.dot = false;
			_item.showNumber = true;
			return _item;
		});
		this.setState({ isRead: val, tabConfig: _tabConfig });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { sourceType, tabConfig } = this.state;
		if (tabConfig[sourceType - 1].dot) {
			Modal.confirm({
				title: `确认将涉诉监控—${sourceType === 1 ? '立案信息' : '开庭公告'}标记为全部已读？`,
				content: '点击确定，将为您标记为全部已读。',
				iconType: 'exclamation-circle',
				onOk() {
					readStatus({
						sourceType, type: 0,
					}).then((res) => {
						if (res.code === 200) {
							_this.onQueryChange();
						}
					});
				},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
		}
	};

	// 一键导出 & 批量导出
	handleExport=(type) => {
		if (type === 'all') {
			const _condition = Object.assign({}, this.condition, {
				token: cookies.get('token'),
			});
			window.open(`${exportList}?${urlEncode(clearEmpty(_condition))}`, '_self');
			// console.log(urlEncode(_condition));
		} else if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const _condition = Object.assign({}, this.condition, {
				token: cookies.get('token'),
				idList,
			});
			Modal.confirm({
				title: '确认导出选中的所有信息吗？',
				content: '点击确定，将为您导出所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					window.open(`${exportList}?${urlEncode(clearEmpty(_condition))}`, '_self');
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
			const { dataSource } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认关注选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					attention({ idList }, true).then((res) => {
						if (res.code === 200) {
							message.success('操作成功！');
							const _dataSource = dataSource.map((item) => {
								const _item = item;
								idList.forEach((it) => {
									if (it === item.id) _item.isAttention = 1;
								});
								return _item;
							});
							_this.setState({
								dataSource: _dataSource,
								manage: false,
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

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.field = field;
		this.condition.order = order;
		this.onQueryChange(this.condition, '', '', 1);
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
			isRead: 'all',
		});
		this.toClearSortStatus();
		this.onQueryChange(null, val, 'all', 1);
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

	// 发起查询请求
	onQueryChange=(con, _sourceType, _isRead, page, manage) => {
		const { sourceType, isRead, current } = this.state;
		// console.log(val, _sourceType, _isRead);
		const __isRead = _isRead || isRead;
		this.condition = Object.assign(con || this.condition, {
			sourceType: _sourceType || sourceType,
			page: page || current,
			type: 0,
			num: 10,
		});
		if (__isRead === 'all') {
			delete this.condition.isRead;
		}
		if (__isRead === 'unread') {
			this.condition.isRead = 0;
		}
		this.setState({
			loading: true,
			manage: manage || false,
		});
		this.toInfoCount((_isRead || isRead) === 'all' ? '' : 0);
		infoList(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
				});
			}
			this.setState({
				loading: false,
			});
		}).catch(() => {
			this.setState({
				loading: false,
			});
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
			selectRow: this.selectRow,
			onSelect: val => this.selectRow = val,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.field,
			sortOrder: this.condition.order,
		};
		return (
			<div className="yc-assets-auction">
				{/* 查询模块 */}
				<QueryView onQueryChange={this.onQuery} />
				{/* tab模块 */}
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				{/* 操作模块 */}
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								active={isRead === 'all'}
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								active={isRead === 'unread'}
								onClick={() => this.handleReadChange('unread')}
								title="只显示未读"
							/>
							<Button onClick={this.handleAllRead}>全部标为已读</Button>
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
				{/* 表格数据展示模块  */}
				<Spin visible={loading}>
					<TableView {...tableProps} sourceType={sourceType} />
				</Spin>

			</div>
		);
	}
}
