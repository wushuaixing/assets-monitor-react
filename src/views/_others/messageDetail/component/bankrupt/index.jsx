import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { Table } from '@/common';
import { bankruptRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const columns = (onRefresh, openRegisterModal) => [
	{
		title: '发布日期',
		dataIndex: 'publishDate',
		width: 115,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '企业',
		dataIndex: 'obligorName',
		width: 200,
		render: (text, row) => (text ? linkDom(`/#/business/debtor/detail?id=${row.obligorId}`, text) : '-'),
	}, {
		title: '起诉法院',
		dataIndex: 'court',
		width: 180,
		render: text => text || '-',
	}, {
		title: '标题',
		dataIndex: 'title',
		width: 506,
		render: (text, record) => {
			if (record.url) {
				return (
					<span>{text ? linkDom(record.url, text) : '-'}</span>
				);
			}
			return (
				<span className="click-link" onClick={() => openRegisterModal(record)}>{text || '-'}</span>
			);
		},
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'createTime',
		width: 90,
		render: value => <span>{value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'}</span>,
	}, {
		title: '操作',
		width: 55,
		unNormal: true,
		className: 'tAlignCenter_important',
		render: (text, row, index) => (
			<Attentions
				text={text}
				row={row}
				single
				onClick={onRefresh}
				api={row.isAttention ? unFollowSingle : followSingle}
				index={index}
			/>
		),
	}];

class Bankrupt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: bankruptRes.data.list,
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

	onPageChange = () => {

	};

	// 打开立案弹框
	openRegisterModal = () => {

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
						columns={columns(this.onRefresh, this.openRegisterModal)}
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
export default Bankrupt;
