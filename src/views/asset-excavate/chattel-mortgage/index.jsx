import React from 'react';
import { Modal, message } from 'antd';
import Query from './query';
import Table from './table';
import { Button, Download, Spin } from '@/common';

import {
	getMortgageList, postMarkReadAll, postFollow, exportList,
} from '@/utils/api/monitor-info/mortgage';
import './style.scss';
import { fileExport } from '@/views/asset-excavate/table-common';
import { clearEmpty } from '@/utils';


export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '动产抵押-监控信息';
		this.state = {
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentDidMount() {
		this.onQueryChange({});
	}

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
		Modal.confirm({
			title: '确认将所有信息全部标记为已读？',
			content: '点击确定，将为您把全部消息标记为已读。',
			iconType: 'exclamation-circle',
			onOk() {
				postMarkReadAll({}).then((res) => {
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
			const { dataSource } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认关注选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
					postFollow({ idList }, true).then((res) => {
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
		const { isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
		});
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'else') this.condition.isRead = 0;
		delete this.condition.sourceType;
		this.setState({
			loading: true,
			manage: _manage || false,
		});
		getMortgageList(clearEmpty(this.condition)).then((res) => {
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
			isRead, dataSource, current, total, manage, loading,
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
				<Query onQueryChange={this.onQuery} />
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								active={isRead === 'all'}
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								active={isRead === 'else'}
								onClick={() => this.handleReadChange('else')}
								title="只显示未读"
							/>
							<Button onClick={this.handleAllRead}>全部标为已读</Button>
							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>
							<Download condition={() => this.condition} api={exportList} all text="一键导出" style={{ float: 'right', marginRight: 0 }} />

							{/* <Button onClick={() => this.handleExport('all')} > */}
							{/* <span className="yc-export-img" /> */}
							{/* <span> 一键导出</span> */}
							{/* </Button> */}
						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
								api={exportList}
								field="idList"
								text="导出"
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
					<Table {...tableProps} />
				</Spin>
			</div>
		);
	}
}
