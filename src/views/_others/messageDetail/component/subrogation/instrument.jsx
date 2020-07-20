import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table, Ellipsis } from '@/common';
import { partyInfo } from '@/views/_common';
import { instrumentRes } from '../../test';
import message from '@/utils/api/message/message';

/* 文书信息 */
const documentInfo = (value, row) => {
	const {
		caseReason, caseType, gmtJudgment, title, url, isRestore,
	} = row;
	return (
		<div className="assets-info-content">
			<li>
				<Ellipsis content={title} line={2} tooltip url={url} />
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案由</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{caseReason || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案件类型</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{isRestore ? '执恢案件' : (caseType || '-')}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>判决日期</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{timeStandard(gmtJudgment)}</span>
			</li>
		</div>
	);
};
// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>发布日期</span>,
		dataIndex: 'gmtPublish',
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
		title: <span>文书信息</span>,
		dataIndex: 'associatedInfo1',
		width: 300,
		render: documentInfo,
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
				// api={row.isAttention ? Judgment.unAttention : Judgment.attention}
				index={index}
			/>
		),
	}];

class Instrument extends Component {
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
		this.setState({
			dataSource: instrumentRes.data.list,
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

export default Instrument;
