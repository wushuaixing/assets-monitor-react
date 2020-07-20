import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table } from '@/common';
import { partyInfo } from '@/views/_common';
import { subrogationRes } from '../../test';
import message from '@/utils/api/message/message';
import associationLink from '@/views/_common/association-link';


// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
		dataIndex: 'gmtRegister',
		width: 103,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '当事人',
		dataIndex: 'parties',
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
		title: '案件类型',
		render: (value, row) => {
			const { isRestore, caseType } = row;
			if (isRestore) return '执恢案件';
			if (caseType === 1) return '普通案件';
			if (caseType === 2) return '破产案件';
			if (caseType === 3) return '执行案件';
			if (caseType === 4) return '终本案件';
			return '-';
		},
	}, {
		title: '关联链接',
		dataIndex: 'associatedInfo',
		className: 'tAlignCenter_important min-width-80',
		render: (value, row) => associationLink(value, row, 'Trial'),
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
		width: 93,
		render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'),
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
					// api={row.isAttention ? Trial.unAttention : Trial.attention}
				index={index}
			/>
		),
	}];

class SubrogationRights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			current: 1,
			total: 0,
		};
	}

	componentDidMount() {
		console.log('message === ', message);
		// const requestApi = message[1].list();
		// requestApi().then((res) => {
		//
		// }).catch((err) => {
		// });
		console.log('subrogationRes === ', subrogationRes);
		this.setState({
			dataSource: subrogationRes.data.list,
		});
	}

	onRefresh = () => {

	};

	onPageChange = () => {

	};

	render() {
		const { dataSource, current, total } = this.state;
		console.log('SubrogationRights dataSource === ', dataSource);
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

export default SubrogationRights;
