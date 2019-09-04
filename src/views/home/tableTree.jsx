/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================

import {
	Form, Input, Button, Table, Affix, Tooltip, Icon, message,
} from 'antd';
import SelectSearch from '@/common/selectSearch';
import {
	selfTree, // login
} from '@/utils/api/home';
import {
	switchOrg, // 切换机构
} from '@/utils/api/user';
import flat from '../../utils/flatArray';
import { toThousands } from '@/utils/changeTime';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;
const skip = (text, row) => {
	const params = {
		orgId: row.id,
	};

	const start = new Date().getTime(); // 获取接口响应时间
	if (row.id !== 0) {
		switchOrg(params).then((res) => {
			if (res.code === 200) {
				const now = new Date().getTime();
				const latency = now - start;

				const hide = message.loading('正在切换机构,请稍后...', 0);
				setTimeout(() => {
					// window.location.reload(); // 实现页面重新加载/
					const w = window.open('about:blank');
					w.location.href = `#/${text}`;
				}, latency);
				// 异步手动移除
				setTimeout(hide, latency);
			} else {
				message.error(res.message);
			}
		});
	}
};

const columns = [
	{
		title: '机构名称',
		dataIndex: 'name',
		key: 'name',
		id: 'name',
		width: 400,
		render: (text, row) => (
			<span className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>
				{
					text && text.length > 25
						? (
							<Tooltip placement="topLeft" title={text}>
								<span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{`${text.substr(0, 25)}...`}</span>
							</Tooltip>
						)
						: <span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text || '--'}</span>
				}
			</span>
		),
	},
	{
		title: '监控债务人数',
		key: 'obligorCount',
		dataIndex: 'obligorCount',
		id: 'obligorCount',
		width: 174,
		render: (text, row) => <span onClick={row.children && row.children.length > 0 ? null : () => skip('business/debtor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '全部',
		key: 'monitorTotalCount',
		dataIndex: 'monitorTotalCount',
		id: 'monitorTotalCount',
		width: 92,
		render: (text, row) => <span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '未跟进',
		key: 'monitorUnfollowedCount',
		dataIndex: 'monitorUnfollowedCount',
		id: 'monitorUnfollowedCount',
		width: 112,
		render: (text, row) => <span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '跟进',
		key: 'monitorFollowedCount',
		dataIndex: 'monitorFollowedCount',
		id: 'monitorFollowedCount',
		width: 92,
		render: (text, row) => <span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '完成',
		key: 'monitorDoneCount',
		dataIndex: 'monitorDoneCount',
		id: 'monitorDoneCount',
		width: 92,
		render: (text, row) => <span onClick={row.children && row.children.length > 0 ? null : () => skip('monitor', row)} className={row.children && row.children.length > 0 ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '追回总金额(元)',
		dataIndex: 'recovery',
		key: 'recovery',
		id: 'recovery',
		render: text => <span>{toThousands(text)}</span>,
	},
];

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			selectList: [],
			isOpen: false,
			treeList: [],
			dataListArray: null,
		};
	}

	componentDidMount() {
		// 避免在登录页请求
		const { hash } = window.location;
		if (hash !== '#/login') {
			this.getData();
		}
	}

	// componentWillUnmount() {
	// 	// 组件卸载时判断getData是否存在，存在则取消掉请求
	// 	if (this.getData) {
	// 		this.getData();
	// 	}
	// }

	// 获取消息列表
	getData = () => {
		const that = this;
		selfTree().then((res) => {
			if (res && res.data) {
				const dataListArray = JSON.parse(JSON.stringify(that.IterationDelateMenuChildren([res.data.tree])));

				this.setState({
					treeList: that.IterationDelateMenuChildren([res.data.tree]),
					dataListArray,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			console.log(1);
		});
	};

	// 选择列表
	selectFilterValue = (val) => {
		this.setState({
			treeList: [val],
			isOpen: false,
			searchValue: val.name,
		});
	}

	// 根据单个名字筛选
	filterByName = (aim, name) => aim.filter(item => item.name.indexOf(name) !== -1)
	// 输入 aim 'Leila' 期望输出为 [{name:'Leila', age: 16, gender:'female'}]

	inputValue= (e) => {
		const { treeList } = this.state;
		const { value } = e.target;
		const arr = treeList && flat(treeList) && flat(treeList).filter(item => item !== undefined);
		this.setState({
			selectList: this.filterByName(arr, value),
			searchValue: value,
		});
	}

	btnSearch = (value) => {
		const { dataListArray } = this.state;
		const arr = dataListArray && flat(dataListArray) && flat(dataListArray).filter(item => item !== undefined);
		const list = arr.filter(item => item.name === value);
		if (value) {
			this.setState({
				treeList: list,
			});
		}
	}

	inputSearchFoucs = () => {
		const { dataListArray, selectList, searchValue } = this.state;
		this.setState({
			isOpen: true,
			selectList: dataListArray && flat(dataListArray) && searchValue.length > 0 ? selectList : flat(dataListArray).filter(item => item !== undefined),
		});
	}

	inputSearchBlur = () => {
		console.log(111);

		setTimeout(() => {
			this.setState({
				isOpen: false,
			});
		}, 200);
	}

	clearInputValue = () => {
		const { dataListArray } = this.state;

		this.setState({
			treeList: dataListArray,
			isOpen: false,
			searchValue: '',
			selectList: dataListArray && flat(dataListArray) && flat(dataListArray).filter(item => item !== undefined),
		});
	}

	onKeyup = (e) => {
		const { value } = e.target;
		if (e.keyCode === 13) {
			this.btnSearch(value);
		}
	}

	// 递归去掉空children
	IterationDelateMenuChildren = (arr) => {
		if (arr.length) {
			arr.forEach((i, index) => {
				if (arr[index] && arr[index].children && arr[index].children.length > 0) {
					this.IterationDelateMenuChildren(arr[index].children);
				} else {
					// eslint-disable-next-line no-param-reassign
					delete arr[index].children;
				}
			});
		}
		return arr;
	};


	render() {
		const {
			treeList, selectList, isOpen, searchValue, dataListArray,
		} = this.state;
		// 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
		// 实例上（比如 this.textInput）
		return (

			<Form>
				<div className="yc-group-search">
					<Input
						className="yc-group-input"
						autocomplete="off"
						maxlength="16"
						type="text"
						onInput={e => this.inputValue(e)}
						value={searchValue}
						onFocus={e => this.inputSearchFoucs(e)}
						onKeyUp={this.onKeyup}
						// onBlur={e => this.inputSearchBlur(e)}
					/>
					<Button onClick={() => this.btnSearch(searchValue || '')} className="yc-group-button">搜索</Button>
					{searchValue && searchValue.length > 0 && <Icon className="yc-group-icon" onClick={this.clearInputValue} type="cross-circle" />}
					{
						isOpen && selectList && selectList.length > 0 && (
						<ul className="yc-input-list">
							{selectList.map(val => (
								<li className="yc-input-list-item" onClick={() => this.selectFilterValue(val)}>
									{ val ? val.name : null}
								</li>
							))}
						</ul>
						)
					}
				</div>
				{/* <SelectSearch onChange={e => console.log(e)} clear defaultValue="1">
					{selectList.map(val => (
						<SelectSearch.Option className="yc-input-list-item" onClick={() => this.selectFilterValue(val)}>
							{ val ? val.name : null}
						</SelectSearch.Option>
					))}
				</SelectSearch> */}
				<Affix>
					<table className="table table-striped treetable" style={{ marginBottom: 0 }}>
						<tbody>
							<tr className="tr-table">
								<th rowSpan=" 2 " style={{ width: 400 }}>机构名称</th>
								<th rowSpan=" 2 " style={{ width: 174 }}>监控债务人数</th>
								<th colSpan="4" style={{ width: 388 }}>监控信息数</th>
								<th rowSpan=" 2 " style={{ width: 198 }}>追回总金额(元)</th>
							</tr>
							<tr className="tr-table">
								<th style={{ width: 92 }}>全部</th>
								<th style={{ width: 112 }}>未跟进</th>
								<th style={{ width: 92 }}>跟进</th>
								<th style={{ width: 92 }}>完成</th>
							</tr>
						</tbody>
					</table>
				</Affix>

				{treeList && treeList.length > 0 ? (
					<Table
						rowKey={record => record && record.id + record.name}
						columns={columns}
						dataSource={treeList && treeList}
						showHeader={false}
						style={{ width: '100%' }}
						defaultExpandAllRows
						pagination={false}
						onRowClick={(record) => {
							// if (!record.children) {
							// 	const w = window.open('about:blank');
							// 	w.location.href = '#/monitor';
							// }
						}}
					/>
				) : (
					<div className="yc-no-container">
						<div className="yc-data-img" />
						<span>暂无数据</span>

					</div>
				)
			}
			</Form>
		);
	}
}

export default createForm()(Login);
