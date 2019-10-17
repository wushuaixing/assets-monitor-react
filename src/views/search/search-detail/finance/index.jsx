import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Pagination, message, DatePicker,
} from 'antd';

import { navigate } from '@reach/router';
import { parseQuery, generateUrlWithParams } from '@/utils';
import {
	timeRule, Spin, Input, Button, Download,
} from '@/common';
import FinanceTable from './table';
import {
	finance, // 列表
	exportFinanceAll, // 全部导出
	exportFinanceCurrent, // 本页导出
} from '@/utils/api/search';

import './style.scss';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 100 };
class FINANCE extends React.Component {
	constructor(props) {
		super(props);
		document.title = '金融资产-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			startTimeStart: undefined,
			startTimeEnd: undefined,
			endTimeStart: undefined,
			endTimeEnd: undefined,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		window._addEventListener(document, 'keyup', this.toKeyCode13);
		this.setState({
			params,
			startTimeStart: params.startTimeStart,
			startTimeEnd: params.startTimeEnd,
			endTimeStart: params.endTimeStart,
			endTimeEnd: params.endTimeEnd,
		});
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
	}

	componentWillUpdate() {
		window.scrollTo(0, 0); // 回到顶部
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
		finance(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.totalCount,
					current: res.data.page, // 翻页传选中页数，其他重置为1
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

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		const {
			pageSize, startTimeStart, startTimeEnd, endTimeStart, endTimeEnd,
		} = this.state;
		fildes.startTimeStart = startTimeStart;
		fildes.startTimeEnd = startTimeEnd;
		fildes.endTimeStart = endTimeStart;
		fildes.endTimeEnd = endTimeEnd;
		navigate(generateUrlWithParams('/search/detail/finance', fildes));
		this.setState({
			page: 1,
		});
		const params = {
			...fildes,
			page: 1,
			num: pageSize,
		};
		if (fildes.content) {
			this.getData(params);
		} else {
			this.queryReset();
			// message.error('请输入搜索条件');
		}
	}

	// 导出
	toExportCondition=(type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			pageSize, current, startTimeStart, startTimeEnd, endTimeStart, endTimeEnd,
		} = this.state;
		const fields = getFieldsValue();

		const params = {
			...fields,
			startTimeStart,
			startTimeEnd,
			endTimeStart,
			endTimeEnd,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
		};
		return Object.assign({}, params);
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.setState({
			pageSize: 10,
			dataList: [],
			totals: 0,
			page: 1,
			startTimeStart: undefined,
			startTimeEnd: undefined,
			endTimeStart: undefined,
			endTimeEnd: undefined,
			params: {},
		});
		navigate(generateUrlWithParams('/search/detail/finance', {}));
	}

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
			num: pageSize,
			page: 1,
		};
		if (fildes.content) {
			this.getData(params);
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

		finance(params).then((res) => {
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


	render() {
		const {
			loading, totals, current, dataList, page, pageSize, params,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;

		return (
			<div className="yc-content-query">
				<div className="yc-content-header">
					<div className="yc-query-item">
						<Input
							title="全文"
							style={_style1}
							size="large"
							placeholder="标题/关键字"
							{...getFieldProps('content', {
								initialValue: params.content,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="项目名称"
							style={_style1}
							size="large"
							placeholder="处置法院/单位"
							{...getFieldProps('projectName', {
								initialValue: params.projectName,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">挂牌起始日期: </span>
						<DatePicker
							{...getFieldProps('startTimeStart', {
								initialValue: params.startTimeStart,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTimeStart: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('startTimeEnd', {
								initialValue: params.startTimeEnd,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTimeEnd: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTimeStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">挂牌期满日期: </span>
						<DatePicker
							{...getFieldProps('endTimeStart', {
								initialValue: params.endTimeStart,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTimeStart: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('endTimeEnd', {
								initialValue: params.endTimeEnd,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTimeEnd: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('endTimeStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-writ-tablebtn">
					{dataList.length > 0 && <Download condition={() => this.toExportCondition('current')} style={{ marginRight: 5 }} api={exportFinanceCurrent} current page num text="本页导出" />}
					<Download disabled={dataList.length === 0} condition={() => this.toExportCondition('all')} api={exportFinanceAll} all page num text="全部导出" />
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
					<FinanceTable stateObj={this.state} dataList={dataList} getData={this.getData} openPeopleModal={this.openPeopleModal} />
					{dataList && dataList.length > 0 && (
					<div className="yc-table-pagination">
						<Pagination
							total={totals && totals > 1000 ? 1000 : totals}
							current={current}
							pageSize={pageSize} // 默认条数
							pageSizeOptions={['10', '25', '50']}
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
					)}
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

export default createForm()(FINANCE);
