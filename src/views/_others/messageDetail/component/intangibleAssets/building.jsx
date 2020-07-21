import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Ellipsis, Table } from '@/common';
import { buildingRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>发布日期</span>,
		dataIndex: 'issueTime',
		width: 113,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '持证单位',
		dataIndex: 'obligorName',
		width: 200,
		render: (text, row) => (
			<Ellipsis
				content={text || '-'}
				tooltip
				width={200}
				url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
			/>
		),
	}, {
		title: '证书编号',
		width: 200,
		dataIndex: 'certificateNumber',
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-content">{text || '-'}</span>
					{ row.gmtDeleted ? <span className="yc-case-reason text-ellipsis yc-case-reason__invalid">已失效</span> : ''}
				</li>
			</div>
		),
	}, {
		title: '资质信息',
		width: 400,
		dataIndex: 'qualificationName',
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>资质名称</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<Ellipsis content={row.qualificationName || '-'} tooltip width={380} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>资质类别</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.qualificationType || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>资质等级</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.qualificationLevel || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>有效期至</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.validityPeriod}</span>
				</li>
			</div>
		),
	}, {
		title: global.Table_CreateTime_Text,
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
				api={row.isAttention ? unFollowSingle : followSingle}
				index={index}
			/>
		),
	}];

class Building extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: buildingRes.data.list,
		});
	}

	// 表格变化，刷新表格
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	toRowClick = (record, index) => {
		const { id, isRead } = record;
		if (!isRead) {
			markRead({ id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	onPageChange = () => {

	};

	render() {
		const { dataSource, current, total } = this.state;
		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					columns={columns(this.onRefresh)}
					dataSource={dataSource}
					pagination={false}
					rowClassName={record => (record.isRead ? '' : 'yc-row-bold cursor-pointer')}
					onRowClick={this.toRowClick}
				/>
				{dataSource && dataSource.length > 5 && (
					<div className="yc-table-pagination">
						<Pagination
							showQuickJumper
							current={current || 1}
							total={total || 0}
							onChange={this.onPageChange}
							showTotal={totalCount => `共 ${totalCount} 条信息`}
						/>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Building;
