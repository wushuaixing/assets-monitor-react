import React from 'react';
import { Modal, message } from 'antd';
import {
	Button, Spin, Tabs, Download,
} from '@/common';
import {
	infoList, exportList, follow, infoCount,
} from '@/utils/api/monitor-info/assets';
import { clearEmpty, changeURLArg, getQueryByName } from '@/utils';
import './style.scss';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';
import Query from './query';
import Table from './table';

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
		document.title = '资产拍卖-资产挖掘';
		this.state = {
			sourceType: -1,
			dataSource: '',
			current: 1,
			total: 0,
			loading: true,
			manage: false,
			tabConfig: source(),
			title: '',
		};
		this.condition = {};
		this.selectRow = [];
	}

	componentWillMount() {
		const { hash } = window.location;
		const title = getQueryByName(hash, 'title');
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'process');
		this.setState({
			sourceType,
			title,
		});
		const url = window.location.hash;
		if (url.indexOf('?') === -1) {
			if (title) {
				this.onQueryChange({ title }, sourceType);
			} else {
				this.onQueryChange({}, sourceType);
			}
		} else {
			this.condition = Object.assign({}, this.condition, getUrlParams(url, 'updateTimeStart', 'updateTimeEnd'));
		}
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount = () => {
		const { toRefreshCount } = this.props;
		infoCount(this.condition).then((res) => {
			if (res.code === 200) {
				console.log('toInfoCount res === ', res);
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
	toClearSortStatus = () => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 获取导出条件
	toExportCondition = (type) => {
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
	handleAttention = () => {
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
							_this.selectRow = []; // 批量关注清空选中项
							const _dataSource = dataSource.map((item) => {
								const _item = item;
								idList.forEach((it) => {
									if (it === item.id) {
										_item.isAttention = 1;
										_item.isRead = true;
									}
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
			message.warning('未选中数据');
		}
	};

	// sourceType变化
	onSourceType = (val) => {
		this.setState({
			sourceType: val,
			dataSource: '',
			current: 1,
			total: '',
			manage: false,
		});
		this.selectRow = [];
		this.toClearSortStatus();
		window.location.href = changeURLArg(window.location.href, 'process', val);
		this.onQueryChange(null, val, '', 1);
	};

	// 表格发生变化
	onRefresh = (data, type) => {
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
		this.selectRow = [];
	};

	// 当前页数变化
	onPageChange = (val) => {
		const { manage } = this.state;
		// this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 查询条件变化
	onQuery = (con) => {
		// window.location.href = changeURLArg(window.location.href, 'title', '');
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 发起查询请求
	onQueryChange = (con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, current } = this.state;
		this.condition = Object.assign(con || this.condition, {
			process: _sourceType || sourceType,
			page: page || current,
		});
		delete this.condition.processString;
		if (this.condition.process === -1) this.condition.process = 0;
		if (this.condition.process === 1) delete this.condition.process;
		if (this.condition.process === 3) this.condition.processString = '3,6';
		this.toInfoCount();
		this.setState({
			loading: true,
			manage: _manage || false,
		});
		infoList(clearEmpty(this.condition)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					// manage: false,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					// manage: false,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	};

	// 跳转资产清收流程
	toClearProcess = () => {
		window.open('/#/monitor/clearProcess', '_blank');
	};

	//  清空选中内容
	clearSelectRowNum = () => this.selectRow = [];

	render() {
		const {
			dataSource, current, total, manage, loading, tabConfig, title,
		} = this.state;

		const tableProps = {
			manage,
			dataSource,
			current,
			total,
			loading,
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
				<Query onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} title={title} />
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
					defaultCurrent={-1}
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<span className="yc-icon-recovery-title" onClick={this.toClearProcess}>
								<span className="yc-icon-recovery" />
								资产清收流程
							</span>
							<span className="export-style">
								<Button
									onClick={() => {
										this.setState({ manage: true });
										console.log(this.condition);
									}}
									title="批量管理"
								/>
								<Download condition={() => this.toExportCondition('all')} api={exportList} all text="一键导出" />
							</span>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								condition={this.toExportCondition}
								api={exportList}
								field="idList"
								text="导出"
								waringText="未选中数据"
								selectIds
								selectedRowKeys={() => this.selectRow}
							/>
							<Button
								onClick={() => {
									this.setState({ manage: false });
									this.selectRow = [];
								}}
								title="取消批量管理"
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
