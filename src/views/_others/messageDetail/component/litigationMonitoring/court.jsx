import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table } from '@/common';
import { courtRes } from '../../test';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';


// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>开庭日期</span>,
		dataIndex: 'gmtTrial',
		width: 103,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '当事人',
		dataIndex: 'parties',
		width: 300,
		render: partyInfo,
	}, {
		title: '法院',
		dataIndex: 'court',
		render: text => text || '-',
	}, {
		title: '案号',
		dataIndex: 'caseNumber',
		render: text => text || '-',
	}, {
		title: '案由',
		dataIndex: 'caseReason',
		className: 'min-width-80-normal',
		render: text => text || '-',
	}, {
		title: '关联信息',
		dataIndex: 'associatedInfo',
		className: 'tAlignCenter_important min-width-80',
		render: associationLink,
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
		width: 93,
		render: val => timeStandard(val),
	}, {
		title: '操作',
		unNormal: true,
		className: 'tAlignCenter_important',
		width: 60,
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

class Court extends Component {
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
			dataSource: courtRes.data.list,
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

export default Court;
