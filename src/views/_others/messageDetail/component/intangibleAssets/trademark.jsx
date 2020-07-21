import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';
import { Table } from '@/common';
import { trademarkRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const rightsTypeStatus = {
	0: '未知',
	1: '商标',
	2: '专利',
};

// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>公告日期</span>,
		dataIndex: 'noticeTime',
		width: 113,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '申请人/权利人',
		dataIndex: 'obligorName',
		width: 200,
		render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
	}, {
		title: '商标/专利名称',
		width: 200,
		dataIndex: 'rightsName',
		render: (text, row) => (text ? linkDom(row.url, text) : '-'),
	}, {
		title: '权利类型',
		width: 100,
		dataIndex: 'rightsType',
		render: text => (
			<span>{rightsTypeStatus[text]}</span>
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

class Trademark extends Component {
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
			dataSource: trademarkRes.data.list,
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

export default Trademark;
