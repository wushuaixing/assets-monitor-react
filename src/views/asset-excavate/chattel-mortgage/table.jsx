import React from 'react';
import {
	Pagination, message, Tooltip,
} from 'antd';
import { Table } from '@/common';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { postMarkRead, postFollow, postUnFollow } from '@/utils/api/monitor-info/mortgage';
import { linkDom } from '@/utils';


// 抵押详情
const MortgageDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 80 }}>抵押物名称</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content text-ellipsis">
					{
						rowContent.pawnName && rowContent.pawnName.length > 10
							? (
								<Tooltip placement="topLeft" title={rowContent.pawnName}>
									<p>{`${rowContent.pawnName.substr(0, 10)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.pawnName || '-'}</p>
					}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.regNum || '-'}
					{/* {
						rowContent.regNum && rowContent.regNum.length > 10
							? (
								<Tooltip placement="topLeft" title={rowContent.regNum}>
									<p>{`${rowContent.regNum.substr(0, 10)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.regNum || '-'}</p>
					} */}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>担保债权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.amount || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 130 }}>债务人履行债务的期限</span>
				<span className="list list-title-colon">:</span>
			</li>
			<li>
				<span className="list list-content" style={{ maxWidth: 'none' }}>{rowContent.term || '-'}</span>
			</li>
		</div>
	</React.Fragment>
);

// 登记详情
const RegisterDetail = (text, rowContent) => {
	let status;
	if (rowContent.status === 0) {
		status = '无效';
	} else if (rowContent.status === 1) {
		status = '有效';
	} else {
		status = '-';
	}
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content text-ellipsis">
						{status}
					</span>
				</li>
				{
					rowContent.cancelReason && rowContent.cancelReason.length > 1 && (
					<li>
						<span className="list list-title align-justify" style={{ width: 'auto' }}>注销原因</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{rowContent.cancelReason }</span>
					</li>
					)
				}
				{
					rowContent.cancelDate && (
					<li>
						<span className="list list-title align-justify" style={{ width: 'auto' }}>注销时间</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{rowContent.cancelDate || '-'}</span>
					</li>
					)
				}
			</div>
		</React.Fragment>
	);
};
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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>登记日期</span>
				: <SortVessel field="REG_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>登记日期</SortVessel>),
			dataIndex: 'regDate',
			width: 115,
			render: (text, record) => ReadStatus(text || '-', record),
		}, {
			title: '抵押物所有人',
			dataIndex: 'owner',
			width: 120,
			render: (text, row) => (
				<span>
					{
						text && text.length > 10
							? (
								<Tooltip placement="topLeft" title={text}>
									<p>{row.ownerId === 0 ? `${text.substr(0, 10)}...` : linkDom(`/#/business/debtor/detail?id=${row.ownerId}`, `${text.substr(0, 10)}...`)}</p>
								</Tooltip>
							)
							: <p>{text || '-'}</p>
					}
				</span>
			),
		}, {
			title: '抵押权人',
			dataIndex: 'people',
			width: 120,
			render: (text, row) => (
				<span>
					{
						text && text.length > 10
							? (
								<Tooltip placement="topLeft" title={text}>
									<p>{row.peopleId === 0 ? `${text.substr(0, 10)}...` : linkDom(`/#/business/debtor/detail?id=${row.peopleId}`, `${text.substr(0, 10)}...`)}</p>
								</Tooltip>
							)
							: <p>{text || '-'}</p>
					}
				</span>
			),
		}, {
			title: '抵押详情',
			width: 200,
			render: MortgageDetail,
		}, {
			title: '登记状态',
			width: 130,
			render: RegisterDetail,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 90,
			render: text => <span>{text || '-'}</span>,
		}, {
			title: '操作',
			width: 55,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? postUnFollow : postFollow}
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
		const { onRefresh } = this.props;
		if (isRead === 0) {
			postMarkRead({ id }).then((res) => {
				if (res.code === 200) {
					onRefresh({ id, isRead: 1, index }, 'isRead');
				} else {
					message.error(res.data.message);
				}
			});
		}
	};

	// 选择框
	onSelectChange=(selectedRowKeys, record) => {
		const _selectedRowKeys = selectedRowKeys;
		console.log(record);
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
					rowKey={record => record.id}
					// rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					rowClassName={record => (record.isRead === 1 ? '' : 'yc-row-bold cursor-pointer')}
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
