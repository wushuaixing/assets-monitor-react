import React from 'react';
import {
	Breadcrumb, Button, Select, Table, Pagination,
} from 'antd';
import './style.scss';
import { navigate } from '@reach/router';
import {
	userOperateList, // 操作列表
	operateTypeList, // 操作类型
} from '@/utils/api/organization';
import { Spin } from '@/common';
import { formatDateTime } from '../../../utils/changeTime';
import { getQueryByName } from '@/utils';

const { Option } = Select;
export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			total: 0,
			current: 1,
			operateList: [],
			loading: false,
			pageSize: 10,
			hash: '',
			target: '',
			columns: [
				{
					title: '操作时间',
					dataIndex: 'createTime',
					key: 'createTime',
					render: text => (
						<p>{formatDateTime(text) || '--'}</p>
					),
				},
				{
					title: '操作类型',
					dataIndex: 'target',
					key: 'target',
					render: text => (
						<p>{this.matchingType(text) || '--'}</p>
					),
				},
			],
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		this.setState({
			hash,
		});
		this.getTableData();
		this.getRole();
	}

	// 匹配操作类型
	// eslint-disable-next-line consistent-return
	matchingType = (type) => {
		const { operateList } = this.state;
		if (operateList && operateList.length > 0) {
			const list = operateList.filter(item => item.target === type);
			return list[0].type;
		}
	}

	getRole = () => {
		operateTypeList().then((res) => {
			if (res.code === 200) {
				this.setState({
					operateList: res.data,
				});
			}
		}).catch(() => {});
	}

	getTableData=(data) => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'userId');
		const params = {
			...data,
			num: 10,
			userId,
		};
		this.setState({
			loading: true,
		});
		userOperateList(params).then((res) => {
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
		const { pageSize, target } = this.state;
		this.setState({
			current: val,
		});
		const params = {
			num: pageSize,
			page: val,
			target,
		};
		this.getTableData(params);
	}

	// 下拉选中
	handleChange = (searchVal) => {
		console.log(searchVal);
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'userId');
		const params = {
			target: searchVal,
			userId,
		};
		this.getTableData(params);
		this.setState({
			target: searchVal,
		});
	}

	render() {
		const {
			columns, total, data, loading, current, pageSize, operateList, hash,
		} = this.state;

		return (
			<div className="operate-log">
				<div className="bread-crumb">
					<Breadcrumb>
						<Breadcrumb.Item><p style={{ fontSize: 14 }} className="click-p" onClick={() => navigate('/organization/user')}>账户列表</p></Breadcrumb.Item>
						<Breadcrumb.Item>
							<span style={{ 'font-weight': 100 }}>
								{`${getQueryByName(hash, 'name')}_历史操作记录`}

							</span>

						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="search-item">
					<Select placeholder="请选择角色" size="large" onChange={this.handleChange} allowClear style={{ width: 185, 'margin-right': 10 }}>
						{
							operateList && operateList.length > 0 && operateList.map(item => (<Option value={item.target}>{item.type}</Option>))
						}
					</Select>
					<Button
						type="primary"
						size="large"
						style={{ 'margin-right': 10, 'background-color': '#FB5A5C', 'border-color': '#FB5A5C' }}
						// onClick={this.getTableData()}
					>
						搜索
					</Button>
					{/* <Button type="ghost" size="large">清空搜索条件</Button> */}
				</div>
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
			</div>
		);
	}
}
