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
			width: 150,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '证书编号',
			width: 200,
			dataIndex: 'certificateNumber',
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '资质信息',
			width: 300,
			dataIndex: 'qualificationName',
			render: (text, row) => (
				<div className="table-column">
					<div style={{ display: 'inline-block', float: 'left' }}>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>资质名称:</span>
							<span>
								{text && text.length > 12 ? (<Tooltip placement="topLeft" title={text}><p>{`${text.substr(0, 12)}...`}</p></Tooltip>) : <span>{text || '-'}</span>}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>资质类别:</span>
							<span>
								{row.qualificationType && row.qualificationType.length > 12 ? (<Tooltip placement="topLeft" title={row.qualificationType}><span>{`${row.qualificationType.substr(0, 12)}...`}</span></Tooltip>) : <span>{row.qualificationType || '-'}</span>}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>资质等级:</span>
							<span>
								{row.qualificationLevel && row.qualificationLevel.length > 12 ? (<Tooltip placement="topLeft" title={row.qualificationLevel}><span>{`${row.qualificationLevel.substr(0, 12)}...`}</span></Tooltip>) : <span>{row.qualificationLevel || '-'}</span>}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>有效期:</span>
							<p style={{ display: 'inline-block' }}>
								{row.validityPeriod}
							</p>
						</div>
					</div>
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
