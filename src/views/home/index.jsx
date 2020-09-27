import React from 'react';
import {
	currentOrganization, unreadInfoRemind,
} from 'api/home';
import Cookies from 'universal-cookie';
// import { promiseAll } from '@/utils/promise';
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
		const { hash } = window.location;
		// console.log(hash);
		// console.log(versionUpdate === 'false');
		if (versionUpdate === 'true' && hash !== '#/login') {
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
		if (newArr.length === 0) { return 0; }
		let total = 0;
		newArr.forEach((i) => {
			total += Number(i);
		});
		return total;
	};

	getStatus = (arr) => {
		let status = 0;
		arr.forEach((item) => {
			if (item === null) {
				status += 1;
			}
		});
		return status !== arr.length;
	};

	getData = () => {
		this.setState({ loading: true });
		unreadInfoRemind().then((res) => {
			this.setState({ loading: false });
			if (res.code === 200) {
				const {
					auctionCount, landCount, intangibleCount, subrogationCount, stockPledgeCount, mortgageCount, financeCount, biddingCount, bankrupcyCount, dishonestCount, litigationCount, managementAbnormalCount, changeMonitorCount, seriousIllegalCount, riskTaxCount, punishmentCount, riskEpbCount,
				} = res.data;
				const assetArray = [
					{
						name: '资产拍卖', count: auctionCount, color: '#FB8E3C', icon: 'auction', status: auctionCount !== null,
					},
					{
						name: '土地信息', count: landCount, color: '#1C80E1', icon: 'land', status: landCount !== null,
					},
					{
						name: '无形资产', count: intangibleCount, color: '#FFC531', icon: 'intangible', status: intangibleCount !== null,
					},
					{
						name: '代位权', count: subrogationCount, color: '#948BFF', icon: 'subrogation', status: subrogationCount !== null,
					},
					{
						name: '股权质押', count: stockPledgeCount, color: '#FB5A5C', icon: 'stock', status: stockPledgeCount !== null,
					},
					{
						name: '动产抵押', count: mortgageCount, color: '#FB5A5C', icon: 'chattel', status: mortgageCount !== null,
					},
					{
						name: '查/解封资产', count: mortgageCount, color: '#FB8E3C', icon: 'unlock', status: mortgageCount !== null,
					},
					{
						name: '金融资产', count: financeCount, color: '#FB8E3C', icon: 'finance', status: financeCount !== null,
					},
					{
						name: '招投标', count: biddingCount, color: '#3DBD7D', icon: 'bidding', status: biddingCount !== null,
					},
				];
				const riskArray = [
					{
						name: '破产重组', count: bankrupcyCount, color: '#948BFF', icon: 'bankruptcy', status: bankrupcyCount !== null,
					},
					{
						name: '失信记录', count: dishonestCount, color: '#FB5A5C', icon: 'broken', status: dishonestCount !== null,
					},
					{
						name: '限制高消费', count: dishonestCount, color: '#B927A6', icon: 'limit', status: dishonestCount !== null,
					},
					{
						name: '涉诉信息', count: litigationCount, color: '#FB8E3C', icon: 'lawsuit', status: litigationCount !== null,
					},
					{
						name: '经营风险', count: this.getTotal([managementAbnormalCount, changeMonitorCount, seriousIllegalCount, riskTaxCount, punishmentCount, riskEpbCount]), color: '#FB5A5C', icon: 'operation-risk', status: this.getStatus([managementAbnormalCount, changeMonitorCount, seriousIllegalCount, riskTaxCount, punishmentCount, riskEpbCount]),
					},
				];
				this.setState({
					assetArray,
					riskArray,
				});
			}
		}).catch();
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
