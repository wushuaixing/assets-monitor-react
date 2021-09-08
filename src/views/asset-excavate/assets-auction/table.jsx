import React from 'react';
import {
	Pagination, Modal, message,
} from 'antd';
import { Attentions } from '@/common/table';
import { followSingle, unFollowSingle } from '@/utils/api/monitor-info/assets';
import { processSave } from '@/utils/api/monitor-info/assets-follow';
import {
	AssetsInfo, MatchingReason, AuctionInfo,
} from '@/views/asset-excavate/assets-auction/tableComponents';
import { Table, SelectedNum } from '@/common';
import { SortVessel } from '@/common/table';
import { floatFormat } from '@/utils/format';
import { readStatus } from '@/utils/api/monitor-info/assets';
import FollowModel from './follow-info';
import TableVersionModal from './tableVersionModal';

let _this;
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
					_this.refreshList();
				}
			});
		},
		onCancel() {},
	});
};

// 获取表格配置
const columns = (props, onFollowClick, toOpenHistory) => {
	const {
		normal, onRefresh, onSortChange, sortField, sortOrder, noSort,
	} = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '业务信息'
				: <SortVessel field="UPDATE_TIME" onClick={onSortChange} mark="(更新时间)" {...sort} style={{ marginLeft: 10 }}>业务信息</SortVessel>),
			width: '249px',
			render: (text, row, index, noMatching, asset = true) => AssetsInfo(text, row, index, noMatching, asset),
		}, {
			title: '匹配原因',
			dataIndex: 'reason',
			width: '246px',
			render: MatchingReason,
		}, {
			title: (noSort ? '拍卖信息'
				: <SortVessel field="START" onClick={onSortChange} mark="(开拍时间)" {...sort}>拍卖信息</SortVessel>),
			width: '308px',
			render: (text, row) => AuctionInfo(text, row, toOpenHistory),
		}, {
			title: '跟进状态',
			dataIndex: 'reason',
			width: '100px',
			className: 'yc-AssetAuction-verticalMiddle',
			render: (text, row) => {
				const { recovery, process } = row;
				return (
					<React.Fragment>
						{{
							0: (
								<div className="property-list-dynamic">
									<i style={{ background: '#FB5A5C' }} />
									<span>未跟进</span>
								</div>
							),
							3: (
								<div className="property-list-dynamic">
									<i style={{ background: '#1C80E1' }} />
									<span>跟进中</span>
								</div>
							),
							6: (
								<div className="property-list-dynamic">
									<i style={{ background: '#1C80E1' }} />
									<span>跟进中</span>
								</div>
							),
							9: (
								<div className="property-list-dynamic">
									<i style={{ background: '#3DBD7D' }} />
									<span>已完成</span>
								</div>
							),
							12: (
								<div className="property-list-dynamic">
									<i style={{ background: '#4E5566' }} />
									<span>已忽略</span>
								</div>
							),
							15: (
								<div className="property-list-dynamic">
									<i style={{ background: '#4E5566' }} />
									<span>已放弃</span>
								</div>
							),
						}[process] || '-' }
						{recovery > 0 ?	(
							<div style={{ color: '#FB5A5C', fontWeight: 'bold', fontSize: '12px' }}>
								追回:
								{`${floatFormat(recovery)}元`}
							</div>
						) : ''}
					</React.Fragment>
				);
			},
		}, {
			title: '操作',
			width: '120px',
			unNormal: true,
			className: 'yc-assets-auction-action yc-AssetAuction-verticalMiddle',
			render: (text, row, index) => {
				const { process, commentTotal } = row;
				const event = {
					onClick: () => onFollowClick(row, index),
				};
				return (
					<React.Fragment>
						<div style={{ display: 'flex' }}>
							<Attentions
								text={text}
								row={row}
								onClick={onRefresh}
								index={index}
								api={row.isAttention ? unFollowSingle : followSingle}
								single
							/>
							{{
								0: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
										<span className="property-list-wire" />
										<span className="auction-button" onClick={() => handleIgnore(row, index, onRefresh)}>忽略</span>
									</React.Fragment>
								),
								3: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
									</React.Fragment>
								),
								6: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
									</React.Fragment>
								),
								9: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
									</React.Fragment>
								),
								12: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
									</React.Fragment>
								),
								15: (
									<React.Fragment>
										<span className="property-list-wire" />
										<span className="auction-button" {...event}>
											跟进
											{(commentTotal > 0) && commentTotal }
										</span>
									</React.Fragment>
								),
							}[process] || null }
						</div>
					</React.Fragment>
				);
			},
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			visible: false,
			source: {},
			historyInfoModalVisible: false,
			historyInfoModalData: {},

		};
		_this = this;
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 选择框
	onSelectChange=(selectedRowKeys) => {
		// console.log(record);
		// const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	// 跟进点击效果
	toFollowClick=(source, index) => {
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

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh } = this.props;
		if (!isRead) {
			readStatus({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 更新列表
	refreshList = () => {
		const { refreshList } = this.props;
		refreshList();
		this.setState({ visible: false });
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, onRefresh, loading, pageSize, isShowPagination = true,
		} = this.props;
		const {
			selectedRowKeys, visible, source, historyInfoModalVisible, historyInfoModalData,
		} = this.state;
		// console.log(historyInfoModalVisible);
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;

		return (
			<React.Fragment>
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					visible={loading}
					rowKey={record => record.id}
					rowClassName={() => 'yc-assets-auction-table-row'}
					columns={columns(this.props, this.toFollowClick, this.toOpenHistory)}
					dataSource={dataSource}
					pagination={false}
					onRowClick={this.toRowClick}
					// rowClassName="yc-assets-auction-table-row"
				/>
				{ dataSource && dataSource.length > 0 && isShowPagination && (
				<div className="yc-table-pagination">
					<Pagination
						showQuickJumper
						pageSize={pageSize || 10}
						current={current || 1}
						total={total || 0}
						onChange={onPageChange}
						showTotal={totalCount => `共 ${totalCount} 条信息`}
					/>
				</div>
				)}
				{
					visible ? (
						<FollowModel
							visible={visible}
							source={source}
							onClose={this.refreshList}
							onRefresh={onRefresh}
						/>
					)
						: null
				}
				{historyInfoModalVisible && (
					<TableVersionModal
						onCancel={() => this.setState({ historyInfoModalVisible: false })}
						onOk={() => this.setState({ historyInfoModalVisible: false })}
						data={historyInfoModalData}
						historyInfoModalVisible={historyInfoModalVisible}
					/>
				)}
			</React.Fragment>
		);
	}
}
