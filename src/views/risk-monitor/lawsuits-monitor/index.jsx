import React from 'react';
import { Modal, message } from 'antd';
import QueryView from './queryView';
import { TableCourt, TableTrial, TableJudgment } from './table';
import {
	Button, Tabs, Spin, Download,
} from '@/common';
import API from '@/utils/api/risk-monitor/lawsuit';
import { changeURLArg, clearEmpty } from '@/utils';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		document.title = '涉诉监控-风险监控';
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
				{
					id: 3,
					name: '裁判文书',
					number: 0,
					dot: false,
					showNumber: true,
				},
			],
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
		if (sourceType !== 1) {
			API(1, 'listCount')({}).then((res) => {
				if (res.code === 200) {
					tabConfig[0].number = res.data;
					this.setState({ tabConfig });
				}
			});
		}
		if (sourceType !== 2) {
			API(2, 'listCount')({}).then((res) => {
				if (res.code === 200) {
					tabConfig[1].number = res.data;
					this.setState({ tabConfig });
				}
			});
		}
		if (sourceType !== 3) {
			API(3, 'listCount')({}).then((res) => {
				if (res.code === 200) {
					tabConfig[2].number = res.data;
					this.setState({ tabConfig });
				}
			});
		}
	}

	// 清除排序状态
	toClearSortStatus=() => {
		this.condition.sortColumn = '';
		this.condition.sortOrder = '';
	};

	// 获取统计信息
	toInfoCount=() => {
		const { sourceType, tabConfig } = this.state;
		API(sourceType, 'listCount')(this.condition).then((res) => {
			if (res.code === 200) {
				tabConfig[sourceType - 1].number = res.data;
				this.setState({ tabConfig });
			}
		});
	};

	// 切换列表类型
	handleReadChange=(val) => {
		const { tabConfig } = this.state;
		const _tabConfig = tabConfig.map((item) => {
			const _item = Object.assign({}, item);
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
		console.log(tabConfig, sourceType);
		if (tabConfig[sourceType - 1].number) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {
					API(sourceType, 'readAll')().then((res) => {
						if (res.code === 200) {
							_this.onQueryChange();
						}
					});
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
					API(sourceType, 'attention')({ idList }, true).then((res) => {
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

	// 修改请求参数【开庭】【立案】【裁判文书】
	toHandleReqTime=(__sourceType, __con) => {
		const GmtTime = {};
		if (__sourceType === 1) {
			GmtTime.startGmtTrial = __con.startGmt;
			GmtTime.endGmtTrial = __con.endGmt;
		} else if (__sourceType === 2) {
			GmtTime.startGmtRegister = __con.startGmt;
			GmtTime.endGmtRegister = __con.endGmt;
		} else {
			GmtTime.startGmtJudgment = __con.startGmt;
			GmtTime.endGmtJudgment = __con.endGmt;
		}
		return GmtTime;
	};

	// sourceType变化
	onSourceType=(sourceType) => {
		this.setState({
			sourceType,
			dataSource: '',
			current: 1,
			total: '',
			isRead: 'all',
		});
		this.toClearSortStatus();
		this.onQueryChange('', sourceType, 'all', 1);
		window.location.href = changeURLArg(window.location.href, 'process', sourceType);
	};

	// 当前页数变化
	onPageChange=(val) => {
		const { manage } = this.state;
		this.selectRow = [];
		this.onQueryChange('', '', '', val, manage);
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.onQueryChange(this.condition, '', '', 1);
	};

	// 查询条件变化
	onQuery =(con) => {
		this.toClearSortStatus();
		this.onQueryChange(con, '', '', 1);
	};

	// 发起查询请求
	onQueryChange=(con, _sourceType, _isRead, page, _manage) => {
		const { sourceType, isRead, current } = this.state;
		const __isRead = _isRead || isRead;
		const __type = _sourceType || sourceType;
		this.condition = Object.assign({}, con || this.condition, {
			page: page || current,
			num: 10,
		});
		// console.log(__isRead);
		delete this.condition.isRestore;
		if (__isRead === 'all') delete this.condition.isRead;
		if (__isRead === 'unread') this.condition.isRead = 0;
		if (__isRead === 'resume') this.condition.isRestore = true;
		this.setState({
			loading: true,
			manage: _manage || false,
		});
		this.toInfoCount();
		const params = Object.assign({}, this.toHandleReqTime(__type, this.condition), this.condition);
		delete params.startGmt;
		delete params.endGmt;
		API(_sourceType || sourceType, 'list')(clearEmpty(params)).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				message.error(res.message || '网络请求异常请稍后再试！');
				this.setState({
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
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};

		return (
			<div className="yc-assets-auction">
				{/* 查询模块 */}
				<QueryView onQueryChange={this.onQuery} sourceType={sourceType} />
				{/* tab切换 */}
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				{/* 操作栏 */}
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
							{sourceType !== 2 ? (
								<Button
									active={isRead === 'resume'}
									onClick={() => this.handleReadChange('resume')}
								>
									只显示执恢案件
								</Button>
							) : null}

							<Button onClick={this.handleAllRead}>全部标为已读</Button>
							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>

							<Download
								all
								text="一键导出"
								condition={() => this.condition}
								api={API(sourceType, 'exportList')}
								style={{ float: 'right' }}
							/>
						</div>
					) : (
						<div className="assets-auction-action">
							<Button onClick={this.handleAttention} title="关注" />
							<Download
								text="导出"
								field="idList"
								api={API(sourceType, 'exportList')}
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
				{/* 表格数据展示模块  */}
				<Spin visible={loading}>
					{sourceType === 1 ? <TableTrial {...tableProps} /> : null}
					{sourceType === 2 ? <TableCourt {...tableProps} /> : null}
					{sourceType === 3 ? <TableJudgment {...tableProps} /> : null}
					{/* { */}
					{/* sourceType === 3 */}
					{/* ? */}
					{/* : <TableView {...tableProps} sourceType={sourceType} /> */}
					{/* } */}
				</Spin>

			</div>
		);
	}
}
