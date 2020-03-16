import React from 'react';
import { Spin, Table } from '@/common';

export default class associatedBusiness extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
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
			}, {
				title: '操作',
				key: 'operation',
				dataIndex: 'operation',
				render() {
					return <div className="yc-table-text-link">查看</div>;
				},
			}],
		};
	}

	render() {
		const { columns, loading } = this.state;
		const { dataSource } = this.props;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">关联业务列表</span>
				</div>
				<div className="overview-container-content" style={{ padding: '0 20px' }}>
					{dataSource && dataSource.length > 0 ? (
						<Spin visible={loading}>
							<Table
								scroll={dataSource.length > 8 ? { y: 440 } : {}}
								columns={columns}
								dataSource={dataSource}
								pagination={false}
								className="table"
							/>
						</Spin>
					) : null}
				</div>
			</div>
		);
	}
}
