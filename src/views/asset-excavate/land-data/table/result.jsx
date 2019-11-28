import React from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import Api from '@/utils/api/monitor-info/public';
import { Result } from './common';
// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>签订日期</span>
				: <SortVessel field="SIGNED_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>签订日期</SortVessel>),
			dataIndex: 'singedTime',
			width: 120,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '土地使用人',
			dataIndex: 'obligorName',
			width: 230,
			render: (text, row) => (
				<span>
					{
						text && text.length > 10
							? (
								<Tooltip placement="topLeft" title={text}>
									<p>{row.obligorId === 0 ? `${text.substr(0, 10)}...` : linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, `${text.substr(0, 10)}...`)}</p>
								</Tooltip>
							)
							: <p>{row.obligorId === 0 ? `${text || '-'}` : linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, `${text || '-'}`)}</p>
					}
				</span>
			),
		}, {
			title: '项目信息',
			width: 240,
			render: Result.InfoProject,
		}, {
			title: '土地信息',
			width: 170,
			render: Result.InfoLand,
		}, {
			title: '出让信息',
			width: 190,
			render: Result.InfoTransfer,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 120,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '操作',
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
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
			Api.readStatusResult({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys) => {
		// const _selectedRowKeys = record.map(item => item.id);
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
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
					rowKey={record => record.id}
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