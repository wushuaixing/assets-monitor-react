import React from 'react';
import {
	Form, Tooltip, Select, Affix,
} from 'antd';
import './style.scss';
import {
	Button, Icon, Spin, NoContent,
} from '@/common';
import { headerInfo, dataCount } from '@/utils/api/message/index';
import Auction from '@/views/portrait-inquiry/enterprise/assets/auction';
import Subrogation from '@/views/portrait-inquiry/enterprise/assets/subrogation';
import { getQueryByName } from '@/utils';
import { allData } from './test';
import message from '@/utils/api/message/message';
import { requestAll } from '@/utils/promise';

const createForm = Form.create;

// 判断是否有这个模块的权限
// 这个type只有两类， 1，资产挖掘， 2，风险监控
const isRule = (ruleName, type, rule) => {
	if (ruleName) {
		if (type === 1) {
			if (rule.menu_zcwj.children.hasOwnProperty(ruleName)) {
				return true;
			}

			return false;
		}
		if (type === 2) {
			if (rule.menu_fxjk.children.hasOwnProperty(ruleName)) {
				return true;
			}
			return false;
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
		component: Auction,
	},
	{
		dataType: 2,
		id: 102,
		name: '代位权',
		tagName: 'message-subrogation',
		total: data ? getCount(data, 2) : 0,
		childrenCount: [{ subrogation: 21 }, { subrogation: 21 }, { subrogation: 21 }],
		status: isRule('zcwjdwq', 1, rule),
		component: Subrogation,
	},
	{
		dataType: 3,
		id: 103,
		name: '土地数据',
		tagName: 'message-land',
		total: data ? getCount(data, 3) : 0,
		status: isRule('zcwjtdsj', 1, rule),
		component: Subrogation,
	},
	{
		dataType: 4,
		id: 104,
		name: '招标中标',
		total: data ? getCount(data, 4) : 0,
		// info: data ? data.filter(i => /1030/.test(i.id)) : '',
		status: isRule('zcwjzbzb', 1, rule),
		tagName: 'message-tender',
		component: Subrogation,
	},
	{
		dataType: 5,
		id: 105,
		name: '股权质押',
		total: data ? getCount(data, 5) : 0,
		status: isRule('zcwjgqzy', 1, rule),
		tagName: 'message-equityPledge',
		component: Subrogation,
	},
	{
		dataType: 6,
		id: 106,
		name: '金融资产',
		total: data ? getCount(data, 6) : 0,
		status: isRule('zcwjjrzj', 1, rule),
		tagName: 'message-financial',
		component: Subrogation,
	},
	{
		dataType: 7,
		id: 107,
		name: '动产抵押',
		total: data ? getCount(data, 7) : 0,
		status: isRule('zcwjdcdy', 1, rule),
		tagName: 'message-intangible',
		component: Subrogation,
	},
	{
		dataType: 8,
		id: 108,
		name: '无形资产',
		total: data ? getCount(data, 8) : 0,
		status: isRule('zcwjwxzc', 1, rule),
		tagName: 'message-invisibleAssets',
		component: Subrogation,
	},
	{
		dataType: 9,
		id: 109,
		name: '涉诉监控',
		total: data ? getCount(data, 9) : 0,
		status: isRule('fxjkssjk', 2, rule),
		tagName: 'e-assets-bidding',
		component: Subrogation,
	},
	{
		dataType: 10,
		id: 110,
		name: '企业破产重组',
		total: data ? getCount(data, 10) : 0,
		status: isRule('fxjkqypccz', 2, rule),
		tagName: 'message-bankruptcy',
		component: Subrogation,
	},
	{
		dataType: 11,
		id: 111,
		name: '失信记录',
		total: data ? getCount(data, 11) : 0,
		status: isRule('jkxxsxjl', 2, rule),
		tagName: 'message-dishonesty',
		component: Subrogation,
	},
	{
		dataType: 12,
		id: 112,
		name: '税收违法',
		total: data ? getCount(data, 12) : 0,
		status: isRule('jyfxsswf', 2, rule),
		tagName: 'message-illegalTax',
		component: Subrogation,
	},
	{
		dataType: 13,
		id: 113,
		name: '环保处罚',
		total: data ? getCount(data, 13) : 0,
		status: isRule('jyfxhbcf', 2, rule),
		tagName: 'message-environmental',
		component: Subrogation,
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
			messageApi: message,
		};
	}

	componentWillMount() {
		this.setState({
			stationId: getQueryByName(window.location.href, 'stationId'),
		});
	}

	componentDidMount() {
		const { rule } = this.props;
		console.log('props === ', rule);
		// 默认查询全部的债务人更新的信息
		// 返回的结果： 哪些模块是有数据的，每个模块的数据是多少
		// 然后根据每个有数据的模块去请求列表数据
		headerInfo().then((res) => {
			this.setState({
				obligorInfo: [
					{ obligorId: 222, obligorName: '易烊千玺' },
					{ obligorId: 233, obligorName: '彭于晏' },
				],
			});
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
		this.queryAllCount('0');
	}


	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		// const _height = document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop + 220);
		}
	};

	queryAllCount = (obligorId) => {
		const { stationId } = this.state;
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
			this.toGetChildCount('0');
		}).catch((err) => {
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
		console.log('id === ', obligorId);
		this.queryAllCount(obligorId);
		this.toGetChildCount(obligorId);
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
		console.log('reqList === ', reqList);
	};

	render() {
		const {
			config, headerInfoCount, loading, obligorInfo,
		} = this.state;
		console.log('state === ', this.state);
		return (
			<div className="messageDetail">
				<Affix className="fix-header">
					{/* 头部日期 */}
					<div className="messageDetail-header">
						<span className="messageDetail-header-bold">2020-07-16</span>
						<span className="messageDetail-header-bold">
							新增监控信息
							<span className="messageDetail-header-bold-sum">{headerInfoCount.newMonitorCount}</span>
							条
						</span>
						<span>
							已失效信息
							{headerInfoCount.newMonitorCount}
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
								{/* 下拉框 */}
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
										<Select.Option value="0">全部</Select.Option>
										<Select.Option value="1">张三</Select.Option>
										<Select.Option value="2">李四</Select.Option>
										 {
											 obligorInfo && obligorInfo.map(item => (
												<Select.Option value={item.obligorId}>{item.obligorName}</Select.Option>
											  ))
										 }
									</Select>
								</div>
								{/* 导航的tab */}
								<div className="tab">
									<div className="tab-tabs">
										{
											config.map(item => (
												<Button onClick={() => this.handleScroll(item.tagName)}>
													{`${item.name}${item.total ? ` ${item.total}` : '0'}`}
												</Button>
											))
									}
									</div>
								</div>
								<Spin visible={loading}>
									<div className="messageDetail-table-box">111</div>
									{/* { */}
									{/*	tabs && tabs.length > 0 ? tabs.map(Item => <Item.component id={Item.tagName} data={Item.info} />) : null */}
									{/* } */}
								</Spin>

							</div>
						) : <NoContent font="当日无新增信息" />
					}
				</Affix>
			</div>
		);
	}
}
export default createForm()(MessageDetail);
