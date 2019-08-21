import React from 'react';
import {
	Breadcrumb, Button, Select, Table, Pagination,
} from 'antd';
import './style.scss';
import { navigate } from '@reach/router';

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
					title: '操作时间',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
					),
				},
				{
					title: '操作类型',
					dataIndex: 'name',
					key: 'name',
					render: text => (
						<p>{text || '--'}</p>
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

	render() {
		const {
			columns, total, data, searchData,
		} = this.state;
		return (
			<div className="operate-log">
				<div className="bread-crumb">
					<Breadcrumb>
						<Breadcrumb.Item><p style={{ fontSize: 14 }} className="click-p" onClick={() => navigate('/organization/user')}>账户列表</p></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 100 }}>邵颖-历史操作记录 Center</span></Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="search-item">
					<Select defaultValue="lucy" size="large" allowClear style={{ width: 185, 'margin-right': 10 }}>
						<Select.Option value="jack">全部</Select.Option>
						<Select.Option value="lucy">系统账号</Select.Option>
						<Select.Option value="disabled">非系统账号</Select.Option>
					</Select>
					<Button
						type="primary"
						size="large"
						style={{ 'margin-right': 10, 'background-color': '#FB5A5C', 'border-color': '#FB5A5C' }}
						onClick={this.getTableData()}
					>
						搜索
					</Button>
					<Button type="ghost" size="large">清空搜索条件</Button>
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
