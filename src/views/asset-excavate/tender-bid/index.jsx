import React from 'react';
import { message, Modal } from 'antd';
import { Button, Spin, Download } from '@/common';
import Api from '@/utils/api/monitor-info/public';
import { unReadCount as unReadTotal } from '@/utils/api/monitor-info';
import { clearEmpty } from '@/utils';
import QueryView from './query';
import TableView from './table';

import './style.scss';

// 获取api具体
const toGetApi = (type, base) => `${base}Bid`;

export default class Lawsuits extends React.Component {
	constructor(props) {
		super(props);
		document.title = '招标中标-监控信息';
		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			unReadCount: 0,
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentWillMount() {
		this.onQueryChange({});
	}

	// 获取招标中标未读数据
	toUnReadCount=() => {
		unReadTotal().then((res) => {
			const { code, data } = res;
			if (code === 200) {
				this.setState({
					unReadCount: data.biddingCount || 0,
				});
			}
		});
	};

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 切换列表类型
	handleReadChange=(val) => {
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
	};

	// 全部标记为已读
	handleAllRead=() => {
		const _this = this;
		const { sourceType, unReadCount } = this.state;

		if (unReadCount > 0) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
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

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
		this.selectRow = [];
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { isRead, current } = this.state;
		const { loading } = this.state;
		this.condition = Object.assign(con || this.condition, {
			page: page || current,
			num: 10,
		});
		const __isRead = _isRead || isRead;
		if (__isRead === 'all') { delete this.condition.isRead; }
		if (__isRead === 'unread') { this.condition.isRead = 0; }

		if (!loading) this.setState({ loading: true, manage: _manage || false });
		// this.toInfoCount();
		this.toUnReadCount();
		Api[toGetApi(1, 'infoList')](clearEmpty(this.condition)).then((res) => {
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

	//  清空选中内容
	clearSelectRowNum = () => this.selectRow = []

	render() {
		const {
			sourceType, isRead, dataSource, current, total, manage, loading,
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
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-assets-auction">
				<QueryView onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} />
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
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

							<Download
								all
								text="一键导出"
								condition={() => this.condition}
								api={Api[toGetApi(sourceType, 'exportList')]}
								style={{ float: 'right' }}
							/>
						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								text="导出"
								field="idList"
								api={Api[toGetApi(sourceType, 'exportList')]}
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
							/>
							{/* <Button onClick={this.handleExport} title="导出" /> */}
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
					<TableView {...tableProps} />
				</Spin>
			</div>
		);
	}
}
