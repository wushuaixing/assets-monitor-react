import React from 'react';
import { Tree } from 'antd';
import { Icon } from '@/common';
import './index.scss';

const { TreeNode } = Tree;

const x = 3;
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
		tns.push({ title: `父级${key}`, key });
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

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			expandedKeys: ['0-0-0', '0-0-1'],
			autoExpandParent: true,
			checkedKeys: ['0-0-0'],
			selectedKeys: [],
		};
	}

	onExpand = (expandedKeys) => {
		console.log('onExpand', expandedKeys);
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	onCheck = (checkedKeys) => {
		this.setState({
			checkedKeys,
			selectedKeys: ['0-3', '0-4'],
		});
	};

	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info);
		this.setState({ selectedKeys });
	};

	onGetTitleNode = (item) => {
		console.log('item 22222222=== ', item);
		let titltNode = item.title;
		if (item.children) {
			titltNode = (
				<a title="0-0-0-0" className="ant-tree-node-content-wrapper">
					<span className="ant-tree-title">{item.title}</span>
					<Icon className="right" type="icon-edit" />
				</a>
			);
		} else {
			titltNode = (
				<a title="0-0-0-0" className="ant-tree-node-content-wrapper">
					<span className="ant-tree-title">{item.title}</span>
					<Icon className="right" type="icon-edit" />
				</a>
			);
		}

		return titltNode;
	};

	render() {
		const loop = data => data.map((item) => {
			console.log('item 111111=== ', item);
			if (item.children) {
				return (
					<TreeNode key={item.key} title={this.onGetTitleNode(item)} disableCheckbox={item.key === '0-0-0'} className="line">
						{loop(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.key} title={this.onGetTitleNode(item)} />;
		});
		const {
			expandedKeys, autoExpandParent, checkedKeys, selectedKeys,
		} = this.state;
		console.log('gData === ', gData);
		// eslint-disable-next-line no-mixed-spaces-and-tabs
  	return (
	<div>
		<div>开通账号</div>
		<div className="account-box">
			<Tree
				className="account-tree"
				onExpand={this.onExpand}
				expandedKeys={expandedKeys}
				autoExpandParent={autoExpandParent}
				onCheck={this.onCheck}
				checkedKeys={checkedKeys}
				onSelect={this.onSelect}
				selectedKeys={selectedKeys}
			>
				{loop(gData)}
			</Tree>
		</div>
	</div>
		// eslint-disable-next-line no-mixed-spaces-and-tabs
  	);
	}
}
export default Open;
