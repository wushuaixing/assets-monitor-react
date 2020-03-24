import React from 'react';
import { Table, Button } from '@/common';
import noData from '@/assets/img/business/noData.png';

export default class BusinessRelated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '相关人名称',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				render: text => (
					<p>
						{text || '-'}
					</p>
				),
			}, {
				title: '证件号/统一社会信用代码',
				dataIndex: 'role',
				key: 'role',
				width: 300,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'orgName',
				key: 'orgName',
				width: 250,
			}, {
				title: '推送状态',
				key: 'operation',
				dataIndex: 'operation',
				width: 200,
				render() {
					return <div className="yc-table-text-link">查看</div>;
				},
			}],
		};
	}

	render() {
		const { columns } = this.state;
		const { dataSource, loading } = this.props;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">关联业务列表</span>
				</div>
				{!loading ? (
					<div className="overview-container-content" style={{ padding: '0 20px' }}>
						{dataSource && dataSource.length > 0 ? (
							<Table
								scroll={dataSource.length > 8 ? { y: 440 } : {}}
								columns={columns}
								dataSource={dataSource}
								pagination={false}
								className="table"
							/>
					 ) : (
						<div>
							<table className="table table-striped treeTable">
								<tbody>
									<tr className="tr-table" style={{ textAlign: 'left' }}>
										<th style={{ width: 470, border: '0' }}>相关人名称</th>
										<th style={{ width: 300, border: '0' }}>证件号/统一社会信用代码</th>
										<th style={{ width: 250, border: '0' }}>角色</th>
										<th style={{ width: 200, border: '0' }}>推送状态</th>
									</tr>
								</tbody>
							</table>
							<div style={{ textAlign: 'center' }}>
								<img style={{ marginTop: '50px' }} src={noData} alt="" />
								<div>暂未导入相关人，建议去编辑添加相关人，以形成完整业务画像</div>
								<Button size="large" type="common" style={{ width: 160, height: 34, marginTop: 40 }} onClick={this.handleSubmit}>添加相关人</Button>
							</div>
						</div>
					 )}
					</div>
				) : null}
			</div>
		);
	}
}
