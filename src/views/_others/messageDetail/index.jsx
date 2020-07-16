import React from 'react';
import {
	Form, Tooltip, Select, Affix,
} from 'antd';
import './style.scss';
import { Button, Icon } from '@/common';
import { headerInfo } from '@/utils/api/message/index';
import Auction from '@/views/portrait-inquiry/enterprise/assets/auction';
import Subrogation from '@/views/portrait-inquiry/enterprise/assets/subrogation';

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

// 这个total一开始是不知道的，要在一开始之后的请求中才可以获取到
// 请求之后的list数据也放在info里面，或者是放在子组件componentDidMount生命周期里
const subItems = rule => ([
	{
		id: 10100,
		name: '拍卖',
		total: 22,
		tagName: 'message-auction',
		status: isRule('zcwjdcdy', 1, rule),
		component: Auction,
	},
	{
		id: 10200,
		name: '代位权',
		total: 2,
		tagName: 'message-subrogation',
		status: isRule('zcwjdcdy', 1, rule),
		component: Subrogation,
	},
	// {
	// 	id: 10300,
	// 	name: '土地',
	// 	total: data ? toGetTotal('1030', data) : 0,
	// 	info: data ? data.filter(i => /1030/.test(i.id)) : '',
	// 	tagName: 'message-land',
	// 	component: Land,
	// },
	// {
	// 	id: 10400,
	// 	name: '招标',
	// 	total: 0,
	// 	info: data ? data.filter(i => /1030/.test(i.id)) : '',
	// 	tagName: 'message-tender',
	// 	component: Intangible,
	// },
	// {
	// 	id: 10500,
	// 	name: '股权质押',
	// 	total: data ? toGetTotal('1050', data) : 0,
	// 	info: data ? data.filter(i => /1050/.test(i.id)) : '',
	// 	tagName: 'message-equityPledge',
	// 	component: Stock,
	// },
	// {
	// 	id: 10600,
	// 	name: '金融资产',
	// 	total: data ? toGetTotal('1060', data) : 0,
	// 	info: data ? data.filter(i => /1060/.test(i.id)) : '',
	// 	tagName: 'message-financial',
	// 	component: Chattel,
	// },
	// {
	// 	id: 10700,
	// 	name: '动产抵押',
	// 	total: data ? toGetTotal('1070', data) : 0,
	// 	info: data ? data.filter(i => /1070/.test(i.id)) : '',
	// 	tagName: 'message-intangible',
	// 	component: Intangible,
	// },
	// {
	// 	id: 10800,
	// 	name: '无形资产',
	// 	total: data ? toGetTotal('1080', data) : 0,
	// 	info: data ? data.filter(i => /1080/.test(i.id)) : '',
	// 	tagName: 'message-invisibleAssets',
	// 	component: Bidding,
	// },
	// {
	// 	id: 10900,
	// 	name: '涉诉监控',
	// 	total: data ? toGetTotal('1080', data) : 0,
	// 	info: data ? data.filter(i => /1080/.test(i.id)) : '',
	// 	tagName: 'e-assets-bidding',
	// 	component: Bidding,
	// },
	// {
	// 	id: 10901,
	// 	name: '企业破产重组',
	// 	total: data ? toGetTotal('10901', data) : 0,
	// 	info: data ? data.filter(i => /10901/.test(i.id)) : '',
	// 	tagName: 'message-bankruptcy',
	// 	component: Bidding,
	// },
	// {
	// 	id: 10800,
	// 	name: '失信记录',
	// 	total: data ? toGetTotal('1080', data) : 0,
	// 	info: data ? data.filter(i => /1080/.test(i.id)) : '',
	// 	tagName: 'message-dishonesty',
	// 	component: Bidding,
	// },
	// {
	// 	id: 10800,
	// 	name: '税收违法',
	// 	total: data ? toGetTotal('1080', data) : 0,
	// 	info: data ? data.filter(i => /1080/.test(i.id)) : '',
	// 	tagName: 'message-illegalTax',
	// 	component: Bidding,
	// },
	// {
	// 	id: 10800,
	// 	name: '环保处罚',
	// 	total: data ? toGetTotal('1080', data) : 0,
	// 	info: data ? data.filter(i => /1080/.test(i.id)) : '',
	// 	tagName: 'message-environmental',
	// 	component: Bidding,
	// },
]);

class MessageDetail extends React.Component {
	constructor(props) {
		super(props);
		document.title = '监控日报详情';
		this.state = {
			config: subItems(props.rule),
			// loading: Boolean(props.count.length === 0),
		};
	}

	componentDidMount() {
		// 默认查询全部的债务人更新的信息
		// 返回的结果： 哪些模块是有数据的，每个模块的数据是多少
		// 然后根据每个有数据的模块去请求列表数据
		headerInfo({}).then((res) => {
			console.log('res === ', res);
		}).catch(() => {

		});
	}

	handleChange = (id) => {
		console.log('id === ', id);
	};


	render() {
		console.log('msg detail props === ', this.props);
		const { config } = this.state;
		return (
			<div className="yc-inform-center">
				<Affix className="fix-header">
					<div className="messageDetail-header">
						<span className="messageDetail-header-bold">2020-07-16</span>
						<span className="messageDetail-header-bold">
							新增监控信息
							<span className="messageDetail-header-bold-sum">20</span>
							条
						</span>
						<span>已失效信息10条</span>
						<Tooltip placement="top" title="已更新的信息或对应债务人已删除的信息">
							<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
						</Tooltip>
					</div>
					<div className="tiny-line" />
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
						</Select>
					</div>
					<div className="tab">
						<div className="tab-tabs">
							{
								config.map(item => (
									<Button onClick={() => this.handleScroll(item.tagName)}>
										{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
									</Button>
								))
							}
						</div>

					</div>
				</Affix>

			</div>
		);
	}
}
export default createForm()(MessageDetail);
