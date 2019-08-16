import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';
import Pagination from 'antd/lib/pagination';
import message from 'antd/lib/message';
import TableList from './table';
import {
	businessList, // 列表
} from '@/utils/api/business';

import { Input, Button } from '@/common';
import './style.scss';

const createForm = Form.create;

const _style1 = { width: 274 };
const _style2 = { width: 100 };
const text = (
	<div style={{
		width: 250, height: 150,
	}}
	>
		导入流程和注意事项：
		<br />
            1、请先下载模版
		<br />
            2、将需导入的数据填写在下载好的模版内，请严格按照模版内要求进行填写

		<br />
			3、请将填写好的模版上传
		<br />
			4、上传成功—新的业务数据导入成功

		<br />
			5、上传失败—请按照相关提示进行修改后再次上传

		<br />
	</div>
);

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openRowSelection: false,
			dataList: [], // 接口返回数据
			selectedRowKeys: [], // 这里配置默认勾选列
			selectData: [], // 选中数组
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
		};
	}

	componentDidMount() {
		this.getData();
	}

	// 获取消息列表
	getData = (value) => {
		const { current, pageSize } = this.state;
		const params = {
			page: {
				num: pageSize,
				page: current,
			},
			...value,
		};
		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			// this.setState({ loading: false });
		});
	};

	// //  pagesize页面翻页可选
	// onShowSizeChange = (current, pageSize) => {
	// 	console.log(current, pageSize);

	// 	const { form } = this.props; // 会提示props is not defined
	// 	const { getFieldsValue } = form;
	// 	const fields = getFieldsValue();
	// 	const params = {
	// 		...fields,
	// 		page: {
	// 			num: pageSize,
	// 			page: current,
	// 		},
	// 	};

	// 	this.getData(params);

	// 	this.setState({
	// 		pageSize,
	// 		current: 1,
	// 	});
	// }

	// page翻页
	handleChangePage = (val) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { repayStartTime, repayEndTime, pageSize } = this.state;
		const fields = getFieldsValue();
		console.log(val, pageSize);
		const params = {
			...fields,
			page: {
				num: pageSize,
				page: val,
			},
		};

		this.getData(params);
		this.setState({
			current: val,
		});
	}

	openManagement = (openRowSelection) => {
		this.setState({
			openRowSelection: !openRowSelection,
			selectedRowKeys: [],
		});
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
			selectData: selectedRows,
		});
	};

	render() {
		const {
			openRowSelection, selectedRowKeys, selectData, totals, current, dataList,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldsValue } = form;
		const fields = getFieldsValue();
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<div className="yc-content-query">
				<Form layout="inline">
					<div className="yc-query-item">
						<Input
							title="业务编号"
							style={_style1}
							size="large"
							placeholder="业务编号"
							{...getFieldProps('a', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="借款人"
							style={_style1}
							size="large"
							placeholder="姓名/公司名称"
							{...getFieldProps('b', {
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="证件号"
							style={_style1}
							size="large"
							placeholder="身份证号/统一社会信用代码"
							{...getFieldProps('c', {
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="机构名称"
							style={_style1}
							size="large"
							placeholder="机构名称"
							{...getFieldProps('d', {
								// initialValue: true,
								// rules: [
								// 	{ required: true, whitespace: true, message: '请填写密码' },
								// ],
							})}
						/>
					</div>

					<div className="yc-query-item">
						<span className="yc-query-item-title">上传时间: </span>
						<DatePicker size="large" style={_style2} placeholder="开始日期" />
						<span className="yc-query-item-title">至</span>
						<DatePicker size="large" style={_style2} placeholder="结束日期" />
					</div>

					<div className="yc-query-item yc-query-item-btn">
						<Button size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
					<div className="yc-split-hr" />

					<div className="yc-business-tablebtn">
						{openRowSelection && (
						<React.Fragment>
							<Button className="yc-business-btn">
								删除
							</Button>
							<Button className="yc-business-btn">
								导出
							</Button>
						</React.Fragment>
						)}
						{!openRowSelection && (
						<React.Fragment>
							<Button className="yc-business-btn">
								模版下载
							</Button>
							<Button className="yc-business-btn">
								导入业务
							</Button>
						</React.Fragment>
						)}
						<Button className="yc-business-btn" onClick={() => this.openManagement(openRowSelection)}>
							{openRowSelection ? '取消管理' : '批量管理'}
						</Button>
						{!openRowSelection && (
						<Button className="yc-business-btn">
							一键导出
						</Button>
						)}
						<Tooltip placement="topLeft" title={text} arrowPointAtCenter>
							<Icon className="yc-business-icon" type="question-circle-o" />
						</Tooltip>
					</div>
					<TableList stateObj={this.state} rowSelection={rowSelection} />
					<div className="yc-pagination">
						<Pagination
							total={totals}
							current={current}
							defaultPageSize={10} // 默认条数
							showQuickJumper
							showTotal={total => `共 ${total} 条记录`}
							onShowSizeChange={this.onShowSizeChange}
							onChange={(val) => {
								this.handleChangePage(val);
							}}
						/>
						<div className="yc-pagination-btn"><Button>跳转</Button></div>
					</div>
				</Form>
			</div>
		);
	}
}
export default createForm()(BusinessView);
