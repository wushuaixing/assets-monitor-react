import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import Api from '@/utils/api/monitor-info/epaper';
import { Table, SelectedNum, Ellipsis } from '@/common';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="PUBLISH_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'publishTime',
			width: 100,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '关联债务人',
			dataIndex: 'obligorName',
			width: 150,
			render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '-'),
		}, {
			title: '公告类型',
			dataIndex: 'noticeType',
			width: 140,
			render: text => <span>{text || '--'}</span>,
		}, {
			title: '电子报信息',
			dataIndex: 'newspaperName',
			width: 140,
			render: (text, row) => (
				<div>
					<p>
						<span style={{ color: '#7D8699' }}>名称：</span>
						{text || '--'}
					</p>
					<p>
						<span style={{ color: '#7D8699' }}>版面：</span>
						{row.edition || '--'}
					</p>
					<p>
						<span style={{ color: '#7D8699' }}>省份：</span>
						{row.province || '--'}
					</p>
				</div>
			),
		}, {
			title: '标题',
			dataIndex: 'title',
			width: 200,
			render: (text, record) => (record.url ? (
				<Ellipsis
					content={text}
					url={record.url}
					isSourceLink
					tooltip
					width={200}
				/>
			) : <span>{text || '-'}</span>),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
			render: value => (value || '-'),
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
					api={row.isAttention ? Api.unAttention : Api.attention}
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
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
			Api.read({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = record.map(item => item.id);
		console.log(_selectedRowKeys);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
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
					columns={columns(this.props)}
					rowKey={record => record.id}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && isShowPagination && (
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
			</React.Fragment>
		);
	}
}
