import React from 'react';
import { message, Modal } from 'antd';
import Cookies from 'universal-cookie';
import { urlEncode } from '@/utils';
import { Tabs, Button, Spin } from '@/common';
import Api from '@/utils/api/monitor-info/public';
import './style.scss';

import QueryBid from './query/bid';
import QueryIllegal from './query/illegal';
import QueryPunish from './query/punish';
import TableBid from './table/bid';
import TableIllegal from './table/illegal';
import TablePunish from './table/punish';

const cookies = new Cookies();
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

	componentDidMount() {
		this.onQueryChange({});
		this.toInfoCount();
	}


	// 获取统计信息
	toInfoCount=(isRead) => {
		Api.infoCount({ isRead }).then((res) => {
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
		// this.toInfoCount(val === 'all' ? '' : 0);
		this.onQueryChange(this.condition, '', val);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { sourceType } = this.state;
		Modal.confirm({
			title: '确认将代位权—立案信息标记为全部已读？',
			content: '点击确定，将为您标记为全部已读。',
			iconType: 'exclamation-circle',
			onOk() {
				Api[toGetApi(sourceType, 'readStatus')]({}).then((res) => {
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
		const exportList = toGetApi(sourceType, 'exportList');
		if (type === 'all') {
			const _condition = Object.assign(this.condition, {
				token: cookies.get('token'),
			});
			window.open(`${exportList}?${urlEncode(_condition)}`, '_blank');
			// console.log(urlEncode(_condition));
		} else if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const _condition = Object.assign(this.condition, {
				token: cookies.get('token'),
				idList,
			});
			Modal.confirm({
				title: '确认导出选中的所有信息吗？',
				content: '点击确定，将为您导出所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					window.open(`${exportList}?${urlEncode(_condition)}`, '_blank');
					// message.success('操作成功！');
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

	// 批量管理☑️结果
	onSelect=(val) => {
		// console.log(val);
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
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
		});
		this.onQueryChange(null, val, isRead);
		console.log('onSourceType:', val);
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.onQueryChange('', '', '', val);
	};

	// 查询条件变化
	onQueryChange=(con, _sourceType, _isRead, page) => {
		const { sourceType, isRead, current } = this.state;
		// console.log(val, _sourceType, _isRead);
		const __isRead = _isRead || isRead;
		this.condition = Object.assign(con || this.condition, {
			sourceType: _sourceType || sourceType,
			page: page || current,
			type: 1,
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
		});
		Api[toGetApi(_sourceType || sourceType, 'infoList')](this.condition).then((res) => {
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
			onSelect: this.onSelect,
			onPageChange: this.onPageChange,
		};
		return (
			<div className="yc-assets-auction">
				{sourceType === 1 ? <QueryBid onQueryChange={this.onQueryChange} /> : null}
				{sourceType === 2 ? <QueryIllegal onQueryChange={this.onQueryChange} /> : null}
				{sourceType === 3 ? <QueryPunish onQueryChange={this.onQueryChange} /> : null}
				<Tabs.Simple
					onChange={e => this.onSourceType(e.id)}
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
