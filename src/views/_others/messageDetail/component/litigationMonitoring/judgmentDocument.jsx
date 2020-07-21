import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Table, Ellipsis } from '@/common';
import { judgmentDocumentRes } from '../../test';
import { partyInfo } from '@/views/_common';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

/* 文书信息 */
const documentInfo = (value, row) => {
	const {
		caseReason, caseType, gmtJudgment, title, url,
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
				<span className="list list-content">{caseType || '-'}</span>
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
		title: <span style={{ paddingLeft: 11 }}>文书信息</span>,
		dataIndex: 'associatedInfo1',
		width: 350,
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
				api={row.isAttention ? unFollowSingle : followSingle}
				index={index}
			/>
		),
	}];

class JudgmentDocument extends Component {
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
			dataSource: judgmentDocumentRes.data.list,
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

export default JudgmentDocument;
