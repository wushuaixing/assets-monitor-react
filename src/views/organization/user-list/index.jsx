import React from 'react';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import Pagination from 'antd/lib/pagination';
import '../style.scss';
import { navigate } from '@reach/router';
import Search from '../search';

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
					title: '账号',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '角色',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '上次登录',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '状态',
					dataIndex: 'state',
					key: 'state',
					render: text => (
						<React.Fragment>
							{
								text === 1 ? (
									<React.Fragment>
										<p className="circle-item">启用</p>
									</React.Fragment>

								) : (
									<React.Fragment>
										<p className="no-attention">禁用</p>
									</React.Fragment>
								)
							}
						</React.Fragment>

					),
				},
				{
					title: '操作',
					className: 'column-center',
					dataIndex: '',
					key: 'x',
					render: row => (
						<div className="table-btn">
							<p className="click-p" onClick={() => this.handleOpeanLog(row)}>操作记录</p>
						</div>
					),
				},
			],
			data: [
				{
					name: '1111',
					state: 1,
				},
				{
					name: '2222',
					state: 2,
				},
			],
			total: 0,
		};
	}

	getTableData=() => {

	}

	handleOpeanLog=(row) => {
		navigate('/organization/operate/log');
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

	search=(val) => {
		console.log('zzz', val);
	}

	render() {
		const {
			columns, total, data, searchData,
		} = this.state;
		return (
			<div className="push-manage">
				<Search placeholder="姓名/手机号" onSearch={(val) => { this.search(val); }} />
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
					<Select defaultValue="lucy" size="large">
						<Select.Option value="jack">Jack</Select.Option>
						<Select.Option value="lucy">Lucy</Select.Option>
						<Select.Option value="disabled" disabled>Disabled</Select.Option>
						<Select.Option value="yiminghe">yiminghe</Select.Option>
					</Select>
				</div>
				<div className="table">
					<Table
						columns={columns}
						dataSource={data}
						className="table"
						pagination={false}
					/>
					<div className="page-size">
						<Pagination
							current={searchData.page}
							pageSize={searchData.num}
							total={total}
							showTotal={val => `共 ${val} 条`}
							showSizeChanger
							showQuickJumper
							onShowSizeChange={(val, pageSize) => {
								this.handleChangePage(val, 'num', pageSize);
							}}
							onChange={(val) => {
								this.handleChangePage(val, 'page', '');
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
