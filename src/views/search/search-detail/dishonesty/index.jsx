import React from 'react';
import {
	Form, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Spin, Input, Button, Download,
} from '@/common';
import {
	parseQuery, generateUrlWithParams, objectKeyIsEmpty,
} from '@/utils';
import {
	dishonestyExport, // 本页导出
	dishonestyExportAll, // 导出全部
	dishonestySearch, // 全文搜索
} from '@/utils/api/search';
import { ScrollAnimation } from '@/utils/changeTime';
import EquityPledgeTable from './table';

const _style1 = { width: 360 };
const createForm = Form.create;

class Dishonesty extends React.Component {
	constructor(props) {
		super(props);
		document.title = '失信记录-信息搜索';
		this.state = {
			dataList: [],
			params: {},
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			sortColumn: undefined,
			sortOrder: undefined,
			Sort: undefined,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		console.log('params === ', params);
		this.setState({
			params,
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
			current, pageSize,
		} = this.state;
		const { form } = this.props;
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			num: pageSize,
			page: current,
			...Fields,
			...value,
		};
		this.setState({
			loading: true,
		});
		console.log('request params ==== ', params);
		dishonestySearch(params).then((res) => {
			if (res && res.data) {
				// 获取当前高度，动态移动滚动条
				const currentY = document.documentElement.scrollTop || document.body.scrollTop;
				ScrollAnimation(currentY, 0);
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

	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize,
			current,
			page: current,
		});

		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			current,
			num: pageSize,
			page: current,
		};
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			this.getData(params); // 进入页面请求数据
		}
	};

	// page翻页
	handleChangePage = (val) => {
		console.log('handleChangePage val === ', val);
		const {
			pageSize, sortColumn, sortOrder,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const Fields = getFieldsValue();
		const params = {
			...Fields,
			num: pageSize,
			page: val,
			sortColumn,
			sortOrder,
		};
		this.setState({
			current: val,
			page: val,
			loading: true,
		});
		console.log('handleChangePage params === ', params);
		this.getData(params);
	};

	// 搜索
	search = () => {
		const { form: { getFieldsValue } } = this.props;
		const fields = getFieldsValue();
		const { pageSize } = this.state;
		navigate(generateUrlWithParams('/search/detail/dishonesty', fields));
		this.setState({
			page: 1,
			current: 1,
			params: fields,
			sortOrder: undefined,
			Sort: undefined,
		});
		const params = {
			...fields,
			page: 1,
			num: pageSize,
		};

		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			this.getData(params);
		} else {
			this.queryReset();
			// message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		navigate('/search/detail/equityPledge');
		this.setState({
			params: {},
			dataList: [],
			totals: 0,
			pageSize: 10,
			page: 1,
			sortOrder: undefined,
			Sort: undefined,
		});
		resetFields('');
	};

	// 导出
	toExportCondition=(type) => {
		const {
			pageSize, current, sortOrder, sortColumn,
		} = this.state;
		const { form } = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const params = {
			...fields,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			sortOrder,
			sortColumn,
		};
		return Object.assign({}, params);
	};

	// 时间排序
	SortTime = () => {
		const {
			params, Sort, dataList, pageSize, page,
		} = this.state;
		let _Sort;
		if (Sort === undefined) _Sort = 'DESC';
		if (Sort === 'DESC') _Sort = 'ASC';
		if (Sort === 'ASC') _Sort = undefined;
		const sortColumn = _Sort === undefined ? undefined : 'REG_DATE';
		const sortOrder = _Sort;
		const Params = {
			sortColumn,
			sortOrder,
			...params,
			page,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		console.log('sort Params === ', Params);
		if (dataList.length > 0) {
			this.getData(Params);
		}
		this.setState({
			Sort: _Sort,
			sortOrder: _Sort,
			sortColumn,
		});
	};

	render() {
		const {
			loading, dataList, params, totals, current, page, pageSize, Sort,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="被执行人"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="个人/企业名称，请填写至少2个汉字"
						{...getFieldProps('obligorName', {
							initialValue: params.obligorName,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						size="large"
						maxLength="40"
						placeholder="身份证号码/组织机构代码"
						{...getFieldProps('obligorNumber', {
							initialValue: params.obligorNumber,
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 110, marginRight: 0 }}>重置查询条件</Button>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-noTab-hr" />
				<div className="yc-auction-tablebtn">
					{
						dataList.length > 0 && (
						<Download
							condition={() => this.toExportCondition('current')}
							style={{ marginRight: 10 }}
							api={dishonestyExport}
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
						api={dishonestyExportAll}
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
						dataList={dataList}
						getData={this.getData}
						SortTime={this.SortTime}
						Sort={Sort}
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

export default createForm()(Dishonesty);
