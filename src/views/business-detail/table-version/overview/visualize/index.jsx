import React from 'react';
import {
	overviewLitigation, // 债务人涉诉
	businessOverviewLitigation, // 业务涉诉
	overviewBusiness,
} from '@/utils/api/professional-work/overview';
import { parseQuery } from '@/utils';
import AssetAuction from './components/assetAuction';
import Land from './components/land';
import Intangible from './components/intangible';
import Subrogation from './components/subrogation';
import EquityPledge from './components/equityPledge';
import ChattelMortgage from './components/chattelMortgage';
import Bidding from './components/tender';
import Bankruptcy from './components/bankruptcy';
import Dishonest from './components/dishonest';
import Information from './components/information';
import BusinessRisk from './components/businessRisk';
import Basic from '@/views/portrait-inquiry/enterprise/overview/components/basic';
import ShareholderSituation from '@/views/portrait-inquiry/enterprise/overview/components/shareholderSituation';
import BusinessScale from '@/views/portrait-inquiry/enterprise/overview/components/businessScale';
import NoContent from '@/common/noContent';
import { Spin } from '@/common';
import './style.scss';

const constantNumber = 99999999; // 默认值
export default class Visualize extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorId: parseQuery(window.location.hash).id || constantNumber,
			businessId: parseQuery(window.location.hash).id || constantNumber,
			loading: false,
			litigationInfos: null,
			baseInfo: {},
			shareholderInfos: [],
			businessScaleInfo: '',
			litigationLoading: false,
			AssetAuctionCount: 0,
			SubrogationCount: 0,
			LandCount: 0,
			EquityPledgeCount: 0,
			ChattelMortgageCount: 0,
			IntangibleCount: 0,
			BiddingCount: 0,
			BankruptcyCount: 0,
			DishonestCount: 0,
			BusinessRiskCount: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { obligorId, businessId } = this.state;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewLitigation : overviewLitigation;

		if (portrait === 'debtor_enterprise') {
			this.setState({ loading: true });

			// 获取工商基本信息
			overviewBusiness(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						baseInfo: res.data.baseInfo, // 工商基本信息
						shareholderInfos: res.data.shareholderInfos, // 股东情况
						businessScaleInfo: res.data.businessScaleInfo, // 人员规模

						loading: false,
					});
				} else {
					this.setState({ loading: false });
				}
			}).catch(() => {
				this.setState({ loading: false });
			});
		}
		this.setState({ litigationLoading: true });
		// 获取涉诉信息
		api(params).then((res) => {
			const newLitigationInfosArray = [
				{
					caseReasons: [], caseTypes: [], count: 0, type: 1, yearDistribution: [],
				},
				{
					caseReasons: [], caseTypes: [], count: 0, type: 2, yearDistribution: [],
				},
				...res.data.litigationInfos,
			];
			if (res.code === 200) {
				this.setState({
					litigationInfos: res.data.litigationInfos.length === 3 ? res.data.litigationInfos : newLitigationInfosArray,
					litigationLoading: false,
				});
			} else {
				this.setState({
					litigationLoading: false,
					litigationInfos: [
						{ count: 0 },
						{ count: 0 },
						{ count: 0 },
					],
				});
			}
		}).catch(() => {
			this.setState({
				litigationLoading: false,
				litigationInfos: [
					{ count: 0 },
					{ count: 0 },
					{ count: 0 },
				],
			});
		});
	};

	// 获取资产监控可模块数量
	getAssetProfile = (AssetProfileCountValue, type) => {
		switch (type) {
		case 'AssetAuction':
			return (
				this.setState({
					AssetAuctionCount: AssetProfileCountValue,
				})
			);
		case 'Subrogation':
			return (
				this.setState({
					SubrogationCount: AssetProfileCountValue,
				})
			);
		case 'Land':
			return (
				this.setState({
					LandCount: AssetProfileCountValue,
				})
			);
		case 'EquityPledge':
			return (
				this.setState({
					EquityPledgeCount: AssetProfileCountValue,
				})
			);
		case 'ChattelMortgage':
			return (
				this.setState({
					ChattelMortgageCount: AssetProfileCountValue,
				})
			);
		case 'Intangible':
			return (
				this.setState({
					IntangibleCount: AssetProfileCountValue,
				})
			);
		case 'Bidding':
			return (
				this.setState({
					BiddingCount: AssetProfileCountValue,
				})
			);
		case 'Bankruptcy':
			return (
				this.setState({
					BankruptcyCount: AssetProfileCountValue,
				})
			);
		case 'Dishonest':
			return (
				this.setState({
					DishonestCount: AssetProfileCountValue,
				})
			);
		case 'BusinessRisk':
			return (
				this.setState({
					BusinessRiskCount: AssetProfileCountValue,
				})
			);
		default: return '-';
		}
	};

	render() {
		const { portrait } = this.props;
		const {
			obligorId, litigationLoading, baseInfo, shareholderInfos, businessScaleInfo, litigationInfos, AssetAuctionCount, SubrogationCount, LandCount, EquityPledgeCount, ChattelMortgageCount, loading, IntangibleCount, BiddingCount, BankruptcyCount, DishonestCount, BusinessRiskCount, businessId,
		} = this.state;
		return (
			<div className="visualize-overview">
				<div className="visualize-overview-line" />
				<div className="overview-left">

					<div className="yc-overview-title">资产概况</div>
					<div className="yc-overview-container">
						{/* 相关资产拍卖 */}
						<AssetAuction portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* 无形资产 */}
						<Intangible portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						 {/* 土地信息 */}
						 <Land portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* 代位权信息 (裁判文书) */}
						 <Subrogation portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* /!* 股权质押 *!/ */}
						 <EquityPledge portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* /!* 动产抵押信息 *!/ */}
						 <ChattelMortgage portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						 {/* 招标中标 */}
						 <Bidding businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{
							AssetAuctionCount === 0 && SubrogationCount === 0 && LandCount === 0 && EquityPledgeCount === 0
							&& ChattelMortgageCount === 0 && IntangibleCount === 0 && BiddingCount === 0
							&& (
								<Spin visible={loading}>
									{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到资产信息" />}
								</Spin>
							)
						}
					</div>

				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">风险信息</div>
					<div className="yc-overview-container">
						{
							BankruptcyCount === 0 && DishonestCount === 0 && BusinessRiskCount === 0
							&& litigationInfos && litigationInfos.length > 0 && litigationInfos[0].count === 0 && litigationInfos[1].count === 0 && litigationInfos[2].count === 0
							&& (
								<Spin visible={litigationLoading}>
									{litigationLoading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到风险信息" />}
								</Spin>
							)
						}
						{/* 破产重组 */}
						<Bankruptcy portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* 失信记录 */}
						<Dishonest portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* 涉诉信息 */}
						{litigationInfos && litigationInfos.length > 0 && <Information portrait={portrait} litigationInfosArray={litigationInfos} />}
						{/* 经营风险 */}
						<BusinessRisk portrait={portrait} businessId={businessId} obligorId={obligorId} getAssetProfile={this.getAssetProfile} />
						{/* <BusinessRisk companyId={companyId} /> */}
					</div>
					{portrait === 'debtor_enterprise'
						? (
							<div>
								<div className="visualize-overview-line" />
								<div className="yc-overview-title">工商基本信息</div>
								<div className="yc-overview-container">
									{/*  基本信息 */}
									<Basic baseInfo={baseInfo} />
									{/*  股东情况 */}
									{shareholderInfos && shareholderInfos.length > 0 && <ShareholderSituation shareholderInfos={shareholderInfos} />}
									{/* 企业规模 */}
									<BusinessScale businessScaleInfo={businessScaleInfo} />
								</div>
							</div>
						) : null
					}
				</div>
			</div>
		);
	}
}
