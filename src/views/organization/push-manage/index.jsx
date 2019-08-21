import React from 'react';
import {
	Button, Select, Table, Pagination, message, Modal,
} from 'antd';
import '../style.scss';
import EditModal from './editModal';
import Search from '../search';
import {
	pushManagerList, // 消息提醒
} from '@/utils/api/organization';
import { Spin } from '@/common';

const { confirm } = Modal;
export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchData: {
				num: 10,
				page: 1,
				searchKeyWord: '',
			},
			columns: [
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '手机号',
					dataIndex: 'mobile',
					key: 'mobile',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '邮箱',
					dataIndex: 'email',
					key: 'email',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '角色',
					dataIndex: 'role',
					key: 'role',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '操作',
					className: 'column-center',
					dataIndex: '',
					key: 'x',
					render: row => (
						<div className="table-btn">
							<p className="click-p" onClick={() => this.handleOpeanModal('edit', row)}>编辑</p>
							<span className="ant-divider" />
							<p className="click-p" onClick={() => this.handleDel(row)}>删除</p>
						</div>
					),
				},
			],
			data: [],
			modalVisible: false,
			selectData: {},
			modalState: 'add',
			total: 0,
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
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}

	handleChangePage=(val, type, size) => {
		const { searchData } = this.state;
		if (size) {
			searchData[type] = size;
		} else {
			searchData[type] = val;
		}
		this.setState({ searchData });
		this.getTableData();
	}

	handleOpeanModal=(type, row) => {
		this.setState({ modalVisible: true, modalState: type, selectData: row || {} });
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
				that.setState({ visible: true });
				// 删除接口
				(row.businessId).then((res) => {
					that.setState({ visible: false });
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
			modalVisible, modalState, selectData, loading,
		} = this.state;
		if (modalVisible) {
			return (
				<EditModal modalState={modalState} propsData={selectData} handleCancel={() => this.handleCancel()} />
			);
		}
		return null;
	}

	search=(val) => {
		console.log('zzz', val);
	}

	render() {
		const {
			columns, total, data, searchData,
		} = this.state;
		return (
			<div className="push-manage">
				<Search placeholder="姓名/手机号/邮箱" onSearch={(val) => { this.search(val); }} />
				{/* <div className="search-item">
					<InputGroup className="search-group">
						<Input size="large" placeholder="姓名/手机号/邮箱" />
						<div className="ant-input-group-wrap" onClick={() => { this.getTableData(); }}>
							<p>搜索</p>
						</div>
					</InputGroup>
				</div> */}
				<div className="search-item">
					<p>角色：</p>
					<Select defaultValue="lucy" size="large" allowClear>
						<Select.Option value="jack">全部</Select.Option>
						<Select.Option value="lucy">系统账号</Select.Option>
						<Select.Option value="disabled">非系统账号</Select.Option>
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
							current={searchData.page}
							pageSize={searchData.num}
							total={total}
							showTotal={val => `共 ${val} 条`}
							showQuickJumper
							onChange={(val) => {
								this.handleChangePage(val, 'page', '');
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
