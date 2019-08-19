import React from 'react';
import { Table, Pagination } from 'antd';
import { ReadStatus, Attention } from '@/common/table';

// 含操作等...
const defaultColumns = [
	{
		title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
		dataIndex: 'larq',
		render: (text, record) => ReadStatus(text ? new Date(text * 1000).format('yyyy-MM-dd') : '--', record),
	}, {
		title: '原告',
		dataIndex: 'yg',
	}, {
		title: '被告',
		dataIndex: 'bg',
	}, {
		title: '法院',
		dataIndex: 'court',
	}, {
		title: '案号',
		dataIndex: 'ah',
		render: content => <span>{content}</span>,
	}, {
		title: '案由',
		dataIndex: 'anyou',
		render: content => <span>{content}</span>,
	}, {
		title: '关联信息',
		render: () => <span>开庭</span>,
		width: 80,
	}, {
		title: '更新日期',
		dataIndex: 'updateTime',
		render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'}</span>,
	}, {
		title: '操作',
		dataIndex: 'address',
		render: (text, row) => <Attention text={text} row={row} />,
	}];
// 单纯展示
const normalColumns = [
	{
		title: '立案日期',
		dataIndex: 'larq',
	}, {
		title: '原告',
		dataIndex: 'yg',
	}, {
		title: '被告',
		dataIndex: 'bg',
	}, {
		title: '法院',
		dataIndex: 'court',
	}, {
		title: '案号',
		dataIndex: 'ah',
	}, {
		title: '关联信息',
		dataIndex: 'associateInfo',
	}, {
		title: '更新日期',
		dataIndex: 'updateTime',
	}];

export default class TableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
		};
	}

	toRowClick = (record, index) => {
		console.log(index);
	};

	onSelectChange=(selectedRowKeys) => {
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			normal, total, current, dataSource, manage,
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
					columns={normal ? normalColumns : defaultColumns}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? 'yc-row-bold' : '')}
					onRowClick={this.toRowClick}
				/>
				<div className="yc-table-pagination">
					<Pagination defaultCurrent={1} current={current || 1} total={total || 0} />
				</div>
			</React.Fragment>
		);
	}
}
