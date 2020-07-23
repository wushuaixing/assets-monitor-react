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
import { allData } from './test';
import message from '@/utils/api/message/message';
import Assets from './component/assets/index';
import Subrogation from './component/subrogation/index';
import { requestAll } from '@/utils/promise';
import Land from './component/land/index';
import Bidding from './component/bidding/index';
import EquityPledge from './component/equityPledge/index';
import Financial from './component/financial/index';
import ChattelMortgage from './component/chattelMortgage/index';
import IntangibleAssets from './component/intangibleAssets/index';
import LitigationMonitoring from './component/litigationMonitoring/index';
import Bankrupt from './component/bankrupt/index';
import Dishonesty from './component/dishonesty/index';
import IllegalTaxation from './component/illegalTaxation/index';
import EnvironmentPunishment from './component/environmentPunishment/index';


const createForm = Form.create;

// 判断是否有这个模块的权限
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
const getCount = (data, dataType) => {
	for (let i = 0; i < data.length; i += 1) {
		if (data[i].dataType === dataType) {
			return data[i].dataCount;
		}
	}
	return 0;
};

// 这个total一开始是不知道的，要在一开始之后的请求中才可以获取到
// 请求之后的list数据也放在info里面，或者是放在子组件componentDidMount生命周期里
const subItems = (rule, data) => ([
	{
		dataType: 1,
		id: 101,
		name: '资产拍卖',
		total: data ? getCount(data, 1) : 0,
		tagName: 'message-auction',
		status: isRule('zcwjzcpm', 1, rule),
		component: Assets,
	},
	{
		dataType: 2,
		id: 102,
		name: '代位权',
		total: data ? getCount(data, 2) : 0,
		tagName: 'message-subrogation',
		status: isRule('zcwjdwq', 1, rule),
		component: Subrogation,
		childrenCount: [
			{ name: '代位权', count: 11, type: 'subrogation' },
			{ name: '开庭', count: 12, type: 'openCourt' },
			{ name: '文书', count: 22, type: 'instrument' },
		],
	},
	{
		dataType: 3,
		id: 103,
		name: '土地数据',
		tagName: 'message-land',
		total: data ? getCount(data, 3) : 0,
		status: isRule('zcwjtdsj', 1, rule),
		component: Land,
		childrenCount: [
			{ name: '土地出让', count: 0, type: 'sell' },
			{ name: '土地转让', count: 12, type: 'transfer' },
			{ name: '土地抵押', count: 22, type: 'pledge' },
		],
	},
	{
		dataType: 4,
		id: 104,
		name: '招标中标',
		total: data ? getCount(data, 4) : 0,
		status: isRule('zcwjzbzb', 1, rule),
		tagName: 'message-tender',
		component: Bidding,
	},
	{
		dataType: 5,
		id: 105,
		name: '股权质押',
		total: data ? getCount(data, 5) : 0,
		status: isRule('zcwjgqzy', 1, rule),
		tagName: 'message-equityPledge',
		component: EquityPledge,
	},
	{
		dataType: 6,
		id: 106,
		name: '金融资产',
		total: data ? getCount(data, 6) : 0,
		status: isRule('zcwjjrzj', 1, rule),
		tagName: 'message-financial',
		component: Financial,
		childrenCount: [
			{ name: '竞价项目', count: 11, type: 'competition' },
			{ name: '公示项目', count: 12, type: 'public' },
		],
	},
	{
		dataType: 7,
		id: 107,
		name: '动产抵押',
		total: data ? getCount(data, 7) : 0,
		status: isRule('zcwjdcdy', 1, rule),
		tagName: 'message-intangible',
		component: ChattelMortgage,
	},
	{
		dataType: 8,
		id: 108,
		name: '无形资产',
		total: data ? getCount(data, 8) : 0,
		status: isRule('zcwjwxzc', 1, rule),
		tagName: 'message-invisibleAssets',
		component: IntangibleAssets,
		childrenCount: [
			{ name: '排污权', count: 11, type: 'sewage' },
			{ name: '矿业权', count: 12, type: 'mining' },
			{ name: '商标专利', count: 12, type: 'trademark' },
			{ name: '建筑建造资质', count: 12, type: 'building' },
		],
	},
	{
		dataType: 9,
		id: 109,
		name: '涉诉监控',
		total: data ? getCount(data, 9) : 0,
		status: isRule('fxjkssjk', 2, rule),
		tagName: 'e-assets-bidding',
		component: LitigationMonitoring,
		childrenCount: [
			{ name: '立案', count: 11, type: 'case' },
			{ name: '开庭', count: 12, type: 'court' },
			{ name: '裁判文书', count: 12, type: 'judgmentDocument' },
		],
	},
	{
		dataType: 10,
		id: 110,
		name: '企业破产重组',
		total: data ? getCount(data, 10) : 0,
		status: isRule('fxjkqypccz', 2, rule),
		tagName: 'message-bankruptcy',
		component: Bankrupt,
	},
	{
		dataType: 11,
		id: 111,
		name: '失信记录',
		total: data ? getCount(data, 11) : 0,
		status: isRule('jkxxsxjl', 2, rule),
		tagName: 'message-dishonesty',
		component: Dishonesty,
	},
	{
		dataType: 12,
		id: 112,
		name: '税收违法',
		total: data ? getCount(data, 12) : 0,
		status: isRule('jyfxsswf', 2, rule),
		tagName: 'message-illegalTax',
		component: IllegalTaxation,
	},
	{
		dataType: 13,
		id: 113,
		name: '环保处罚',
		total: data ? getCount(data, 13) : 0,
		status: isRule('jyfxhbcf', 2, rule),
		tagName: 'message-environmental',
		component: EnvironmentPunishment,
	},
]);

class MessageDetail extends React.Component {
	constructor(props) {
		super(props);
		document.title = '监控日报详情';
		this.state = {
			config: [],
			loading: false,
			headerInfoCount: {
				newMonitorCount: 0,
				invalidCount: 0,
			},
			obligorInfo: [],
			stationId: undefined,
			obligorId: undefined,
			messageApi: message,
			affixed: false,
			today: undefined,
		};
	}

	componentWillMount() {
		const day = new Date();
		this.setState({
			today: day.format('yyyy-MM-dd'),
			stationId: getQueryByName(window.location.href, 'stationId'),
		});
	}

	componentDidMount() {
		const { rule } = this.props;
		const { obligorId, stationId } = this.state;
		console.log('props === ', rule);
		const params = {
			stationId,
		};
		// 默认查询全部的债务人更新的信息
		// 返回的结果： 哪些模块是有数据的，每个模块的数据是多少
		// 然后根据每个有数据的模块去请求列表数据
		headerInfo(params).then((res) => {
			if (res.code === 200 && res.data) {
				const headerInfoCount = {
					newMonitorCount: res.data.newMonitorCount,
					invalidCount: res.data.invalidCount,
				};
				this.setState({
					headerInfoCount,
					obligorInfo: res.data.obligorInfo || [],
				});
			}
		}).catch((err) => {
			console.log('err === ', err);
		});
		this.queryAllCount();
	}

	// 点击上移
	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		console.log('height === ', document.getElementById(eleID).offsetTop);
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop + 50);
		}
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
			this.setState({
				config: subItems(rule, allData).filter(item => item.status && item.total > 0),
			});
			const { config, messageApi } = this.state;
			this.handleFilterArrary(config, messageApi);
			this.toGetChildCount(obligorId);
		}).catch((err) => {
			console.log('err === ', err);
		});
	};

	// 过滤api，过滤全部里面有数据的api
	handleFilterArrary = (config, messageApi) => {
		const msgApi = [];
		for (let i = 0; i < config.length; i += 1) {
			for (let j = 0; j < messageApi.length; j += 1) {
				const reg = new RegExp(config[i].id);
				if (reg.test(messageApi[j].id)) {
					msgApi.push(messageApi[j]);
				}
			}
		}
		this.setState({
			messageApi: msgApi,
		});
	};

	// 切换债务人的点击事件
	handleChange = (obligorId) => {
		if (obligorId === '-1') {
			this.setState({
				obligorId: undefined,
			});
		}
		window.scrollTo(0, 50);
		this.queryAllCount();
		// this.toGetChildCount(obligorId);
	};

	// 切换债务人，获取子级数量的所有api
	toGetChildCount = (obligorId) => {
		const { config, stationId, messageApi } = this.state;
		const reqList = [];
		for (let i = 0; i < config.length; i += 1) {
			for (let j = 0; j < messageApi.length; j += 1) {
				const reg = new RegExp(config[i].id);
				if (reg.test(messageApi[j].id)) {
					reqList.push({
						api: messageApi[j].count({ obligorId, stationId }, messageApi[j].id),
						info: { id: messageApi[j].id },
					});
				}
			}
		}
		this.handleRequestAll(reqList);
	};

	// 循环请求各个模块的数量
	handleRequestAll = (reqList) => {
		const { config } = this.state;
		// requestAll(reqList).then((res) => {
		// 	res.forEach((item, index) => {
		// 		console.log('res === ', res, item);
		// 		if (item.field) {
		// 			let count = 0;
		// 			const newConfig = [...config];
		// 			if (newConfig[index] && Object.keys(newConfig[index]).indexOf('childrenCount') >= 0) {
		// 				newConfig[index].childrenCount = item.data;
		// 			}
		// 			Object.keys(item.data).forEach((i) => {
		// 				count += item.data[i];
		// 			});
		// 			newConfig[index].total = 23 || count;
		// 			this.setState({
		// 				config: newConfig,
		// 			});
		// 		}
		// 	});
		// });
	};

	handleChangeAffixStatus = (affixed) => {
		this.setState({
			affixed,
		});
	};

	render() {
		const {
			config, headerInfoCount, loading, obligorInfo, affixed, obligorId, stationId, today,
		} = this.state;
		console.log('state render === ', this.state);
		return (
			<div className="messageDetail">
				<Affix className="fix-header" onChange={this.handleChangeAffixStatus}>
					<div className="messageDetail-header">
						<span className="messageDetail-header-bold">{today}</span>
						<span className="messageDetail-header-bold">
							新增监控信息
							<span className="messageDetail-header-bold-sum">{headerInfoCount.newMonitorCount}</span>
							条
						</span>
						<span>
							已失效信息
							{ headerInfoCount.invalidCount }
							条
						</span>
						<Tooltip placement="top" title="已更新的信息或对应债务人已删除的信息">
							<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
						</Tooltip>
					</div>
					<div className="tiny-line" />
					{
						config && config.length > 0 ? (
							<div>
								<div className="change-box">
									<span className="change-box-name">切换债务人：</span>
									<Select
										size="large"
										allowClear
										placeholder="请选择债务人"
										style={{ width: 200 }}
										defaultValue="0"
										onChange={this.handleChange}
									>
										<Select.Option value="-1">全部</Select.Option>
										{
											obligorInfo && obligorInfo.map(item => (
												<Select.Option value={item.obligorId}>
													{item.obligorName}
													{`${item.obligorNumber ? `（身份证号：）${item.obligorNumber}` : ''}`}
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
						) : <NoContent font="当日无新增信息" />
					}
				</Affix>
				<Spin visible={loading}>
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
		);
	}
}
export default createForm()(MessageDetail);
