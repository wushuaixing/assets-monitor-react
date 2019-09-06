import React from 'react';
import { message, Modal } from 'antd';
import { changeURLArg, clearEmpty } from '@/utils';
import { Tabs, Button, Spin } from '@/common';
import Api from '@/utils/api/monitor-info/public';
import './style.scss';

import QueryBid from './query/bid';
import QueryIllegal from './query/illegal';
import QueryPunish from './query/punish';
import TableBid from './table/bid';
import TableIllegal from './table/illegal';
import TablePunish from './table/punish';
import { fileExport } from '@/views/monitor/table-common';

// 获取api具体
const toGetApi = (type, base) => {
	if (type === 1) return `${base}Bid`;
	if (type === 2) return `${base}Illegal`;
	if (type === 3) return `${base}Punish`;
	return `${base}Bid`;
};

const toGetConfig = (rule) => {
	const { children } = rule;
	const base = [
		{
			id: 1,
			name: '招标中标',
			dot: false,
			number: 0,
			showNumber: false,
			status: children.gsgg_bidding,
		},
		{
			id: 2,
			name: '重大税收违法',
			number: 0,
			dot: false,
			showNumber: false,
			status: children.gsgg_tax,
		},
		{
			id: 3,
			name: '环境行政处罚',
			number: 0,
			dot: false,
			showNumber: false,
			status: children.gsgg_epb,
		},
	];
	return base.filter(item => item.status);
};
export default class Lawsuits extends React.Component {
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
			tabConfig: toGetConfig(props.rule),
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'process');
		this.setState({ sourceType });
		this.onQueryChange({}, sourceType);
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.field = '';
		this.condition.order = '';
	};

	// 获取统计信息
	toInfoCount=() => {
		Api.infoCount({ isRead: 0 }).then((res) => {
			if (res.code === 200) {
				const { tabConfig } = this.state;
				let _tabConfig = tabConfig;
				res.data.forEach((item) => {
					if (item.sourceType === 1 || item.sourceType === 2 || item.sourceType === 3) {
						_tabConfig = _tabConfig.map((itemChild) => {
							if (itemChild.id === item.sourceType && item.count) {
								return {
									id: itemChild.id,
									name: itemChild.name,
									number: item.count,
									dot: Boolean(item.count),
									showNumber: false,
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
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { sourceType, tabConfig } = this.state;
		if (tabConfig[sourceType - 1].dot) {
			Modal.confirm({
				title: '确认将代位权—立案信息标记为全部已读？',
				content: '点击确定，将为您标记为全部已读。',
				iconType: 'exclamation-circle',
				onOk() {
					Api[toGetApi(sourceType, 'readStatus')]({})
						.then((res) => {
							if (res.code === 200) {
								_this.onQueryChange();
							}
						});
				},
				onCancel() {
				},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
		}
	};

	// 一键导出 & 批量导出
	handleExport=(type) => {
		const { sourceType } = this.state;
		const exportList = Api[toGetApi(sourceType, 'exportList')];
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
					Api[toGetApi(sourceType, 'attention')]({ idList }, true).then((res) => {
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
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
			isRead: 'all',
		});
		this.toClearSortStatus();
		this.onQueryChange(null, val, isRead);
		window.location.href = changeURLArg(window.location.href, 'process', val);
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.field = field;
		this.condition.order = order;
		this.onQueryChange(this.condition, '', '', 1);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const { loading } = this.state;
		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
			num: 10,
		});
		const __isRead = _isRead || isRead;
		if (__isRead === 'all') { delete this.condition.isRead; }
		if (__isRead === 'unread') { this.condition.isRead = 0; }

		if (!loading) this.setState({ loading: true, manage: _manage || false });
		this.toInfoCount();
		Api[toGetApi(_sourceType || sourceType, 'infoList')](clearEmpty(this.condition)).then((res) => {
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
			onSelect: val => this.selectRow = val,
			selectRow: this.selectRow,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.field,
			sortOrder: this.condition.order,
		};
		return (
			<div className="yc-assets-auction">
				{sourceType === 1 ? <QueryBid onQueryChange={this.onQuery} /> : null}
				{sourceType === 2 ? <QueryIllegal onQueryChange={this.onQuery} /> : null}
				{sourceType === 3 ? <QueryPunish onQueryChange={this.onQuery} /> : null}
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
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
				<Spin visible={loading}>
					{sourceType === 1 ? <TableBid {...tableProps} /> : null}
					{sourceType === 2 ? <TableIllegal {...tableProps} /> : null}
					{sourceType === 3 ? <TablePunish {...tableProps} /> : null}
				</Spin>
			</div>
		);
	}
}
// export default class Lawsuits extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			childChoose: 1,
// 		};
// 	}
//
// 	render() {
// 		const { childChoose,loading } = this.state;
// 		return (
// 			<div className="yc-assets-auction">
// 				{childChoose === 1 ?	<QueryBid /> : null}
// 				{childChoose === 2 ?	<QueryIllegal /> : null}
// 				{childChoose === 3 ?	<QueryPunish /> : null}
// 				<Tabs
// 					rightRender={() => (
// 						<div className="assets-tabs-right">
// 							<li>
// 								<img src={imgExport} alt="" />
// 								<span>一键导出</span>
// 							</li>
// 						</div>
// 					)}
// 					onChange={e => this.setState({ childChoose: e.id })}
// 					source={source}
// 					simple
// 					field="process"
// 				/>
// 				<div className="assets-auction-action">
// 					<Button>全部</Button>
// 					<Button>只显示未读</Button>
// 					<Button>全部标为已读</Button>
// 					<Button>批量管理</Button>
// 				</div>
// 				<Spin visible={loading}>
// 					{
// 						// sourceType === 1 ? <TableCourt {...tableProps} /> : <TableRegister {...tableProps} />
// 					}
// 				</Spin>
// 			</div>
// 		);
// 	}
// }
