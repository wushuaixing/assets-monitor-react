import React from 'react';
import { Tree, Input } from 'antd';
import './style.scss';
import { orgTree } from '../../../utils/api/index';

const { TreeNode } = Tree;
export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: [],
		};
	}

	componentDidMount() {
		orgTree().then((res) => {
			if (res.code === 200) {
				console.log(res.data);

				this.setState({
					treeData: res.data,
				});
			}
		});
	}

	inputValue= (e) => {
		const { value } = e.target;
		console.log(value);

		// const arr = flat(dataList) && flat(dataList).filter(item => item !== undefined);
		// this.setState({
		// 	selectList: this.filterByName(arr, value),
		// 	searchValue: value,
		// });
	}

	render() {
		const { treeData } = this.state;
		console.log(treeData);

		const gData = [{
			key: 1,
			name: '崔金鑫测试机构121（汇总）',
			age: 32,
			num: 122,
			all: 1233,
			totalMoney: '106,202.00',
			children: [{
				key: 11,
				name: '崔金鑫测试机构12崔金鑫测试机构1211崔金鑫测试机构121111',
				age: 33,
				num: 122,
				all: 1233,
				totalMoney: '106,202.00',
				url: '#/monitor',
			}, {
				key: 12,
				name: '崔金鑫测试机构121',
				age: 33,
				num: 122,
				all: 1233,
				totalMoney: '106,202.00',
				children: [{
					key: 121,
					name: '崔金鑫测试机构1211',
					age: 33,
					num: 122,
					all: 1233,
					totalMoney: '106,202.00',
				}, {
					key: 121,
					name: '崔金鑫测试机构1211',
					age: 33,
					num: 122,
					all: 1233,
					totalMoney: '106,202.00',
				}, {
					key: 12,
					name: '崔金鑫测试机构121',
					age: 33,
					num: 122,
					all: 1233,
					totalMoney: '106,202.00',
					children: [{
						key: 121,
						name: '崔金鑫测试机构1211',
						age: 33,
						num: 122,
						all: 1233,
						totalMoney: '106,202.00',
					}, {
						key: 121,
						name: '崔金鑫测试机构1211',
						age: 33,
						num: 122,
						all: 1233,
						totalMoney: '106,202.00',
					}],
				}, {
					key: 12,
					name: '崔金鑫测试机构121',
					age: 33,
					num: 122,
					all: 1233,
					totalMoney: '106,202.00',
					children: [{
						key: 121,
						name: '崔金鑫测试机构1211',
						age: 33,
						num: 122,
						all: 1233,
						totalMoney: '106,202.00',
					}, {
						key: 121,
						name: '崔金鑫测试机构1211',
						age: 33,
						num: 122,
						all: 1233,
						totalMoney: '106,202.00',
					}],
				}],
			}, {
				key: 13,
				name: '崔金鑫测试机构1212',
				num: 33,
				all: 1233,
				totalMoney: '106,202.00',
				children: [{
					key: 131,
					name: '崔金鑫测试机构21',
					num: 33,
					all: 1233,
					totalMoney: '106,202.00',
					children: [{
						key: 1311,
						name: '崔金鑫测试机构12122',
						num: 33,
						all: 1233,
						totalMoney: '106,202.00',
					}, {
						key: 1312,
						name: '崔金鑫测试机构1213',
						num: 33,
						all: 1233,
						totalMoney: '106,202.00',
					}],
				}],
			}],
		}];

		const loop = tree => tree.map((item) => {
			if (item.children) {
				return (
					<TreeNode key={item.key} title={item.name}>
						{loop(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.key} title={item.name} />;
		});
		return (
			<div className="yc-header-center">
				<div className="user-panel-item user-panel-msg clearfix">
					<div className="g-left">
						<div className="user-panel-item-text">您好，崔九九 </div>
						<div className="user-panel-item-text">当前机构：崔金鑫测试机构11 </div>
					</div>
					<div className="g-right user-panel-right">
						<div>
							<a className="text-prompt user-panel-login" data-toggle="modal" data-target="#Modalupdate">修改密码</a>
							<a className="user-panel-login" href="/User/Index/logout">退出登录</a>
						</div>
					</div>
				</div>
				<div className="yc-search-container">
					<Input
						className="yc-group-input"
						onInput={e => this.inputValue(e)}
						placeholder="请输入机构名称..."
						size="large"
					/>
					{/* <Button onClick={() => this.btnSearch(searchValue || '')} className="yc-group-button">搜索</Button> */}
					<div>
						<Tree
						// defaultExpandedKeys={this.state.expandedKeys}
							draggable
							onDragEnter={this.onDragEnter}
							onDrop={this.onDrop}
						>
							{loop(gData)}
						</Tree>
					</div>

				</div>
			</div>
		);
	}
}
