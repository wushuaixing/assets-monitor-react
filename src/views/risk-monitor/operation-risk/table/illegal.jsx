import React, { Component, Fragment } from 'react';
import { Modal, Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Ellipsis, SelectedNum, Table } from '@/common';
import { Illegal } from '@/utils/api/risk-monitor/operation-risk';

// removeSituation 移除情况
const removeSituation = (val, row) => {
	const { gmtRemoveDate, removeReason, removeDepartment } = row;
	if (!gmtRemoveDate) {
		return (
			<div className="assets-info-content">
				<li><span className="list list-content">未移除</span></li>
			</div>
		);
	}
	return (
		<div className="assets-info-content">
			<li>
				<span className="list list-content">已移除</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">移除日期</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{timeStandard(gmtRemoveDate) || '--'}</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">移除原因</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis content={removeReason} tooltip line={2} width={150} />
				</span>
			</li>
			<li>
				<span className="list list-title align-justify list-title-50">决定机关</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{removeDepartment || '--'}</span>
			</li>
		</div>
	);
};

// 点击查看具体违法事实
const toSeasonShow = (source) => {
	Modal.info({
		title: '具体违法事实',
		okText: '关闭',
		iconType: 'null',
		className: 'assets-an-info risk-detail-season',
		width: 600,
		content: (
			<div className="assets-info-content risk-detail-season-list">
				<li>
					<span className="list list-title align-justify">违法类型</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{source.type.replace(/(^\s*)|(\s*$)/g, '') || '--'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">具体情形</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{source.fact.replace(/(^\s*)|(\s*$)/g, '') || '--'}</span>
				</li>
			</div>
		),
		onOk() {},
	});
};

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="GMT_PUT_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'gmtPutDate',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text), record),
		}, {
			title: '相关单位',
			dataIndex: 'name',
			width: 200,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '列入原因',
			dataIndex: 'putReason',
			render: (text, row) => (text.replace(/(^\s*)|(\s*$)/g, '') ? [
				<Ellipsis content={text.replace(/(^\s*)|(\s*$)/g, '')} tooltip width={250} />,
				<div><span className="click-link" onClick={() => toSeasonShow(row)}>点击查看具体违法事实</span></div>,
			] : '--'),
		}, {
			title: '决定机关名称',
			dataIndex: 'putDepartment',
			render: text => text || '--',
		}, {
			title: '移除情况',
			render: removeSituation,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
			render: value => timeStandard(value),
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
					api={row.isAttention ? Illegal.unAttention : Illegal.attention}
					index={index}
				/>
			),
		}];

	return normal ? defaultColumns.filter(item => !item.unNormal) : defaultColumns;
};

class AbnormalOperation extends Component {
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
			Illegal.read({ idList: [id] }).then((res) => {
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
export default AbnormalOperation;
