import React from 'react';
import { Modal, message } from 'antd';
import QueryBidding from './query/bidding';
import TableBidding from './table/bidding';
import QueryResult from './query/result';
import TableResult from './table/result';
import QueryPublicity from './query/publicity';
import TablePublicity from './table/publicity';
import {
	Button, Tabs, Spin, Download,
} from '@/common';
import { readStatusAll, readAllStatusResult } from '@/utils/api/monitor-info/finance';
import Apis from '@/utils/api/monitor-info/finance';
import { clearEmpty, changeURLArg } from '@/utils';
import { unReadCount } from '@/utils/api/monitor-info';

// const api = (field, type) => Apis[`${field}${type === 1 ? 'Bid' : 'Pub'}`];

// 获取api具体
const api = (field, type) => {
	if (type === 1) return Apis[`${field}Bid`];
	if (type === 2) return Apis[`${field}Pub`];
	if (type === 3) return Apis[`${field}Result`];
	return Apis[`${field}Bid`];
};

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '金融资产-监控信息';
		// 获取当前页面路由配置
		const _rule = rule => ([
			{
				id: 3,
				name: '股权质押',
				dot: false,
				status: true,
			},
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
		// this.setUnReadCount = setInterval(() => {
		// 	this.onUnReadCount();
		// }, 30 * 1000);
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
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { tabConfig, sourceType } = this.state;
		const selectTab = tabConfig.filter(i => i.id === sourceType);

		if (selectTab && selectTab[0].dot) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					if (sourceType === 2) {
						readStatusAll({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					} else if (sourceType === 3) {
						readAllStatusResult({}).then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
								_this.onUnReadCount();
							}
						});
					}
				},
				onCancel() {},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
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
			isRead: 'all',
			current: 1,
			total: '',
		});
		this.toClearSortStatus();
		this.onQueryChange({}, val, 'all', 1);
		window.location.href = changeURLArg(window.location.href, 'project', val);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
		this.selectRow = [];
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		// this.selectRow = [];
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
					if (_item.id === 3)_item.dot = data.stockPledgeFlag;
					return _item;
				});
				this.setState({ tabConfig: _tabConfig });
			}
		});
	};

	clearSelectRowNum = () => this.selectRow = []

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
				{ sourceType === 1 ?	<QueryBidding onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 2 ?	<QueryPublicity onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 3 ?	<QueryResult onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="project"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							{
								sourceType === 2 || sourceType === 3 ? [
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
							<Download
								all
								text="一键导出"
								condition={() => this.condition}
								api={api('exportList', sourceType)}
								style={{ float: 'right' }}
							/>
						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								text="导出"
								field="idList"
								api={api('exportList', sourceType)}
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
					{sourceType === 1 ? <TableBidding {...tableProps} /> : null }
					{sourceType === 2 ? <TablePublicity {...tableProps} /> : null }
					{sourceType === 3 ? <TableResult {...tableProps} /> : null }
				</Spin>

			</div>
		);
	}
}
