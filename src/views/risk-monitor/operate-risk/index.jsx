import React, { Component } from 'react';
import { message, Modal } from 'antd';
import {
	Tabs, Button, Spin, Download,
} from '@/common';
import { changeURLArg } from '@/utils';
// query
import QueryBusinessChange from './query/businessChange';
import QueryAbnormalOperation from './query/abnormalOperation';
import QueryIllegal from './query/illegal';
import QueryTaxViolation from './query/taxViolation';
import QueryPenalties from './query/penalties';
import QueryEnvironmentalPunishment from './query/environmentalPunishment';
// table
import TableBusinessChange from './table/businessChange';
import TableAbnormalOperation from './table/abnormalOperation';
import TableIllegal from './table/illegal';
import TableTaxViolation from './table/taxViolation';
import TablePenalties from './table/penalties';
import TableEnvironmentalPunishment from './table/environmentalPunishment';

const toGetConfig = () => {
	// const { children } = rule;
	const base = [
		{
			id: 1,
			name: '经营异常',
			dot: false,
			number: 0,
			showNumber: false,
			status: false,
		},
		{
			id: 2,
			name: '工商变更',
			number: 0,
			dot: false,
			showNumber: false,
			status: true,
		},
		{
			id: 3,
			name: '严重违法',
			number: 0,
			dot: false,
			showNumber: false,
			status: false,
		},
		{
			id: 4,
			name: '税收违法',
			dot: false,
			number: 0,
			showNumber: false,
			status: false,
		},
		{
			id: 5,
			name: '行政处罚',
			number: 0,
			dot: false,
			showNumber: false,
			status: true,
		},
		{
			id: 6,
			name: '环保处罚',
			number: 0,
			dot: false,
			showNumber: false,
			status: false,
		},
	];
	return base.filter(item => item.status);
};

class BusinessRisk extends Component {
	constructor(props) {
		super(props);
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
		return (
			<div className="yc-assets-auction">
				<div>
					{sourceType === 1 ? <QueryAbnormalOperation {...queryProps} /> : null}
					{sourceType === 2 ? <QueryBusinessChange {...queryProps} /> : null}
					{sourceType === 3 ? <QueryIllegal {...queryProps} /> : null}
					{sourceType === 4 ? <QueryTaxViolation {...queryProps} /> : null}
					{sourceType === 5 ? <QueryPenalties {...queryProps} /> : null}
					{sourceType === 6 ? <QueryEnvironmentalPunishment {...queryProps} /> : null}
				</div>

				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				{
					!manage ? (
						<div className="assets-auction-action">
							<Button
								onClick={() => this.handleReadChange('all')}
								title="全部"
							/>
							<Button
								onClick={() => this.handleReadChange('unread')}
								title="只显示未读"
							/>
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
						<div className="yc-businessRisk-action">
							<Button onClick={this.handleAttention} title="关注" />
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
					{sourceType === 1 ? <TableAbnormalOperation {...tableProps} /> : null}
					{sourceType === 2 ? <TableBusinessChange {...tableProps} /> : null}
					{sourceType === 3 ? <TableIllegal {...tableProps} /> : null}
					{sourceType === 4 ? <TableTaxViolation {...tableProps} /> : null}
					{sourceType === 5 ? <TablePenalties {...tableProps} /> : null}
					{sourceType === 6 ? <TableEnvironmentalPunishment {...tableProps} /> : null}
				</Spin>
			</div>
		);
	}
}

export default BusinessRisk;
