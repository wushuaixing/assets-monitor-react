import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import Api from '@/utils/api/monitor-info/public';
import { Table } from '@/common';
// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>列入日期</span> : <SortVessel field="PUBLISH_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>列入日期</SortVessel>),
			dataIndex: 'publishTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		},
		{
			title: '相关单位',
			dataIndex: 'obName',
			width: 160,
			render: () => '✘✘✘✘✘✘✘✘✘',
		},
		{
			title: '列入原因',
			dataIndex: 'title',
			width: 200,
			render: (text, record) => (record.url ? linkDom(record.url, text || '--') : <span>{text || '--'}</span>),
		},
		{
			title: '决定机关名称',
			dataIndex: 'reason',
			width: 219,
			render: (text, record) => (record.url ? linkDom(record.url, text || '-') : <span>{text || '-'}</span>),
		},
		{
			title: '移除情况',
			dataIndex: 'pena',
			render: (text, record) => (record.url ? linkDom(record.url, text || '-') : <span>{text || '-'}</span>),
		},
		{
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'createTime',
			width: 90,
			render: timeStandard,
		},
		{
			title: '操作',
			width: 60,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={Api.attentionBid}
					index={index}
				/>
			),
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

class Penalties extends Component {
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
			onRefresh({ id, isRead: !isRead, index }, 'isRead');
			// Api.readStatusBid({ idList: [id] }).then((res) => {
			// 	if (res.code === 200) {
			// 		onRefresh({ id, isRead: !isRead, index }, 'isRead');
			// 	}
			// });
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		console.log(selectedRowKeys, record);
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
			<Fragment>
				<Table
					{...rowSelection}
					rowKey={record => record.id}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? 'yc-row-bold cursor-pointer' : '')}
					onRowClick={this.toRowClick}
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
			</Fragment>
		);
	}
}
export default Penalties;
