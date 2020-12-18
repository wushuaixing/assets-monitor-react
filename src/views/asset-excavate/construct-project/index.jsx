import React from 'react';
import {
	Button, Download, Icon, Spin, Tabs, message, Modal,
} from '@/common';
import { changeURLArg } from '@/utils';
import QueryConstruct from './query/construct';
import QueryWinbid from './query/winbid';
import QueryUnderway from './query/underway';
import TableConstruct from './table/construct';
import TableWinbid from './table/winbid';
import TableUnderway from './table/underway';

export default class ConstructProject extends React.Component {
	constructor(props) {
		super(props);
		document.title = '在建工程-资产挖掘';
		const _rule = () => ([
			{
				id: 1,
				name: '建设单位',
				dot: false,
				status: true,
				number: 0,
				showNumber: true,
			},
			{
				id: 2,
				name: '中标单位',
				status: true,
				number: 0,
				showNumber: true,
				dot: false,
			},
			{
				id: 3,
				name: '施工单位',
				status: true,
				dot: false,
				number: 0,
				showNumber: true,
			},
		]).filter(item => item.status);
		this.state = {
			sourceType: 1,
			isRead: 'all',
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
			manage: false,
			tabConfig: _rule(props.rule.children),
		};
		this.condition = {
			num: 10,
		};
		this.selectRow = [];
	}

	componentWillMount() {
		const { rule } = this.props;
		console.log('componentWillMount === ', rule);
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	// 清除排序状态
	toClearSortStatus = () => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 获取URL里的参数
	isUrlParams = (sourceType) => {

	};

	// 获取三类数据的统计信息
	toInfoCount = (sourceType) => {
	};

	// 切换列表类型
	handleReadChange = (val) => {
		const { sourceType } = this.state;
		this.setState({ isRead: val });
		this.onQueryChange(this.condition, '', val, 1);
		this.onUnReadCount(sourceType);
	};

	// 全部标记为已读
	handleAllRead = () => {
	};

	// 批量收藏
	handleAttention = () => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			const { dataSource, sourceType } = this.state;
			const _this = this;
			Modal.confirm({
				title: '确认收藏选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {
				},
				onCancel() {},
			});
		} else {
			message.warning('未选中数据');
		}
	};

	// 表格发生变化
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// sourceType变化
	onSourceType = (val) => {
		this.setState({
			sourceType: val,
			dataSource: [],
			isRead: 'all',
			current: 1,
			total: '',
		});
		this.onUnReadCount();
		this.toClearSortStatus();
		this.onQueryChange(this.isUrlParams(val), val, 'all', 1);
		this.selectRow = [];
		window.location.href = changeURLArg(window.location.href, 'unit', val);
	};

	// 排序触发
	onSortChange = (field, order) => {
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
		const { sourceType } = this.state;
		this.toClearSortStatus();
		this.onUnReadCount(sourceType);
		this.onQueryChange(con, '', '', 1);
	};

	// 查询条件变化
	onQueryChange = (con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		this.condition = Object.assign(con || this.condition, {
			page: page || current,
		});
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'else') this.condition.isRead = 0;
		// this.setState({ loading: true, manage: _manage || false });
	};

	// 查询是否有未读消息
	onUnReadCount = (sourceType) => {

	};

	// 取消批量管理选择框
	clearSelectRowNum = () => this.selectRow = [];


	render() {
		const {
			sourceType, tabConfig, manage, dataSource, current, total, loading, isRead,
		} = this.state;
		const tableProps = {
			manage,
			dataSource: [],
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
				{ sourceType === 1 ?	<QueryConstruct onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 2 ?	<QueryWinbid onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{ sourceType === 3 ?	<QueryUnderway onQueryChange={this.onQuery} clearSelectRowNum={this.clearSelectRowNum} /> : null}
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={tabConfig}
					field="unit"
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
								active={isRead === 'else'}
								onClick={() => this.handleReadChange('else')}
								title="只显示未读"
							/>
							<div className="yc-all-read" onClick={this.handleAllRead}>
								<Icon className="yc-all-clear" type="icon-clear" />
								<span className="yc-all-read-text">全部标为已读</span>
							</div>
							<div className="yc-public-floatRight">
								<Download
									all
									text="一键导出"
									condition={() => this.condition}
									// api={api('exportList', sourceType)}
								/>
								<Button style={{ margin: '0 0 0 10px' }} onClick={() => this.setState({ manage: true })}>批量管理</Button>
							</div>
						</div>
					) : (
						<div className="yc-batch-management">
							<Button onClick={this.handleAttention} title="收藏" />
							<Download
								text="导出"
								field="idList"
								waringText="未选中数据"
								// api={api('exportList', sourceType)}
								selectIds
								selectedRowKeys={() => this.selectRow}
								condition={() => Object.assign({}, this.condition, { idList: this.selectRow })}
							/>
							<Button
								style={{ margin: 0 }}
								type="common"
								onClick={() => {
									this.setState({ manage: false });
									this.selectRow = [];
								}}
								title="取消批量管理"
							/>
						</div>
					)
				}
				<Spin visible={false}>
					{sourceType === 1 ? <TableConstruct {...tableProps} /> : null }
					{sourceType === 2 ? <TableWinbid {...tableProps} /> : null }
					{sourceType === 3 ? <TableUnderway {...tableProps} /> : null }
				</Spin>
			</div>
		);
	}
}
