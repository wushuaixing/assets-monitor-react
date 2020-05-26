import React from 'react';
import { currentOrganization, homeAssetDig, riskReference } from 'api/home';
import Cookies from 'universal-cookie';
import { promiseAll } from '@/utils/promise';
import Header from './home-header';
import QuickStart from './home-right/quick-start';
import Overview from './home-right/overview';
import Dynamic from './home-left/index';
import VersionUpdateModal from '../_others/layout/versionUpdateModal';
import './index.scss';

const cookie = new Cookies();
class HomeRouter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {
			headerPropsData: {}, // 首页详情
			assetArray: [],
			riskArray: [],
			loading: false,
			VersionUpdateModalVisible: false,
		};
	}

	componentDidMount() {
		this.getHeaderData();
		this.getData();
		const versionUpdate = cookie.get('versionUpdate');
		// console.log(versionUpdate === 'false');
		if (versionUpdate === 'true') {
			this.setState({
				VersionUpdateModalVisible: true,
			});
		}
	}

	onCancel = () => {
		this.setState({
			VersionUpdateModalVisible: false,
		});
		cookie.set('versionUpdate', false);
	};

	// 获取统计信息
	getHeaderData=() => {
		currentOrganization().then((res) => {
			if (res.code === 200) {
				this.setState(() => ({
					headerPropsData: res.data,
				}));
			}
		});
	};

	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i;
		});
		return total;
	};

	getData = () => {
		const excavate = new Map([
			['homeAsset', this.getAsset],
			['homeRisk', this.getRisk],
			['default', () => { console.log('未匹配'); }],
		]);
		const promiseArray = [];
		promiseArray.push(homeAssetDig());
		promiseArray.push(riskReference());
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		this.setState({ loading: true });
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			const isArray = Array.isArray(res) && res.length > 0;
			this.setState({ loading: false });
			if (isArray) {
				res.forEach((item) => {
					const excavateMap = excavate.get(item.name) || excavate.get('default');
					excavateMap.call(this, item);
				});
			}
			// console.log('all promise are resolved', res);
		}).catch((reason) => {
			this.setState({ loading: false });
			console.log('promise reject failed reason', reason);
		});
	};

	getAsset = (res) => {
		if (res && res.code === 200) {
			const {
				auction, auctionBidding, bidding, construct, emission, finance, landMortgage, landTransaction, landTransfer,
				mining, mortgage, stock, subrogationCourt, subrogationJudgement, subrogationTrial, trademark,
			} = res.data;
			const landNum = this.getTotal([landMortgage, landTransaction, landTransfer]);
			const intangibleNum = this.getTotal([emission, mining, trademark, construct]);
			const subrogationNum = this.getTotal([subrogationCourt, subrogationJudgement, subrogationTrial]);
			const financeNum = this.getTotal([auctionBidding, finance]);
			const assetArray = [
				{
					name: '资产拍卖', count: auction, color: '#FB8E3C', icon: 'auction',
				},
				{
					name: '土地信息', count: landNum, color: '#1C80E1', icon: 'land',
				},
				{
					name: '无形资产', count: intangibleNum, color: '#FFC531', icon: 'intangible',
				},
				{
					name: '代位权', count: subrogationNum, color: '#948BFF', icon: 'subrogation',
				},
				{
					name: '股权质押', count: stock, color: '#FB5A5C', icon: 'stock',
				},
				{
					name: '动产抵押', count: mortgage, color: '#FB5A5C', icon: 'chattel',
				},
				{
					name: '金融资产', count: financeNum, color: '#FB8E3C', icon: 'finance',
				},
				{
					name: '招投标', count: bidding, color: '#3DBD7D', icon: 'bidding',
				},
			];
			this.setState(() => ({
				assetArray,
			}));
		}
	};

	getRisk = (res) => {
		if (res && res.code === 200) {
			const {
				abnormal, bankruptcy, change, dishonest, epb, illegal, lawsuitCourt, lawsuitJudgement, lawsuitTrial,
				punishment, tax,
			} = res.data;
			const lawsuitNum = this.getTotal([lawsuitCourt, lawsuitJudgement, lawsuitTrial]);
			const operationNum = this.getTotal([abnormal, change, tax, illegal, punishment, epb]);
			const riskArray = [
				{
					name: '破产重组', count: bankruptcy, color: '#948BFF', icon: 'bankruptcy',
				},
				{
					name: '失信记录', count: dishonest, color: '#FB5A5C', icon: 'broken',
				},
				{
					name: '涉诉信息', count: lawsuitNum, color: '#FB8E3C', icon: 'lawsuit',
				},
				{
					name: '经营风险', count: operationNum, color: '#FB5A5C', icon: 'operation-risk',
				},
			];
			this.setState(() => ({
				riskArray,
			}));
		}
	};

	render() {
		const {
			headerPropsData, assetArray, riskArray, loading, VersionUpdateModalVisible,
		} = this.state;
		const { baseRule } = this.props;
		const params = {
			headerPropsData,
		};
		const overviewParams = {
			assetArray,
			riskArray,
			loading,
		};
		return (
			<div className="home-container">
				<div className="home-container-header">
					<Header {...params} />
				</div>
				<div className="home-container-horizontal-mark-line" />
				<div className="home-container-content">
					<div className="home-container-content-left">
						<Dynamic />
					</div>
					<div className="home-container-content-middle" />
					<div className="home-container-content-right">
						<div className="home-container-content-right-quickStart">
							<QuickStart rule={baseRule} />
						</div>
						<div className="home-container-horizontal-mark-line" />
						<div className="home-container-content-right-overview">
							<Overview {...overviewParams} />
						</div>
					</div>
				</div>
				{/** 版本更新Modal */}
				{VersionUpdateModalVisible && (
					<VersionUpdateModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						VersionUpdateModalVisible={VersionUpdateModalVisible}
					/>
				)}
			</div>
		);
	}
}

export default HomeRouter;
