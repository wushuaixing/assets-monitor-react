import React from 'react';
import { Tooltip, Form } from 'antd';
import Link from '@/assets/img/icon/icon_link_normal.png';
import { Table } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import order from '@/assets/img/icon/icon_arrow.png';
import './style.scss';

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { Sort, dataList, SortTime } = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						发布日期
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'publishTime',
				key: 'publishTime',
				width: 100,
				render(text, row) {
					return (
						<div className="table-column">
							{formatDateTime(row.publishTime, 'onlyYear') || '-'}
						</div>
					);
				},
			},
			{
				title: '标题',
				dataIndex: 'title',
				key: 'title',
				width: 220,
				render(text, row) {
					return (
						<div className="table-column">
							{
								row.title && row.title.length > 30
									? (
										<Tooltip placement="topLeft" title={row.title}>
											<p>{`${row.title.substr(0, 30)}...`}</p>
										</Tooltip>
									)
									: <p>{row.title || '-'}</p>
							}
						</div>
					);
				},
			},
			{
				title: '案号',
				dataIndex: 'ah',
				key: 'ah',
				width: 240,
				render(text, row) {
					return (
						<div className="table-column">
							{row.ah || '-'}
						</div>
					);
				},
			},
			{
				title: '相关人员',
				dataIndex: 'appellors',
				key: 'appellors',
				width: 220,
				render(text, row) {
					return (
						<div className="table-column">
							{row.appellors || '-'}
						</div>
					);
				},
			},
			{
				title: '法院名称',
				dataIndex: 'court',
				key: 'court',
				width: 108,
				render(text, row) {
					return (
						<div className="table-column">
							{row.court || '-'}
						</div>
					);
				},
			},
			{
				title: '案由',
				dataIndex: 'reason',
				key: 'reason',
				width: 140,
				render(text, row) {
					return (
						<div className="table-column">
							{row.reason || '-'}
						</div>
					);
				},
			},
			{
				title: '案件类型',
				dataIndex: 'caseType',
				key: 'caseType',
				width: 78,
				render(text, row) {
					return (
						<div className="table-column">
							{row.caseType || '-'}
						</div>
					);
				},
			},
			{
				title: '链接',
				dataIndex: 'url',
				key: 'url',
				width: 54,
				render(text, row) {
					return (
						<div className="table-column">
							<a href={row.url} target="_blank" rel="noopener noreferrer"><img src={Link} alt="" /></a>
						</div>
					);
				},
			},
		];
		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns}
					pagination={false}
				/>
			</React.Fragment>
		);
	}
}

export default Form.create()(BusinessView);
