/* eslint-disable no-restricted-syntax */
import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, DatePicker, Select, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	judgement, // 列表
	exportAll, // 导出所有
	exportCurrent, // 本页导出
} from '@/utils/api/search';
import {
	Spin, Input, Button, timeRule,
} from '@/common';
import { parseQuery, generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import WritTable from './table';
import './style.scss';

const _style1 = { width: 274 };
const _style2 = { width: 120 };
const _style3 = { width: 120 };
const _style4 = { width: 1130 };
const { Option } = Select;
const createForm = Form.create;

class WRIT extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			loading: false,
			params: {},
			startTime: undefined,
			endTime: undefined,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			Sort: undefined,
			inputSearch: {},
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			params,
		});
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
			current, pageSize,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();

		const params = {
			num: pageSize,
			page: current,
			...fildes,
			...value,
		};
		this.setState({
			loading: true,
		});
		judgement(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page,
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			page: 1,
		});
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();
		const params = {
			...fildes,
			current: 1,
			num: pageSize,
			page: 1,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			this.getData(params); // 进入页面请求数据
		}
	}

	// page翻页
	handleChangePage = (val) => {
		const { pageSize } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();
		const params = {
			...fildes,
			current: val,
			num: pageSize,
			page: val,
		};
		this.setState({
			page: val,
			loading: true,
		});

		judgement(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page,
					loading: false,
				});
			} else {
				message.error(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}

	// 时间排序
	SortTime = () => {
		const { dataList, Sort, inputSearch } = this.state;
		const params = {
			sort: Sort === 'DESC' ? 1 : 0,
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			Sort: Sort === 'DESC' ? 'ASC' : 'DESC',
		});
	}

	// 搜索
	search = () => {
		const { form: { getFieldsValue } } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const fildes = getFieldsValue();
		fildes.publishStart = startTime;
		fildes.publishEnd = endTime;
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/writ', fildes));
		this.setState({
			page: 1,
			inputSearch: fildes,
			Sort: undefined,
		});

		const params = {
			...fildes,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			this.getData(params); // 进入页面请求数据
		} else {
			message.error('请至少输入一个搜索条件');
		}
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/writ');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			Sort: undefined,
		});
		resetFields('');
	}

	// 全部导出
	handleExportExcelAll = () => {
		const { Sort } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			Sort,
		};
		const start = new Date().getTime(); // 获取接口响应时间
		const hide = message.loading('正在下载中，请稍后...', 0);

		exportAll(params).then((res) => {
			if (res.status === 200) {
				const now = new Date().getTime();
				const latency = now - start;
				const downloadElement = document.createElement('a');
				downloadElement.href = res.responseURL;
				// document.body.appendChild(downloadElement);
				downloadElement.click(); // 点击下载
				this.setState({
					loading: false,
				});
				// 异步手动移除
				setTimeout(hide, latency);
			} else {
				message.error('请求失败');
			}
		});
	};

	// 本页导出
	handleExportCurrent= () => {
		const { pageSize, current, Sort } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			Sort,
			page: current,
			num: pageSize,
		};
		const start = new Date().getTime(); // 获取接口响应时间
		const hide = message.loading('正在下载中，请稍后...', 0);

		exportCurrent(params).then((res) => {
			if (res.status === 200) {
				const now = new Date().getTime();
				const latency = now - start;
				const downloadElement = document.createElement('a');
				downloadElement.href = res.responseURL;
				// document.body.appendChild(downloadElement);
				downloadElement.click(); // 点击下载
				this.setState({
					loading: false,
				});
				// 异步手动移除
				setTimeout(hide, latency);
			} else {
				message.error('请求失败');
			}
		});
	};

	render() {
		const {
			loading, dataList, params, totals, current, page, pageSize, Sort,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;

		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="全文"
						style={_style4}
						size="large"
						placeholder="姓名/公司名称/关键字"
						{...getFieldProps('content', {
							initialValue: params ? params.content : '',
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="案号"
						style={_style1}
						size="large"
						placeholder="案件编号"
						{...getFieldProps('ah', {
							initialValue: params ? params.ah : '',
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="案由"
						style={_style1}
						size="large"
						placeholder="案件内容提要"
						{...getFieldProps('reason', {
							initialValue: params ? params.reason : '',
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="起诉法院"
						style={_style1}
						size="large"
						placeholder="法院名称"
						{...getFieldProps('court', {
							initialValue: params ? params.court : '',
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div style={{ borderBottom: '1px solid #F0F2F5' }}>
					<div className="yc-query-item">
						<span className="yc-query-item-title">发布时间: </span>
						<DatePicker
							size="large"
							allowClear
							style={_style2}
							placeholder="开始日期"
							{...getFieldProps('publishStart', {
								initialValue: params ? params.publishStart : '',
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishEnd'))
						}
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							size="large"
							allowClear
							style={_style2}
							placeholder="结束日期"
							{...getFieldProps('publishEnd', {
								initialValue: params ? params.publishEnd : '',
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishStart'))
							}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">案件类型: </span>
						<Select
							size="large"
							allowClear
							style={_style3}
							placeholder="请选择案件类型"
							{...getFieldProps('caseType', {
								initialValue: params ? params.caseType : '',
							})}
						>
							<Option value="刑事案件">刑事案件</Option>
							<Option value="民事案件">民事案件</Option>
							<Option value="行政案件">行政案件</Option>
							<Option value="赔偿案件">赔偿案件</Option>
							<Option value="执行案件">执行案件</Option>
							<Option value="知识产权">知识产权</Option>
							<Option value="商事">商事</Option>
							<Option value="海事海商">海事海商</Option>
							<Option value="申诉">申诉</Option>
							<Option value="其他">其他</Option>
						</Select>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button
							onClick={this.search}
							size="large"
							type="warning"
							style={{ width: 84 }}
						>
							查询
						</Button>
						<Button
							onClick={this.queryReset}
							size="large"
							style={{ width: 120 }}
						>
							重置查询条件
						</Button>
					</div>
				</div>
				<div className="yc-writ-tablebtn">
					{dataList.length > 0 && <Button style={{ marginRight: 5 }} onClick={this.handleExportCurrent}>本页导出</Button>}
					<Button disabled={dataList.length === 0} onClick={dataList.length > 0 && this.handleExportExcelAll}>全部导出</Button>
					{dataList.length > 0 && (
					<div style={{
						float: 'right', lineHeight: '30px', color: '#929292', fontSize: '12px',
					}}
					>
						{`源诚科技为您找到${totals}条信息`}
					</div>
					)}
				</div>
				<Spin visible={loading}>
					<WritTable
						stateObj={this.state}
						dataList={dataList}
						getData={this.getData}
						openPeopleModal={this.openPeopleModal}
						SortTime={this.SortTime}
						Sort={Sort}
					/>
					<div className="yc-pagination">
						<Pagination
							total={totals && totals > 1000 ? 1000 : totals}
							current={current}
							pageSize={pageSize} // 默认条数
							showQuickJumper
							showSizeChanger
							onShowSizeChange={this.onShowSizeChange}
							showTotal={() => `共 ${totals} 条记录`}
							onChange={(val) => {
								// 存在数据才允许翻页
								if (dataList.length > 0) {
									this.handleChangePage(val);
								}
							}}
						/>
					</div>
					{page === 100 && (
					<span style={{
						color: '#929292', fontSize: 12, float: 'right', lineHeight: 1,
					}}
					>
					如需更多数据请联系：186-5718-6471
					</span>
					)}
				</Spin>
			</div>
		);
	}
}

export default createForm()(WRIT);
