import React from 'react';
import { Modal, message } from 'antd';
import {
	getOrgTree, getUserList, deleteOrg, resetPassword,
} from '@/utils/api/agency';
import Header from './header';
// eslint-disable-next-line import/no-cycle
import SearchTree from './tree';
import OrgTable from './table';
import AddOrgModal from '../modal/addOrgModal';
import EditOrgModal from '../modal/editOrgModal';
import AddAccountModal from '../modal/addAccountModal';
import EditAccountModal from '../modal/editAccountModal';
import './index.scss';

const { confirm } = Modal;
// 把树形机构的数据转换成一维数据结构，用以匹配机构名称
const dataList = [];

// 获取当前节点的父节点的id
export const getParentKey = (id, tree) => {
	let parentKey = 0;
	tree.forEach((item, i) => {
		const node = tree[i];
		if (Array.isArray(node.children) && node.children.length > 0) {
			if (node.children.some(it => it.id === id)) {
				parentKey = node.id;
			} else if (getParentKey(id, node.children)) {
				parentKey = getParentKey(id, node.children);
			}
		}
	});
	return parentKey;
};

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			orgTree: [],
			orgData: '',
			accountData: '',
			orgTopId: '', // 顶级机构
			currentOrgDetail: {}, // 当前机构信息
			nextOrgDataSource: [],
			accountDataSource: [],
			addOrgVisible: false, // 添加机构弹窗显示控制
			editOrgVisible: false, // 编辑机构弹窗显示控制
			addAccountVisible: false, // 添加账号弹窗显示控制
			editAccountVisible: false, // 编辑账号弹窗显示控制
		};
	}

	componentWillMount() {
		const { orgId } = this.state;
		const params = {
			orgIdList: orgId,
		};
		getOrgTree(params).then((res) => {
			const orgTreeArray = [];
			if (res.code === 200) {
				orgTreeArray.push(res.data);
				const newDetail = {
					id: res.data.id,
					name: res.data.name,
					parentName: '--',
				};
				this.onGetUserList(res.data.id);
				this.generateList([...orgTreeArray]);
				this.setState({
					orgTree: [...orgTreeArray],
					nextOrgDataSource: [...res.data.children],
					orgTopId: res.data.id,
					currentOrgDetail: { ...newDetail },
				});
			}
		}).catch();
	}

	componentDidMount() {
	}

	// 生成一维数组
	generateList = (data) => {
		data.forEach((item, i) => {
			const node = data[i];
			const { id, name, children } = node;
			dataList.push({ id, name, children });
			if (Array.isArray(node.children) && node.children.length > 0) {
				this.generateList(node.children);
			}
		});
	};

	// 获取用户列表
	onGetUserList = (id) => {
		getUserList({ id: parseInt(id, 10) }).then((res) => {
			if (res.code === 200) {
				this.setState({
					accountDataSource: res.data,
				});
			}
		}).catch();
	};

	// isShowCancel控制显示取消按钮
	warningModal = ([item, title, content, okText, cancelText, isShowCancel, type]) => {
		confirm({
			className: `warning-modal${isShowCancel ? ' hidden-cancel' : ''} `,
			title,
			content,
			okText: okText || '确定',
			cancelText,
			onOk() {
				// 重置密码
				if (type === 'resetPassword') {
					const params = {
						userId: item.id,
					};
					resetPassword({ ...params }).then((res) => {
						if (res.code === 200) {
							message.success('密码重置成功');
						} else {
							message.success(res.message || '密码重置失败');
						}
					}).catch();
				} else if (type === 'deleteAccount') { // 删除账号
					message.success('账户删除成功');
				} else if (type === 'deleteOrg') { // 删除机构
					if (isShowCancel) {
						return;
					}
					const params = {
						orgId: item.id,
					};
					deleteOrg({ ...params }).then((res) => {
						if (res.code === 200) {
							message.success('机构删除成功');
						} else {
							message.success(res.message || '机构删除失败');
						}
					}).catch();
				} else {
					message.success('操作成功');
				}
			},
			onCancel() {},
		});
	};


	// 机构添加
	// 手动添加机构
	handleAddOrg = (orgData) => {
		this.setState({
			addOrgVisible: true,
			orgData,
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
		console.log('orgData=== ', orgData);
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
	handleOpenEditAccount = (accountData) => {
		this.setState({
			editAccountVisible: true,
			accountData,
		});
	};

	// 手动关闭编辑账户弹窗
	handleCloseEditAccount = () => {
		this.setState({
			editAccountVisible: false,
			accountData: '',
		});
	};

	// 切换机构
	switchOrg = (orgId, list, currentName, parentName) => {
		const newDetail = {
			id: orgId,
			name: currentName,
			parentName: parentName || '--',
		};
		this.setState({
			nextOrgDataSource: list,
			currentOrgDetail: newDetail,
		});
		this.onGetUserList(orgId);

		// const start = new Date().getTime();
		// if (orgId) {
		// 	// const now = new Date().getTime();
		// 	// const latency = now - start;
		// 	const hide = message.loading('正在切换机构,请稍后...', 0);
		// 	setTimeout(() => {
		// 		window.location.reload(); // 实现页面重新加载/
		// 	}, 3000);
		// 	// 异步手动移除
		// 	setTimeout(hide, 3000);
		// }
	};


	render() {
		const {
			orgTopId, currentOrgDetail, addOrgVisible, editOrgVisible, addAccountVisible, editAccountVisible, orgData, accountData, nextOrgDataSource, accountDataSource, orgTree,
		} = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="account-content">
					{/* 机构管理树 */}
					<SearchTree
						orgTree={orgTree}
						orgTopId={orgTopId}
						dataList={dataList}
						currentOrgDetail={currentOrgDetail}
						switchOrg={this.switchOrg}
						handleAddOrg={this.handleAddOrg} // 添加机构
						warningModal={this.warningModal} // 警告弹窗
						handleOpenEditOrg={this.handleOpenEditOrg} // 编辑机构
					/>
					{/* 机构表格 */}
					<OrgTable
						isTop={currentOrgDetail.id === orgTopId} // 判断当前机构是否是顶级虚拟机构
						superiorOrg="风险机构"
						orgTree={orgTree}
						currentOrgDetail={currentOrgDetail}
						editOrgVisible={editOrgVisible}
						nextOrgDataSource={nextOrgDataSource} // 下级机构列表
						accountDataSource={accountDataSource} // 当前机构账户列表
						handleAddOrg={this.handleAddOrg}
						switchOrg={this.switchOrg} // 切换机构
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
				{
					addOrgVisible && (
						<AddOrgModal
							currentOrgDetail={currentOrgDetail}
							addOrgVisible={addOrgVisible}
							handleCloseAddOrg={this.handleCloseAddOrg}
						/>
					)
				}
				{/* 编辑机构弹窗 */}
				{
					editOrgVisible && (
						<EditOrgModal
							currentOrgDetail={currentOrgDetail}
							orgData={orgData}
							editOrgVisible={editOrgVisible}
							handleCloseEditOrg={this.handleCloseEditOrg}
						/>
					)
				}
				{/* 添加账户弹窗 */}
				{
					addAccountVisible && (
					<AddAccountModal
						currentOrgDetail={currentOrgDetail}
						addAccountVisible={addAccountVisible}
						handleCloseAddAccount={this.handleCloseAddAccount}
					/>
					)
				}
				{/* 编辑账号弹窗 */}
				{
					editAccountVisible && (
						<EditAccountModal
							currentOrgDetail={currentOrgDetail}
							accountData={accountData}
							editAccountVisible={editAccountVisible}
							onGetUserList={this.onGetUserList}
							handleCloseEditAccount={this.handleCloseEditAccount}
						/>
					)
				}
			</React.Fragment>
		);
	}
}

export default Open;
