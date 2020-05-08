import React from 'react';
import { Pagination } from 'antd';
import { Attentions, SortVessel } from '@/common/table';
import { readStatus } from '@/utils/api/monitor-info/finance';
import api from '@/utils/api/monitor-info/finance';
import { Table, SelectedNum } from '@/common';
import { AssetsInfo, ProjectInfo, ListingInfo } from '@/views/asset-excavate/assets-auction/tableComponents';
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
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} mark="(更新时间)" {...sort}>业务信息</SortVessel>),
			width: 400,
			render: (text, row) => AssetsInfo(text, row, true, true),
		},
		{
			title: (noSort ? '项目信息 '
				: <SortVessel field="GMT_PUBLISH" onClick={onSortChange} mark="(发布日期)" {...sort}>项目信息</SortVessel>),
			width: 300,
			render: (text, row) => ProjectInfo(text, row, true, true),
		},
		{
			title: (noSort ? '挂牌信息'
				: <SortVessel field="START_TIME" onClick={onSortChange} mark="(挂牌起始日期)" {...sort}>挂牌信息</SortVessel>),
			width: 300,
			render: (text, row) => ListingInfo(text, row, true, true),
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
					api={row.isAttention ? api.unFollowSinglePub : api.followSinglePub}
					index={index}
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
			readStatus({ id }).then((res) => {
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
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					rowKey={record => record.id}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && (
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
