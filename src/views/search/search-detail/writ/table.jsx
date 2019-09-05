import React from 'react';
import { Tooltip, Table, Form } from 'antd';
import Link from '@/assets/img/icon/icon_link_normal.png';


class BusinessView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{
					title: '发布时间',
					dataIndex: 'publishTime',
					key: 'publishTime',
					width: 100,
					render(text, row) {
						return (
							<div className="table-column">
								{row.publishTime || '-'}
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
			],
		};
	}

	render() {
		const { columns } = this.state;
		const { dataList } = this.props;

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
