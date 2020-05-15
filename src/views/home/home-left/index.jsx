import React, { PureComponent } from 'react';
import {
	homeAssetDig, riskReference, importantListAuction, importantListLandTransfer, importantListLandMortgage, importantListLandTransaction,
	importantListIntangibleEmission, importantListIntangibleMining, importantListIntangibleTrademarkRight, importantListIntangibleConstruct, importantListMortgage,
	importantListPledge, importantListSubrogationCourt, importantListSubrogationTrial, importantListSubrogationJudgment, importantListRiskPunishment,
} from 'api/home';
import { Spin } from '@/common';
import { promiseAll } from '@/utils/promise';
import DynamicUpdate from './dynamic-update';
import './style.scss';

const customStyle = { padding: '20px' };
class HomeDynamic extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checkArray: [
				{ name: '7天内更新', type: 1 },
				{ name: '30天内更新', type: 2 },
			],
			checkType: 0,
			assetPropsData: {},
			riskPropsData: {},
			AssetImportantReminderList: [],
			RiskImportantReminderList: [],
			AssetImportantReminderObligorIdList: [],
			RiskImportantReminderObligorIdList: [],
			loading: false,
			finish: false,
		};
	}

	componentDidMount() {
		const params = { type: 1 };
		this.getData(params);
	}

	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i;
		});
		return total;
	};

	getData = (val) => {
		const params = { ...val	};
		const excavate = new Map([
			['homeAsset', this.getAssetData],
			['homeRisk', this.getRiskData],
			['default', () => { console.log('未匹配'); }],
		]);
		const promiseArray = [];
		promiseArray.push(homeAssetDig(params));
		promiseArray.push(riskReference(params));
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		this.setState({ loading: true });
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			// this.setState({ loading: false, finish: true });
			if (isArray) {
				res.forEach((item) => {
					const value = { ...item, ...params };
					const excavateMap = excavate.get(item.name) || excavate.get('default');
					excavateMap.call(this, value);
				});
			}
			// console.log('all promise are resolved', res);
		}).catch((reason) => {
			this.setState({ loading: false, finish: false });
			console.log('promise reject failed reason', reason);
		});
	};

	getAssetData = (res) => {
		if (res && res.code === 200) {
			const {
				auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
				mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark,
			} = res.data;
			const landNum = this.getTotal([landMortgage, landTransaction, landTransfer]);
			const intangibleNum = this.getTotal([emission, mining, trademark, construct]);
			const subrogationNum = this.getTotal([subrogationCourt, subrogationJudgement, subrogationTrial]);
			const financeNum = this.getTotal([auctionBidding, finance]);
			const totalNum = this.getTotal([auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
				mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark]);
			const assetDataArray = [
				{
					count: auction, type: 1, typeName: '资产拍卖', name: '资产拍卖', value: 1,
				},
				{
					count: subrogationNum, type: 2, typeName: '代位权', name: '代位权', value: 2,
				},
				{
					count: landNum, type: 3, typeName: '土地信息', name: '土地信息', value: 3,
				},
				{
					count: stock, type: 4, typeName: '股权质押', name: '股权质押', value: 4,
				},
				{
					count: financeNum, type: 5, typeName: '金融资产', name: '金融资产', value: 5,
				},
				{
					count: mortgage, type: 6, typeName: '动产抵押', name: '动产抵押', value: 6,
				},
				{
					count: bidding, type: 7, typeName: '招投标', name: '招投标', value: 7,
				},
				{
					count: intangibleNum, type: 8, typeName: '无形资产', name: '无形资产', value: 8,
				},
			];
			const assetPropsData = {
				totalNum,
				assetDataArray,
			};
			this.getAssetImportantReminder(res);
			this.setState({
				assetPropsData,
				// loading: false,
			});
		}
	};

	getAssetImportantReminder = (objValue) => {
		const {
			auction, construct, emission, landMortgage, landTransaction, landTransfer,
			mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark,
		} = objValue.data;
		const params = {
			num: 10,
			type: objValue.type,
		};
		const auctionParams = {
			num: 30,
			type: objValue.type,
		};
		const apiArray = [
			{ count: auction, Api: importantListAuction, auction: true },

			{ count: landTransfer, Api: importantListLandTransfer },
			{ count: landMortgage, Api: importantListLandMortgage },
			{ count: landTransaction, Api: importantListLandTransaction },

			{ count: emission, Api: importantListIntangibleEmission },
			{ count: mining, Api: importantListIntangibleMining },
			{ count: trademark, Api: importantListIntangibleTrademarkRight },
			{ count: construct, Api: importantListIntangibleConstruct },

			{ count: mortgage, Api: importantListMortgage },
			{ count: stock, Api: importantListPledge },

			{ count: subrogationCourt, Api: importantListSubrogationCourt },
			{ count: subrogationTrial, Api: importantListSubrogationTrial },
			{ count: subrogationJudgement, Api: importantListSubrogationJudgment },
		];
		const AssetImportantReminderArray = [];
		apiArray.filter(i => i.count).forEach((item) => {
			AssetImportantReminderArray.push(item.Api(item.auction ? auctionParams : params));
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(AssetImportantReminderArray.map(promiseItem => promiseItem.catch(err => err)));
		if (AssetImportantReminderArray.length === 0) {
			this.setState({ loading: false, finish: true });
		}
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			this.setState({ loading: false, finish: true });
			const AssetImportantReminderList = [];
			const AssetImportantReminderObligorIdList = [];
			if (isArray) {
				res.forEach((item) => {
					if (item.code === 200) {
						const { importantList, obligorId } = item.data;
						AssetImportantReminderList.push(...importantList);
						AssetImportantReminderObligorIdList.push(...obligorId);
					}
				});
			}
			this.setState(() => ({
				AssetImportantReminderList,
				AssetImportantReminderObligorIdList,
			}));
			// console.log(AssetImportantReminderList, AssetImportantReminderObligorIdList);
			// console.log('all promise are resolved', res);
		}).catch((reason) => {
			this.setState({ loading: false, finish: false });
			console.log('promise reject failed reason', reason);
		});
	};

	getRiskData = (res) => {
		if (res && res.code === 200) {
			const {
				abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial,
				punishment, tax,
			} = res.data;
			const lawsuitNum = this.getTotal([lawsuitCourt, lawsuitJudgement, lawsuitTrial]);
			const operationNum = this.getTotal([abnormal, change, tax, illegal, punishment, epb]);
			const totalNum = this.getTotal([abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial,
				punishment, tax]);
			const riskDataArray = [
				{
					count: bankruptcy, type: 3, typeName: '破产重组', name: '破产重组', value: 2,
				},
				{
					count: dishonest, type: 3, typeName: '失信记录', name: '失信记录', value: 2,
				},
				{
					count: lawsuitNum, type: 3, typeName: '涉诉信息', name: '涉诉信息', value: 2,
				},
				{
					count: operationNum, type: 3, typeName: '经营风险', name: '经营风险', value: 2,
				},
			];
			const riskPropsData = {
				totalNum,
				riskDataArray,
			};
			this.getRiskImportantReminder(res);
			this.setState({
				riskPropsData,
			});
		}
	};

	getRiskImportantReminder = (objValue) => {
		const {
			abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial,
			punishment, tax,
		} = objValue.data;
		const params = {
			num: 10,
			type: objValue.type,
		};
		const auctionParams = {
			num: 30,
			type: objValue.type,
		};
		const apiArray = [
			{ count: punishment, Api: importantListRiskPunishment },
			// { count: landTransfer, Api: importantListLandTransfer },
			// { count: landMortgage, Api: importantListLandMortgage },
			// { count: landTransaction, Api: importantListLandTransaction },
		];
		const RiskImportantReminderArray = [];
		apiArray.filter(i => i.count).forEach((item) => {
			RiskImportantReminderArray.push(item.Api(item.auction ? auctionParams : params));
		});
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(RiskImportantReminderArray.map(promiseItem => promiseItem.catch(err => err)));
		// if (RiskImportantReminderArray.length === 0) {
		// 	this.setState({ loading: false, finish: true });
		// }
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;

			const RiskImportantReminderList = [];
			const RiskImportantReminderObligorIdList = [];
			if (isArray) {
				res.forEach((item) => {
					if (item.code === 200) {
						const { importantList, obligorId } = item.data;
						RiskImportantReminderList.push(...importantList);
						RiskImportantReminderObligorIdList.push(...obligorId);
					}
				});
			}
			this.setState(() => ({
				RiskImportantReminderList,
				RiskImportantReminderObligorIdList,
			}));
		}).catch((reason) => {
			this.setState({ loading: false, finish: false });
			console.log('promise reject failed reason', reason);
		});
	};

	handleClick = (index) => {
		const params = {
			type: index + 1,
		};
		this.setState(() => ({
			checkType: index,
			AssetImportantReminderList: [],
			RiskImportantReminderList: [],
			finish: false,
		}));
		this.getData(params);
	};

	render() {
		const {
			checkArray, checkType, loading, assetPropsData, riskPropsData, finish, AssetImportantReminderList, AssetImportantReminderObligorIdList, RiskImportantReminderList,
			RiskImportantReminderObligorIdList,
		} = this.state;
		const params = {
			assetPropsData,
			riskPropsData,
			AssetImportantReminderList,
			AssetImportantReminderObligorIdList,
			RiskImportantReminderList,
			RiskImportantReminderObligorIdList,
		};
		return (
			<div className="dynamic-container">
				<div className="dynamic-container-header">
					<div className="dynamic-container-header-name">动态</div>
					<div className="horizontal-line" />
					{
						checkArray.map((item, index) => (
							<div
								key={item.type}
								onClick={() => this.handleClick(index)}
								className="dynamic-container-header-type"
								style={checkType === index ? { borderBottom: '2px solid #fb8e3c', color: '#FB8E3C' } : {}}
							>
								{item.name}
							</div>
						))
					}
				</div>
				<Spin visible={loading} minHeight={663}>
					{!finish ? null : (
						<div>
							{checkType === 0 ? (
								<div style={customStyle}>
									<DynamicUpdate {...params} />
								</div>
							) : null}
							{checkType === 1 ? (
								<div style={customStyle}>
									<DynamicUpdate {...params} />
								</div>
							) : null}
						</div>
					)}
				</Spin>

			</div>
		);
	}
}

export default HomeDynamic;
