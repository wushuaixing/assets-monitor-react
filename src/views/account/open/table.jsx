import React from 'react';
import { Table, Button } from '@/common';
import './index.scss';

const deleteOrgTitle = row => (
	<span>
		确认删除机构(
		<span className="ant-confirm-title-point">{row.orgName}</span>
		)？
	</span>
);

const deleteAccountTitle = row => (
	<span>
		确认删除（
		<span className="ant-confirm-title-point">{row.orgName}</span>
		）的账号？
	</span>
);

const nextOrgcolumns = (props) => {
	const {
		isTop, handleOpenEditOrg, warningModal, switchOrg,
	} = props;
	// console.log('orgProps ===', props);
	return [
		{
			title: '序号',
			width: 50,
			render: (value, row, index) => <span>{index + 1}</span>,
		},
		{
			title: '机构名称',
			dataIndex: 'orgName',
			render: (value, row) => <span className="switch-org" onClick={() => switchOrg(row.num)}>{value}</span>,
		},
		{
			title: '层级',
			dataIndex: 'level',
			width: 74,
			render: value => <span>{value}</span>,
		},
		{
			title: `${isTop ? '已监控债务人数/可监控数' : '累计监控债务人数'}`,
			dataIndex: 'monitorNumber',
			width: 170,
			render: (value, row) => <span>{`${isTop ? `${value}/${row.allMonitorNumber}` : value}`}</span>,
		},
		{
			title: `${isTop ? '已用查询次数/授权次数' : '累计查询次数'}`,
			dataIndex: 'searchNumber',
			width: 170,
			render: (value, row) => <span>{`${isTop ? `${value}/${row.allSearchNumber}` : value}`}</span>,
		},
		{
			title: '操作',
			width: 120,
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={() => handleOpenEditOrg({ ...row })}>编辑</span>
					<span className="divider" />
					<span
						className="yc-table-text-link"
						onClick={() => {
							if (row.id !== 1) {
								return warningModal([row, deleteOrgTitle(row), '一经删除，无法恢复', '确定', '取消', '', 'deleteOrg']);
							}
							return warningModal([row, '无法删除该机构', '该机构存在下级机构，请在删除完下级机构后重试', '我知道了', '', true, 'deleteOrg']);
						}}
					>
						删除
					</span>
				</div>
			),
		},
	];
};

const currentOrgcolumns = (props) => {
	const { handleOpenEditAccount, warningModal } = props;
	const resetTitle = (
		<span> 确认重置密码？</span>
	);
	return [
		{
			title: '序号',
			width: 100,
			render: (value, row, index) => <span>{index + 1}</span>,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			width: 120,
			render: value => <span>{value}</span>,
		},
		{
			title: '账号',
			dataIndex: 'mobile',
			width: 170,
			render: value => <span>{value}</span>,
		},
		{
			title: '上次登录时间',
			dataIndex: 'lastLoginDateTime',
			width: 160,
			render: value => <span>{value}</span>,
		},
		{
			title: '操作',
			width: 140,
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={() => handleOpenEditAccount({ ...row })}>编辑</span>
					<span className="divider" />
					<span className="yc-table-text-link" onClick={() => warningModal([row, resetTitle, '点击确定，密码将重置为当前日期', '确定', '取消', 'resetPassword'])}>重置密码</span>
					<span className="divider" />
					<span
						className="yc-table-text-link"
						onClick={() => warningModal([row, deleteAccountTitle(row), '一经删除，无法恢复', '确定', '取消', 'deleteAccount'])}
					>
						删除
					</span>
				</div>
			),
		},
	];
};

class OrgTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
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
		const {
			switchOrg, superiorOrg, nextOrgDataSource, accountDataSource,
		} = this.props;

		return (
			<div className="account-table">
				<div className="account-table-top" />
				<div className="account-table-content">
					<div className="account-table-content-title">
						<div className="account-table-content-title-main">第一虚拟代理机构</div>
						<div className="account-table-content-title-sub">
							上级机构代理：
							{
								superiorOrg ? <span className="account-table-content-title-sub-org" onClick={() => switchOrg(122)}>{superiorOrg}</span> : '--'
							}
						</div>
					</div>
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
						className="org-table"
						pagination={false}
						scroll={{ y: 220 }}
						dataSource={nextOrgDataSource}
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
						className="account-open-table"
						scroll={{ y: 220 }}
						pagination={false}
						columns={currentOrgcolumns(this.props)}
						dataSource={accountDataSource}
					/>
				</div>
			</div>
		);
	}
}
export default OrgTable;
