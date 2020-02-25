import React from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { readStatus, unFollowSingle, followSingle } from '@/utils/api/monitor-info/bankruptcy';
import { linkDom, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
// 获取表格配置
const columns = (props, openRegisterModalFunc) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = {
		sortField,
		sortOrder,
	};
	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? '发布日期'
				: <SortVessel field="PUBLISH_DATE" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发布日期</SortVessel>),
			dataIndex: 'publishDate',
			width: 115,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		}, {
			title: '债务人',
			dataIndex: 'obligorName',
			width: 200,
			render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '--'),
		}, {
			title: '案件信息',
			dataIndex: 'court',
			width: 180,
			render: (text, row) => (
				<div className="table-column">
					<div style={{ display: 'inline-block', float: 'left' }}>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>案号:</span>
							<span>
								{text || '--'}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>执行法院:</span>
							<span>
								{row.projectName || '--'}
							</span>
						</div>
					</div>
				</div>
			),
		}, {
			title: '失信信息',
			dataIndex: 'title',
			width: 506,
			render: (text, row) => (
				<div className="table-column">
					<div style={{ display: 'inline-block', float: 'left' }}>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>失信行为具体情形:</span>
							<span>
								{text || '--'}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>生效文书确定义务:</span>
							<span>
								{row.projectName || '--'}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>被执行人履行情况:</span>
							<span>
								{row.area || '--'}
							</span>
						</div>
					</div>
				</div>
			),
		}, {
			title: '记录移除情况',
			dataIndex: 'title',
			width: 100,
			render: (text, record) => (
				<React.Fragment>
					{
						text === 1 ? (
							<React.Fragment>
								<p className="circle-item">已移除</p>
							</React.Fragment>

						) : (
							<React.Fragment>
								<p className="no-attention">未移除</p>
							</React.Fragment>
						)
					}
				</React.Fragment>
			),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="CREATE_TIME" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'createTime',
			width: 90,
		}, {
			title: '操作',
			width: 55,
			unNormal: true,
			className: 'tAlignCenter_important',
			render: (text, row, index) => (
				<Attentions
					text={text}
					row={row}
					single
					onClick={onRefresh}
					api={row.isAttention ? unFollowSingle : followSingle}
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
			registerModalVisible: false,
			rowObj: {},
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
			readStatus({ idList: [id] }).then((res) => {
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
		const { selectedRowKeys, rowObj } = this.state;
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
					rowKey={record => record.id}
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
