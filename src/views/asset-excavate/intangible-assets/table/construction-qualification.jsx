import React, { Component, Fragment } from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import { Construction } from '@/utils/api/monitor-info/intangible';

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="CHANGE_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发证日期</SortVessel>),
			dataIndex: 'issueTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text) || '--', record),
		}, {
			title: '持证单位',
			dataIndex: 'obligorName',
			width: 200,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '证书编号',
			width: 150,
			dataIndex: 'certificateNumber',
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '资质信息',
			width: 270,
			dataIndex: 'qualificationName',
			render: (text, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>资质名称</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{text || '--'}</span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>资质类别</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.qualificationTyp || '--'}</span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>资质等级</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.qualificationLevel || '--'}</span>
					</li>
					<li>
						<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.validityPeriod}</span>
					</li>
				</div>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
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
					api={row.isAttention ? Construction.unAttention : Construction.attention}
					index={index}
				/>
			),
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

export default class BusinessChange extends Component {
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
			Construction.read({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys) => {
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
			<Fragment>
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
			</Fragment>
		);
	}
}
