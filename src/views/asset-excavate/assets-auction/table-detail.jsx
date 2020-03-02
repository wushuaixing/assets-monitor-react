import React from 'react';
import { Pagination, Tooltip } from 'antd';
import assets from 'api/detail/assets';
import {
	Ellipsis, Icon, Spin, Table, Button,
} from '@/common';
import { floatFormat } from '@/utils/format';
import TableVersionModal from './tableVersionModal';
import { toEmpty, timeStandard } from '@/utils';
import './style.scss';


/* 跟进状态 */
const processStatus = (s) => {
	let res = '';
	switch (s) {
	// case 0: res = { text: '未跟进', color: '#FB5A5C' }; break;
	case 3:
	case 6: res = { text: '跟进中', color: '#FB8E3C' }; break;
	case 9: res = { text: '已完成', color: '#3DBD7D' }; break;
	case 12: res = { text: '已忽略', color: '#7D8699' }; break;
	case 15: res = { text: '已放弃', color: '#7D8699' }; break;
	default: res = '';
	}
	if (res) {
		res.style = {
			borderColor: res.color,
			color: res.color,
			minWidth: 80,
			backgroundColor: '#FFFFFF',
			borderRadius: '2px',
		};
	}
	return res;
};

const AuctionInfo = (text, row, method) => {
	const {
		court, consultPrice, start, currentPrice, initialPrice, status, historyAuction = [],
	} = row;
	const auctionStatus = (s) => {
		let res = { text: '--', color: '#7D8699' };
		switch (s) {
		case 1: res = { text: '即将开始', color: '#FB8E3C' }; break;
		case 3: res = { text: '正在进行', color: '#45A1FF' }; break;
		case 5: res = { text: '已成交', color: '#3DBD7D' }; break;
		case 7: res = { text: '已流拍', color: '#7D8699' }; break;
		case 9: res = { text: '中止', color: '#7D8699' }; break;
		case 11: res = { text: '撤回', color: '#7D8699' }; break;
		default: res = { text: '--', color: '#7D8699' };
		}
		return res;
	};
	const result = auctionStatus(status);
	return (
		<div className="yc-assets-table-info">
			<li>
				<div style={{ lineHeight: '30px', display: 'inline-block', width: 180 }}>
					<Icon type="icon-dot" style={{ fontSize: 12, color: result.color, marginRight: 2 }} />
					<span className="list list-content ">{result.text}</span>
				</div>
				{
					historyAuction.length > 0 && (
						<Button onClick={() => method(row)}>
							<Icon type="file-text" />
							查看历史拍卖信息
						</Button>
					)
				}
			</li>
			<li className="table-info-list list-width-180">
				<span className="info info-title">处置机关：</span>
				{
					court ? (
						<Tooltip placement="top" title={court}>
							<span className="info info-content text-ellipsis list-width-120">{court}</span>
						</Tooltip>
					) : <span className="info info-content">未知</span>
				}
			</li>
			<li className="table-info-list ">
				<span className="info info-title">评估价：</span>
				<span className="info info-content">{consultPrice ? `${floatFormat(consultPrice.toFixed(2))} 元` : '未知'}</span>
			</li>
			<br />
			<li className="table-info-list list-width-180">
				<span className="info info-title">开拍时间：</span>
				<span className="info info-content">{timeStandard(start, '未知')}</span>
			</li>
			{
				{
					1: (
						<li className="table-info-list ">
							<span className="info info-title">起拍价：</span>
							<span className="info-content info-over">
								{initialPrice || initialPrice === 0 ? `${floatFormat(initialPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
					5: (
						<li className="table-info-list ">
							<span className="info info-title">成交价：</span>
							<span className="info-content info-over">
								{currentPrice || currentPrice === 0 ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
				}[status] || (
					<li className="table-info-list ">
						<span className="info info-title">当前价：</span>
						<span className="info-content">
							{currentPrice || currentPrice === 0 ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				)
			}
			<br />

		</div>
	);
};

export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
			historyInfoModalVisible: false,
			historyInfoModalData: [],
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
			this.toGetData(1, nextProps.sourceType);
		}
		return true;
	}

	// 打开历史信息弹窗
	historyInfoModal = (value) => {
		this.setState({
			historyInfoModalVisible: true,
			historyInfoModalData: value,
		});
	};

	getMatchReason=(reason, pushType) => {
		if (reason) {
			try {
				let str = '';
				const _reason = JSON.parse(reason);
				const name = (_reason.filter(i => i.name))[0];
				const usedName = (_reason.filter(i => i.used_name))[0];
				if (pushType === 0) {
					return '全文匹配';
				} if (name || usedName) {
					if (name) str += name.hl.join('、');
					else str += usedName.hl.join('、');
				}
				if (str) return <p dangerouslySetInnerHTML={{ __html: str }} />;
				return '-';
			} catch (e) {
				return '-';
			}
		}
		return '-';
	};

	toGetColumns=() => [
		{
			title: '拍卖信息',
			dataIndex: 'title',
			render: (value, row) => {
				const process = processStatus(row.process);
				return (
					<div className="assets-info-content">
						<li style={{ lineHeight: '24px' }}>
							{ toEmpty(row.title)
								? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={14} className="yc-public-title-normal-bold" /> : '--' }
							{process ? <span className="yc-case-reason text-ellipsis" style={process.style}>{process.text}</span> : ''}
						</li>
						<li>
							<span className="list list-title align-justify">● 匹配原因</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content" style={{ width: 640, maxWidth: 'none' }}>{this.getMatchReason(row.reason, row.pushType)}</span>
						</li>
						<li>
							{ toEmpty(row.matchRemark)
								? <Ellipsis content={`审核备注：${row.matchRemark}`} tooltip width={600} font={15} /> : '审核备注：-' }
						</li>
					</div>
				);
			},
		}, {
			title: '拍卖状况',
			width: 360,
			render: (value, row) => AuctionInfo(value, row, this.historyInfoModal),
		},
	];

	// 关闭历史信息弹窗
	handleCancel = () => {
		this.setState({
			historyInfoModalVisible: false,
		});
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page, sourceType) => {
		const { sourceType: type } = this.props;
		// const params = portrait === 'personal' ? {
		// 	obligorName: getQueryByName(window.location.href, 'name'),
		// 	obligorNumber: getQueryByName(window.location.href, 'num'),
		// } : {
		// 	companyId: getQueryByName(window.location.href, 'id'),
		// };
		// this.setState({ loading: true });
		//
		// // 判断是个人还是企业
		// const commonAuction = portrait === 'personal' ? personalAuction : auction;
		const _sourceType = sourceType || type;
		const api = assets[_sourceType];
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const {
			dataSource, current, total, historyInfoModalData, loading, historyInfoModalVisible,
		} = this.state;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								pageSize={5}
								showQuickJumper
								current={current || 1}
								total={total || 0}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
				{/** 历史拍卖信息 */}
				{historyInfoModalVisible && (
					<TableVersionModal
						onCancel={this.handleCancel}
						onOk={this.onOk}
						data={historyInfoModalData}
						historyInfoModalVisible={historyInfoModalVisible}
					/>
				)}
			</div>
		);
	}
}