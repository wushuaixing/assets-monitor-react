/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================

import {
	Form, Input, Button, Table, Affix, Tooltip, Icon,
} from 'antd';
import flat from '../../utils/flatArray';

// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;

const columns = [
	{
		title: '机构名称',
		dataIndex: 'name',
		key: 'name',
		width: 400,
		render: (text, row) => (
			<span className={row.children ? null : 'yc-table-body'}>
				{
					text && text.length > 25
						? (
							<Tooltip placement="topLeft" title={text}>
								<span className={row.children ? null : 'yc-table-body'}>{`${text.substr(0, 25)}...`}</span>
							</Tooltip>
						)
						: <span className={row.children ? null : 'yc-table-body'}>{text || '--'}</span>
				}
			</span>
		),
	},
	{
		title: '监控债务人数',
		key: 'num',
		dataIndex: 'num',
		width: 174,
		render: (text, row) => <span className={row.children ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '全部',
		key: 'all',
		dataIndex: 'all',
		width: 92,
		render: (text, row) => <span className={row.children ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '未跟进',
		key: 'num',
		dataIndex: 'num',
		width: 112,
		render: (text, row) => <span className={row.children ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '跟进',
		key: 'num',
		dataIndex: 'num',
		width: 92,
		render: (text, row) => <span className={row.children ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '完成',
		key: 'num',
		dataIndex: 'num',
		width: 92,
		render: (text, row) => <span className={row.children ? null : 'yc-table-body'}>{text}</span>,
	},
	{
		title: '追回总金额(元)',
		dataIndex: 'totalMoney',
		key: 'totalMoney',
		render: text => <span>{text}</span>,
	},
];
const dataList = [{
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
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			selectList: [],
			data: dataList,
			isOpen: false,
		};
	}

	componentDidMount() {
		this.setState({
			selectList: flat(dataList) && flat(dataList).filter(item => item !== undefined),
		});
	}

	// 选择列表
	selectFilterValue = (val) => {
		this.setState({
			data: [val],
			isOpen: false,
			searchValue: val.name,
		});
	}

	// 根据单个名字筛选
	filterByName = (aim, name) => aim.filter(item => item.name.indexOf(name) !== -1)
	// 输入 aim 'Leila' 期望输出为 [{name:'Leila', age: 16, gender:'female'}]

	inputValue= (e) => {
		const { value } = e.target;
		const arr = flat(dataList) && flat(dataList).filter(item => item !== undefined);
		this.setState({
			selectList: this.filterByName(arr, value),
			searchValue: value,
		});
	}

	btnSearch = (value) => {
		const arr = flat(dataList) && flat(dataList).filter(item => item !== undefined);
		const list = arr.filter(item => item.name === value);
		if (value) {
			this.setState({
				data: list,
			});
		}
	}

	inputSearchFoucs = () => {
		this.setState({
			isOpen: true,
		});
	}

	inputSearchBlur = () => {
		setTimeout(() => {
			this.setState({
				isOpen: false,
			});
		}, 200);
	}

	clearInputValue = () => {
		this.setState({
			isOpen: false,
			searchValue: '',
			selectList: flat(dataList) && flat(dataList).filter(item => item !== undefined),
			data: dataList,
		});
	}

	render() {
		const {
			data, selectList, isOpen, searchValue,
		} = this.state;

		return (

			<Form>
				<div className="yc-group-search">
					<Input
						className="yc-group-input"
						onInput={e => this.inputValue(e)}
						value={searchValue}
						onFocus={e => this.inputSearchFoucs(e)}
						onBlur={e => this.inputSearchBlur(e)}
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

				{data && data.length > 0 ? (
					<Table
						columns={columns}
						dataSource={data}
						showHeader={false}
						style={{ width: '100%' }}
						defaultExpandAllRows
						pagination={false}
						onRowClick={(record) => {
							if (!record.children) {
								const w = window.open('about:blank');
								w.location.href = '#/monitor';
							}
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
