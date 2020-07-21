import React, { Component } from 'react';
import { Pagination, Tooltip } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard, w } from '@/utils';
import { Ellipsis, Table } from '@/common';
import { chattelMortgageRes } from '../../test';
import { formatDateTime } from '@/utils/changeTime';
import { floatFormat } from '@/utils/format';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

// 抵押详情
const MortgageDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 80 }}>抵押物名称</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content text-ellipsis">
					{
						rowContent.pawnName && rowContent.pawnName.length > 10
							? (
								<Tooltip placement="topLeft" title={rowContent.pawnName}>
									<p>{`${rowContent.pawnName.substr(0, 10)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.pawnName || '-'}</p>
					}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.regNum || '-'}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>担保债权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.amount && w(floatFormat(rowContent.amount.toFixed(2)), { suffix: ' 元' })}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 130 }}>债务人履行债务的期限</span>
				<span className="list list-title-colon">:</span>
			</li>
			<li>
				<span className="list list-content" style={{ maxWidth: 'none' }}>{rowContent.term || '-'}</span>
			</li>
		</div>
	</React.Fragment>
);

// 登记详情
const RegisterDetail = (text, rowContent) => {
	let status;
	if (rowContent.status === 0) {
		status = '无效';
	} else if (rowContent.status === 1) {
		status = '有效';
	} else {
		status = '-';
	}
	return (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content text-ellipsis">
						{status}
					</span>
				</li>
				{
					status === '无效' ? [
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销原因</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{rowContent.cancelReason }</span>
						</li>,
						<li>
							<span className="list list-title align-justify" style={{ width: 'auto' }}>注销时间</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{formatDateTime(rowContent.cancelDate, 'onlyYear') || '-'}</span>
						</li>,
					] : null
				}
			</div>
		</React.Fragment>
	);
};

const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>登记日期</span>,
		dataIndex: 'regDate',
		width: 110,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '抵押物所有人',
		dataIndex: 'owner',
		width: 190,
		render: (text, row) => (
			<Ellipsis content={text} tooltip width={170} url={row.ownerId ? `/#/business/debtor/detail?id=${row.ownerId}` : ''} />
		),
	}, {
		title: '抵押权人',
		dataIndex: 'people',
		width: 190,
		render: (text, row) => (
			<Ellipsis content={text} tooltip width={170} url={row.peopleId ? `/#/business/debtor/detail?id=${row.peopleId}` : ''} />
		),
	}, {
		title: '抵押详情',
		width: 250,
		render: MortgageDetail,
	}, {
		title: '登记状态',
		width: 110,
		render: RegisterDetail,
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
		width: 110,
		render: text => timeStandard(text) || '-',
	}, {
		title: '操作',
		width: 55,
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

class ChattelMortgage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: chattelMortgageRes.data.list,
		});
	}

	onPageChange = () => {

	};

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


	render() {
		const {
			id, title, total,
		} = this.props;
		const { dataSource } = this.state;
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-headerLine" />
				<div className="messageDetail-table-container">
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
							/>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}
export default ChattelMortgage;
