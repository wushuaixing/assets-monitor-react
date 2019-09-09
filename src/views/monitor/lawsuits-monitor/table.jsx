import React from 'react';
import { Table, Pagination } from 'antd';
import {
	ReadStatus, Attentions, TitleIcon, SortVessel,
} from '@/common/table';
import { attention, readStatus } from '@/utils/api/monitor-info/monitor';
import { linkDom, timeStandard } from '@/utils';
import { aboutLink, caseInfo } from '../table-common';

// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, sourceType, onSortChange, sortField, sortOrder, noSort,
	} = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '立案日期'
				: <SortVessel field="LARQ" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>立案日期</SortVessel>),
			dataIndex: 'larq',
			width: 111,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		}, {
			title: (noSort ? '原告'
				: <SortVessel field="YG" onClick={onSortChange} {...sort}>原告</SortVessel>),
			dataIndex: 'yg',
			render: text => text || '--',
		}, {
			title: <TitleIcon title="被告" tooltip="我行债务人" />,
			dataIndex: 'bg',
			render: (text, row) => (row.isDeleted ? text : linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text)),
		}, {
			title: '法院',
			dataIndex: 'court',
			render: text => text || '--',
		}, {
			title: '案号',
			dataIndex: 'ah',
			render: caseInfo,
		}, {
			title: '案由',
			dataIndex: 'anyou',
			sourceType: 1,
			render: text => text || '--',
		}, {
			title: '关联信息',
			dataIndex: 'associatedInfo',
			className: 'tAlignCenter_important min-width-80',
			render: aboutLink,
		}, {
			title: <SortVessel field="UPDATE_TIME" onClick={onSortChange} {...sort}>更新日期</SortVessel>,
			dataIndex: 'updateTime',
			width: 111,
			render: value => timeStandard(value),
		}, {
			title: '操作',
			unNormal: true,
			width: 60,
			className: 'tAlignCenter_important',
			render: (text, row, index) => <Attentions text={text} row={row} onClick={onRefresh} api={attention} index={index} />,
		}];
	// <a href={url} className="click-link">{text || '--'}</a>
	const base = defaultColumns.filter(item => item.sourceType !== sourceType);
	return normal ? base.filter(item => !item.unNormal) : base;
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
