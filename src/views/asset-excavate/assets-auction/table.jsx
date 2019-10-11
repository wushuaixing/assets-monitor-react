import React from 'react';
import {
	Pagination, Modal, message,
} from 'antd';
import { Attentions } from '@/common/table';
import { followSingle, unFollowSingle } from '@/utils/api/monitor-info/assets';
import { processSave } from '@/utils/api/monitor-info/assets-follow';
import { Table } from '@/common';
import {
	AssetsInfo, MatchingReason, AuctionInfo,
} from '@/views/asset-excavate/assets-auction/tableComponents';
import { Button } from '@/common';
import { SortVessel } from '@/common/table';
import { floatFormat } from '@/utils/format';
import FollowModel from './follow-info';


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

// 获取表格配置
const columns = (props, onFollowClick) => {
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
			title: (noSort ? '资产信息'
				: <SortVessel field="UPDATE_TIME" onClick={onSortChange} mark="(更新时间)" {...sort} style={{ marginLeft: 10 }}>资产信息</SortVessel>),
			width: 274,
			render: AssetsInfo,
		}, {
			title: '匹配原因',
			dataIndex: 'reason',
			width: 367,
			render: MatchingReason,
		}, {
			title: (noSort ? '拍卖信息'
				: <SortVessel field="START" onClick={onSortChange} mark="(开拍时间)" {...sort}>拍卖信息</SortVessel>),
			width: 392,
			render: AuctionInfo,
		}, {
			title: '操作',
			width: 127,
			unNormal: true,
			className: 'tAlignCenter_important yc-assets-auction-action',
			render: (text, row, index) => {
				const { recovery, process } = row;
				const event = {
					onClick: () => onFollowClick(row, index),
				};
				return (
					<React.Fragment>
						{recovery > 0 ?	<div className="auction-recovery">{`追回金额：${floatFormat(recovery)}元`}</div> : ''}
						{{
							0: (
								<React.Fragment>
									<Button className="auction-button" title="跟进" {...event} />
									<br />
									<Button className="auction-button" title="忽略" onClick={() => handleIgnore(row, index, onRefresh)} />
								</React.Fragment>
							),
							3: <Button className="auction-button" title="跟进中" {...event} />,
							6: <Button className="auction-button" title="跟进中" {...event} />,
							9: <Button className="auction-button" title="已完成" {...event} />,
							12: (
								<React.Fragment>
									<Button className="auction-button" title="跟进" {...event} />
									<br />
									<Button className="auction-button" title="已忽略" disabled />
								</React.Fragment>
							),
							15: <Button className="auction-button" title="已放弃" {...event} />,
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

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			visible: false,
			source: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(_selectedRowKeys);
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

	render() {
		const {
			total, current, dataSource, manage, onPageChange, onRefresh,
		} = this.props;
		const { selectedRowKeys, visible, source } = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<React.Fragment>
				<Table
					{...rowSelection}
					rowClassName={() => 'yc-assets-auction-table-row'}
					columns={columns(this.props, this.toFollowClick)}
					dataSource={dataSource}
					pagination={false}
					onRowClick={this.toRowClick}
					// rowClassName="yc-assets-auction-table-row"
				/>
				<div className="yc-table-pagination">
					<Pagination
						showQuickJumper
						current={current || 1}
						total={total || 0}
						onChange={onPageChange}
						showTotal={totalCount => `共 ${totalCount} 条信息`}
					/>
				</div>
				{
					visible ? (
						<FollowModel
							visible={visible}
							source={source}
							onClose={() => this.setState({ visible: false })}
							onRefresh={onRefresh}
						/>
					)
						: null
				}

			</React.Fragment>
		);
	}
}
