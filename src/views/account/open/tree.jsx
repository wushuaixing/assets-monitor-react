import React from 'react';
import { Tree, Input } from 'antd';
import { Icon } from '@/common';
import './index.scss';

const { TreeNode } = Tree;

const x = 10;
const y = 2;
const z = 1;
const gData = [];

// eslint-disable-next-line consistent-return
const generateData = (_level, _preKey, _tns) => {
	const preKey = _preKey || '0';
	const tns = _tns || gData;

	const children = [];
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < x; i++) {
		const key = `${preKey}-${i}`;
		tns.push({ title: key, key });
		if (i < y) {
			children.push(key);
		}
	}
	if (_level < 0) {
		return tns;
	}
	const level = _level - 1;
	children.forEach((key, index) => {
		tns[index].children = [];
		return generateData(level, key, tns[index].children);
	});
};

generateData(z);

const dataList = [];
// eslint-disable-next-line no-unused-vars
const generateList = (data) => {
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < data.length; i++) {
		const node = data[i];
		const { key } = node;
		dataList.push({ key, title: key });
		if (node.children) {
			generateList(node.children);
		}
	}
};
generateList(gData);

const getParentKey = (key, tree) => {
	let parentKey;
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i];
		if (node.children) {
			if (node.children.some(item => item.key === key)) {
				parentKey = node.key;
			} else if (getParentKey(key, node.children)) {
				parentKey = getParentKey(key, node.children);
			}
		}
	}
	return parentKey;
};

class SearchTree extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			expandedKeys: [],
			searchValue: '',
			autoExpandParent: true,
		};
	}

	// 输入框的变化
	onChangeInput = (e) => {
		const { value } = e.target;
		const expandedKeys = dataList
			.map((item) => {
				if (item.title.indexOf(value) > -1) {
					return getParentKey(item.key, gData);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		this.setState({
			expandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
	};

	// 点击搜索按钮
	handleSearchOrg = () => {
		const { searchValue } = this.state;
		console.log('handleSearchOrg === ', searchValue);
		const expandedKeys = dataList
			.map((item) => {
				if (item.title.indexOf(searchValue) > -1) {
					return getParentKey(item.key, gData);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		this.setState({
			expandedKeys: searchValue ? expandedKeys : [],
			autoExpandParent: !!searchValue,
		});
	};

	onExpand = (expandedKeys) => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	onGetTitleNode = (item) => {
		let titltNode = item.title;
		console.log('item === ', item);
		if (item.children) {
			titltNode = (
				<a title="0-0-0-0" className="ant-tree-node-content-wrapper">
					<span className="ant-tree-title">{item.title}</span>
					<Icon className="right" type="icon-edit" />
					<Icon className="add" type="icon-add-circle" />
				</a>
			);
		} else {
			titltNode = (
				<a title="0-0-0-0" className="ant-tree-node-content-wrapper">
					<span className="ant-tree-title">{item.title}</span>
					<Icon className="right" type="icon-edit" />
					<Icon className="add" type="icon-add-circle" />
					<Icon className="del" type="icon-delete-circle" />
				</a>
			);
		}
		return titltNode;
	};

	// 手动添加机构
	handleAddNextOrg = () => {
		const { handleAddOrg } = this.props;
		handleAddOrg();
	};

	// 手动删除机构
	handleDeleteOrg = (item) => {
		const { warningModal } = this.props;
		const titleNode = (
			<span>
				确认删除机构(
				<span className="ant-confirm-title-point">{item.title}</span>
				)？
			</span>
		);
		warningModal([titleNode, '一经删除，无法恢复', '确定', '取消']);
	};

	// 手动编辑机构
	handleEditNextOrg = (item) => {
		const { handleOpenEditOrg } = this.props;
		handleOpenEditOrg(item);
	};

	render() {
		// const loop = data => data.map((item) => {
		// 	if (item.children) {
		// 		return (
		// 			<TreeNode key={item.key} title={this.onGetTitleNode(item)} disableCheckbox={item.key === '0-0-0'} className="line">
		// 				{loop(item.children)}
		// 			</TreeNode>
		// 		);
		// 	}
		// 	return <TreeNode key={item.key} title={this.onGetTitleNode(item)} />;
		// });
		const {
			expandedKeys, autoExpandParent, searchValue,
		} = this.state;
		const loop = data => data.map((item) => {
			// console.log('item === ', item);
			const index = item.title.indexOf(searchValue);
			const beforeStr = item.title.substr(0, index);
			const afterStr = item.title.substr(index + searchValue.length);
			const title = index > -1 ? (
				<React.Fragment>
					<span>
						{beforeStr}
						<span className="match-word">{searchValue}</span>
						{afterStr}
					</span>
					<span onClick={() => this.handleEditNextOrg(item)}><Icon className="edit" type="icon-edit" /></span>
					<span onClick={this.handleAddNextOrg}><Icon className="add" type="icon-add-circle" /></span>
					<span onClick={() => this.handleDeleteOrg(item)}><Icon className="del" type="icon-delete-circle" /></span>
				</React.Fragment>
			) : (
				<span>{item.title}</span>
			);
			if (item.children) {
				return (
					<TreeNode key={item.key} title={title} className="line">{loop(item.children)}</TreeNode>
				);
			}
			return <TreeNode key={item.key} title={title} />;
		});
		return (
			<div className="account-box">
				<div className="account-box-title">机构管理</div>
				<div className="account-box-search">
					<Input
						className="account-box-search-input"
						placeholder="请输入要查找的机构"
						onChange={this.onChangeInput}
					/>
					<span onClick={this.handleSearchOrg}>
						<Icon className="account-box-search-icon" type="icon-search" />
					</span>
				</div>
				<Tree
					className="account-tree"
					onExpand={this.onExpand}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
				>
					{loop(gData)}
				</Tree>
			</div>
		);
	}
}
export default SearchTree;
