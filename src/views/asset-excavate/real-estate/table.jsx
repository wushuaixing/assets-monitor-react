import React from 'react';
import {
	Pagination, message, Tooltip,
} from 'antd';
import {
	Table, SelectedNum, Ellipsis, Icon, Button,
} from '@/common';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { postMarkRead, postFollow, postUnFollow } from '@/utils/api/monitor-info/mortgage';
import { linkDom, timeStandard, w } from '@/utils';
import { floatFormat } from '@/utils/format';
import { formatDateTime } from '@/utils/changeTime';

const announcementEnum = {
	1: '注销公告',
	2: '遗失公告',
	3: '继承公告',
	4: '首次登记公告',
	5: '作废公告',
	6: '转移登记公告',
	7: '变更/更正公告',
	8: '其他公告',
	0: '未知',
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
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发布日期</span>
				: <SortVessel field="REG_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'publishTime',
			width: 110,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '关联债务人',
			dataIndex: 'obligorName',
			width: 190,
			render: (text, row) => <Ellipsis content={text} width={170} url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''} tooltip />,
		}, {
			title: '公告类型',
			dataIndex: 'announcementType',
			width: 190,
			render: text => <p>{announcementEnum[text]}</p>,
		}, {
			title: '公告内容',
			width: 250,
			dataIndex: 'vehicleNumber',
			render: (text, row) => (
				<div className="yc-assets-table-info">
					{
					row.title || row.url ? (
						<Tooltip placement="top" title={row.title}>
							<a
								className="table-info-title text-ellipsis click-link"
								href={row.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{row.title || row.url}
							</a>
						</Tooltip>
					) : <div className="table-info-title ">-</div>
				}
					<li className="table-info-list list-width-180">
						<span className="info info-title">权证类型：</span>
						{
						row.certificateType ? (
							<Tooltip placement="top" title={row.certificateType}>
								<span className="info info-content text-ellipsis list-width-120">{row.certificateType}</span>
							</Tooltip>
						) : <span className="info info-content">未知</span>
					}
					</li>
					<li className="table-info-list list-width-180">
						<span className="info info-title">权证号：</span>
						<span className="info info-content">{row.certificateNumber ? row.certificateNumber : '未知'}</span>
					</li>
					<br />
					<li className="table-info-list list-width-180">
						<span className="info info-title">不动产坐落：</span>
						<span className="info info-content">{row.realEstateLocated !== null ? row.realEstateLocated : '未知'}</span>
					</li>
				</div>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
			width: 110,
			render: text => timeStandard(text) || '-',
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
		const { onRefresh, manage } = this.props;
		if (!isRead && !manage) {
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
	onSelectChange=(selectedRowKeys) => {
		const { onSelect } = this.props;
		this.setState({ selectedRowKeys });
		if (onSelect)onSelect(selectedRowKeys);
	};

	render() {
		const {
			total, current, dataSource, manage, onPageChange, pageSize, isShowPagination = true,
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
					rowKey={record => record.id}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 0 && isShowPagination && (
					<div className="yc-table-pagination">
						<Pagination
							showQuickJumper
							pageSize={pageSize || 10}
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
