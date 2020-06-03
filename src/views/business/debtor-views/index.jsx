import React from 'react';
import {
	Select, message, Pagination, Form,
} from 'antd';
import TableList from './table';
import {
	obligorList, // 列表
	exportExcel, // 导出
} from '@/utils/api/debator';

import {
	Spin, Input, Button, Download,
} from '@/common';
import './style.scss';

const createForm = Form.create;
const { Option } = Select;
const _style1 = { width: 278 };
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
		document.title = '债务人-业务管理';
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
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}


	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();
		const params = {
			num: pageSize,
			page: current,
			...fildes,
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
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 导出
	toExportCondition=(type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			startTime, endTime, selectedRowKeys,
		} = this.state;
		const fields = getFieldsValue();
		const params = {
			...fields,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};
		if (type === 'all') {
			return Object.assign({}, params);
		}
		return Object.assign({}, params, { idList: selectedRowKeys });
	};

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
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		const params = {
			page: 1,
		};
		this.getData(params);
		this.setState({
			searchValue: '',
		});
	};

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
		};
		this.setState({
			loading: true,
		});
		obligorList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};


	handleKeyDown = (e) => {
		console.log(1, e);
	};


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
						maxLength="40"
						placeholder="姓名/公司名称"
						onkeydown={e => this.handleKeyDown(e)}
						onFocus={e => this.handleKeyDown(e)}
						{...getFieldProps('obligorName', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						maxLength="18"
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('obligorNumber', {
							getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, ''),
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
					<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 120, marginRight: 0 }}>重置查询条件</Button>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />

				<div className="yc-business-tablebtn">
					<div className="yc-public-floatRight">
						<Download condition={() => this.toExportCondition('all')} style={{ marginRight: 0 }} api={exportExcel} all text="一键导出" />
					</div>
				</div>
				<Spin visible={loading}>
					<TableList stateObj={this.state} dataList={dataList} getData={this.getData} />
					{dataList && dataList.length > 0 && (
						<div className="yc-table-pagination">
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
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
export default createForm()(BusinessDebtor);
