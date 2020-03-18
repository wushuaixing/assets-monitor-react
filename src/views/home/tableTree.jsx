/** 登录页 * */
import React from 'react';
import {
	Form, Input, Table, Affix, Icon, message,
} from 'antd';
import { selfTree } from '@/utils/api/home';
import { switchOrg } from '@/utils/api/user';
import { Ellipsis } from '@/common';
import flat from '../../utils/flatArray';
import { toThousands } from '@/utils/changeTime';
import './style.scss';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
// 是否为IE

const createForm = Form.create;

// 切换机构
const handleSwitchOrg = async (e, orgId) => {
	if (orgId) {
		const hide = message.loading('正在切换机构,请稍后...', 0);
		const res = await switchOrg({ orgId });
		setTimeout(hide, 0);
		if (res.code !== 200) {
			message.error(res.message);
			e.preventDefault();
		} else {
			window.location.reload();
		}
	} else {
		e.preventDefault();
	}
};


const columns = [
	{
		title: '机构名称',
		dataIndex: 'name',
		key: 'name',
		id: 'name',
		width: 400,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/monitor' : ''} width={300} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '监控债务人数',
		key: 'obligorCount',
		dataIndex: 'obligorCount',
		id: 'obligorCount',
		className: 'column-center',
		width: 174,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/business/debtor' : ''} width={50} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '全部',
		key: 'monitorTotalCount',
		dataIndex: 'monitorTotalCount',
		id: 'monitorTotalCount',
		className: 'column-center',
		width: 92,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/monitor?process=1' : ''} width={50} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '未跟进',
		key: 'monitorUnfollowedCount',
		dataIndex: 'monitorUnfollowedCount',
		id: 'monitorUnfollowedCount',
		className: 'column-center',
		width: 112,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/monitor?process=1' : ''} width={50} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '跟进',
		key: 'monitorFollowedCount',
		dataIndex: 'monitorFollowedCount',
		id: 'monitorFollowedCount',
		className: 'column-center',
		width: 92,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/monitor?process=3' : ''} width={50} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '完成',
		key: 'monitorDoneCount',
		dataIndex: 'monitorDoneCount',
		id: 'monitorDoneCount',
		className: 'column-center',
		width: 92,
		render: (text, row) => {
			const isChild = !(row.children && row.children.length > 0);
			return (
				<span className={isChild ? 'yc-table-body' : null}>
					<Ellipsis content={text} url={isChild ? '/#/monitor?process=9' : ''} width={50} tooltip onClick={e => handleSwitchOrg(e, row.id)} />
				</span>
			);
		},
	},
	{
		title: '追回总金额(元)',
		dataIndex: 'recovery',
		key: 'recovery',
		id: 'recovery',
		className: 'column-right',
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
			isHasValue: '',
		};
	}

	componentDidMount() {
		// 避免在登录页请求
		const { rule } = this.props;
		const { hash } = window.location;
		if (hash !== '#/login' && rule && rule.groupName === 'menu_sy') {
			this.getData();
		}
		// 首先监听 document 的 mousedown 事件，然后判断触发 mousedown 事件的目标元素是不是你不想让input失去焦点的那个元素，是的话就阻止默认事件。
		const selectId = document.getElementById('select');

		window._addEventListener(selectId, 'mousedown', (e) => {
			const event = e || window.event;
			const newTarget = event.target || event.srcElement; // 获取document 对象的引用

			if (newTarget && newTarget.id === 'select') {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
					return false;
				}
			}
			return false;
		});
	}

	componentWillUnmount() {
		// 卸载
		window._removeEventListener(document, 'mousedown', (e) => {
			// console.log(e.target.id, e.target.id === 'select');
			if ((e.target || {}).id === 'select') {
				e.preventDefault();
				e.stopPropagation();
			}
		}, false);
		this.setState = () => null;
		// console.log(this.getData.cancel, 111);
	}

	// 获取消息列表
	getData = () => {
		const that = this;
		selfTree().then((res) => {
			if (res && res.data) {
				const dataListArray = JSON.parse(JSON.stringify(that.IterationDeleteMenuChildren([res.data.tree])));

				this.setState({
					treeList: that.IterationDeleteMenuChildren([res.data.tree]),
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
		const selectValue = document.getElementById('inputFocus');
		this.setState({
			treeList: [val],
			isOpen: false,
			searchValue: val.name,
		});
		selectValue.value = val.name;
	};

	// 根据单个名字筛选
	filterByName = (aim, name) => aim.filter(item => item.name.indexOf(name) !== -1);
	// 输入 aim 'Leila' 期望输出为 [{name:'Leila', age: 16, gender:'female'}]

	ycInputValue= (e) => {
		const { treeList } = this.state;
		// const event = e || window.event;
		const newInputValue = e && e.target ? e.target.value : ''; // 获取document 对象的引用
		const arr = treeList && flat(treeList) && flat(treeList).filter(item => item !== undefined);
		const hasValue = document.getElementById('inputFocus');
		if (global.GLOBAL_MEIE_BROWSER) {
			this.setState({
				selectList: this.filterByName(arr, newInputValue),
				isHasValue: hasValue.value,
			});
		} else {
			this.setState({
				selectList: this.filterByName(arr, newInputValue),
				searchValue: newInputValue,
				isHasValue: hasValue.value,
			});
		}
	};

	btnSearch = (value) => {
		const { dataListArray } = this.state;
		const arr = dataListArray && flat(dataListArray) && flat(dataListArray).filter(item => item !== undefined);
		const list = arr.filter(item => item.name === value);
		if (value) {
			this.setState({
				treeList: list,
			});
		}
	};

	inputSearchFocus = () => {
		const { dataListArray, selectList, searchValue } = this.state;
		this.setState({
			isOpen: true,
			selectList: dataListArray && flat(dataListArray) && searchValue.length > 0 ? selectList : flat(dataListArray).filter(item => item !== undefined),
		});
	};

	inputSearchBlur = () => {
		setTimeout(() => {
			this.setState({
				isOpen: false,
			});
		}, 200);
	};

	clearInputValue = () => {
		const { dataListArray } = this.state;
		const clear = document.getElementById('inputFocus');
		clear.value = '';
		this.setState({
			treeList: dataListArray,
			isOpen: false,
			searchValue: '',
			selectList: dataListArray && flat(dataListArray) && flat(dataListArray).filter(item => item !== undefined),
		});
	};

	onKeyup = (e) => {
		const { value } = e.target;
		if (e.keyCode === 13) {
			this.btnSearch(value);
		}
	};

	// 递归去掉空children
	IterationDeleteMenuChildren = (arr) => {
		if (arr.length) {
			arr.forEach((i, index) => {
				if (arr[index] && arr[index].children && arr[index].children.length > 0) {
					this.IterationDeleteMenuChildren(arr[index].children);
				} else {
					const newArray = arr.slice();
					delete newArray[index].children;
				}
			});
		}
		return arr;
	};

	onPlaceholder=() => {
		if (global.GLOBAL_MEIE_BROWSER) {
			document.getElementById('inputFocus').focus();
		}
	};

	render() {
		const {
			treeList, selectList, isOpen, searchValue, isHasValue,
		} = this.state;

		return (
			<Form>
				<div className="yc-group-search">
					<Icon className="yc-search-icon" type="search" />
					<Input
						id="inputFocus"
						className="yc-group-input"
						placeholder="请输入机构名称"
						autoComplete="off"
						maxLength="20"
						// type="input"
						onInput={e => this.ycInputValue(e)}
						// oninput={e => this.inputValue(e)}
						// value={searchValue}
						onFocus={e => this.inputSearchFocus(e)}
						onKeyUp={this.onKeyup}
						onBlur={e => this.inputSearchBlur(e)}
					/>
					<div
						className={`yc-home-placeholder ${!isHasValue && global.GLOBAL_MEIE_BROWSER ? '' : 'yc-visibility-none'}`}
						onClick={this.onPlaceholder}
					>
						{'请输入机构名称' || '请输入'}
					</div>
					{searchValue && searchValue.length > 0 && <Icon className="yc-group-icon" onClick={this.clearInputValue} type="cross-circle" />}
					{
						isOpen && selectList && selectList.length > 0 && (
							<ul id="select" className="yc-input-list" style={global.GLOBAL_MEIE_BROWSER ? {} : { maxHeight: 300, overflow: 'auto' }}>
								{selectList.map(val => (
									<li className="yc-input-list-item" onClick={() => this.selectFilterValue(val)}>
										{ val ? val.name : null}
									</li>
								))}
							</ul>
						)
					}
				</div>
				<Affix>
					<table className="table table-striped treetable" style={{ marginBottom: 0 }}>
						<tbody>
							<tr className="tr-table">
								<th rowSpan=" 2 " style={{ width: 400, textAlign: 'left' }}>机构名称</th>
								<th rowSpan=" 2 " style={{ width: 174 }}>监控债务人数</th>
								<th colSpan="4" style={{ width: 388 }}>监控信息数</th>
								<th rowSpan=" 2 " style={{ width: 198, textAlign: 'right' }}>追回总金额 (元)</th>
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
