import React from 'react';
import { Table, Pagination } from 'antd';
import { Attentions } from '@/common/table';
import { followSingle, unFollowSingle } from '@/utils/api/monitor-info/assets';
import {
	AssetsInfo, MatchingReason, AuctionInfo,
} from '@/views/monitor/assets-auction/tableComponents';
import { Button } from '@/common';
import { SortVessel } from '@/common/table';
import { floatFormat } from '@/utils/format';
// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, onSortChange, sortField, sortOrder,
	} = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: <SortVessel field="updateTime" onClick={onSortChange} mark="(更新时间)" {...sort}>资产信息</SortVessel>,
			width: 274,
			render: AssetsInfo,
		}, {
			title: '匹配原因',
			dataIndex: 'reason',
			width: 367,
			render: MatchingReason,
		}, {
			title: <SortVessel field="start" onClick={onSortChange} mark="(开拍时间)" {...sort}>拍卖信息</SortVessel>,
			width: 392,
			render: AuctionInfo,
		}, {
			title: '操作',
			width: 127,
			unNormal: true,
			className: 'tAlignCenter_important yc-assets-auction-action',
			render: (text, row, index) => {
				const { recovery, process } = row;
				return (
					<React.Fragment>
						{recovery > 0 ?	<div className="auction-recovery">{`追回金额：${floatFormat(recovery)}元`}</div> : ''}
						{{
							0: (
								<React.Fragment>
									<Button className="auction-button" title="跟进" />
									<br />
									<Button className="auction-button" title="忽略" />
								</React.Fragment>
							),
							3: <Button className="auction-button" title="跟进中" />,
							6: <Button className="auction-button" title="跟进中" />,
							9: <Button className="auction-button" title="已完成" />,
							12: (
								<React.Fragment>
									<Button className="auction-button" title="跟进" />
									<br />
									<Button className="auction-button" title="已忽略" disabled />
								</React.Fragment>
							),
							15: <Button className="auction-button" title="已放弃" />,
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
		// console.log(selectedRowKeys, record);
		const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(_selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange,
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
				<Table
					{...rowSelection}
					rowClassName={() => 'yc-assets-auction-table-row'}
					columns={columns(this.props)}
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
						showTotal={totalCount => `共 ${totalCount} 条`}
					/>
				</div>
			</React.Fragment>
		);
	}
}
