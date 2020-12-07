import React from 'react';
import { Modal } from 'antd';
import Header from './header';
import SearchTree from './tree';
import OrgTable from './table';
import AddOrgModal from '../modal/addOrgModal';
import EditOrgModal from '../modal/editOrgModal';
import './index.scss';

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			addOrgVisible: false,
			editOrgVisible: false,
		};
	}

	// 手动添加机构
	handleAddOrg = () => {
		// console.log('index handleAddOrg');
		this.setState({
			addOrgVisible: true,
		});
	};

	// 手动编辑机构
	handleEditOrg = () => {
		console.log('handleEditOrg');
		this.setState({
			editOrgVisible: true,
		});
	};

	// 关闭添加机构弹窗
	handleCloseAddOrg = () => {
		this.setState({
			addOrgVisible: false,
		});
	};

	// 手动关闭编辑机构弹窗
	handleCloseEditOrg = () => {
		this.setState({
			editOrgVisible: false,
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
		const { addOrgVisible, editOrgVisible } = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="account-content">
					<SearchTree
						handleAddOrg={this.handleAddOrg}
						warningModal={this.warningModal}
						handleEditOrg={this.handleEditOrg}
					/>
					<OrgTable handleAddOrg={this.handleAddOrg} />
				</div>
				{/* 添加机构弹窗 */}
				<AddOrgModal addOrgVisible={addOrgVisible} handleCloseAddOrg={this.handleCloseAddOrg} />
				<EditOrgModal editOrgVisible={editOrgVisible} handleCloseEditOrg={this.handleCloseEditOrg} />
			</React.Fragment>
		);
	}
}

export default Open;
