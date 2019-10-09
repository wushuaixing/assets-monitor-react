import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatus } from '@/utils/api/monitor-info/finance';
import api from '@/utils/api/monitor-info/finance';
import { floatFormat } from '@/utils/format';
import { linkDom } from '@/utils';
import { Table } from '@/common';
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
			title: (noSort ? '起始日期'
				: <SortVessel field="START_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>起始日期</SortVessel>),
			dataIndex: 'startTime',
			width: 110,
			render: (text, record) => ReadStatus(text ? new Date(text * 1000).format('yyyy-MM-dd') : '--', record),
		}, {
			title: '相关单位',
			dataIndex: 'obligorName',
			render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '--'),
		}, {
			title: '项目名称',
			dataIndex: 'title',
			render: (text, row) => (text ? linkDom(row.sourceUrl, text) : '--'),
		}, {
			title: '挂拍价格(元)',
			dataIndex: 'price',
			width: 120,
			className: 'tAlignRight_important',
			render: value => <span>{value ? `${floatFormat(value)}` : '--'}</span>,
		}, {
			title: (noSort ? '期满日期'
				: <SortVessel field="END_TIME" onClick={onSortChange} {...sort}>期满日期</SortVessel>),
			dataIndex: 'endTime',
			className: 'tAlignCenter_important',
			width: 120,
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'createTime',
			className: 'tAlignCenter_important',
			width: 120,
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
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
					api={row.isAttention ? api.unFollowSinglePub : api.followSinglePub}
					index={index}
					single
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
			readStatus({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

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
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
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
