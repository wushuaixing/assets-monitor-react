import React from 'react';
import { Pagination, Tooltip } from 'antd';
import {
	Ellipsis, Icon, Spin, Table, Button,
} from '@/common';
import { floatFormat } from '@/utils/format';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import TableVersionModal from './tableVersionModal';

import './style.scss';
import { toEmpty } from '@/utils';

const { auction } = assets;

const AuctionInfo = (text, rowContent) => {
	const {
		court, consultPrice, start, currentPrice, initialPrice, status,
	} = rowContent;
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
			<li style={{ lineHeight: '20px' }}>
				<Icon type="icon-dot" style={{ fontSize: 12, color: result.color, marginRight: 2 }} />
				<span className="list list-content ">{result.text}</span>
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
				<span className="info info-content">{start ? new Date(start * 1000).format('yyyy-MM-dd hh:mm') : '未知'}</span>
			</li>
			{
				{
					1: (
						<li className="table-info-list ">
							<span className="info info-title">起拍价：</span>
							<span className="info-content info-over">
								{initialPrice ? `${floatFormat(initialPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
					5: (
						<li className="table-info-list ">
							<span className="info info-title">成交价：</span>
							<span className="info-content info-over">
								{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
				}[status] || (
					<li className="table-info-list ">
						<span className="info info-title">当前价：</span>
						<span className="info-content">
							{currentPrice ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				)
			}
			<br />

		</div>
	);
};

const toGetType = (ary) => {
	if (ary.length) {
		const { type } = ary[0];
		//	1：资产所有人 2：债权人 3：资产线索 4：起诉人 5：竞买人
		let typeName = '--';
		switch (type) {
		case 1: typeName = '资产所有人'; break;
		case 2: typeName = '债权人'; break;
		case 3: typeName = '资产线索'; break;
		case 4: typeName = '起诉人'; break;
		case 5: typeName = '竞买人'; break;
		default: typeName = '--';
		}
		return typeName;
	}
	return '--';
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
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns=() => [
		{
			title: '拍卖信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-title-normal-bold" style={{ lineHeight: '20px' }}>
						{ toEmpty(row.title)
							? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={15} /> : '--' }
						<Button onClick={this.historyInfoModal}>
							<Icon type="file-text" />
							查看历史拍卖信息
						</Button>
					</li>
					<li>
						<span className="list list-title align-justify">匹配原因</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{toGetType(row.obligors)}</span>
					</li>
					<li>
						{ toEmpty(row.matchRemark)
							? <Ellipsis content={row.matchRemark} tooltip width={600} font={15} /> : '--' }
					</li>
				</div>
			),
		}, {
			title: '拍卖状况',
			width: 360,
			render: AuctionInfo,
		},
	];

	// 打开历史信息弹窗
	historyInfoModal = () => {
		this.setState({
			historyInfoModalVisible: true,
		});
	};

	// 关闭历史信息弹窗
	handleCancel = () => {
		this.setState({
			historyInfoModalVisible: false,
		});
	}

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		this.setState({ loading: true });
		auction.list({
			page: page || 1,
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
		const { dataSource, current, total } = this.state;
		const { loading, historyInfoModalVisible } = this.state;

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
					historyInfoModalVisible={historyInfoModalVisible}
				/>
				)}
			</div>
		);
	}
}
