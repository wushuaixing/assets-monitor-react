import React from 'react';
import {
	overviewAuction, // 债务人资产拍卖
	businessOverviewAuction, // 业务资产拍卖
	overviewLand, // 债务人土地信息
	businessOverviewLand, // 业务土地信息
	overviewIntangible, // 债务人无形资产
	businessOverviewIntangible, // 业务无形资产
	overviewSubrogation, // 债务人代位权
	businessOverviewSubrogation, // 业务代位权
	overviewStock, // 债务人股权质押
	businessOverviewStock, // 业务股权质押
	overviewMortgage, // 债务人动产抵押
	businessOverviewMortgage, // 业务动产抵押
	overviewBidding, // 债务人招投标
	businessOverviewBidding, // 业务招投标
} from '@/utils/api/professional-work/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';
import AssetsCard from '../card-components/assets-card';
import LandCard from '../card-components/land-card';
import Intangible from '../card-components/intangible-card';
import Subrogation from '../card-components/subrogation-card';
import EquityPledge from '../card-components/EquityPledge-card';
import ChattelMortgage from '../card-components/chattelMortgage-card';
import Bidding from '../card-components/bidding-card';
import './style.scss';

const constantNumber = 99999999; // 默认值
export default class AssetProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			auctionPropsData: {}, // 资产拍卖
			landPropsData: {}, // 土地信息
			intangiblePropsData: {}, // 无形资产
			subrogationPropsData: {}, // 代位权
			stockPropsData: {}, // 股权质押
			mortgagePropsData: {}, // 动产抵押
			biddingPropsData: {}, // 招投标
		};
	}

	componentDidMount() {
		const urlId = getQueryByName(window.location.href, 'id') || constantNumber;
		const obligorId = urlId;
		const businessId = urlId;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 1 } : { obligorId, type: 1 };
		this.setState(() => ({
			isLoading: true,
		}));
		Promise.all([this.getAuctionData(params, portrait), this.getLandData(params, portrait), this.getIntangibleData(params, portrait), this.getSubrogationData(params, portrait),
			this.getStockData(params, portrait), this.getMortgageData(params, portrait), this.getBiddingData(params, portrait)]).then((res) => {
			this.setState({
				auctionPropsData: res[0],
				landPropsData: res[1],
				intangiblePropsData: res[2],
				subrogationPropsData: res[3],
				stockPropsData: res[4],
				mortgagePropsData: res[5],
				biddingPropsData: res[6],
				isLoading: false,
			});
		});
	}

	// 资产拍卖
	getAuctionData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewAuction : overviewAuction;
		let auctionPropsData = {};
		return api(params).then((res) => {
			if (res.code === 200) {
				auctionPropsData = {
					auctionPropsData: res.data,
				};
			}
			return auctionPropsData;
		}).catch(() => {});
	};

	// 土地信息
	getLandData = (value, portrait) => {
		// console.log(portrait);
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewLand : overviewLand;
		return api(params).then((res) => {
			let landPropsData = {};
			if (res.code === 200) {
				const dataSource = res.data.roleDistributions;
				const dataSourceNum = getCount(dataSource);
				landPropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return landPropsData;
		}).catch(() => {});
	};

	// 无形资产
	getIntangibleData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewIntangible : overviewIntangible;
		return api(params).then((res) => {
			let intangiblePropsData = {};
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.construct, typeName: '建造资质' });
				dataSource.push({ count: res.data.emission, typeName: '排污权发证' });
				dataSource.push({ count: res.data.mining, typeName: '矿业权发证' });
				dataSource.push({ count: res.data.trademark, typeName: '商标专利' });
				const dataSourceNum = getCount(dataSource);
				intangiblePropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return intangiblePropsData;
		}).catch(() => {});
	};

	// 代位权
	getSubrogationData = (value, portrait) => {
		const api = portrait === 'business' ? businessOverviewSubrogation : overviewSubrogation;
		const params = { ...value };
		return api(params).then((res) => {
			let subrogationPropsData = {};
			if (res.code === 200) {
				const {
					restore, execute, trial, judgment, courtNotice, gmtCreate,
				} = res.data;
				const allNum = trial + judgment + courtNotice;
				const otherCase = (trial + judgment + courtNotice) - execute;
				 subrogationPropsData = {
					restore,
					execute,
					allNum,
					otherCase,
					gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return subrogationPropsData;
		}).catch();
	};

	// 股权质押
	getStockData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewStock : overviewStock;
		return api(params).then((res) => {
			let stockPropsData = {};
			if (res.code === 200) {
				const dataSource = res.data.roleDistributions;
				const dataSourceNum = getCount(dataSource);
				stockPropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return stockPropsData;
		}).catch(() => {});
	};

	// 动产抵押
	getMortgageData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewMortgage : overviewMortgage;
		return api(params).then((res) => {
			let mortgagePropsData = {};
			if (res.code === 200) {
				const dataSource = res.data.roleDistributions;
				const dataSourceNum = getCount(dataSource);
				mortgagePropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return mortgagePropsData;
		}).catch(() => {});
	};

	// 招投标
	getBiddingData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewBidding : overviewBidding;
		return api(params).then((res) => {
			let biddingPropsData = {};
			if (res.code === 200) {
				const { bidding, gmtCreate } = res.data;
				biddingPropsData = {
					biddingNum: bidding,
					gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return biddingPropsData;
		}).catch(() => {});
	};

	// 判断对象是否为空
	// isEmptyObject = () => {
	// 	const {
	// 		auctionPropsData, landPropsData, intangiblePropsData, subrogationPropsData, stockPropsData, biddingPropsData, mortgagePropsData,
	// 	} = this.state;
	// 	return Object.keys(auctionPropsData).length === 0 && Object.keys(landPropsData).length === 0 && Object.keys(intangiblePropsData).length === 0
	// 		&& Object.keys(subrogationPropsData).length === 0 && Object.keys(stockPropsData).length === 0 && Object.keys(biddingPropsData).length === 0
	// 		&& Object.keys(mortgagePropsData).length === 0;
	// };

	// 判断内部是否存数据
	isHasValue = () => {
		const {
			auctionPropsData, landPropsData, intangiblePropsData, subrogationPropsData, stockPropsData, biddingPropsData, mortgagePropsData,
		} = this.state;
		return (Object.keys(auctionPropsData).length > 0 && auctionPropsData.auctionPropsData.count > 0) || landPropsData.dataSourceNum > 0 || intangiblePropsData.dataSourceNum > 0
			|| subrogationPropsData.allNum > 0 || stockPropsData.dataSourceNum > 0 || biddingPropsData.biddingNum > 0 || mortgagePropsData.dataSourceNum > 0;
	};

	render() {
		const { portrait } = this.props;
		const {
			auctionPropsData, landPropsData, intangiblePropsData, subrogationPropsData, stockPropsData, biddingPropsData, mortgagePropsData, isLoading,
		} = this.state;
		const isHasValue = this.isHasValue();
		return (
			<div>
				{isHasValue ? (
					<div>
						<div className="overview-container-title" style={{ marginTop: '40px' }}>
							<div className="overview-left-item" />
							<span className="container-title-name">资产概况</span>
						</div>

						<Spin visible={isLoading}>
							<div className="overview-container-cardContent">
								{/* 资产拍卖 */}
								<AssetsCard dataSource={auctionPropsData} portrait={portrait} />
								{/* 土地信息 */}
								<LandCard dataSource={landPropsData} portrait={portrait} />
								{/* 无形资产 */}
								<Intangible dataSource={intangiblePropsData} portrait={portrait} />
								{/* 代位权 */}
								<Subrogation dataSource={subrogationPropsData} portrait={portrait} />
								{/* 股权质押 */}
								<EquityPledge dataSource={stockPropsData} portrait={portrait} />
								{/* 动产抵押 */}
								<ChattelMortgage dataSource={mortgagePropsData} portrait={portrait} />
								{/* 招投标 */}
								<Bidding dataSource={biddingPropsData} portrait={portrait} />
							</div>
						</Spin>
					</div>
				) : null}
			</div>
		);
	}
}
