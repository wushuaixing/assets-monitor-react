import React from 'react';
import { Table } from '@/common';

export default class BusinessRelated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '相关人名称',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				width: 264,
				render: text => (
					<p>
						{text || '-'}
					</p>
				),
			}, {
				title: '证件号/统一社会信用代码',
				dataIndex: 'role',
				key: 'role',
				width: 230,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'orgName',
				key: 'orgName',
			}, {
				title: '推送状态',
				key: 'operation',
				dataIndex: 'operation',
				render() {
					return <div className="yc-table-text-link">查看</div>;
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
					{dataSource && dataSource.length > 0 ? (
						<Table
							scroll={dataSource.length > 8 ? { y: 440 } : {}}
							columns={columns}
							dataSource={dataSource}
							pagination={false}
							className="table"
						/>
					) : null}
				</div>
			</div>
		);
	}
}
