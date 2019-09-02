import React from 'react';
import Query from './query';
import Table from './table';
import { Modal, message } from 'antd';
import Cookies from 'universal-cookie';
import { Button, Spin, Tabs } from '@/common';
import {
	infoList, exportList, follow, infoCount,
} from '@/utils/api/monitor-info/assets';
import { urlEncode, clearEmpty, changeURLArg } from '@/utils';
import './style.scss';

const source = (obj = {}) => [
	{
		id: 1,
		name: '全部',
		field: 'totalCount',
	},
	{
		id: -1,
		name: '未跟进',
		number: obj.unfollowedCount || 0,
		showNumber: true,
	},
	{
		id: 3,
		name: '跟进中',
		number: obj.followingCount || 0,
		showNumber: true,
		field: 'followingCount',
	},
	{
		id: 9,
		name: '已完成',
		number: obj.finishedCount || 0,
		showNumber: true,
		field: 'finishedCount',
	},
	{
		id: 12,
		name: '已忽略',
		number: 0,
		field: 'ignoreCount',
	},
	{
		id: 15,
		name: '已放弃',
		number: 0,
		field: 'giveUpCount',
	},
];

const cookies = new Cookies();

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: -1,
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: source(),
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentDidMount() {
		this.onQueryChange({});
		this.toInfoCount();
		// this.toInfoCountIntervel = setInterval(() => {
		// 	this.toInfoCount();
		// }, 60 * 1000);
	}

	componentWillUnmount() {
		// clearInterval(this.toInfoCountIntervel);
	}

	// 获取统计信息
	toInfoCount=() => {
		infoCount(this.condition).then((res) => {
			if (res.code === 200) {
				this.setState({
					tabConfig: source(res.data || {}),
				});
			}
		});
	};

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 一键导出 & 批量导出
	handleExport=(type) => {
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
					follow({ idList }, true).then((res) => {
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

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
			manage: false,
		});
		this.toClearSortStatus();
		this.onQueryChange(null, val, '', 1);
		window.location.href = changeURLArg(window.location.href, 'process', val);
		// console.log(changeURLArg(window.location.href, 'process', val));
	};

	// 批量管理勾选️结果
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

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.onQueryChange('', '', '', val);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 发起查询请求
	onQueryChange=(con, _sourceType, _isRead, page) => {
		const { sourceType, current } = this.state;
		this.condition = Object.assign(con || this.condition, {
			process: _sourceType || sourceType,
			page: page || current,
		});
		this.setState({
			loading: true,
		});
		delete this.condition.processString;
		if (this.condition.process === -1) this.condition.process = 0;
		if (this.condition.process === 1) delete this.condition.process;
		if (this.condition.process === 3) this.condition.processString = '3,6';
		this.toInfoCount();
		infoList(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					manage: false,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					manage: false,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

	render() {
		const {
			dataSource, current, total, manage, loading, tabConfig,
		} = this.state;
		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			onRefresh: this.onRefresh,
			onSelect: this.onSelect,
			onPageChange: this.onPageChange,
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-assets-auction">
				<Query onQueryChange={this.onQuery} />
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
					defaultCurrent={-1}
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								onClick={() => {
									this.setState({ manage: true });
									console.log(this.condition);
								}}
								title="批量管理"
							/>
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
					<Table {...tableProps} />
				</Spin>
			</div>
		);
	}
}
