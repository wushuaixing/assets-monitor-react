import React, { PureComponent } from 'react';
import { Spin } from '@/common';
import { auctionCard, landCard, intangibleCard } from '@/utils/api/monitor-info/excavate/index';
import { promiseAll } from '@/utils/promise';
import {
	AssetCard, LandCard, Intangible, Subrogation, Stock, Chattel, Finance, Bidding,
} from '../components';
import './style.scss';

export default class Excavate extends PureComponent {
	constructor(props) {
		super(props);
		document.title = '资产挖掘';
		// console.log(props.rule);
		const isRule = props && props.rule && props.rule.children;
		this.state = {
			config: [
				{
					id: 1,
					title: '资产拍卖',
					rule: isRule && props.rule.children.zcwjzcpm,
					url: '/monitor?process=1',
					Component: AssetCard,
					API: auctionCard,
				},
				{
					id: 2,
					title: '土地信息',
					rule: isRule && props.rule.children.zcwjtdsj,
					url: '/monitor/land',
					Component: LandCard,
				},
				{
					id: 3,
					title: '无形资产',
					rule: isRule && props.rule.children.zcwjwxzc,
					url: '/monitor/intangible',
					Component: Intangible,

				},
				{
					id: 4,
					title: '代位权',
					rule: isRule && props.rule.children.zcwjtdsj,
					url: '/monitor/subrogation',
					Component: Subrogation,
				},
				{
					id: 5,
					title: '股权质押',
					rule: isRule && props.rule.children.zcwjzcpm,
					url: '/risk/operation',
					Component: Stock,
				},
				{
					id: 6,
					title: '动产抵押',
					rule: isRule && props.rule.children.zcwjdcdy,
					url: '/monitor/mortgage',
					Component: Chattel,
				},
				{
					id: 7,
					title: '金融资产',
					rule: isRule && props.rule.children.zcwjjrzj,
					url: '/monitor/financial',
					Component: Finance,
				},
				{
					id: 8,
					title: '招投标',
					rule: isRule && props.rule.children.zcwjzbzb,
					url: '/monitor/tender',
					Component: Bidding,
				},
			],
		};
	}

	componentDidMount() {
		// 资产卡片列表
		this.getData();
	}

	getData = () => {
		const promiseArray = [];
		promiseArray.push(auctionCard()); // 资产拍卖
		promiseArray.push(landCard()); // 土地信息
		promiseArray.push(intangibleCard()); // 无形资产
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			if (isArray) {
				res.forEach((item) => {
					console.log(item);
				});
			}
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	render() {
		const { config } = this.state;
		// 权限过滤
		const ruleResultArr = config.filter(i => this.isObject(i.rule));
		const params = {
			getAssetLoading: this.getAssetLoading,
		};


		return (
			<div className="monitor-excavate-container">
				{
					ruleResultArr.map(Item => <Item.Component {...params} title={Item.title} url={Item.url} />)
				}
			</div>
		);
	}
}
