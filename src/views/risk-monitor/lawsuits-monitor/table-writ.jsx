import React from 'react';
import { Table, Pagination } from 'antd';
import {
	ReadStatus, Attentions, SortVessel,
} from '@/common/table';
import { attention, readStatus } from '@/utils/api/monitor-info/monitor';
import { timeStandard } from '@/utils';
import { aboutLink } from '../table-common';

// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, noSort,
	} = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="LARQ" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'larq',
			width: 100,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		}, {
			title: '当事人',
			dataIndex: 'yg1',
			render: () => '--',
		}, {
			title: '法院',
			dataIndex: 'bg2',
			render: () => '--',
		}, {
			title: '案号',
			dataIndex: 'ah1',
			render: () => '--',
		}, {
			title: <SortVessel field="START" onClick={onSortChange} mark="(判决日期)" {...sort}>文书信息</SortVessel>,
			dataIndex: 'associatedInfo',
			render: aboutLink,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'createTime',
			width: 93,
			render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'),
		}, {
			title: '操作',
			unNormal: true,
			className: 'tAlignCenter_important',
			width: 60,
			render: (text, row, index) => <Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />,
		}];
	// <a href={url} className="click-link">{text || '--'}</a>
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
