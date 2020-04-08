import React from 'react';
import { Table } from '@/common';

export default class associatedBusiness extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '业务编号',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				width: 264,
				render: text => (
					<p>
						{text || '-'}
					</p>
				),
			}, {
				title: '债务人角色',
				dataIndex: 'role',
				key: 'role',
				width: 230,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '负责人/机构',
				dataIndex: 'orgName',
				key: 'orgName',
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '操作',
				key: 'operation',
				dataIndex: 'operation',
				render(text, row) {
					return (
						<div
							className="yc-table-text-link"
							onClick={() => {
								const w = window.open('about:blank');
								w.location.href = `#/business/detail?id=${row.businessId}`;
							}
						}
						>
						查看
						</div>
					);
				},
			}],
		};
	}

	render() {
		const { columns } = this.state;
		const { dataSource } = this.props;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">关联业务列表</span>
				</div>
				<div className="overview-container-content" style={{ padding: '0 20px' }}>
					{/* {dataSource && dataSource.length > 0 ? ( */}
					<Table
						scroll={dataSource.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						className="table"
					/>
					{/* ) : null} */}
				</div>
			</div>
		);
	}
}
