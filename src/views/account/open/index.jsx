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

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			addOrgVisible: false, // 添加机构弹窗显示控制
			editOrgVisible: false, // 编辑机构弹窗显示控制
			addAccountVisible: false, // 添加账号弹窗显示控制
			editAccountVisible: false, // 编辑账号弹窗显示控制
		};
	}

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
	handleOpenEditOrg = () => {
		console.log('handleEditOrg');
		this.setState({
			editOrgVisible: true,
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
	handleOpenEditAccount = () => {
		this.setState({
			editAccountVisible: true,
		});
	};

	// 手动关闭编辑账户弹窗
	handleCloseEditAccount = () => {
		this.setState({
			editAccountVisible: false,
		});
	};

	warningModal = ([title, content, okText, cancelText]) => {
		Modal.warning({
			title,
			content,
			okText: okText || '确定',
			cancelText,
		});
	};

	render() {
		const {
			addOrgVisible, editOrgVisible, addAccountVisible, editAccountVisible,
		} = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="account-content">
					{/* 机构管理树 */}
					<SearchTree
						handleAddOrg={this.handleAddOrg}
						warningModal={this.warningModal}
						handleOpenEditOrg={this.handleOpenEditOrg}
					/>
					{/* 机构表格 */}
					<OrgTable
						editOrgVisible={editOrgVisible}
						handleAddOrg={this.handleAddOrg}
						warningModal={this.warningModal}
						handleOpenEditOrg={this.handleOpenEditOrg}
						handleCloseEditOrg={this.handleCloseEditOrg}
						handleOpenAddAccount={this.handleOpenAddAccount}
						handleCloseAddAccount={this.handleCloseAddAccount}
						handleOpenEditAccount={this.handleOpenEditAccount}
					/>
				</div>
				{/* 添加机构弹窗 */}
				<AddOrgModal addOrgVisible={addOrgVisible} handleCloseAddOrg={this.handleCloseAddOrg} />
				{/* 编辑机构弹窗 */}
				<EditOrgModal editOrgVisible={editOrgVisible} handleCloseEditOrg={this.handleCloseEditOrg} />
				{/* 添加账户弹窗 */}
				<AddAccountModal addAccountVisible={addAccountVisible} handleCloseAddAccount={this.handleCloseAddAccount} />
				{/* 编辑账号弹窗 */}
				<EditAccountModal editAccountVisible={editAccountVisible} handleCloseEditAccount={this.handleCloseEditAccount} />
			</React.Fragment>
		);
	}
}

export default Open;
