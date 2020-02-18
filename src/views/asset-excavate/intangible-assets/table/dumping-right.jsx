import React, { Component, Fragment } from 'react';
import { Pagination,Tooltip } from 'antd';
import { ReadStatus, Attentions, SortVessel } from '@/common/table';
import { linkDetail, timeStandard } from '@/utils';
import { Table, Ellipsis, SelectedNum } from '@/common';
import { Copyright } from '@/utils/api/monitor-info/intangible';


const status = {
	1: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	2: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	3: {
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
			dataIndex: 'changeTime',
			width: 113,
			render: (text, record) => ReadStatus(timeStandard(text) || '--', record),
		}, {
			title: '持证单位',
			dataIndex: 'obligorName',
			width: 150,
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '许可证编号',
			width: 200,
			dataIndex: 'changeItem',
			render: (text, row) => (text ? linkDetail(row.obligorId, text) : '--'),
		}, {
			title: '权证信息',
			width: 260,
			dataIndex: 'contentBefore',
			render: (text, row) => (
				<div className="table-column">
					<div style={{ display: 'inline-block', float: 'left' }}>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>行业分类:</span>
							<span>
								{text && text.length > 12 ? (<Tooltip placement="topLeft" title={text}><p>{`${text.substr(0, 12)}...`}</p></Tooltip>) : <p>{text || '-'}</p>}
							</span>
						</div>
						<div>
							<span className="yc-public-remark" style={{ marginRight: '6px' }}>有效期:</span>
							<p style={{ display: 'inline-block' }}>
								{row.obligorNumber || '-'}
							</p>
						</div>
					</div>
				</div>
			),
		}, {
			title: '当前状态',
			width: 260,
			dataIndex: 'contentAfter',
			render: (text, row) => (text ? (
				<div>
					<span>注销</span>
					<div>
						<span className="status-reason">{`${status[1].reasonName}:`}</span>
						<span className="status-date">
							{
                        text && text.length > 12 ? (<Tooltip placement="topLeft" title={text}><p>{`${text.substr(0, 12)}...`}</p></Tooltip>) : <p>{text || '-'}</p>
                    }
						</span>
					</div>
				</div>
			) : '--'),
		}, {
			title: (noSort ? global.Table_CreateTime_Text
				: <SortVessel field="GMT_CREATE" onClick={onSortChange} {...sort}>{global.Table_CreateTime_Text}</SortVessel>),
			dataIndex: 'gmtCreate',
			width: 90,
			render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '--'),
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
					api={row.isAttention ? Copyright.unAttention : Copyright.attention}
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
            Copyright.read({ id }).then((res) => {
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
