import React, { Component } from 'react';
import { Pagination } from 'antd';
import { ReadStatus, Attentions } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';
import { Table, Ellipsis } from '@/common';
import { miningRes } from '../../test';
import { floatFormat } from '@/utils/format';
import { followSingle, markRead, unFollowSingle } from '@/utils/api/message';

const certificateTypeStatus = {
	1: '采矿权',
	2: '探矿权',
	0: '未知',
};

// 获取表格配置
const columns = onRefresh => [
	{
		title: <span style={{ paddingLeft: 11 }}>发布日期</span> ,
		dataIndex: 'gmtPublishTime',
		width: 113,
		render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
	}, {
		title: '探/采矿权人',
		dataIndex: 'rightsHolder',
		width: 200,
		render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
	}, {
		title: '许可证编号',
		width: 200,
		dataIndex: 'licenseNumber',
		render: (text, row) => (text ? linkDom(row.url, text) : '-'),
	}, {
		title: '权证类型',
		width: 100,
		dataIndex: 'certificateType',
		render: text => (text !== '' ? certificateTypeStatus[text] : '-'),
	}, {
		title: '权证信息',
		width: 260,
		dataIndex: 'mineralSpecies',
		render: (text, row) => (
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>矿种</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{text || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>矿山名称</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content"><Ellipsis content={row.projectName || '-'} tooltip width={200} /></span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>面积</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{row.area ? `${floatFormat(row.area)} 平方米` : '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
					<span className="list list-title-colon">:</span>
					{
						row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
							<span className="list list-content">{`${row.gmtValidityPeriodStart} 至 ${row.gmtValidityPeriodEnd}` }</span>
						) : '-'
					}
				</li>
			</div>
		),
	}, {
		title: global.Table_CreateTime_Text,
		dataIndex: 'gmtCreate',
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

class Mining extends Component {
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
			dataSource: miningRes.data.list,
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

export default Mining;
