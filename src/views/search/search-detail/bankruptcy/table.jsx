import React from 'react';
import { Form, Tooltip } from 'antd';
import { Table } from '@/common';
import { formatDateTime } from '@/utils/changeTime';

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { dataList, Sort, SortTime } = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						发布日期
						{Sort === undefined && <span className="sort th-sort-default" />}
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'publishDate',
				key: 'publishDate',
				width: 120,
				render(text, row) {
					return (
						<div className="table-column">
							{formatDateTime(row.publishDate, 'onlyYear') || '-'}
							{/* {row.publishDate || '-'} */}
						</div>
					);
				},
			},
			{
				title: '相关企业',
				dataIndex: 'brcompanyname',
				key: 'brcompanyname',
				width: 250,
				render(text) {
					return (
						<div>
							{/* <a href={row.url} target="_blank" rel="noopener noreferrer" className="yc-td-header" dangerouslySetInnerHTML={{ __html: row.title }} />
							<div dangerouslySetInnerHTML={{ __html: row.hl }} /> */}
							{/* {row.brcompanyname || '-'} */}
							{
									text && text.length > 18
										? (
											<Tooltip placement="topLeft" title={text}>
												<p>{`${text.substr(0, 18)}...`}</p>
											</Tooltip>
										)
										: <p>{text || '-'}</p>
								}
						</div>
					);
				},
			}, {
				title: '受理法院',
				dataIndex: 'court',
				key: 'court',
				width: 250,
				render(text, row) {
					return (
						<div className="table-column">
							{row.court || '-'}
						</div>
					);
				},
			}, {
				title: '标题',
				dataIndex: 'title',
				key: 'title',
				// width: 360,
				render(text, row) {
					return (
						<div className="yc-table-text-link">
							<a href={row.url} target="_blank" rel="noopener noreferrer">
								{
									text && text.length > 40
										? (
											<Tooltip placement="topLeft" title={text}>
												<p>{`${text.substr(0, 40)}...`}</p>
											</Tooltip>
										)
										: <p>{text || '-'}</p>
								}
							</a>
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
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
						// if (!record.children) {
						// 	const w = window.open('about:blank');
						// 	w.location.href = '#/monitor';
						// }
					}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
