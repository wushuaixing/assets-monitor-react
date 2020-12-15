import React from 'react';
import { Tree } from 'antd';
import { Icon, Input } from '@/common';
// eslint-disable-next-line import/no-cycle
import { getParentKey } from './index';
import './index.scss';

const { TreeNode } = Tree;

class SearchTree extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			expandedKeys: [],
			searchValue: '',
			autoExpandParent: true,
			orgTree: [],
			selectedKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { orgTree, currentOrgDetail } = this.props;
		if (JSON.stringify(orgTree) !== JSON.stringify(nextProps.orgTree)) {
			this.setState({
				orgTree: nextProps.orgTree,
				expandedKeys: `${nextProps.orgTree[0].id}`,
				selectedKeys: [`${nextProps.orgTree[0].id}`],
			});
		} else if (currentOrgDetail.id !== nextProps.currentOrgDetail.id) {
			this.handleSwitchSelect(nextProps.currentOrgDetail.id);
		}
	}

	// 当前id变化，选中节点在节点树里面也跟着变化
	handleSwitchSelect = (id) => {
		if (id) {
			this.setState({
				selectedKeys: [`${id}`],
				autoExpandParent: true,
			});
		}
	};

	// 输入框的变化
	onChangeInput = (value) => {
		const { orgTree, dataList } = this.props;
		const expandedKeys = dataList
			.map((item) => {
				if (item.name.indexOf(value) > -1) {
					return getParentKey(item.id, orgTree);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		const newExpandedKeys = expandedKeys.map(item => `${item}`);
		this.setState({
			expandedKeys: newExpandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
	};

	// 点击搜索按钮
	handleSearchOrg = () => {
		const { orgTree, dataList } = this.props;
		const { searchValue } = this.state;
		const expandedKeys = dataList
			.map((item) => {
				if (item.name.indexOf(searchValue) > -1) {
					return getParentKey(item.id, orgTree);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		const newExpandedKeys = expandedKeys.map(item => `${item}`);
		this.setState({
			expandedKeys: newExpandedKeys,
			autoExpandParent: true,
		});
	};

	// 展开函数
	onExpand = (expandedKeys) => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	// 手动添加机构
	handleAddNextOrg = (item) => {
		const { handleAddOrg } = this.props;
		handleAddOrg(item);
	};

	// 手动删除机构
	handleDeleteOrg = (item) => {
		const { warningModal } = this.props;
		const titleNode = (
			<span>
				确认删除机构(
				<span className="ant-confirm-title-point">{item.name}</span>
				)？
			</span>
		);
		if (Array.isArray(item.children) && item.children.length > 0) {
			warningModal([item, '无法删除该机构', '该机构存在下级机构，请在删除完下级机构后重试', '我知道了', '', true, 'deleteOrg']);
		} else {
			warningModal([item, titleNode, '一经删除，无法恢复', '确定', '取消', false, 'deleteOrg']);
		}
	};

	// 手动编辑机构
	handleEditNextOrg = (item) => {
		const { handleOpenEditOrg } = this.props;
		handleOpenEditOrg({ ...item, orgName: item.name });
	};

	// 点击机构
	handleSelect = (selectedKeys) => {
		const { orgTree } = this.state;
		const { switchOrg } = this.props;
		if (selectedKeys.length > 0) {
			this.setState({
				selectedKeys,
			});
			const id = parseInt(selectedKeys[0], 10);
			switchOrg(orgTree, id);
		}
	};


	render() {
		const {
			expandedKeys, autoExpandParent, searchValue, orgTree, selectedKeys,
		} = this.state;
		const { currentOrgDetail, orgTopId } = this.props;
		const loop = data => data.map((item) => {
			const index = item.name.indexOf(searchValue);
			const beforeStr = item.name.substr(0, index);
			const afterStr = item.name.substr(index + searchValue.length);
			const title = index > -1 ? (
				<React.Fragment>
					<span className={`${item.name.length >= 15 ? 'more-org-name' : ''}`}>
						{beforeStr}
						<span className="match-word">{searchValue}</span>
						{afterStr}
					</span>
					<span onClick={() => this.handleEditNextOrg(item)}><Icon className="edit" type="icon-edit" /></span>
					{
						item.level < 3 && <span onClick={() => this.handleAddNextOrg(item)}><Icon className="add" type="icon-add-circle" /></span>
					}
					{
						item.id !== orgTopId && <span onClick={() => this.handleDeleteOrg(item)}><Icon className="del" type="icon-delete-circle" /></span>
					}
				</React.Fragment>
			) : (
				<React.Fragment>
					<span className={`${item.name.length >= 15 ? 'more-org-name' : ''}`}>{item.name}</span>
					<span onClick={() => this.handleEditNextOrg(item)}><Icon className="edit" type="icon-edit" /></span>
					{
						item.level < 3 && <span onClick={() => this.handleAddNextOrg(item)}><Icon className="add" type="icon-add-circle" /></span>
					}
					{
						item.id !== orgTopId && <span onClick={() => this.handleDeleteOrg(item)}><Icon className="del" type="icon-delete-circle" /></span>
					}
				</React.Fragment>
			);
			if (Array.isArray(item.children) && item.children.length > 0) {
				return (
					<TreeNode selectable={currentOrgDetail.id !== item.id} key={item.id} title={title} className={`line${orgTopId === item.id ? ' select-node' : ''}`}>{loop(item.children)}</TreeNode>
				);
			}
			return <TreeNode selectable={currentOrgDetail.id !== item.id} className={`${orgTopId === item.id ? 'select-node2' : ''}`} key={item.id} title={title} />;
		});
		return (
			<div className="account-left">
				<div className="account-box">
					<div className="account-box-title">机构管理</div>
					<div className="account-box-search">
						<Input
							className="account-box-search-input"
							placeholder="请输入要查找的机构"
							onChange={this.onChangeInput}
							value={searchValue}
						/>
						<span className="account-box-search-box" onClick={this.handleSearchOrg}>
							<Icon className="account-box-search-box-icon" type="icon-search" />
						</span>
					</div>
				</div>
				<div className="tree-box">
					<div className="tree-box-inner">
						<Tree
							defaultExpandAll
							height={400}
							className="account-tree"
							onExpand={this.onExpand}
							expandedKeys={expandedKeys}
							autoExpandParent={autoExpandParent}
							onSelect={this.handleSelect}
							selectedKeys={selectedKeys}
						>
							{loop(orgTree)}
						</Tree>
					</div>
				</div>
			</div>
		);
	}
}
export default SearchTree;
