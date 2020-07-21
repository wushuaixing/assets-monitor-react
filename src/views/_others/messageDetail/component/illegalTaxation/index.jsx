import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { Table } from '@/common';
import { illegalTaxationRes } from '../../test';
import { partyInfo } from '@/views/_common';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>发布日期</span>,
		dataIndex: 'publishDate',
		width: 113,
		render: (text, record) => ReadStatus(timeStandard(text || '-'), record),
	}, {
		title: '当事人',
		dataIndex: 'parties',
		width: 300,
		render: partyInfo,
	},
	{
		title: '案件性质',
		dataIndex: 'caseNature',
		render: text => text || '-',
	}, {
		title: '源链接',
		dataIndex: 'url',
		className: 'tAlignCenter_important',
		width: 75,
		render: (text, record) => (record.url ? linkDom(record.url, ' ', '', 'yc-list-link') : '-'),
	}, {
		title: global.Table_CreateTime_Text ,
		dataIndex: 'gmtCreate',
		width: 90,
		render: value => timeStandard(value),
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

class IllegalTaxation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: illegalTaxationRes.data.list,
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
export default IllegalTaxation;
