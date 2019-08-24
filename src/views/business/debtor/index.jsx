import React from 'react';
import {
	Select, message, Pagination, Form,
} from 'antd';
import TableList from './table';
import {
	obligorList, // 列表
	exportExcel, // 导出
} from '@/utils/api/debator';

import { Spin, Input, Button } from '@/common';
import './style.scss';

const createForm = Form.create;
const { Option } = Select;
const _style1 = { width: 274 };
const _style3 = { width: 80 };
const dishonstList = [
	{ id: 1, name: '全部', value: '' },
	{ id: 2, name: '未失信', value: 0 },
	{ id: 3, name: '已失信', value: 1 },
	{ id: 4, name: '曾失信', value: 2 },
];

class BusinessDebtor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
			loading: false,
			searchValue: null,
			dataList: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize, startTime, endTime,
		} = this.state;
		const params = {
			num: pageSize,
			page: current,
			...value,
			uploadTimeStart: startTime, // 搜索时间
			uploadTimeEnd: endTime,
		};
		this.setState({
			loading: true,
		});
		obligorList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: value && value.current ? value.current : 1, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 一键导出
	handleExportExcel = () => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
		};
		// const hide = message.loading('正在下载中，请稍后...', 0);
		// // 异步手动移除
		// setTimeout(hide, 2500);
		exportExcel(params).then((res) => {
			if (res.status === 200) {
				const downloadElement = document.createElement('a');
				downloadElement.href = res.responseURL;
				// document.body.appendChild(downloadElement);
				downloadElement.click(); // 点击下载
				this.setState({
					loading: false,
				});
				message.loading('下载成功');
			} else {
				message.error('请求失败');
			}
		});
	}

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();

		const params = {
			...fildes,
			page: 1,
			num: 10,
		};
		this.getData(params);
		this.setState({
			searchValue: params,
		});
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.getData();
		this.setState({
			searchValue: {},
		});
	}

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
		};

		this.getData(params);
	}


	handleKeyDown = (e) => {
		console.log(1, e);
	}


	render() {
		const {
			totals, current, loading, dataList,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;

		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="债务人"
						style={_style1}
						size="large"
						placeholder="姓名/公司名称"
						onkeydown={e => this.handleKeyDown(e)}
						onFocus={e => this.handleKeyDown(e)}
						{...getFieldProps('obligorName', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.replace(/\s+/g, ''),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('obligorNumber', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.replace(/\s+/g, ''),
						})}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">信用状态: </span>
					<Select
						size="large"
						defaultValue="all"
						style={_style3}
						{...getFieldProps('dishonestStatus', {
							initialValue: '',
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
						})}
					>
						{dishonstList.map(item => <Option key={item.key} value={item.value}>{item.name}</Option>)}
					</Select>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
				<div className="yc-business-tablebtn">
					<Button onClick={this.handleExportExcel} className="yc-business-btn" style={{ float: 'right' }}>
						<span className="yc-icon-export" />
						一键导出
					</Button>
				</div>
				<Spin visible={loading}>
					<TableList stateObj={this.state} dataList={dataList} getData={this.getData} />
				</Spin>
				<div className="yc-pagination">
					<Pagination
						total={totals}
						current={current}
						defaultPageSize={10} // 默认条数
						showQuickJumper
						showTotal={total => `共 ${total} 条记录`}
						onChange={(val) => {
							this.handleChangePage(val);
						}}
					/>
					{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
				</div>
			</div>
		);
	}
}
export default createForm()(BusinessDebtor);
