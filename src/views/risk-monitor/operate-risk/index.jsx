import React, { Component } from 'react';
import { message, Modal } from 'antd';
import {
	Tabs, Button, Spin, Download,
} from '@/common';
import { changeURLArg } from '@/utils';
/* Query 查询条件 */
import Query from './query';
/* Table 展示列表 */
import Table from './table';
import ruleMethods from '@/utils/rule';

const toGetConfig = () => {
	const rule = ruleMethods.toGetRuleSource('', 'YC03', 'YC0303');
	return rule.child.filter(item => item.status).map(item => Object.assign(item, {
		number: 0,
		showNumber: true,
	}));
};

class BusinessRisk extends Component {
	constructor(props) {
		super(props);
		document.title = '经营风险-风险监控';
		this.state = {
			sourceType: 2, // 切换id
			current: 1,
			total: 12,
			loading: false,
			manage: false,
			tabConfig: toGetConfig(),
			dataSource: [{
				id: 1,
				publishTime: 1569204092,
				obName: '浙江博创实业发展有限公司',
				title: '经营范围',
				before: '金融信息服务(未经行政许可,不得开展金融业务)企业征信业务技术推广、技术服务',
				after: `技术推广、技术服务
				技术咨询
				销售软件
				云计算中心(PUE值在1.4以下)`,
				createTime: 1569204092,
			}, {
				id: 2,
				publishTime: 1569204092,
				obName: '浙江博创实业发展有限公司',
				title: '经营范围',
				before: '金融信息服务(未经行政许可,不得开展金融业务)企业征信业务技术推广、技术服务',
				after: `技术推广、技术服务
				技术咨询
				销售软件
				云计算中心(PUE值在1.4以下)`,
				createTime: 1569204092,
			}],
		};
		this.selectRow = [];
	}

	componentDidMount() {
		const { tabConfig } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(tabConfig, 'process'); // 获取默认对process
		this.setState({ sourceType });
		// console.log(sourceType);
	}

	// 批量关注
	handleAttention=() => {
		if (this.selectRow.length > 0) {
			const idList = this.selectRow;
			console.log(idList, 12);

			Modal.confirm({
				title: '确认关注选中的所有信息吗？',
				content: '点击确定，将为您收藏所有选中的信息',
				iconType: 'exclamation-circle',
				onOk() {},
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
		this.selectRow = [];
		console.log(val, manage);
		this.setState({
			current: val,
		});
	};

	// 获取接口返回列表数据
	getTableList = (val) => {
		console.log(val);
	};

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
		});
		window.location.href = changeURLArg(window.location.href, 'process', val);
		if (val === 2) {
			this.setState({
				dataSource: [{
					id: 1,
					publishTime: 1569204092,
					obName: '浙江博创实业发展有限公司',
					title: '经营范围',
					before: '金融信息服务(未经行政许可,不得开展金融业务)企业征信业务技术推广、技术服务',
					after: `技术推广、技术服务
					技术咨询
					销售软件
					云计算中心(PUE值在1.4以下)`,
					createTime: 1569204092,
				}, {
					id: 2,
					publishTime: 1569204092,
					obName: '浙江博创实业发展有限公司',
					title: '经营范围',
					before: '金融信息服务(未经行政许可,不得开展金融业务)企业征信业务技术推广、技术服务',
					after: `技术推广、技术服务
					技术咨询
					销售软件
					云计算中心(PUE值在1.4以下)`,
					createTime: 1569204092,
				}],
			});
		} else if (val === 5) {
			this.setState({
				dataSource: [{
					id: 1,
					publishTime: 1569290492,
					obName: '上海宏博口腔门诊部',
					title: '普第2220150030号',
					reason: '其它卫生计生领域的行政处罚事项',
					pena: '警告',
					createTime: 1569290492,
				}, {
					id: 2,
					publishTime: 1569290492,
					obName: '上海宏博口腔门诊部',
					title: '普第2220150030号',
					reason: '其它卫生计生领域的行政处罚事项',
					pena: '警告',
					createTime: 1569290492,
				}],
			});
		}
	};


	// 全部标记为已读
	handleAllRead=() => {
		const { sourceType, tabConfig } = this.state;
		// 过滤sourceType
		const isDot = tabConfig.length > 0 && tabConfig.filter(item => sourceType === item.id);
		console.log(sourceType, tabConfig, isDot);

		if (isDot.dot) {
			Modal.confirm({
				title: '确认将所有信息全部标记为已读？',
				content: '点击确定，将为您把全部消息标记为已读。',
				iconType: 'exclamation-circle',
				onOk() {},
				onCancel() {
				},
			});
		} else {
			message.warning('最新信息已经全部已读，没有未读信息了');
		}
	};

	render() {
		const {
			tabConfig, sourceType, loading, manage, current, total, dataSource,
		} = this.state;
		const queryProps = {
			getTableList: this.getTableList,
		};
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
		};
		const QueryView = Query[sourceType || 'YC030301'];
		const TableView = Table[sourceType || 'YC030301'];
		return (
			<div className="yc-assets-auction">
				<QueryView {...queryProps} />
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button title="全部" onClick={() => this.handleReadChange('all')} />
							<Button title="只显示未读" onClick={() => this.handleReadChange('unread')} />
							<Button onClick={this.handleAllRead}>全部标为已读</Button>
							<Button onClick={() => this.setState({ manage: true })}>批量管理</Button>
							<Download
								all
								text="一键导出"
								condition={() => this.condition}
								api=""
								style={{ float: 'right' }}
							/>
						</div>
					) : (
						<div className="assets-auction-action">
							<Button title="关注" onClick={this.handleAttention} />
							<Download
								text="导出"
								field="idList"
								api=""
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
					<TableView {...tableProps} />
				</Spin>
			</div>
		);
	}
}

export default BusinessRisk;
