import React, { PureComponent } from 'react';
import {
	homeAssetDig, riskReference, importantListAuction, importantListLandTransfer, importantListLandMortgage, importantListLandTransaction, importantListIntangibleEmission,
	importantListIntangibleMining, importantListIntangibleTrademarkRight, importantListIntangibleConstruct, importantListMortgage, importantListPledge, importantListSubrogationCourt,
	importantListSubrogationTrial, importantListSubrogationJudgment, importantListRiskPunishment, importantListRiskTax, importantListRiskIllegal, importantListRiskAbnormal,
	importantListRiskDishonest, importantListRiskBankruptcy, importantListLawsuitCourt, importantListLawsuitTrial, importantListLawsuitJudgment, importantListRiskChange,
	importantListRiskEpb, importantListAuctionBidding, importantListFinance, importantListBidding, importantListUnseal, importantListLimitHeight,
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

	// 获取数组的总数
	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i;
		});
		return total;
	};

	// 获取资产和风险的数据
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

	// 资产每个模块的新增数量
	getAssetData = (res) => {
		if (res && res.code === 200) {
			const {
				auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
				mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark, unseal,
			} = res.data;
			const landNum = this.getTotal([landMortgage, landTransaction, landTransfer]);
			const intangibleNum = this.getTotal([emission, mining, trademark, construct]);
			const subrogationNum = this.getTotal([subrogationCourt, subrogationJudgement, subrogationTrial]);
			const financeNum = this.getTotal([auctionBidding, finance]);
			const totalNum = this.getTotal([auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer, mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark, 20]);
			const assetDataArray = [
				{
					count: auction, type: 1, typeName: '资产拍卖', name: '资产拍卖', value: 1,
				},
				{
					count: subrogationNum, type: 6, typeName: '代位权', name: '代位权', value: 2,
				},
				{
					count: landNum, type: 2, typeName: '土地信息', name: '土地信息', value: 3,
				},
				{
					count: stock, type: 5, typeName: '股权质押', name: '股权质押', value: 4,
				},
				{
					count: financeNum, type: 12, typeName: '金融资产', name: '金融资产', value: 5,
				},
				{
					count: mortgage, type: 4, typeName: '动产抵押', name: '动产抵押', value: 6,
				},
				{
					count: bidding, type: 11, typeName: '招投标', name: '招投标', value: 7,
				},
				{
					count: intangibleNum, type: 3, typeName: '无形资产', name: '无形资产', value: 8,
				},
				{
					count: unseal || 0, type: 13, typeName: '查解封资产', name: '查解封资产', value: 9,
				},
			];
			// console.log('assetDataArray === ', assetDataArray);
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

	// 资产每个模块的重要信息提醒
	getAssetImportantReminder = (objValue) => {
		const {
			auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
			mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark, unseal,
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

			{ count: bidding, Api: importantListBidding },
			// { count: unseal, Api: importantListUnseal },
			{ count: landTransfer, Api: importantListLandTransfer },
			{ count: landMortgage, Api: importantListLandMortgage },
			{ count: landTransaction, Api: importantListLandTransaction },

			{ count: auctionBidding, Api: importantListAuctionBidding },
			{ count: finance, Api: importantListFinance },

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
			// console.log('AssetImportantReminderList === ', AssetImportantReminderList);
			this.setState(() => ({
				AssetImportantReminderList: [
					...AssetImportantReminderList,
					{
						obligorName: '重庆第三工程施工队有线公司',
						description: '匹配到1条发布日期为2020.12.11的查/解封资产信息',
						timestamp: '1601125416',
						detailType: 1101,
						mainObligor: true,
						detailList: [
							{
								updateTime: '2020-09-28',
								caseNumber: '（2019）闽0104执保206号',
								court: ' 永康市人民法院',
								publishTime: '2020-10-22',
								sealUpTime: '2020-10-22',
								unsealingTime: '2020-10-22',
								parties: [
									{ name: '建军', obligorId: 9654 },
								],
								isRead: 1,
								dataType: 1,
								url: 'www.baidu.com',
								title: '石天九与张明智之间借款合同纠纷一案结案通知书',
								information: '轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.',
							},
							{
								updateTime: '2020-09-28',
								caseNumber: '（2019）闽0104执保206号',
								court: ' 永康市人民法院',
								publishTime: '2020-10-22',
								sealUpTime: '2020-10-22',
								unsealingTime: '2020-10-22',
								parties: [
									{ name: '建军', obligorId: 9654 },
								],
								isRead: 0,
								dataType: 2,
								url: 'www.baidu.com',
								title: '石天九与张明智之间借款合同纠纷一案结案通知书',
								information: '轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.轮候查封华鑫化纤科技集团有限公司名下位于广州市天河区汇景南路269号301房、天河区汇景南路271号地下一层77、76号车位、天河区汇景北路154号1302房、天河区汇景北路144号B2117车位；轮候查封唐志威名下位于.',
							},
						],
						id: 9032,
					},
				],
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
				punishment, tax, limitHeight,
			} = res.data;
			const lawsuitNum = this.getTotal([lawsuitCourt, lawsuitJudgement, lawsuitTrial]);
			const operationNum = this.getTotal([abnormal, change, tax, illegal, punishment, epb]);
			const totalNum = this.getTotal([abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial, punishment, tax, 50]);
			const riskDataArray = [
				{
					count: bankruptcy, type: 7, typeName: '破产重组', name: '破产重组', value: 2,
				},
				{
					count: dishonest, type: 8, typeName: '失信记录', name: '失信记录', value: 2,
				},
				{
					count: lawsuitNum, type: 9, typeName: '涉诉信息', name: '涉诉信息', value: 2,
				},
				{
					count: operationNum, type: 10, typeName: '经营风险', name: '经营风险', value: 2,
				},
				{
					count: limitHeight, type: 10, typeName: '限制高消费', name: '限制高消费', value: 2,
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
			abnormal, bankruptcy, dishonest, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial, change,
			punishment, tax, epb, limitHeight,
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
			{ count: bankruptcy, Api: importantListRiskBankruptcy },
			{ count: punishment, Api: importantListRiskPunishment },
			{ count: tax, Api: importantListRiskTax },
			{ count: illegal, Api: importantListRiskIllegal },
			{ count: abnormal, Api: importantListRiskAbnormal },
			{ count: change, Api: importantListRiskChange },
			{ count: epb, Api: importantListRiskEpb },
			{ count: dishonest, Api: importantListRiskDishonest },
			{ count: lawsuitTrial, Api: importantListLawsuitTrial },
			{ count: lawsuitCourt, Api: importantListLawsuitCourt },
			{ count: lawsuitJudgement, Api: importantListLawsuitJudgment },
			{ count: limitHeight, Api: importantListLimitHeight },
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
				RiskImportantReminderList: [
					...RiskImportantReminderList,
				],
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
								style={checkType === index ? { borderBottom: '2px solid #fb8e3c', color: '#FB8E3C', fontWeight: '500' } : {}}
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
