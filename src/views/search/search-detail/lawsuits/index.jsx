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
	Spin, Input, Button, Tabs, timeRule,
} from '@/common';
import {
	ktggRelationSearch, // 开庭列表
	trialRelationSearch, // 立案列表
	relationSearchCount, // 数量
} from '@/utils/api/search';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import LawsuitsTable from './table';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 274 };
const _style2 = { width: 120 };

class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			urlObj: {},
			dataList: [],
			startTime: undefined,
			endTime: undefined,
			loading: false,
			totals: 0,
			pageSize: 10,
			current: 1, // 当前页
			page: 1,
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
		const bgArray = ([urlObj.bg0 || '', urlObj.bg1 || '', urlObj.bg2 || '']);
		const ygArray = ([urlObj.yg0 || '', urlObj.yg1 || '', urlObj.yg2 || '']);
		const getTrialRelationParams = {
			bgList: bgArray,
			...urlObj,
		};
		const getKtggRelationParams = {
			ygList: ygArray,
			...urlObj,
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
		const {
			yg, bg,
		} = this.state;
		this.initialValue(urlObj);
		if (yg[0]) {
			yg[0].name = urlObj.yg0 ? urlObj.yg0 : '';
		}
		if (yg[1]) {
			yg[1].name = urlObj.yg1 ? urlObj.yg1 : '';
		}
		if (yg[2]) {
			yg[2].name = urlObj.yg2 ? urlObj.yg2 : '';
		}
		if (bg[0]) {
			bg[0].name = urlObj.bg0 ? urlObj.bg0 : '';
		}
		if (bg[1]) {
			bg[1].name = urlObj.bg1 ? urlObj.bg1 : '';
		}
		if (bg[2]) {
			bg[2].name = urlObj.bg2 ? urlObj.bg2 : '';
		}
		this.setState({
			yg,
			bg,
			urlObj,
		});
	}

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

	// 切换已读未读
	onSourceType=(val) => {
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const bgArray = ([urlObj.bg0 || '', urlObj.bg1 || '', urlObj.bg2 || '']);
		const ygArray = ([urlObj.yg0 || '', urlObj.yg1 || '', urlObj.yg2 || '']);
		const getTrialRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			...urlObj,
			type: val,
		};
		const getKtggRelationParams = {
			bgList: bgArray,
			ygList: ygArray,
			...urlObj,
			type: val,
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

	// 获取立案消息列表
	getTrialRelationData = (value) => {
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
		trialRelationSearch(params).then((res) => {
			if (res && res.data) {
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

	// 获取开庭消息列表
	getKtggRelationData = (value) => {
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
		ktggRelationSearch(params).then((res) => {
			if (res && res.data) {
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

	// 搜索
	search = () => {
		const {
			startTime, endTime, yg, bg, type,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.uploadTimeStart = startTime;
		fildes.uploadTimeEnd = endTime;
		fildes.type = type;
		fildes.yg0 = yg[0] ? yg[0].name : undefined;
		fildes.yg1 = yg[1] ? yg[1].name : undefined;
		fildes.yg2 = yg[2] ? yg[2].name : undefined;
		fildes.bg0 = bg[0] ? bg[0].name : undefined;
		fildes.bg1 = bg[1] ? bg[1].name : undefined;
		fildes.bg2 = bg[2] ? bg[2].name : undefined;
		console.log(fildes);
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/lawsuits', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
		// const getTrialRelationParams = {
		// 	...fildes,
		// };
		// const getKtggRelationParams = {
		// 	...fildes,
		// };

		// 判断是否为空对象,非空请求接口
		// if (Object.keys(urlObj).length !== 0 && type === 1) {
		// 	this.getTrialRelationData(getTrialRelationParams); // 进入页面请求数据
		// 	this.getCount(getTrialRelationParams);
		// }
		// if (Object.keys(urlObj).length !== 0 && type === 2) {
		// 	this.getKtggRelationData(getKtggRelationParams); // 进入页面请求数据
		// 	this.getCount(getKtggRelationParams);
		// }
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
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
		// console.log(id);
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
			yg, bg, dataList, loading, urlObj, totals, current, page, pageSize, ktggRelationCount, trialRelationCount,
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
					yg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个原告</span>) : (
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
						bg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个被告</span>) : (
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
				<div style={{ borderBottom: '1px solid #F0F2F5' }}>
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
							{...getFieldProps('uploadTimeStart', {
								initialValue: urlObj.uploadTimeStart,
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
								initialValue: urlObj.uploadTimeEnd,
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="type"
				/>
				<div className="yc-lawsuits-tablebtn">
					<Button onClick={this.handleExportExcel}>
							全部导出
					</Button>
				</div>
				<Spin visible={loading}>
					<LawsuitsTable stateObj={this.state} dataList={dataList} />
				</Spin>
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
							console.log(val);
							this.handleChangePage(val);
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
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
