import React, { Component } from 'react';
import {
	Pagination, Modal, Tooltip,
} from 'antd';
import dishonest1 from 'img/icon/icon_shixin.png';
import dishonest2 from 'img/icon/icon_cengshixin.png';
import { Attentions } from '@/common/table';
import { MatchingReason, AuctionInfo } from '@/views/asset-excavate/assets-auction/tableComponents';
import { Button, Ellipsis, Table } from '@/common';
import { floatFormat } from '@/utils/format';
import { unFollowSingle, followSingle, markRead } from '@/utils/api/message';
import '../../style.scss';
import message from '@/utils/api/message/message';
import { acutionRes } from '../../test';
import FollowModel from '@/views/asset-excavate/assets-auction/follow-info';
import TableVersionModal from '@/views/asset-excavate/assets-auction/tableVersionModal';
import { processSave } from '@/utils/api/monitor-info/assets-follow';
import { formatDateTime } from '@/utils/changeTime';


// 忽略操作
const handleIgnore = (row, index, onRefresh) => {
	Modal.confirm({
		title: '确认忽略本条推送信息吗？',
		content: '点击确定，本条推送信息将被标记为忽略。',
		iconType: 'exclamation-circle',
		onOk() {
			processSave({ monitorId: row.id, process: 12 }, true).then((res) => {
				if (res.code === 200) {
					message.success('操作成功！');
					onRefresh({ id: row.id, process: 12, index }, 'process');
				}
			});
		},
		onCancel() {},
	});
};


const AssetsInfo = (text, rowContent) => {
	const {
		obligorName, obligorNumber, orgName, updateTime, dishonestStatus, obligorId, isRead,
	} = rowContent;
	return (
		<React.Fragment>
			{ !isRead
				? (
					<span
						className={!isRead && isRead !== undefined ? 'yc-table-read' : 'yc-table-unread'}
						style={!isRead && isRead !== undefined ? { position: 'absolute', top: '45%' } : {}}
					/>
				) : null}
			<div className="assets-info-content" style={{ marginLeft: 10 }}>
				<li>
					<span className="list list-title align-justify">债 务 人：</span>
					<Ellipsis
						content={obligorName}
						url={obligorId ? `#/business/debtor/detail?id=${obligorId}` : ''}
						tooltip
						width={150}
						// width={getByteLength(content) * 6 > maxWidth ? maxWidth : (getByteLength(content) + 3) * 6}
					/>
				</li>
				<li>
					<span className="list list-title align-justify">证 件 号：</span>
					<span className="list list-content">{obligorNumber || '-'}</span>
				</li>
				<li>
					<span className="list list-title" style={{ width: 80 }}>负责人/机构：</span>
					{
						orgName ? (
							<Tooltip placement="top" title={orgName}>
								<span className="list list-content text-ellipsis ">{orgName}</span>
							</Tooltip>
						) : <span className="list list-content text-ellipsis">- </span>
					}
				</li>
				<li className="list-dishonest">
					<span className="list list-title">更新时间：</span>
					<span className="list list-content">{updateTime ? formatDateTime(updateTime) : '-'}</span>
					{ dishonestStatus === 1 ? <img src={dishonest1} alt="" className="list-dishonest-status" /> : ''}
					{ dishonestStatus === 2 ? <img src={dishonest2} alt="" className="list-dishonest-status" /> : ''}
				</li>
			</div>
		</React.Fragment>
	);
};

// 获取表格配置
const columns = (onRefresh, onFollowClick, toOpenHistory) => [
	{
		title: '业务信息（更新时间）',
		dataIndex: 'updateTime',
		width: '23%',
		className: 'firstTitle',
		render: (text, row) => AssetsInfo(text, row),
	}, {
		title: '匹配原因',
		dataIndex: 'reason',
		width: '32%',
		render: MatchingReason,
	}, {
		title: '拍卖信息（开拍时间）',
		width: '34%',
		render: (text, row) => AuctionInfo(text, row, toOpenHistory),
	}, {
		title: '操作',
		width: '11%',
		className: 'tAlignCenter_important yc-assets-auction-action',
		render: (text, row, index) => {
			const { recovery, process } = row;
			const event = {
				onClick: () => onFollowClick(row, index),
			};
			return (
				<React.Fragment>
					{recovery > 0 ?	(
						<div className="auction-recovery">
								追回金额
							{floatFormat(recovery).length > 12 ? <br /> : '：'}
							{`${floatFormat(recovery)}元`}
						</div>
					) : ''}
					{{
						0: (
							<React.Fragment>
								<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
								<br />
								<Button className="auction-button" title="忽略" onClick={() => handleIgnore(row, index, onRefresh)} />
							</React.Fragment>
						),
						3: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
						6: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
						9: <Button className="auction-button" type="ghost-done" title="已完成" {...event} />,
						12: (
							<React.Fragment>
								<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
								<br />
								<Button className="auction-button" type="ghost-ing" title="已忽略" disabled />
							</React.Fragment>
						),
						15: <Button className="auction-button" type="ghost-abort" title="已放弃" {...event} />,
					}[process] || null }
					<Attentions
						text={text}
						row={row}
						onClick={onRefresh}
						index={index}
						api={row.isAttention ? unFollowSingle : followSingle}
						single
					/>
				</React.Fragment>
			);
		},
	}];

class Assets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			dataSource: [],
			historyInfoModalVisible: false,
			historyInfoModalData: {},
			source: {},
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: acutionRes.data.list,
		});
		// const requestApi = message[0].list();
		// requestApi().then((res) => {
		// }).catch((err) => {
		// });
	}

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

	// 跟进点击效果
	onFollowClick=(source, index) => {
		const _source = source;
		_source.index = index;
		this.setState({
			visible: true,
			source: _source,
		});
	};

	// 点击历史拍卖信息
	toOpenHistory=(source = {}) => {
		this.setState({
			historyInfoModalVisible: true,
			historyInfoModalData: source,
		});
	};

	toRowClick = (record, index) => {
		const { id, isRead } = record;
		if (!isRead) {
			markRead({ id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};


	render() {
		const {
			title, id, total,
		} = this.props;
		const {
			dataSource, source, visible, historyInfoModalVisible, historyInfoModalData,
		} = this.state;
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-headerLine" />
				<div className="messageDetail-table-container">
					<Table
						columns={columns(this.onRefresh, this.onFollowClick, this.toOpenHistory)}
						pagination={false}
						dataSource={dataSource}
						onRowClick={this.toRowClick}
					/>
					{/* 页脚 */}
					{
						dataSource && dataSource.length > 5 && (
							<div className="yc-table-pagination">
								<Pagination />
							</div>
						)
					}
					 {
						visible ? (
							<FollowModel
								visible={visible}
								source={source}
								onClose={() => this.setState({ visible: false })}
								onRefresh={this.onRefresh}
							/>
						)
							: null
					 }
					{
						historyInfoModalVisible && (
							<TableVersionModal
								onCancel={() => this.setState({ historyInfoModalVisible: false })}
								onOk={() => this.setState({ historyInfoModalVisible: false })}
								data={historyInfoModalData}
								historyInfoModalVisible={historyInfoModalVisible}
							/>
						)
					}
				</div>
			</React.Fragment>
		);
	}
}

export default Assets;
