import React from 'react';
import {
	Tree, Input, message, Icon,
} from 'antd';
import { navigate } from '@reach/router';
import './style.scss';
import Cookies from 'universal-cookie';
import {
	userInfo, // tree
	loginOut, // login
	switchOrg, // 切换机构
} from '@/utils/api/user';
import PasswordModal from './passwordModal';
import flat from '../../../utils/flatArray';

const { TreeNode } = Tree;
const cookie = new Cookies();
export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordModalVisible: false,
			treeData: [],
			treeList: [],
			valueList: '',
			value: '',
		};
	}

	componentDidMount() {
		const { getData } = this.props;
		userInfo().then((res) => {
			if (res.code === 200) {
				getData(res.data);
				this.setState({
					treeData: res.data,
					treeList: [res.data.orgTree],
				});
			}
		});
	}

	// 退出登录
	handleClick = () => {
		navigate('/login');
		loginOut().then((res) => {
			if (res.code === 200) {
				message.success('退出成功');
				// 清空token
				cookie.remove('token');
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
		const value = e.target.value.trim();
		console.log(value);

		const { treeList } = this.state;
		const arr = flat(treeList) && flat(treeList).filter(item => item !== undefined);
		this.setState({
			valueList: value,
			value: value.replace(/\s+/g, ''),
			selectList: this.filterByName(arr, value),
		});
	}

	// 选择列表
	selectFilterValue = (val) => {
		console.log(1);
		this.handleOnSelect([val]);
	}

	handleOnSelect = (info) => {
		const num = Number(info.join(''));
		const params = {
			orgId: num,
		};

		const start = new Date().getTime(); // 获取接口响应时间
		if (num !== 0) {
			switchOrg(params).then((res) => {
				if (res.code === 200) {
					const now = new Date().getTime();
					const latency = now - start;

					const hide = message.loading('正在切换机构,请稍后...', 0);
					setTimeout(() => {
						window.location.reload(); // 实现页面重新加载/
					}, latency);
					// 异步手动移除
					setTimeout(hide, latency);
				} else {
					message.error(res.message);
				}
			});
		}
	}

	// 打开修改密码弹框
	openModal = () => {
		this.setState({
			passwordModalVisible: true,
		});
	}

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			passwordModalVisible: false,
		});
	}

	render() {
		const {
			treeList, treeData, valueList, selectList, passwordModalVisible, value,
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
							<a onClick={() => this.openModal()} className="text-prompt user-panel-login" data-toggle="modal" data-target="#Modalupdate">修改密码</a>
							<a onClick={() => this.handleClick()} className="user-panel-login">退出登录</a>
						</div>
					</div>
				</div>
				<div className="yc-search-container">
					<Input
						className="yc-group-input"
						addonAfter={<Icon type="search" />}
						onInput={e => this.inputValue(e)}
						placeholder="请输入机构名称"
						size="large"
						type="text"
						// onkeyup={e => e.target.}
						value={value}
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
						)
							: treeList && treeList.length > 0 && (
							<Tree
								draggable
								onSelect={this.handleOnSelect}
								showLine
								defaultExpandedKeys={[treeList[0].orgId.toString()]}
							>
								{loop(treeList)}
							</Tree>
							)
						}
					</div>
				</div>
				{/** 修改密码Modal */}
				{passwordModalVisible && (
				<PasswordModal
					onCancel={this.onCancel}
					onOk={this.onOk}
					passwordModalVisible={passwordModalVisible}
				/>
				)}
			</div>
		);
	}
}
