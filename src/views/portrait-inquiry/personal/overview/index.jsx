import React from 'react';
import AssetAuction from './components/assetAuction';
import Subrogation from './components/subrogation';
import Involved from './components/involved';
import LostLetter from './components/lostLetter';
import TaxViolation from './components/taxVolation';
import { Spin } from '@/common';
import './style.scss';

export default class OverView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '画像查询-个人';
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.setState({
			loading: true,
		});
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 2000);
	}

	render() {
		const { loading } = this.state;
		return (
			<div className="inquiry-overview">
				<div className="mark-line" />
				<div className="overview-left">
					<Spin visible={loading} modal />
					<div className="yc-overview-title">资产概况</div>
					<div className="yc-overview-container">
						{/* 相关资产拍卖 */}
						<AssetAuction />
						{/* 代位权信息 (裁判文书) */}
						<Subrogation />
					</div>
				</div>
				<div className="overview-line" />
				<div className="overview-right">
					<div className="yc-overview-title">风险情况</div>
					<div className="yc-overview-container">
						{/*  涉诉信息 (涉诉文书) */}
						<Involved />
						{/*  失信记录 */}
						<LostLetter />
						{/* 税收违法 */}
						<TaxViolation />
					</div>
				</div>
			</div>
		);
	}
}
