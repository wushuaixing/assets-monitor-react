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
import BusinessScale from './components/businessScale';
import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left">
					<div className="yc-overview-title">资产概况</div>
					<div className="yc-overview-container">
						{/* 相关资产拍卖 */}
						<AssetAuction />
						{/* 代位权信息 (裁判文书) */}
						<Subrogation />
						{/* 土地信息 */}
						<Land />
						{/* 股权质押 */}
						<EquityPledge />
						{/* 动产抵押信息 */}
						<ChattelMortgage />
					</div>
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">经营风险</div>
					<div className="yc-overview-container">
						{/* 经营风险信息 */}
						<BusinessRisk />
					</div>
					<div className="mark-line" />
					<div className="yc-overview-title">涉诉情况</div>
					<div className="yc-overview-container">
						{/*  涉诉信息 */}
						<Information />
						{/*  失信记录 */}
						<LostLetter />
					</div>
					<div className="mark-line" />
					<div className="yc-overview-title">工商基本信息</div>
					<div className="yc-overview-container">
						{/*  基本信息 */}
						<Basic />
						{/*  股东情况 */}
						<ShareholderSituation />
						{/* 企业规模 */}
						<BusinessScale />
					</div>
				</div>
			</div>
		);
	}
}
