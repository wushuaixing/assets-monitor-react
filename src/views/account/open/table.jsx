import React from 'react';
import { Table, Button } from '@/common';
import './index.scss';

const nextOrgcolumns = (props) => {
	return [
		{
			title: '序号',
			dataIndex: 'title',
			render: value => <span>{value}</span>,
		},
		{
			title: '机构名称',
			dataIndex: 'orgName',
			render: value => <span>{value}</span>,
		},
		{
			title: '层级',
			dataIndex: 'level',
			render: value => <span>{value}</span>,
		},
		{
			title: '已监控债务人数/可监控数',
			dataIndex: 'count',
			render: value => <span>{value}</span>,
		},
		{
			title: '已用查询次数/授权次数',
			dataIndex: 'useCount',
			render: value => <span>{value}</span>,
		},
		{
			title: '操作',
			dataIndex: 'oper',
			render: value => <span>{value}</span>,
		},
	];
};

const currentOrgcolumns = (props) => {
	return [
		{
			title: '序号',
			dataIndex: 'title',
			render: value => <span>{value}</span>,
		},
		{
			title: '姓名',
			dataIndex: 'orgName',
			render: value => <span>{value}</span>,
		},
		{
			title: '账号',
			dataIndex: 'level',
			render: value => <span>{value}</span>,
		},
		{
			title: '上次登录时间',
			dataIndex: 'count',
			render: value => <span>{value}</span>,
		},
		{
			title: '操作',
			dataIndex: 'useCount',
			render: value => <span>{value}</span>,
		},
		{
			title: '操作',
			dataIndex: 'oper',
			render: value => <span>{value}</span>,
		},
	];
};

class OrgTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="account-table">
				<div className="account-table-top" />
				<div className="account-table-content">
					<div className="account-table-content-title">第一虚拟代理机构</div>
					<div className="account-table-content-line" />
				</div>
				{/* 下级机构列表 */}
				<div className="account-table-data">
					<div>
						<div className="account-table-data-title">下级机构列表</div>
						<Button>添加下级机构</Button>
					</div>
					<Table
						columns={nextOrgcolumns(this.props)}
					/>
				</div>
				{/* 当前机构账号 */}
				<div>
					<Table
						columns={currentOrgcolumns(this.props)}
					/>
				</div>
			</div>
		);
	}
}
export default OrgTable;
