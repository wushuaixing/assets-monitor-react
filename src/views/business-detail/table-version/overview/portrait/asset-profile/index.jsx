import React from 'react';
import AssetsCard from '../cardComponents/assets-card';
import LandCard from '../cardComponents/land-card';
import Intangible from '../cardComponents/intangible-card';
import Subrogation from '../cardComponents/subrogation-card';
import EquityPledge from '../cardComponents/EquityPledge-card';
import ChattelMortgage from '../cardComponents/chattelMortgage-card';
import Bidding from '../cardComponents/bidding-card';
import { Spin } from '@/common';
import './style.scss';

export default class AssetProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { portrait, loading } = this.props;
		return (
			<div>
				<div className="overview-container-title" style={{ marginTop: '40px' }}>
					<div className="overview-left-item" />
					<span className="container-title-name">资产概况</span>
				</div>
				<Spin visible={loading}>

					<div className="overview-container-cardContent">

						{/* 资产拍卖 */}
						<AssetsCard portrait={portrait} />
						{/* 土地信息 */}
						<LandCard portrait={portrait} />
						{/* 无形资产 */}
						<Intangible portrait={portrait} />
						{/* 代位权 */}
						<Subrogation portrait={portrait} />
						{/* 股权质押 */}
						<EquityPledge portrait={portrait} />
						{/* 动产抵押 */}
						<ChattelMortgage portrait={portrait} />
						{/* 招投标 */}
						<Bidding portrait={portrait} />

					</div>
				</Spin>

			</div>
		);
	}
}
