import React from 'react';
import {
	Button, Select, Table, Pagination, message, Modal,
} from 'antd';
import '../style.scss';
import EditModal from './editModal';
import Search from '../search';
import {
	pushManagerList, // liebiao
	deleteList, // 删除
} from '@/utils/api/organization';
import { Spin } from '@/common';

const { confirm } = Modal;
export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			modalVisible: false,
			modalState: 'add',
			current: 1,
			total: 0,
			loading: false,
			pageSize: 10,
			role: '',
			keyword: '',
			columns: [
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '-'}</p>
					),
				},
				{
					title: '手机号',
					dataIndex: 'mobile',
					key: 'mobile',
					render: text => (
						<p>{text || '-'}</p>
					),
				},
				{
					title: '邮箱',
					dataIndex: 'email',
					key: 'email',
					render: text => (
						<p>{text || '-'}</p>
					),
				},
				{
					title: '角色',
					dataIndex: 'role',
					key: 'role',
					render: (text) => {
						switch (text) {
						case 0: return '系统用户';
						case 1: return '非系统用户';
						default: return '-';
						}
					},
				},
				{
					title: '操作',
					className: 'column-center',
					dataIndex: '',
					key: 'x',
					render: (text, row) => (
						<span>
							<a className="click-p" onClick={() => this.handleOpeanModal('edit', row)}>编辑</a>
							<span className="ant-divider" />
							<a className="click-p" onClick={() => this.handleDel(row)}>删除</a>
						</span>

					),
				},
			],
		};
	}

	componentDidMount() {
		this.getTableData();
	}

	getTableData=(data) => {
		const params = {
			...data,
			num: 10,
		};
		this.setState({
			loading: true,
		});
		pushManagerList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.list,
					total: res.data.total,
					loading: false,
					current: data && data.page ? data.page : 1, // 翻页传选中页数，其他重置为1
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}

	// page翻页
	handleChangePage=(val) => {
		const { pageSize } = this.state;
		this.setState({
			current: val,
		});
		const params = {
			num: pageSize,
			page: val,
		};
		this.getTableData(params);
	}

	// 新增编辑
	handleOpeanModal=(type, row) => {
		this.setState({ modalVisible: true, modalState: type, selectData: row });
	}

	handleCancel=() => {
		this.setState({ modalVisible: false });
	}

	handleDel=(row) => {
		const that = this;
		confirm({
			title: '您是否确认要删除推送设置？',
			content: '点击确定后将为您删除推送设置。',
			onOk() {
				// that.setState({ visible: true });
				// 删除接口
				deleteList(`id: ${row.id}`).then((res) => {
					// that.setState({ visible: false });
					if (res.code === 200) {
						that.getTableData();
						message.success('删除成功');
					} else {
						message.error(res.message);
					}
				}).catch(() => {
					that.setState({ visible: false });
				});
			},
			onCancel() {},
		});
	}

	renderModal=() => {
		const {
			modalVisible, modalState, selectData,
		} = this.state;
		if (modalVisible) {
			return (
				<EditModal modalState={modalState} getTableData={this.getTableData} propsData={selectData} handleCancel={() => this.handleCancel()} />
			);
		}
		return null;
	}

	search=(val) => {
		console.log('zzz', val);
	}

	// 下拉选中
	handleChange = (searchVal) => {
		console.log(searchVal);
		const { keyword } = this.state;
		this.setState({
			role: searchVal,
		});
		const params = {
			role: searchVal,
			keyword,
		};
		this.getTableData(params);
	}

	onKeyup = (e) => {
		console.log(e.target.value);
		const { role } = this.state;
		const { value } = e.target;
		this.setState({
			keyword: value,
		});
		const params = {
			role,
			keyword: value,
		};
		if (e.keyCode === 13) {
			this.getTableData(params);
		}
	}

	clearInput = () => {
		this.setState({
			keyword: '',
		});
	}

	render() {
		const {
			columns, total, data, loading, current, pageSize, keyword, role,
		} = this.state;
		return (
			<div className="push-manage">
				<Search
					placeholder="姓名/手机号/邮箱"
					onSearch={(val) => { this.search(val); }}
					onKeyUp={this.onKeyup}
					getTableData={this.getTableData}
					keyword={keyword}
					role={role}
					clearInput={this.clearInput}
				/>
				<div className="search-item">
					<p>角色：</p>
					<Select placeholder="请选择角色" size="large" allowClear onChange={this.handleChange}>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value={0}>系统账号</Select.Option>
						<Select.Option value={1}>非系统账号</Select.Option>
					</Select>
				</div>
				<Button type="ghost" size="large" style={{ display: 'block', margin: '0 0 15px 0' }} onClick={() => this.handleOpeanModal('add')}>添加推送人</Button>
				<div className="table">
					<Spin visible={loading}>
						<Table
							columns={columns}
							dataSource={data}
							className="table"
							pagination={false}
						/>
					</Spin>
					<div className="page-size">
						<Pagination
							current={current}
							pageSize={pageSize}
							total={total}
							showTotal={val => `共 ${val} 条`}
							showQuickJumper
							onChange={(val) => {
								this.handleChangePage(val);
							}}
						/>
					</div>
				</div>
				{
					this.renderModal()
				}
			</div>
		);
	}
}
