import React from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDom } from '@/utils';
import { Table } from '@/common';
import Api from '@/utils/api/monitor-info/public';
import { Result } from '@/views/asset-excavate/land-data/table/common';
// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>签订日期</span>
				: <SortVessel field="SIGNED_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>签订日期</SortVessel>),
			dataIndex: 'singedDate',
			width: 113,
			render: (text, record) => ReadStatus(text || '-', record),
		}, {
			title: '土地使用人',
			dataIndex: 'obligorName',
			width: 160,
			render: (text, row) => (
				<span>
					{
						text && text.length > 10
							? (
								<Tooltip placement="topLeft" title={text}>
									<p>{row.obligorId === 0 ? `${text.substr(0, 10)}...` : linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, `${text.substr(0, 10)}...`)}</p>
								</Tooltip>
							)
							: <p>{text || '-'}</p>
					}
				</span>
			),
		}, {
			title: '项目信息',
			width: 260,
			render: Result.InfoProject,
		}, {
			title: '土地信息',
			width: 160,
			render: Result.InfoLand,
		}, {
			title: '出让信息',
			width: 160,
			render: Result.InfoTransfer,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 90,
			render: text => <span>{text || '-'}</span>,
		}, {
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? Api.attentionUnFollowResult : Api.attentionFollowResult}
					index={index}
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
		const { onRefresh } = this.props;
		if (!isRead) {
			Api.readStatusResult({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		// const _selectedRowKeys = record.map(item => item.id);
		const _selectedRowKeys = selectedRowKeys;
		console.log(record);
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
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowKey={record => record.id}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
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
