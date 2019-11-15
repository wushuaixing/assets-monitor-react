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
import { getBusiness } from '@/utils/api/portrait-inquiry/enterprise/overview';
import BusinessScale from './components/businessScale';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';

import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyId: parseQuery(window.location.hash).id || -9999,
			baseInfo: {},
			shareholderInfos: [],
			businessScaleInfo: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId } = this.state;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getBusiness(params)
			.then((res) => {
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
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	render() {
		const {
			loading, companyId, baseInfo, shareholderInfos, businessScaleInfo,
		} = this.state;
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left">

					<div className="yc-overview-title">资产概况</div>
					<div className="yc-overview-container">
						{/* 相关资产拍卖 */}
						<AssetAuction companyId={companyId} />
						{/* 代位权信息 (裁判文书) */}
						<Subrogation companyId={companyId} />
						{/* 土地信息 */}
						<Land companyId={companyId} />
						{/* 股权质押 */}
						<EquityPledge companyId={companyId} />
						{/* 动产抵押信息 */}
						<ChattelMortgage companyId={companyId} />
					</div>
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">经营风险</div>
					<div className="yc-overview-container">
						{/* 经营风险信息 */}
						<BusinessRisk companyId={companyId} />
					</div>
					<div className="mark-line" />
					<div className="yc-overview-title">涉诉情况</div>
					<div className="yc-overview-container">
						{/*  涉诉信息 */}
						<Information companyId={companyId} />
						{/*  失信记录 */}
						<LostLetter companyId={companyId} />
					</div>
					<div className="mark-line" />
					<div className="yc-overview-title">工商基本信息</div>
					<Spin visible={loading}>
						<div className="yc-overview-container">
							{/*  基本信息 */}
							<Basic baseInfo={baseInfo} />
							{/*  股东情况 */}
							{shareholderInfos && shareholderInfos.length > 0 && <ShareholderSituation shareholderInfos={shareholderInfos} />}
							{/* 企业规模 */}
							<BusinessScale businessScaleInfo={businessScaleInfo} />
						</div>
					</Spin>
				</div>
			</div>
		);
	}
}
