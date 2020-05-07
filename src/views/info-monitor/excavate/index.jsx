import React, { PureComponent } from 'react';
import { Spin } from '@/common';
import { auctionCard, landCard, intangibleCard } from '@/utils/api/monitor-info/excavate/index';
import { promiseAll } from '@/utils/promise';
import {
	AssetCard, LandCard, Intangible, Subrogation, Stock, Chattel, Finance, Bidding,
} from '../components';
import './style.scss';
import getCount from '@/views/portrait-inquiry/common/getCount';

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
					API: auctionCard(),
				},
				{
					id: 2,
					title: '土地信息',
					rule: isRule && props.rule.children.zcwjtdsj,
					url: '/monitor/land',
					Component: LandCard,
					API: landCard(),
				},
				{
					id: 3,
					title: '无形资产',
					rule: isRule && props.rule.children.zcwjwxzc,
					url: '/monitor/intangible',
					Component: Intangible,
					API: intangibleCard(),
				},
				{
					id: 4,
					title: '代位权',
					rule: isRule && props.rule.children.zcwjtdsj,
					url: '/monitor/subrogation',
					Component: Subrogation,
					API: auctionCard(),
				},
				{
					id: 5,
					title: '股权质押',
					rule: isRule && props.rule.children.zcwjzcpm,
					url: '/risk/operation',
					Component: Stock,
					API: auctionCard(),
				},
				{
					id: 6,
					title: '动产抵押',
					rule: isRule && props.rule.children.zcwjdcdy,
					url: '/monitor/mortgage',
					Component: Chattel,
					API: auctionCard(),
				},
				{
					id: 7,
					title: '金融资产',
					rule: isRule && props.rule.children.zcwjjrzj,
					url: '/monitor/financial',
					Component: Finance,
					API: auctionCard(),
				},
				{
					id: 8,
					title: '招投标',
					rule: isRule && props.rule.children.zcwjzbzb,
					url: '/monitor/tender',
					Component: Bidding,
					API: auctionCard(),
				},
			].filter(i => this.isObject(i.rule)),
			loading: false,
			auctionPropsData: {},
			landPropsData: {},
			intangiblePropsData: {},
		};
	}

	componentDidMount() {
		// 资产卡片列表
		this.getData();
	}

	getData = () => {
		const excavate = new Map([
			['asset', this.getAuctionData],
			['land', this.getLandData],
			['intangible', this.getIntangibleData],
			['default', () => { console.log(4); }],
		]);

		const promiseArray = [];
		const { config } = this.state;
		config.forEach((item) => {
			promiseArray.push(item.API);
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		this.setState({ loading: true });
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			this.setState({ loading: false });
			if (isArray) {
				res.forEach((item) => {
					const excavateMap = excavate.get(item.name) || excavate.get('default');
					excavateMap.call(this, item);
				});
			}
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			this.setState({ loading: false });
			console.log('promise reject failed reason', reason);
		});
	};

	// 资产拍卖
	getAuctionData = (res) => {
		if (res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.assetOwner || 0, typeName: '资产所有人' });
			dataSource.push({ count: res.data.bidder || 0, typeName: '竞买人' });
			dataSource.push({ count: res.data.creditor || 0, typeName: '债权人' });
			dataSource.push({ count: res.data.assetClue || 0, typeName: '财产线索' });
			dataSource.push({ count: res.data.unknown || 0, typeName: '未知角色' });
			const dataSourceNum = getCount(dataSource);
			const auctionPropsData = {
				auctionArray: dataSource,
				totalCount: dataSourceNum,
				assetTotal: res.data.assetTotal,
				gmtUpdate: res.data.gmtUpdate,
			};
			this.setState(() => ({
				auctionPropsData,
			}));
		}
	};

	// 土地信息
	getLandData = (res) => {
		if (res && res.code === 200) {
			const {
				gmtUpdate, mortgagee, mortgageeAmount, owner, ownerAmount,
			} = res.data;
			const dataSourceNum = Number(mortgagee || 0) + Number(owner || 0);
			const landPropsData = {
				gmtUpdate,
				mortgagee, // 抵押权人
				mortgageeAmount, // 抵押额
				owner, // 使用权人
				ownerAmount, // 土地价值
				totalCount: dataSourceNum,
			};
			this.setState(() => ({
				landPropsData,
			}));
		}
	};

	// 无形资产
	getIntangibleData = (res) => {
		if (res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.emission || 0, typeName: '排污权发证' });
			dataSource.push({ count: res.data.trademark || 0, typeName: '商标专利' });
			dataSource.push({ count: res.data.mining || 0, typeName: '矿业权发证' });
			dataSource.push({ count: res.data.construct || 0, typeName: '建造资质' });
			const dataSourceNum = getCount(dataSource);
			const intangiblePropsData = {
				intangibleArray: dataSource,
				totalCount: dataSourceNum,
				gmtUpdate: res.data.gmtUpdate,
			};
			this.setState(() => ({
				intangiblePropsData,
			}));
		}
	};

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	render() {
		const {
			config, loading, auctionPropsData, landPropsData, intangiblePropsData,
		} = this.state;
		// 权限过滤
		// const ruleResultArr = config.filter(i => this.isObject(i.rule));
		const params = {
			getAssetLoading: this.getAssetLoading,
			auctionPropsData,
			landPropsData,
			intangiblePropsData,
		};


		return (
			<Spin visible={loading} minHeight={540}>
				<div className="monitor-excavate-container">
					{
						loading ? null : config.map(Item => <Item.Component {...params} title={Item.title} url={Item.url} />)
					}
				</div>
			</Spin>
		);
	}
}
