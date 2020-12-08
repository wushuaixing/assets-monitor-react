import React from 'react';
import { Table, Button } from '@/common';
import './index.scss';

const nextOrgcolumns = (props) => {
	const { handleOpenEditOrg, warningModal } = props;
	const titleNode = (
		<span>
			确认删除机构(
			<span>风险管理部</span>
			)？
		</span>
	);
	return [
		{
			title: '序号',
			dataIndex: 'num',
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
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={handleOpenEditOrg}>编辑</span>
					<span className="divider" />
					<span
						className="yc-table-text-link"
						onClick={() => warningModal([titleNode, '一经删除，无法恢复', '确定', '取消'])
					}
					>
						删除
					</span>
				</div>
			),
		},
	];
};

const currentOrgcolumns = (props) => {
	const { handleOpenEditAccount } = props;
	return [
		{
			title: '序号',
			dataIndex: 'num',
			render: value => <span>{value}</span>,
		},
		{
			title: '姓名',
			dataIndex: 'orgName',
			render: value => <span>{value}</span>,
		},
		{
			title: '账号',
			dataIndex: 'phone',
			render: value => <span>{value}</span>,
		},
		{
			title: '上次登录时间',
			dataIndex: 'lastTime',
			render: value => <span>{value}</span>,
		},
		{
			title: '操作',
			dataIndex: 'useCount',
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={handleOpenEditAccount}>编辑</span>
					<span className="divider" />
					<span className="yc-table-text-link" onClick={handleOpenEditAccount}>重置密码</span>
					<span className="divider" />
					<span className="yc-table-text-link" onClick={handleOpenEditAccount}>删除</span>
				</div>
			),
		},
	];
};

class OrgTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nextOrgData: [
				{
					num: 1,
					orgName: '资产保全部',
					level: '1级',
					count: '10/100',
					useCount: '11/100',
				},
				{
					num: 2,
					orgName: '风险监控部',
					level: '1级',
					count: '10/100',
					useCount: '11/100',
				},
				{
					num: 3,
					orgName: '授信评审部',
					level: '1级',
					count: '10/100',
					useCount: '11/100',
				},
			],
			currentOrgData: [
				{
					num: 1,
					orgName: '资产保全部',
					level: '1级',
					phone: '155663300',
					lastTime: '2020-10-11',
				},
				{
					num: 2,
					orgName: '资产保全部',
					level: '1级',
					phone: '155663300',
					lastTime: '2020-10-11',
				},
				{
					num: 3,
					orgName: '资产保全部',
					level: '1级',
					phone: '155663300',
					lastTime: '2020-10-11',
				},
			],
		};
	}

	handleAddNextOrg = () => {
		console.log('handleAddNextOrg');
		const { handleAddOrg } = this.props;
		handleAddOrg();
	};

	// 添加当前机构账号
	handleAddCurrentAccount = () => {
		const { handleOpenAddAccount } = this.props;
		handleOpenAddAccount();
	};

	render() {
		const { nextOrgData, currentOrgData } = this.state;

		return (
			<div className="account-table">
				<div className="account-table-top" />
				<div className="account-table-content">
					<div className="account-table-content-title">第一虚拟代理机构</div>
					<div className="account-table-content-line" />
				</div>
				{/* 下级机构列表 */}
				<div className="account-table-data">
					<div className="account-table-data-oper">
						<div className="account-table-data-oper-prefix" />
						<div className="account-table-data-oper-title">下级机构列表</div>
						<Button className="account-table-data-oper-add" onClick={this.handleAddNextOrg}>添加下级机构</Button>
					</div>
					<Table
						pagination={false}
						dataSource={nextOrgData}
						columns={nextOrgcolumns(this.props)}
					/>
				</div>
				{/* 当前机构账号 */}
				<div className="account-table-data" style={{ marginTop: 20 }}>
					<div className="account-table-data-oper">
						<div className="account-table-data-oper-prefix" />
						<div className="account-table-data-oper-title">当前机构账号</div>
						<Button className="account-table-data-oper-add" onClick={this.handleAddCurrentAccount}>添加账号</Button>
					</div>
					<Table
						pagination={false}
						columns={currentOrgcolumns(this.props)}
						dataSource={currentOrgData}
					/>
				</div>
			</div>
		);
	}
}
export default OrgTable;
