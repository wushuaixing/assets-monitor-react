import React from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatusResult } from '@/utils/api/monitor-info/finance';
import api from '@/utils/api/monitor-info/finance';
import { Table, SelectedNum } from '@/common';
// import { floatFormat } from '@/utils/format';
import { linkDom } from '@/utils';

// 出质详情
const PledgeDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 80 }}>股权标的企业</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content text-ellipsis">
					{
						rowContent.companyName && rowContent.companyName.length > 12
							? (
								<Tooltip placement="topLeft" title={rowContent.companyName}>
									<p>{`${rowContent.companyName.substr(0, 12)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.companyName || '-'}</p>
					}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.regNumber || '-'}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>出质股权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.equityAmount || '-'}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>状 态</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.state === 1 ? '无效' : '有效'}
				</span>
			</li>
		</div>
	</React.Fragment>
);

// 获取表格配置
const columns = (props) => {
	const {
		normal, onRefresh, onSortChange, sortField, sortOrder, noSort,
	} = props;
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
			width: 130,
			render: (text, record) => ReadStatus(text || '-', record),
		}, {
			title: '出质人',
			dataIndex: 'pledgorList',
			width: 250,
			render: (text, row) => (
				<span>
					{row.pledgorList && row.pledgorList.length > 0 && row.pledgorList.map(item => (
						<span>
							{
								item.pledgor && item.pledgor.length > 12
									? (
										<Tooltip placement="topLeft" title={item.pledgor}>
											<p>{item.pledgorId === 0 ? `${item.pledgor.substr(0, 12)}...` : linkDom(`/#/business/debtor/detail?id=${item.pledgorId}`, `${item.pledgor.substr(0, 12)}...`)}</p>
										</Tooltip>
									)
									: <p>{item.pledgorId === 0 ? `${item.pledgor || '-'}` : linkDom(`/#/business/debtor/detail?id=${item.pledgorId}`, `${item.pledgor || '-'}`)}</p>
							}
						</span>
					))}
				</span>
			),
		}, {
			title: '质权人',
			dataIndex: 'pledgeeList',
			width: 250,
			render: (text, row) => (
				<span>
					{row.pledgeeList && row.pledgeeList.length > 0 && row.pledgeeList.map(item => (
						<span>
							{
								item.pledgee && item.pledgee.length > 12
									? (
										<Tooltip placement="topLeft" title={item.pledgee}>
											<p>{item.pledgeeId === 0 ? `${item.pledgee.substr(0, 12)}...` : linkDom(`/#/business/debtor/detail?id=${item.pledgeeId}`, `${item.pledgee.substr(0, 12)}...`)}</p>
										</Tooltip>
									)
									: <p>{item.pledgeeId === 0 ? `${item.pledgee || '-'}` : linkDom(`/#/business/debtor/detail?id=${item.pledgeeId}`, `${item.pledgee || '-'}`)}</p>
							}
						</span>
					))}
				</span>
			),
		}, {
			title: '出质详情',
			render: PledgeDetail,
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			className: 'tAlignCenter_important',
			width: 130,
			render: (text, record) => ReadStatus(text || '-', record),
		}, {
			title: '操作',
			unNormal: true,
			width: 60,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					onClick={onRefresh}
					api={row.isAttention ? api.unFollowResult : api.followResult}
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
		if (!isRead) {
			readStatusResult({ id }).then((res) => {
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
				{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum num={selectedRowKeys.length} /> : null}
				<Table
					{...rowSelection}
					columns={columns(this.props)}
					dataSource={dataSource}
					pagination={false}
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
