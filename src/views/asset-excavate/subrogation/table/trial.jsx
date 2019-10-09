import React from 'react';
import { Table, Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { attention, readStatus } from '@/utils/api/monitor-info/monitor';
import { timeStandard } from '@/utils';
import { partyInfo } from '../../_common';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>立案日期</span>
				: <SortVessel field="GMT_REGISTER" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>立案日期</SortVessel>),
			dataIndex: 'gmtRegister',
			width: 100,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		}, {
			title: '当事人',
			dataIndex: 'parities',
			width: 280,
			render: partyInfo,
		}, {
			title: '法院',
			dataIndex: 'court',
			render: text => text || '--',
		}, {
			title: '案号',
			dataIndex: 'caseNumber',
			render: text => text || '--',
			// render: () => '✘✘✘✘✘✘✘✘✘✘✘✘',
		}, {
			title: '关联链接',
			dataIndex: 'associatedInfo',
			className: 'tAlignCenter_important min-width-80',
			render: () => '✘✘✘✘✘✘✘✘✘✘✘✘',
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 93,
			render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'),
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			width: 60,
			render: (text, row, index) => <Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />,
		}];
	// const base = defaultColumns.filter(item => item.sourceType !== sourceType);
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
			readStatus({ idList: [id] }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = record.map(item => item.id);
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(_selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange,
		} = this.props;
		const {
			selectedRowKeys,
		} = this.state;
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
