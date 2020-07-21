import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Ellipsis, Table } from '@/common';
import { equityPledgeRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

// 出质详情
const PledgeDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 72 }}>股权标的企业</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis content={rowContent.companyName} tooltip width={250} />
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.regNumber || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>出质股权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.equityAmount || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>状 态</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.state === 1 ? '无效' : '有效'}</span>
			</li>
		</div>
	</React.Fragment>
);


const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>登记日期</span>,
		dataIndex: 'regDate',
		width: 103,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '出质人',
		dataIndex: 'pledgorList',
		width: 250,
		render: (text, row) => row.pledgorList && row.pledgorList.length > 0 && row.pledgorList.map(item => (
			<Ellipsis content={item.pledgor || '-'} url={item.pledgorId ? `/#/business/debtor/detail?id=${item.pledgorId}` : ''} tooltip width={230} />
		)),
	}, {
		title: '质权人',
		dataIndex: 'pledgeeList',
		width: 250,
		render: (text, row) => row.pledgeeList && row.pledgeeList.length > 0 && row.pledgeeList.map(item => (
			<Ellipsis content={item.pledgee || '-'} url={item.pledgeeId ? `/#/business/debtor/detail?id=${item.pledgeeId}` : ''} tooltip width={230} />
		)),
	}, {
		title: '出质详情',
		render: PledgeDetail,
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
		className: 'tAlignCenter_important',
		width: 93,
		render: text => timeStandard(text),
	}, {
		title: '操作',
		unNormal: true,
		width: 60,
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

class EquityPledge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: equityPledgeRes.data.list,
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
export default EquityPledge;
