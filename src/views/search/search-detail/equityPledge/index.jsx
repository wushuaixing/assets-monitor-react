import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Select, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Spin, Input, Button, timeRule, Download, DatePicker,
} from '@/common';
import InputPrice from '@/common/input/input-price';
import AuctionTable from './table';
import {
	parseQuery, generateUrlWithParams, objectKeyIsEmpty,
} from '@/utils';
import {
	fullAssetSearch, // 列表
	fullAssetSearchExport, // 导出
	equityPledgeExport, // 本页导出
	equityPledgeExportAll, // 导出全部
	equityPledgeSearch, // 全文搜索
} from '@/utils/api/search';
import { ScrollAnimation } from '@/utils/changeTime';
import defaultOrder from '@/assets/img/icon/icon_arrow.png';
import EquityPledgeTable from './table';
import './style.scss';

const _style1 = { width: 278 };
const _style2 = { width: 180 };
const createForm = Form.create;

class EquityPledge extends React.Component {
	constructor(props) {
		super(props);
		document.title = '股权质押-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			inputSearch: {},
			field: undefined,
			order: undefined,
			loading: false,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			startTime: undefined,
			endTime: undefined,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.setState({
			params,
			regDateStart: params.regDateStart,
			regDateEnd: params.regDateEnd,
		});
		// 判断是否为空对象,非空请求接口
		if (Object.keys(params).length !== 0) {
			this.getData(params); // 进入页面请求数据
		}
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
			current, pageSize, regDateStart, regDateEnd,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const Fields = getFieldsValue();

		const params = {
			num: pageSize,
			page: current,
			...Fields,
			regDateStart,
			regDateEnd,
			...value,
		};
		this.setState({
			loading: true,
		});
		equityPledgeSearch(params).then((res) => {
			this.setState({ loading: false });

			if (res && res.data) {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
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

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current: 1,
			page: 1,
		});

		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { regDateStart, regDateEnd } = this.state;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			current: 1,
			num: pageSize,
			page: 1,
			regDateStart,
			regDateEnd,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		const {
			pageSize, regDateStart, regDateEnd, field, order,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			num: pageSize,
			page: val,
			field,
			order,
			regDateStart,
			regDateEnd,
		};
		this.setState({
			current: val,
			page: val,
			loading: true,
		});
		// 获取当前高度，动态移动滚动条
		const currentY = document.documentElement.scrollTop || document.body.scrollTop;
		ScrollAnimation(currentY, 0);
		equityPledgeSearch(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
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
		const { form: { getFieldsValue } } = this.props;
		const { regDateStart, regDateEnd } = this.state;
		const Fields = getFieldsValue();
		Fields.regDateStart = regDateStart;
		Fields.regDateEnd = regDateEnd;
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/auction', Fields));
		this.setState({
			page: 1,
			current: 1,
			inputSearch: Fields,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
		});
		const params = {
			...Fields,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(Fields)) {
			this.getData(params); // 进入页面请求数据
		} else {
			this.queryReset();
			// message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/auction');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
			regDateStart: undefined,
			regDateEnd: undefined,
			inputSearch: {},
		});
		resetFields('');
	};


	// 导出
	toExportCondition=(type) => {
		const {
			pageSize, current, field, order, regDateStart, regDateEnd,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			field,
			order,
			regDateStart,
			regDateEnd,
		};

		return Object.assign({}, params);
	};

	// 默认排序
	defaultSort = () => {
		const { inputSearch, dataList } = this.state;
		const params = {
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			auctionSort: undefined,
			currentSort: undefined,
			assessmentSort: undefined,
			field: undefined,
			order: undefined,
		});
	};

	// 时间排序
	auctionSort = () => {
		const { inputSearch, auctionSort, dataList } = this.state;
		const params = {
			field: 'START',
			order: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			auctionSort: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'START',
			order: auctionSort === 'DESC' ? 'ASC' : 'DESC',
			currentSort: undefined,
			assessmentSort: undefined,
		});
	};

	// 当前价格排序
	currentSort = () => {
		const { inputSearch, currentSort, dataList } = this.state;
		const params = {
			field: 'CURRENT_PRICE',
			order: currentSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			currentSort: currentSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'CURRENT_PRICE',
			order: currentSort === 'DESC' ? 'ASC' : 'DESC',
			auctionSort: undefined,
			assessmentSort: undefined,
		});
	};

	// 评估价格排序
	assessmentSort = () => {
		const { inputSearch, assessmentSort, dataList } = this.state;
		const params = {
			field: 'CONSULT_PRICE',
			order: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			...inputSearch,
		};
		if (dataList.length > 0) {
			this.getData(params); // 进入页面请求数据
		}
		this.setState({
			assessmentSort: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			field: 'CONSULT_PRICE',
			order: assessmentSort === 'DESC' ? 'ASC' : 'DESC',
			auctionSort: undefined,
			currentSort: undefined,
		});
	};

	render() {
		const {
			loading, dataList, params, totals, current, page, pageSize, auctionSort, currentSort, assessmentSort, inputSearch,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="个人/企业"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="个人/企业名称"
						{...getFieldProps('name', {
							initialValue: params.name,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">质押角色: </span>
					<Select
						size="large"
						allowClear
						placeholder="请选择质押角色"
						style={_style2}
						{...getFieldProps('role', {
							initialValue: params.role,
						})}
					>
						<Select.Option key="0" value="0">出质人</Select.Option>
						<Select.Option key="1" value="1">质权人</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<Input
						title="标的企业"
						maxLength="40"
						style={_style1}
						size="large"
						placeholder="股权标的企业名称"
						{...getFieldProps('companyName', {
							initialValue: params.companyName,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">登记状态: </span>
					<Select
						size="large"
						allowClear
						placeholder="请选择登记状态"
						style={_style2}
						{...getFieldProps('state', {
							initialValue: params.state,
						})}
					>
						<Select.Option key="0" value="0">有效</Select.Option>
						<Select.Option key="1" value="1">无效</Select.Option>
					</Select>
				</div>
				<div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable">登记日期: </span>
						<DatePicker
							{...getFieldProps('regDateStart', {
								initialValue: params.startTime,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										regDateStart: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('regDateEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable">至</span>
						<DatePicker
							{...getFieldProps('regDateEnd', {
								initialValue: params.endTime,
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										regDateEnd: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('regDateStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 110, marginRight: 0 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-auction-tablebtn">
					{
						dataList.length > 0 && (
						<Download
							condition={() => this.toExportCondition('current')}
							style={{ marginRight: 10 }}
							api={equityPledgeExport}
							current
							page
							num
							text="本页导出"
						/>
						)
					}
					<Download
						disabled={dataList.length === 0}
						condition={() => this.toExportCondition('all')}
						api={equityPledgeExportAll}
						all
						page
						num
						text="全部导出"
					/>
					<div className="yc-btn-right">
						{dataList.length > 0 && <span className="yc-right-total">{`源诚科技为您找到${totals}条信息`}</span>}
					</div>
				</div>
				<Spin visible={loading}>
					<EquityPledgeTable
						stateObj={this.state}
						dataList={dataList}
						getData={this.getData}
						openPeopleModal={this.openPeopleModal}
					/>
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
						<div style={{
							color: '#929292', fontSize: 12, textAlign: 'right', lineHeight: 1, paddingBottom: '20px',
						}}
						>
							如需更多数据请联系：186-5718-6471
						</div>
					)}
				</Spin>
			</div>
		);
	}
}

export default createForm()(EquityPledge);
