import React, { Component } from 'react';
import { Pagination } from 'antd';
import isBreak from 'img/business/status_shixin.png';
import beforeBreak from 'img/business/status_cengshixin.png';
import { ReadStatus, Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { Ellipsis, Table } from '@/common';
import { dishonestyRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const imgStyle = {
	position: 'absolute',
	right: 8,
	bottom: 5,
};

const columns = onRefresh => [
	{
		title: '发布日期',
		dataIndex: 'gmtPublishDate',
		width: 115,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '债务人',
		dataIndex: 'name',
		width: 200,
		render: (text, row = {}) => (
			<div style={{ position: 'relative' }}>
				<Ellipsis
					content={(text || '-') + (text.length <= 4 ? `（${row.number}）` : '')}
					tooltip
					width={160}
					url={`/#/business/debtor/detail?id=${row.obligorId}`}
				/>
				{row.status === 1 && <img style={imgStyle} src={isBreak} alt="" />}
				{row.status === 2 && <img style={imgStyle} src={beforeBreak} alt="" />}
			</div>
		),

	}, {
		title: '案件信息',
		dataIndex: 'caseCode',
		width: 250,
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>案号</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>执行法院</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={row.court || '-'} tooltip width={200} /></span>
				</li>
			</div>
		),
	}, {
		title: '失信信息',
		dataIndex: 'disruptType',
		width: 350,
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>失信行为具体情形</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>生效文书确定义务</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={row.duty || '-'} tooltip width={200} /></span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 100 }}>被执行人履行情况</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.performance || '-'}</span>
				</li>
			</div>
		),
	}, {
		title: '移除情况',
		dataIndex: 'removeStatus',
		width: 80,
		render: text => (text ? <p className="no-attention">已移除</p> : <p className="circle-item">未移除</p>),
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'updateTime',
		width: 90,
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

class Dishonesty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
		};
	}

	componentDidMount() {
		this.setState({
			dataSource: dishonestyRes.data.list,
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
export default Dishonesty;
