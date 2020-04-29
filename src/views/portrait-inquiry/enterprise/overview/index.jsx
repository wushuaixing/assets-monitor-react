import React from 'react';
import AssetAuction from './components/assetAuction';
import Subrogation from './components/subrogation';
import Land from './components/land';
import LostLetter from './components/lostLetter';
import EquityPledge from './components/equityPledge';
import ChattelMortgage from './components/chattelMortgage';
import BusinessRisk from './components/businessRisk';
import Information from './components/information';
import Basic from './components/basic';
import ShareholderSituation from './components/shareholderSituation';
import { getBusiness, getLitigation } from '@/utils/api/portrait-inquiry/enterprise/overview';
import BusinessScale from './components/businessScale';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';
import NoContent from '@/common/noContent';
import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyId: parseQuery(window.location.hash).id || -9999,
			baseInfo: {},
			loading: true,
			shareholderInfos: [],
			businessScaleInfo: '',
			yearDistributions: null,
			litigationInfos: null,
			litigationLoading: false,
			AssetAuctionCount: 0,
			SubrogationCount: 0,
			LandCount: 0,
			EquityPledgeCount: 0,
			ChattelMortgageCount: 0,
		};
	}

	componentDidMount() {
		const { viewLoading } = this.props;
		if (!viewLoading) {
			this.getData();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { viewLoading } = this.props;
		if (!nextProps.viewLoading && nextProps.viewLoading !== viewLoading) {
			this.getData();
		}
	}

	getData = () => {
		const { companyId } = this.state;
		this.setState({
			loading: true,
			litigationLoading: true,
		});
		const params = {
			companyId,
		};

		// 获取涉诉信息
		getLitigation(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					yearDistributions: res.data.assetOverviewDishonestInfo.yearDistributions,
					litigationInfos: res.data.litigationInfos,
					litigationLoading: false,
				});
			} else {
				this.setState({
					litigationLoading: false,
					yearDistributions: [],
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
				yearDistributions: [],
				litigationInfos: [
					{ count: 0 },
					{ count: 0 },
					{ count: 0 },
				],
			});
		});

		// 获取工商基本信息
		getBusiness(params).then((res) => {
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
		default: return '-';
		}
	};

	render() {
		const {
			loading, companyId, baseInfo, shareholderInfos, businessScaleInfo, yearDistributions, litigationInfos, litigationLoading, AssetAuctionCount, SubrogationCount, LandCount, EquityPledgeCount, ChattelMortgageCount,
		} = this.state;
		const { viewLoading } = this.props;
		console.log(viewLoading);
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left" style={{ minHeight: 1000 }}>

					<div className="yc-overview-title">资产概况</div>
					{
						viewLoading ? <Spin visible /> : [
							<div className="yc-overview-container">
								{/* 相关资产拍卖 */}
								<AssetAuction companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 代位权信息 (裁判文书) */}
								<Subrogation companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 土地信息 */}
								<Land companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 股权质押 */}
								<EquityPledge companyId={companyId} getAssetProfile={this.getAssetProfile} />
								{/* 动产抵押信息 */}
								<ChattelMortgage companyId={companyId} getAssetProfile={this.getAssetProfile} />
							</div>,
							AssetAuctionCount === 0 && SubrogationCount === 0 && LandCount === 0 && EquityPledgeCount === 0 && ChattelMortgageCount === 0
							&& <Spin visible={loading}>{loading ? '' : <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到资产信息" />}</Spin>,
						]
					}
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">经营风险</div>
					{/* 经营风险信息 */}
					{ viewLoading ? <Spin visible /> : <div className="yc-overview-container"><BusinessRisk companyId={companyId} /></div> }
					<div className="mark-line" />
					<div className="yc-overview-title">涉诉情况</div>
					{ viewLoading
						? <Spin visible />
						: (
							litigationInfos && yearDistributions && yearDistributions.length === 0 && litigationInfos.length > 0 && litigationInfos[0].count === 0 && litigationInfos[1].count === 0 && litigationInfos[2].count === 0
								? <NoContent style={{ paddingBottom: 60 }} font="暂未匹配到涉诉信息" />
								: (
									<Spin visible={litigationLoading}>
										<div className="yc-overview-container">
											{/*  涉诉信息 */}
											{litigationInfos && litigationInfos.length > 0 ? <Information litigationInfosArray={litigationInfos} /> : ''}
											{/*  失信记录 */}
											{yearDistributions && yearDistributions.length > 0 ? <LostLetter timeLineData={yearDistributions} /> : ''}
										</div>
									</Spin>
								))}

					<div className="mark-line" />
					<div className="yc-overview-title">工商基本信息</div>
					{ viewLoading
						? <Spin visible />
						: (
							<Spin visible={loading}>
								<div className="yc-overview-container">
									{/*  基本信息 */}
									<Basic baseInfo={baseInfo} />
									{/*  股东情况 */}
									{shareholderInfos && shareholderInfos.length > 0
									&& <ShareholderSituation shareholderInfos={shareholderInfos} />}
									{/* 企业规模 */}
									<BusinessScale businessScaleInfo={businessScaleInfo} />
								</div>
							</Spin>
						)
					}
				</div>
			</div>
		);
	}
}
