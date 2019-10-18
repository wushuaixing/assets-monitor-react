import React from 'react';
import { Modal, message } from 'antd';
// import { navigate } from '@reach/router';
import Query from './query';
import Table from './table';
import {
	Button, Spin, Tabs, Download,
} from '@/common';
import {
	infoList, exportList, follow, infoCount,
} from '@/utils/api/monitor-info/assets';
import { clearEmpty, changeURLArg } from '@/utils';
import './style.scss';
// import { fileExport } from '@/views/monitor/table-common';

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

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		document.title = '资产监控-监控信息';
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

	componentWillMount() {
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'process');
		this.setState({
			sourceType,
		});
		this.onQueryChange({}, sourceType);
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		const { toRefreshCount } = this.props;
		infoCount(this.condition).then((res) => {
			if (res.code === 200) {
				this.setState({
					tabConfig: source(res.data || {}),
				});
				if ((res.data || {}).unfollowedCount === 0) {
					toRefreshCount('YC0201', res.data.unfollowedCount);
				}
			}
		});
	};

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 获取导出条件
	toExportCondition=(type) => {
		delete this.condition.processString;
		if (this.condition.process === -1) this.condition.process = 0;
		if (this.condition.process === 1) delete this.condition.process;
		if (this.condition.process === 3) this.condition.processString = '3,6';
		if (type === 'all') {
			return Object.assign({}, this.condition);
		}
		return Object.assign({}, this.condition, { idList: this.selectRow });
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

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
			manage: false,
		});
		this.selectRow = [];
		this.toClearSortStatus();
		this.onQueryChange(null, val, '', 1);
		window.location.href = changeURLArg(window.location.href, 'process', val);
	};

	// 表格发生变化
	onRefresh=(data, type) => {
		// console.log('onRefresh:',data, type);
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

	// 发起查询请求
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, current } = this.state;
		this.condition = Object.assign(con || this.condition, {
			process: _sourceType || sourceType,
			page: page || current,
		});
		this.setState({
			loading: true,
			manage: _manage || false,
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

	toClearProcess = () => {
		window.open('/#/monitor/clearProcess', '_blank');
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

				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
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
							<span className="export-style">
								<span className="yc-icon-recovery-title" onClick={this.toClearProcess}>
									<span className="yc-icon-recovery" />
									资产清收流程
								</span>
								<Download condition={() => this.toExportCondition('all')} api={exportList} all text="一键导出" />
								{/* <Button onClick={() => this.toExportCondition('all')}> */}
								{/* <span className="yc-export-img" /> */}
								{/* <span> 一键导出</span> */}
								{/* </Button> */}
							</span>

						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download condition={this.toExportCondition} api={exportList} field="idList" text="导出" />
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
