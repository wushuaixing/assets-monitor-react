import React from 'react';
import { Tree, Input, message } from 'antd';
import { navigate } from '@reach/router';
import './style.scss';
import {
	userInfo, // tree
	loginOut, // login
	switchOrg, // 切换机构
} from '@/utils/api/user';
import flat from '../../../utils/flatArray';

const { TreeNode } = Tree;
export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: [],
			treeList: [],
			valueList: '',
		};
	}

	componentDidMount() {
		userInfo().then((res) => {
			if (res.code === 200) {
				this.setState({
					treeData: res.data,
					treeList: [res.data.orgTree],
				});
			}
		});
	}

	handleClick = () => {
		loginOut().then((res) => {
			if (res.code === 200) {
				message.success('退出成功');
				// 清空token
				navigate('/login');
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			message.error('服务器出错');
		});
	};

	// // 根据单个名字筛选
	// filterByName = (aim, name) => aim.filter((item) => {
	// 	console.log(item, name);
	// })
	// 根据单个名字筛选
	filterByName = (aim, name) => aim.filter(item => item.orgName.indexOf(name) !== -1)

	inputValue= (e) => {
		const { value } = e.target;
		console.log(value);

		const { treeList } = this.state;
		const arr = flat(treeList) && flat(treeList).filter(item => item !== undefined);
		this.setState({
			valueList: value,
			selectList: this.filterByName(arr, value),
		});
	}

	// 选择列表
	selectFilterValue = (val) => {
		this.handleOnSelect([val]);
	}

	handleOnSelect = (info) => {
		console.log(info.join(''));
		const num = Number(info.join(''));
		const params = {
			orgId: num,
		};
		switchOrg(params).then((res) => {
			if (res.code === 200) {
				message.success(res.message);
			} else {
				message.error(res.message);
			}
		});
	}

	render() {
		const {
			treeList, treeData, valueList, selectList,
		} = this.state;
		const loop = tree => tree && tree.map((item) => {
			if (item.children && item.children.length > 0) {
				return (
					<TreeNode key={item.orgId} title={item.orgName}>
						{loop(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.orgId} title={item.orgName} />;
		});

		return (
			<div className="yc-header-center">
				<div className="user-panel-item user-panel-msg clearfix">
					<div className="g-left">
						<div className="user-panel-item-text">
							您好，
							{treeData.name}
							{' '}
						</div>
						<div className="user-panel-item-text">
							当前机构：
							{treeData.orgName}
							{' '}
						</div>
					</div>
					<div className="g-right user-panel-right">
						<div>
							<a className="text-prompt user-panel-login" data-toggle="modal" data-target="#Modalupdate">修改密码</a>
							<a onClick={() => this.handleClick()} className="user-panel-login">退出登录</a>
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
					<div style={{ height: 304, overflow: 'auto' }}>
						{valueList && valueList.length > 0 ? (
							<div>
								{
									selectList && selectList.length > 0 && (
									<ul className="yc-input-list">
										{selectList.map(val => (
											<li className="yc-input-list-item" onClick={() => this.selectFilterValue(val.orgId)}>
												{ val ? val.orgName : null}
											</li>
										))}
									</ul>
									)
								}
							</div>
						) : (
							<Tree
								draggable
								onSelect={this.handleOnSelect}
								defaultExpandAll
							>
								{loop(treeList && treeList)}
							</Tree>
						)}
					</div>

				</div>
			</div>
		);
	}
}
