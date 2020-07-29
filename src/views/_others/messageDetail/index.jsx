import React from 'react';
import {
	Form, Tooltip, Select, Affix,
} from 'antd';
import './style.scss';
import {
	Button, Icon, Spin, NoContent,
} from '@/common';
import { headerInfo, dataCount } from '@/utils/api/message/index';
import { getQueryByName } from '@/utils';
import Assets from './component/assets/index';
import Subrogation from './component/subrogation/index';
import Land from './component/land/index';
import Bidding from './component/bidding/index';
import EquityPledge from './component/equityPledge/index';
import Financial from './component/financial/index';
import ChattelMortgage from './component/chattelMortgage/index';
import IntangibleAssets from './component/intangibleAssets/index';
import LitigationMonitoring from './component/litigationMonitoring/index';
import Bankrupt from './component/bankrupt/index';
import Dishonesty from './component/dishonesty/index';
import BusinessRisk from './component/businessRisk/index';


const createForm = Form.create;

// 这个type只有两类， 1，资产挖掘， 2，风险监控
const isRule = (ruleName, type, rule) => {
	if (ruleName) {
		if (type === 1) {
			return Object.keys(rule.menu_zcwj.children).indexOf(ruleName) >= 0;
		}
		if (type === 2) {
			return Object.keys(rule.menu_fxjk.children).indexOf(ruleName) >= 0;
		}
		return false;
	}
	return false;
};

// data是接口返回所有分类模块的数据，datatype是当前模块的类型
// 如果传的是5位就正常校验，传的是3位就只校验前3位
const getCount = (data, dataType) => {
	let count = 0;
	const reg = new RegExp(dataType);
	if (dataType.toString().length === 5) {
		data.forEach((item) => {
			if (reg.test(item.dataType)) {
				count = item.dataCount;
			}
		});
	}
	if (dataType.toString().length === 3) {
		data.forEach((item) => {
			if (reg.test(item.dataType.toString().slice(0, 3))) {
				count += item.dataCount;
			}
		});
	}
	return count;
};

const subItems = (rule, data) => ([
	{
		dataType: 101,
		name: '资产拍卖',
		total: data ? getCount(data, 101) : 0,
		tagName: 'message-auction',
		status: isRule('zcwjzcpm', 1, rule),
		component: Assets,
	},
	{
		dataType: 102,
		name: '代位权',
		total: data ? getCount(data, 102) : 0,
		tagName: 'message-subrogation',
		status: isRule('zcwjdwq', 1, rule),
		component: Subrogation,
		childrenCount: [
			{ name: '立案', count: data ? getCount(data, 10201) : 0, dataType: 10201 },
			{ name: '开庭', count: data ? getCount(data, 10202) : 0, dataType: 10202 },
			{ name: '文书', count: data ? getCount(data, 10203) : 0, dataType: 10203 },
		],
	},
	{
		dataType: 103,
		name: '土地信息',
		tagName: 'message-land',
		total: data ? data ? getCount(data, 103) : 0 : 0,
		status: isRule('zcwjtdsj', 1, rule),
		component: Land,
		childrenCount: [
			{ name: '出让结果', count: data ? getCount(data, 10301) : 0, dataType: 10301 },
			{ name: '土地转让', count: data ? getCount(data, 10302) : 0, dataType: 10302 },
			{ name: '土地抵押', count: data ? getCount(data, 10303) : 0, dataType: 10303 },
		],
	},
	{
		dataType: 104,
		name: '招标中标',
		total: data ? getCount(data, 104) : 0,
		status: isRule('zcwjzbzb', 1, rule),
		tagName: 'message-tender',
		component: Bidding,
	},
	{
		dataType: 105,
		name: '股权质押',
		total: data ? getCount(data, 105) : 0,
		status: isRule('zcwjgqzy', 1, rule),
		tagName: 'message-equityPledge',
		component: EquityPledge,
	},
	{
		dataType: 106,
		name: '金融资产',
		total: data ? getCount(data, 106) : 0,
		status: isRule('zcwjjrzj', 1, rule),
		tagName: 'message-financial',
		component: Financial,
		childrenCount: [
			{ name: '竞价项目', count: data ? getCount(data, 10601) : 0, dataType: 10601 },
			{ name: '公示项目', count: data ? getCount(data, 10602) : 0, dataType: 10602 },
		],
	},
	{
		dataType: 107,
		name: '动产抵押',
		total: data ? getCount(data, 107) : 0,
		status: isRule('zcwjdcdy', 1, rule),
		tagName: 'message-intangible',
		component: ChattelMortgage,
	},
	{
		dataType: 108,
		name: '无形资产',
		total: data ? getCount(data, 108) : 0,
		status: isRule('zcwjwxzc', 1, rule),
		tagName: 'message-invisibleAssets',
		component: IntangibleAssets,
		childrenCount: [
			{ name: '排污权', count: data ? getCount(data, 10801) : 0, dataType: 10801 },
			{ name: '矿业权', count: data ? getCount(data, 10802) : 0, dataType: 10802 },
			{ name: '商标专利', count: data ? getCount(data, 10803) : 0, dataType: 10803 },
			{ name: '建筑建造资质', count: data ? getCount(data, 10804) : 0, dataType: 10804 },
		],
	},
	{
		dataType: 109,
		name: '涉诉监控',
		total: data ? getCount(data, 109) : 0,
		status: isRule('fxjkssjk', 2, rule),
		tagName: 'e-assets-bidding',
		component: LitigationMonitoring,
		childrenCount: [
			{ name: '立案', count: data ? getCount(data, 10901) : 0, dataType: 10901 },
			{ name: '开庭', count: data ? getCount(data, 10902) : 0, dataType: 10902 },
			{ name: '裁判文书', count: data ? getCount(data, 10903) : 0, dataType: 10903 },
		],
	},
	{
		dataType: 110,
		name: '企业破产重组',
		total: data ? getCount(data, 110) : 0,
		status: isRule('fxjkqypccz', 2, rule),
		tagName: 'message-bankruptcy',
		component: Bankrupt,
	},
	{
		dataType: 111,
		name: '失信记录',
		total: data ? getCount(data, 111) : 0,
		status: isRule('jkxxsxjl', 2, rule),
		tagName: 'message-dishonesty',
		component: Dishonesty,
	},
	{
		dataType: 112,
		name: '经营风险',
		total: data ? getCount(data, 112) : 0,
		status: isRule('jyfxsswf', 2, rule),
		tagName: 'message-businessRisk',
		component: BusinessRisk,
		childrenCount: [
			{ name: '税收违法', count: data ? getCount(data, 11201) : 0, dataType: 11201 },
			{ name: '环保处罚', count: data ? getCount(data, 11202) : 0, dataType: 11202 },
		],
	},
]);

class MessageDetail extends React.Component {
	constructor(props) {
		super(props);
		document.title = '监控日报详情';
		this.state = {
			config: [],
			loading: false,
			newMonitorCount: 0,
			invalidCount: 0,
			effectiveCount: 0,
			reportDate: '',
			obligorInfo: [],
			stationId: undefined,
			obligorId: undefined,
			affixed: false,
			isShowBackTopImg: false,
		};
	}

	componentWillMount() {
		this.setState({
			stationId: getQueryByName(window.location.href, 'stationId'),
		});
	}

	componentDidMount() {
		const { stationId } = this.state;
		const params = {
			stationId,
		};
		headerInfo(params).then((res) => {
			if (res.code === 200 && res.data) {
				this.setState({
					newMonitorCount: res.data.newMonitorCount,
					invalidCount: res.data.invalidCount,
					effectiveCount: res.data.newMonitorCount - res.data.invalidCount,
					obligorInfo: res.data.obligorInfo || [],
					reportDate: new Date(res.data.gmtDisplay).format('yyyy-MM-dd'),
				});
			}
		}).catch((err) => {
			console.log('err === ', err);
		});
		this.queryAllCount();
		window.onscroll = () => {
			const { isShowBackTopImg } = this.state;
			if (window.pageYOffset > 226) {
				if (!isShowBackTopImg) {
					this.setState({
						isShowBackTopImg: true,
					});
				}
			} else if (isShowBackTopImg) {
				this.setState({
					isShowBackTopImg: false,
				});
			}
		};
	}

	// 点击上移
	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		console.log('height === ', document.getElementById(eleID).offsetTop);
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop + 70);
		}
	};

	goBackTop = () => {
		window.scrollTo(0, 0);
	};

	// 查询所有模块的数量
	queryAllCount = () => {
		const { obligorId, stationId } = this.state;
		const { rule } = this.props;
		const params = {
			obligorId,
			stationId,
		};
		dataCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					config: subItems(rule, res.data.categoryCount).filter(item => item.status && item.total > 0),
					// config: subItems(rule, allData).filter(item => item.status && item.total > 0),
				});
			}
		}).catch((err) => {
			console.log('err === ', err);
		});
	};

	// 切换债务人的点击事件
	handleChange = (obligorId) => {
		if (obligorId === '-1') {
			this.setState({
				obligorId: undefined,
			}, () => {
				this.queryAllCount();
			});
		} else {
			this.setState({
				obligorId,
			}, () => {
				this.queryAllCount();
			});
		}
		window.scrollTo(0, 50);
	};

	// 页面发生滚动，固定在上方的时候affixed 是true
	handleChangeAffixStatus = (affixed) => {
		this.setState({
			affixed,
		});
	};

	render() {
		const {
			config, newMonitorCount, invalidCount, effectiveCount, loading, obligorInfo, affixed, obligorId, stationId, isShowBackTopImg, reportDate,
		} = this.state;
		console.log('state render === ', this.state);
		return (
			<div>
				<div className="messageDetail">
					<Affix className="fix-header" onChange={this.handleChangeAffixStatus}>

						<div className="messageDetail-header">
							<span className="messageDetail-header-bold">{reportDate}</span>
							<span className="messageDetail-header-bold">
							新增监控信息
								<span className="messageDetail-header-bold-sum">{newMonitorCount}</span>
							条
							</span>
							(
							<span className="messageDetail-header-tips">
								<span>
							   当前有效：
									{ effectiveCount }
									 条
								</span>
								<span className="splitLine"> | </span>
								<span>
							已失效信息
									{ invalidCount }
								条
								</span>
								<Tooltip placement="top" title="已更新的信息或对应债务人已删除的信息（本页不作展示）">
									<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
								</Tooltip>
							</span>
							)
						</div>
						<div className="tiny-line" />
						{
							 effectiveCount <= 0 || newMonitorCount <= 0 ? <NoContent font="暂无新增信息" /> : (
								<div>
									<div className="change-box">
										<span className="change-box-name">切换债务人：</span>
										<Select
											className="change-box-select"
											size="large"
											placeholder="请选择债务人"
											style={{ width: 280 }}
											defaultValue="-1"
											onChange={this.handleChange}
										>
											<Select.Option value="-1">全部</Select.Option>
											{
												obligorInfo && obligorInfo.map(item => (
													<Select.Option value={item.obligorId}>
														{item.obligorName}
														{`${item.obligorNumber ? `（身份证号：${item.obligorNumber}）` : ''}`}
													</Select.Option>
												))
											}
										</Select>
									</div>
									{/* 导航的tab */}
									<div className="tab">
										<div className="tab-tabs" style={{ borderBottom: affixed ? '1px solid #E5E5E5' : '' }}>
											{
												config.map(item => (
													<Button onClick={() => this.handleScroll(item.tagName)}>
														{`${item.name}${item.total ? ` ${item.total}` : '0'}`}
													</Button>
												))
											}
										</div>
									</div>
								</div>
							 )
						}
					</Affix>
					<Spin visible={loading}>
						{/* 可能会存在一种情况，当前债务人存在，但是查不到新增的情况，就会显示下面信息 */}
						{
							obligorId !== '-1' && obligorId && config.length === 0 && <NoContent font="当前债务人暂无新增数据" />
						}
						<div className="messageDetail-table-box">
							{
								config.map(Item => (Item.total > 0 ? (
									<Item.component
										obligorId={obligorId}
										stationId={stationId}
										id={Item.tagName}
										numId={Item.id}
										total={Item.total}
										childrenCount={Item.childrenCount}
										title={Item.name}
									/>
								)
									: null))
							}
						</div>
					</Spin>
				</div>
				<div onClick={this.goBackTop}>
					{
						isShowBackTopImg && <Icon className="iconToTop" type="icon-top-hover" />
					}
				</div>
			</div>
		);
	}
}
export default createForm()(MessageDetail);
