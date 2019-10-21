import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, DatePicker, Tooltip, message, Pagination,
} from 'antd';
import { navigate } from '@reach/router';
import { parseQuery } from '@/utils';
import {
	Spin, Input, Button, Tabs, timeRule, Download,
} from '@/common';
import {
	ktggRelationSearch, // 开庭列表
	trialRelationSearch, // 立案列表
	relationSearchCount, // 数量
	trialRelationSearchExport, // 立案导出
	ktggRelationSerachExport, // 开庭导出
} from '@/utils/api/search';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import LawsuitsTable from './table';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 100 };

class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		document.title = '涉诉信息-信息搜索';
		this.state = {
			urlObj: {},
			dataList: [],
			startTime: undefined,
			endTime: undefined,
			loading: false,
			Sort: undefined,
			getTrialRelationParams: {},
			getKtggRelationParams: {},
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
			field: '',
			order: '',
			ktggRelationCount: '', // 开庭
			trialRelationCount: '', // 立案
			type: 1,
			yg: [
				{
					name: '',
					id: 1,
				},
			],
			bg: [
				{
					name: '',
					id: 1,
				},
			],
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const bgArray = ([urlObj.bg0 || undefined, urlObj.bg1 || undefined, urlObj.bg2 || undefined]);
		const ygArray = ([urlObj.yg0 || undefined, urlObj.yg1 || undefined, urlObj.yg2 || undefined]);
		const getTrialRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			// type: urlObj.type || undefined,
			// ...urlObj,
		};
		const getKtggRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			// type: urlObj.type || undefined,
		};

		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0 && urlObj.type === '1') {
			this.getTrialRelationData(getTrialRelationParams); // 进入页面请求数据
			this.getCount(getTrialRelationParams);
		}
		if (Object.keys(urlObj).length !== 0 && urlObj.type === '2') {
			this.getKtggRelationData(getKtggRelationParams); // 进入页面请求数据
			this.getCount(getKtggRelationParams);
		}

		// 如果存在就增加输入栏
		this.initialValue(urlObj);

		// 输入框默认值
		const { yg, bg } = this.state;
		if (yg[0]) {
			yg[0].name = urlObj.yg0 ? urlObj.yg0 : undefined;
		}
		if (yg[1]) {
			yg[1].name = urlObj.yg1 ? urlObj.yg1 : undefined;
		}
		if (yg[2]) {
			yg[2].name = urlObj.yg2 ? urlObj.yg2 : undefined;
		}
		if (bg[0]) {
			bg[0].name = urlObj.bg0 ? urlObj.bg0 : undefined;
		}
		if (bg[1]) {
			bg[1].name = urlObj.bg1 ? urlObj.bg1 : undefined;
		}
		if (bg[2]) {
			bg[2].name = urlObj.bg2 ? urlObj.bg2 : undefined;
		}
		this.setState({
			yg,
			bg,
			urlObj,
			getTrialRelationParams,
			getKtggRelationParams,
			type: urlObj.type ? Number(urlObj.type) : 1,
		});
		window._addEventListener(document, 'keyup', this.toKeyCode13);
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

	initialValue = (urlObj) => {
		if (urlObj.yg1) {
			this.addYg(urlObj.yg1);
		}
		if (urlObj.yg2) {
			this.addYg(urlObj.yg2);
		}
		if (urlObj.bg1) {
			this.addBg(urlObj.bg1);
		}
		if (urlObj.bg2) {
			this.addBg(urlObj.bg2);
		}
	}

	// 切换立案开庭
	onSourceType=(val) => {
		const { pageSize } = this.state;
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const bgArray = ([urlObj.bg0 || undefined, urlObj.bg1 || undefined, urlObj.bg2 || undefined]);
		const ygArray = ([urlObj.yg0 || undefined, urlObj.yg1 || undefined, urlObj.yg2 || undefined]);
		const getTrialRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			page: 1,
			num: pageSize,
			// ...urlObj,
		};
		const getKtggRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			page: 1,
			num: pageSize,
		};
		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0 && val === 1) {
			this.getTrialRelationData(getTrialRelationParams); // 进入页面请求数据
			this.getCount(getTrialRelationParams);
		}
		if (Object.keys(urlObj).length !== 0 && val === 2) {
			this.getKtggRelationData(getKtggRelationParams); // 进入页面请求数据
			this.getCount(getKtggRelationParams);
		}
		this.setState({
			type: val,
			current: 1,
			Sort: undefined,
		});
	};

	// 获取数量
	getCount = (value) => {
		const params = {
			...value,
		};
		relationSearchCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					trialRelationCount: res.data[0].count,
					ktggRelationCount: res.data[1].count,
				});
			}
		});
	}


	// 导出
	toExportCondition=(type) => {
		const {
			pageSize, current, field, order, getTrialRelationParams,
		} = this.state;
		const params = {
			...getTrialRelationParams,
			page: type === 'current' ? current : undefined,
			num: type === 'current' ? pageSize : 1000,
			field: field || undefined,
			order: order || undefined,
		};
		return Object.assign({}, params);
	};

	// 获取立案消息列表
	getTrialRelationData = (value) => {
		const {
			current, pageSize,
		} = this.state;
		const params = {
			num: pageSize,
			page: current,
			...value,
		};
		this.setState({
			loading: true,
		});
		trialRelationSearch(params).then((res) => {
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

	// 获取开庭消息列表
	getKtggRelationData = (value) => {
		const {
			current, pageSize,
		} = this.state;
		const params = {
			num: pageSize,
			page: current,
			...value,
		};
		this.setState({
			loading: true,
		});
		ktggRelationSearch(params).then((res) => {
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

	// 时间排序
	SortTime = () => {
		const {
			getTrialRelationParams, type, Sort, dataList,
		} = this.state;
		const params = {
			field: 'LARQ',
			order: Sort === 'DESC' ? 'ASC' : 'DESC',
			...getTrialRelationParams,
		};
		// 判断是否为空对象,非空请求接口
		if (dataList.length > 0 && type === 1) {
			this.getTrialRelationData(params); // 进入页面请求数据
			this.getCount(params);
		}
		// 判断是否为空对象,非空请求接口
		if (dataList.length > 0 && type === 2) {
			this.getKtggRelationData(params); // 进入页面请求数据
			this.getCount(params);
		}
		this.setState({
			field: 'LARQ',
			Sort: Sort === 'DESC' ? 'ASC' : 'DESC',
			order: Sort === 'DESC' ? 'ASC' : 'DESC',
		});
	}

	// 搜索
	search = () => {
		const {
			startTime, endTime, yg, bg, type, pageSize,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startLarq = startTime;
		fildes.endLarq = endTime;
		fildes.type = type;
		fildes.yg0 = yg[0] ? yg[0].name : undefined;
		fildes.yg1 = yg[1] ? yg[1].name : undefined;
		fildes.yg2 = yg[2] ? yg[2].name : undefined;
		fildes.bg0 = bg[0] ? bg[0].name : undefined;
		fildes.bg1 = bg[1] ? bg[1].name : undefined;
		fildes.bg2 = bg[2] ? bg[2].name : undefined;
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/lawsuits', fildes));
		} else {
			this.queryReset();
		}
		const { hash } = window.location;
		const urlObj = parseQuery(hash);

		const bgArray = ([urlObj.bg0 || undefined, urlObj.bg1 || undefined, urlObj.bg2 || undefined]);
		const ygArray = ([urlObj.yg0 || undefined, urlObj.yg1 || undefined, urlObj.yg2 || undefined]);
		const getTrialRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			page: 1,
			num: pageSize,
		};
		const getKtggRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			page: 1,
			num: pageSize,
		};
		console.log(type);

		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0 && type === 1) {
			this.getTrialRelationData(getTrialRelationParams); // 进入页面请求数据
			this.getCount(getTrialRelationParams);
		}
		if (Object.keys(urlObj).length !== 0 && type === 2) {
			this.getKtggRelationData(getKtggRelationParams); // 进入页面请求数据
			this.getCount(getKtggRelationParams);
		}
		this.setState({
			getTrialRelationParams,
			getKtggRelationParams,
			Sort: undefined,
			current: 1,
		});
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/lawsuits');
		this.setState({
			yg: [
				{
					name: '',
					id: 1,
				},
			],
			bg: [
				{
					name: '',
					id: 1,
				},
			],
			Sort: undefined,
			ktggRelationCount: '', // 开庭
			trialRelationCount: '', // 立案
			urlObj: {},
			dataList: [],
			getTrialRelationParams: {},
			getKtggRelationParams: {},
			startTime: undefined,
			endTime: undefined,
			totals: 0,
			pageSize: 10,
			page: 1,
			type: 1,
		});
		resetFields('');
	}

	//  pagesize页面翻页可选
	onShowSizeChange = (current, pageSize) => {
		const {
			getTrialRelationParams, getKtggRelationParams, type,
		} = this.state;
		const getTrialParams = {
			...getTrialRelationParams,
			page: 1,
			num: pageSize,
		};
		const getKtggParams = {
			...getKtggRelationParams,
			page: 1,
			num: pageSize,
		};
		this.setState({
			pageSize,
			current: 1,
			page: 1,
		});

		// 判断是否为空对象,非空请求接口
		if (Object.keys(getTrialRelationParams).length !== 0 && type === 1) {
			this.getTrialRelationData(getTrialParams); // 进入页面请求数据
			this.getCount(getTrialParams);
		}
		// 判断是否为空对象,非空请求接口
		if (Object.keys(getKtggRelationParams).length !== 0 && type === 2) {
			this.getKtggRelationData(getKtggParams); // 进入页面请求数据
			this.getCount(getKtggParams);
		}
	}

	// page翻页
	handleChangePage = (val) => {
		const {
			getTrialRelationParams, getKtggRelationParams, type, pageSize,
		} = this.state;
		const getTrialParams = {
			...getTrialRelationParams,
			page: val,
			num: pageSize,
		};
		const getKtggParams = {
			...getKtggRelationParams,
			page: val,
			num: pageSize,
		};
		this.setState({
			current: val,
			page: val,
		});
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(getTrialRelationParams) && type === 1) {
			this.getTrialRelationData(getTrialParams); // 进入页面请求数据
			this.getCount(getTrialParams);
		}
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(getKtggRelationParams) && type === 2) {
			this.getKtggRelationData(getKtggParams); // 进入页面请求数据
			this.getCount(getKtggParams);
		}
	}

	handleYg = (e, id) => {
		const { yg } = this.state;
		if (yg && yg.length > 0) {
			yg.forEach((i, index) => {
				if (i.id === id) {
					yg[index].name = e.trim();
				}
			});
			this.setState({
				yg,
			});
		}
	}

	addYg = () => {
		const { yg } = this.state;
		yg.push({
			name: '',
			id: yg.length + 1,
		});
		this.setState({
			yg,
		});
	}

	// 删除
	deleteYg = (id) => {
		let { yg } = this.state;
		yg = yg.filter(key => key.id !== id);
		yg.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({
			yg,
		});
	}

	handleBg = (e, id) => {
		const { bg } = this.state;
		if (bg && bg.length > 0) {
			bg.forEach((i, index) => {
				if (i.id === id) {
					bg[index].name = e.trim();
				}
			});
			this.setState({
				bg,
			});
		}
	}

	addBg = () => {
		const { bg } = this.state;
		bg.push({
			name: '',
			id: bg.length + 1,
		});
		this.setState({
			bg,
		});
	}

	// 删除
	deleteBg = (id) => {
		let { bg } = this.state;
		bg = bg.filter(key => key.id !== id);
		bg.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({
			bg,
		});
	}

	render() {
		const {
			yg, bg, dataList, loading, urlObj, totals, current, page, pageSize, ktggRelationCount, trialRelationCount, Sort, type,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const tabConfig = [
			{
				id: 1,
				name: '立案信息',
				dot: false,
				number: trialRelationCount,
				showNumber: !!trialRelationCount,
			},
			{
				id: 2,
				name: '开庭公告',
				dot: false,
				number: ktggRelationCount,
				showNumber: !!ktggRelationCount,
			},
		];
		return (
			<div className="yc-content-query">
				<div className="yc-lawsuits-items">
					{
					yg.map(item => (
						<div key={item.id} className="item" style={{ 'margin-right': 15 }}>
							<Input
								title="原告"
								style={_style1}
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => this.handleYg(e, item.id)}
							/>
							{
								yg.length > 1 ? (
									<Tooltip placement="top" title="删除">
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => this.deleteYg(item.id)}
										/>
									</Tooltip>
								) : null
							}
						</div>
					))
				}
					{
					yg.length > 2 ? (
						<span style={{
							fontSize: 12, marginTop: 3, display: 'inline-block', color: '#FB5A5C',
						}}
						>
							最多可添加3个原告
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								className="add"
								src={add}
								onClick={() => this.addYg()}
							/>
						</Tooltip>
					)
				}
				</div>
				<div className="yc-lawsuits-items">
					{
						bg.map(item => (
							<div className="item" style={{ 'margin-right': 15 }}>
								<Input
									key={item.id}
									style={_style1}
									title="被告"
									value={item.name}
									placeholder="姓名/公司名称"
									onChange={e => this.handleBg(e, item.id)}
								/>
								{
									bg.length > 1 ? (
										<Tooltip placement="top" title="删除">
											<img
												alt=""
												className="close"
												src={close}
												onClick={() => this.deleteBg(item.id)}
											/>
										</Tooltip>
									) : null
								}
							</div>
						))
					}
					{
						bg.length > 2 ? (
							<span style={{
								fontSize: 12, marginTop: 3, display: 'inline-block', color: '#FB5A5C',
							}}
							>
								最多可添加3个被告
							</span>
						) : (
							<Tooltip placement="top" title="添加">
								<img
									alt=""
									className="add"
									src={add}
									onClick={() => this.addBg()}
								/>
							</Tooltip>
						)
					}
				</div>
				<div>
					<div className="yc-query-item">
						<Input
							title="起诉法院"
							style={_style1}
							size="large"
							placeholder="法院名称"
							{...getFieldProps('court', {
								initialValue: urlObj.court,
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
								initialValue: urlObj.ah,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">日期选择: </span>
						<DatePicker
							{...getFieldProps('startLarq', {
								initialValue: urlObj.uploadTimeStart,
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endLarq'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('endLarq', {
								initialValue: urlObj.uploadTimeEnd,
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startLarq'))}
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
				<div className="yc-haveTab-hr" />
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="type"
				/>
				<div className="yc-writ-tablebtn">
					{/* {dataList.length > 0 && <Button style={{ marginRight: 5 }} onClick={() => this.handleExport('current')}>本页导出</Button>}
					<Button disabled={dataList.length === 0} onClick={dataList.length > 0 && this.handleExport}>全部导出</Button> */}
					{dataList.length > 0 && <Download condition={() => this.toExportCondition('current')} style={{ marginRight: 5 }} api={type === 1 ? trialRelationSearchExport : ktggRelationSerachExport} current page num text="本页导出" />}
					<Download disabled={dataList.length === 0} condition={() => this.toExportCondition('all')} api={type === 1 ? trialRelationSearchExport : ktggRelationSerachExport} all page num text="全部导出" />
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
					<LawsuitsTable
						stateObj={this.state}
						dataList={dataList}
						SortTime={this.SortTime}
						Sort={Sort}
						type={type}
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

export default createForm()(LAWSUITS);
