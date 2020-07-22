import React from 'react';
import { Pagination } from 'antd';
import { Attentions } from '@/common/table';
import api, { readStatusBid } from '@/utils/api/monitor-info/finance';
import { AssetsInfo, MatchingReason, AuctionInfo } from '@/views/asset-excavate/assets-auction/tableComponents';
import { SortVessel } from '@/common/table';
import { Table, SelectedNum } from '@/common';
// import { Button } from '@/common';
// import { floatFormat } from '@/utils/format';

// 获取表格配置
const columns = (props) => {
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
				: <SortVessel field="UPDATE_TIME" onClick={onSortChange} mark="(更新时间)" {...sort}>业务信息</SortVessel>),
			width: 274,
			render: (text, row) => AssetsInfo(text, row, true, true),
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
			width: 80,
			unNormal: true,
			className: 'tAlignCenter_important yc-assets-auction-action',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					index={index}
					api={row.isAttention ? api.unFollowSingleBid : api.followSingleBid}
					// single
				/>
			),
		}];
	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { manage } = this.props;
		if ((manage === false && nextProps.manage) || !(nextProps.selectRow || []).length) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
			readStatusBid({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		// const _selectedRowKeys = record.map(item => item.id);
		console.log(record);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, maxLength,
		} = this.props;
		const { selectedRowKeys } = this.state;
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
					rowKey={record => record.id}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					onRowClick={this.toRowClick}
					rowClassName={record => (record.isRead ? 'yc-assets-auction-table-row' : 'yc-assets-auction-table-row yc-row-bold cursor-pointer')}
				/>
				{dataSource && dataSource.length > (maxLength || 0) && (
				<div className="yc-table-pagination">
					<Pagination
						showQuickJumper
						current={current || 1}
						total={total || 0}
						onChange={onPageChange}
						showTotal={totalCount => `共 ${totalCount} 条信息`}
					/>
				</div>
				)}
			</React.Fragment>
		);
	}
}
