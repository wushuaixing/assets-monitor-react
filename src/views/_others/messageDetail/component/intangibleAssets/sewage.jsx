import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { Table, Ellipsis } from '@/common';
import { sewageRes } from '../../test';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const status = {
	1: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	2: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	3: {
		reasonName: '遗失原因',
		dateName: '遗失时间',
	},
};

function keyToVAlue(key) {
	if (key === '注销') {
		return 1;
	}
	if (key === '撤销') {
		return 2;
	}
	if (key === '遗失') {
		return 3;
	}
	return 0;
}


// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>发证日期</span>,
		dataIndex: 'gmtPublishTime',
		width: 113,
		render: (text, record) => ReadStatus(timeStandard(text, '未公开'), record),
	}, {
		title: '持证单位',
		dataIndex: 'companyName',
		width: 200,
		render: (text, row) => (
			<Ellipsis
				content={text || '-'}
				tooltip
				width={180}
				url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
			/>
		),
	}, {
		title: '许可证编号',
		width: 200,
		dataIndex: 'licenseNumber',
		render: (text, row) => (text ? linkDom(row.url, text) : '-'),
	}, {
		title: '权证信息',
		width: 260,
		dataIndex: 'industry',
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>行业分类</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
					<span className="list list-title-colon">:</span>
					{
						row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
							<span className="list list-content">{`${row.gmtValidityPeriodStart}至${row.gmtValidityPeriodEnd}` }</span>
						) : '-'
					}
				</li>
			</div>
		),
	}, {
		title: '当前状态',
		width: 280,
		dataIndex: 'status',
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-content">{text}</span>
				</li>
				{
					text !== '正常' ? (
						<Fragment>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToVAlue(text)].reasonName}</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.reason || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToVAlue(text)].dateName}</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.gmtIssueTime || '-'}</span>
							</li>
						</Fragment>
					) : null
				}
			</div>
		),
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtModified',
		width: 90,
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

class Sewage extends Component {
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
			dataSource: sewageRes.data.list,
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

export default Sewage;
