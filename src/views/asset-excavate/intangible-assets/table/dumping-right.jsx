import React, { Component, Fragment } from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Table, SelectedNum } from '@/common';
import { Dump } from '@/utils/api/monitor-info/intangible';

const status = {
	注销: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	撤销: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	遗失: {
		reasonName: '遗失原因',
		dateName: '遗失时间',
	},
};

// 获取表格配置
const columns = (props) => {
	const { normal, onRefresh, noSort } = props;
	const { onSortChange, sortField, sortOrder } = props;
	const sort = { sortField, sortOrder };

	// 含操作等...
	const defaultColumns = [
		{
			title: (noSort ? <span style={{ paddingLeft: 11 }}>发证日期</span>
				: <SortVessel field="CHANGE_TIME" onClick={onSortChange} style={{ paddingLeft: 11 }} {...sort}>发证日期</SortVessel>),
			dataIndex: 'gmtIssueTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text) || '--', record),
		}, {
			title: '持证单位',
			dataIndex: 'companyName',
			width: 200,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '许可证编号',
			width: 200,
			dataIndex: 'licenseNumber',
			render: (text, row) => (text ? (<a href={row.url} target="_blank" rel="noopener noreferrer">{text}</a>) : '--'),
		}, {
			title: '权证信息',
			width: 260,
			dataIndex: 'industry',
			render: (text, row) => (
				<div className="table-column">
					<div style={{ display: 'inline-block', float: 'left' }}>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>行业分类:</span>
							<span>
								{text && text.length > 12 ? (<Tooltip placement="top" title={text}>{`${text.substr(0, 12)}...`}</Tooltip>) : <span>{text || '-'}</span>}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>有效期:</span>
							<span style={{ display: 'inline-block' }}>
								{`${row.gmtValidityPeriodStart ? row.gmtValidityPeriodStart : '--'}至${row.gmtValidityPeriodEnd ? row.gmtValidityPeriodEnd : '--'}` }
							</span>
						</div>
					</div>
				</div>
			),
		}, {
			title: '当前状态',
			width: 260,
			dataIndex: 'status',
			render: (text, row) => (text ? (
				<div>
					<span>{text}</span>
					{
text !== '正常' && (
<React.Fragment>
	<div>
		<span className="yc-public-remark" style={{ marginRight: '6px' }}>{`${status[text].reasonName}:`}</span>
		<span>{row.reason || '--'}</span>
	</div>
	<div>
		<span className="yc-public-remark" style={{ marginRight: '6px' }}>{`${status[text].dateName}:`}</span>
		<span>{row.gmtIssueTime || '--'}</span>
	</div>
</React.Fragment>
)
}
				</div>
			) : '--'),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtModified',
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
					api={row.isAttention ? Dump.unAttention : Dump.attention}
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
			Dump.read({ id }).then((res) => {
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
