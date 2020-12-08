import React from 'react';
import { Modal } from 'antd';
import Header from './header';
import SearchTree from './tree';
import OrgTable from './table';
import AddOrgModal from '../modal/addOrgModal';
import EditOrgModal from '../modal/editOrgModal';
import AddAccountModal from '../modal/addAccountModal';
import EditAccountModal from '../modal/editAccountModal';
import './index.scss';

const { confirm } = Modal;

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			orgData: '',
			accountData: '',
			addOrgVisible: false, // 添加机构弹窗显示控制
			editOrgVisible: false, // 编辑机构弹窗显示控制
			addAccountVisible: false, // 添加账号弹窗显示控制
			editAccountVisible: false, // 编辑账号弹窗显示控制
		};
	}

	componentDidMount() {
	}

	warningModal = ([title, content, okText, cancelText]) => {
		confirm({
			className: 'warning-modal',
			title,
			content,
			okText: okText || '确定',
			cancelText,
			onOk() {
				// console.log('确定');
			},
			onCancel() {},
		});
	};


	// 机构添加
	// 手动添加机构
	handleAddOrg = () => {
		this.setState({
			addOrgVisible: true,
		});
	};

	// 关闭添加机构弹窗
	handleCloseAddOrg = () => {
		this.setState({
			addOrgVisible: false,
		});
	};

	// 机构编辑
	// 手动打开编辑机构弹窗
	handleOpenEditOrg = (orgData) => {
		console.log('handleEditOrg');
		this.setState({
			editOrgVisible: true,
			orgData,
		});
	};

	// 手动关闭编辑机构弹窗
	handleCloseEditOrg = () => {
		this.setState({
			editOrgVisible: false,
		});
	};

	// 账户
	// 手动打开添加账户弹窗
	handleOpenAddAccount = () => {
		this.setState({
			addAccountVisible: true,
		});
	};

	// 手动关闭添加账户弹窗
	handleCloseAddAccount = () => {
		this.setState({
			addAccountVisible: false,
		});
	};

	// 账户
	// 手动打开编辑账户弹窗
	handleOpenEditAccount = (data) => {
		this.setState({
			editAccountVisible: true,
			accountData: data,
		});
	};

	// 手动关闭编辑账户弹窗
	handleCloseEditAccount = () => {
		this.setState({
			editAccountVisible: false,
			accountData: '',
		});
	};

	render() {
		const {
			addOrgVisible, editOrgVisible, addAccountVisible, editAccountVisible, orgData, accountData,
		} = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="account-content">
					{/* 机构管理树 */}
					<SearchTree
						handleAddOrg={this.handleAddOrg} // 添加机构
						warningModal={this.warningModal} // 警告弹窗
						handleOpenEditOrg={this.handleOpenEditOrg} // 编辑机构
					/>
					{/* 机构表格 */}
					<OrgTable
						editOrgVisible={editOrgVisible}
						handleAddOrg={this.handleAddOrg}
						warningModal={this.warningModal} // 警告弹窗
						handleOpenEditOrg={this.handleOpenEditOrg} // 打开编辑机构弹窗
						handleCloseEditOrg={this.handleCloseEditOrg} // 关闭编辑机构弹窗
						handleOpenAddAccount={this.handleOpenAddAccount} // 打开添加账户弹窗
						handleCloseAddAccount={this.handleCloseAddAccount} // 关闭添加账户弹窗
						handleOpenEditAccount={this.handleOpenEditAccount} // 打开编辑账户弹窗
						handleCloseEditAccount={this.handleCloseEditAccount} // 关闭编辑账户弹窗
					/>
				</div>
				{/* 添加机构弹窗 */}
				<AddOrgModal
					addOrgVisible={addOrgVisible}
					handleCloseAddOrg={this.handleCloseAddOrg}
				/>
				{/* 编辑机构弹窗 */}
				<EditOrgModal
					orgData={orgData}
					editOrgVisible={editOrgVisible}
					handleCloseEditOrg={this.handleCloseEditOrg}
				/>
				{/* 添加账户弹窗 */}
				<AddAccountModal
					addAccountVisible={addAccountVisible}
					handleCloseAddAccount={this.handleCloseAddAccount}
				/>
				{/* 编辑账号弹窗 */}
				<EditAccountModal
					accountData={accountData}
					editAccountVisible={editAccountVisible}
					handleCloseEditAccount={this.handleCloseEditAccount}
				/>
			</React.Fragment>
		);
	}
}

export default Open;
