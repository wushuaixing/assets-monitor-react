import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table } from '@/common';
import { pledgeRes } from '../../test';
import { Result } from '@/views/asset-excavate/land-data/table/common';
import { partyInfo } from '@/views/_common';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';


// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>登记日期</span>,
		dataIndex: 'startTime',
		width: 110,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '土地使用权人',
		dataIndex: 'parties',
		render: (text, row) => partyInfo(text, row, false, false, 223),
	}, {
		title: '项目信息',
		dataIndex: 'title',
		render: Result.InfoTransferProject,
	}, {
		title: '土地信息',
		dataIndex: 'title',
		width: 190,
		render: Result.InfoMortgageLand,
	}, {
		title: '抵押信息',
		dataIndex: 'title',
		width: 180,
		render: Result.InfoMortgage,
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
		width: 103,
		render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'),
	}, {
		title: '操作',
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

class Pledge extends Component {
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
			dataSource: pledgeRes.data.list,
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

export default Pledge;
