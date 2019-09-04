import React from 'react';
import { Table, Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDom } from '@/utils';
import Api from '@/utils/api/monitor-info/public';
// { attention, readStatus }
// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: <span style={{ paddingLeft: 11 }}>发布日期</span>,
			dataIndex: 'publishTime',
			width: 113,
			render: (text, record) => ReadStatus(text || '--', record),
		}, {
			title: '纳税人',
			dataIndex: 'obName',
			width: 226,
			render: (text, row) => (text ? linkDom(`/#/monitor/debtor/detail?id=${row.obligorId}`, text) : '--'),
		}, {
			title: '统一社会信用代码',
			dataIndex: 'obNumber',
			width: 190,
			render: text => text || '--',
		}, {
			title: '案件性质',
			dataIndex: 'property',
			width: 403,
			render: text => text || '--',
		}, {
			title: <SortVessel field="UPDATE_TIME" onClick={onSortChange} {...sort}>更新日期</SortVessel>,
			dataIndex: 'updateTime',
			width: 90,
			render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
		}, {
			title: '源链接',
			dataIndex: 'obName',
			className: 'tAlignCenter_important',
			width: 75,
			render: (text, record) => (record.url ? linkDom(record.url, ' ', '', 'yc-list-link') : '--'),
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
					api={Api.attentionIllegal}
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
		if (manage === false && nextProps.manage) {
			this.setState({ selectedRowKeys: [] });
		}
	}

	// 行点击操作
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		const { onRefresh } = this.props;
		if (!isRead) {
			Api.readStatusIllegal({ idList: [id] }).then((res) => {
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
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold')}
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
