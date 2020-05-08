import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { Icon } from '@/common';
import EmissionModal from './dynamic-modal/emission-modal';
import AssetAuctionModal from './dynamic-modal/assets-auction-modal';
import LandTransferModal from './dynamic-modal/land-transfer-modal';
import LandMortgageModal from './dynamic-modal/land-mortgage-modal';
import MiningModal from './dynamic-modal/mining-modal';
import TrademarkModal from './dynamic-modal/trademark-modal';
import Construction from './dynamic-modal/construction-modal';
import ChattelMortgageModal from './dynamic-modal/chattel-mortgage-modal';
import EquityPledgeModal from './dynamic-modal/equity-pledge-modal';
import SubrogationTrialModal from './dynamic-modal/subrogation-trial-modal';
import SubrogationJudgmentModal from './dynamic-modal/subrogation-judgment-modal';
import SubrogationCourtModal from './dynamic-modal/subrogation-court-modal';
import BrokenModal from './dynamic-modal/broken-record-modal';
import './style.scss';

const tag = (value) => {
	switch (value) {
	case 1: return '资产拍卖';
	case 2: return '土地出让';
	case 3: return '土地抵押';
	case 4: return '采矿权发证';
	case 5: return '排污权发证';
	case 6: return '商标专利';
	case 7: return '建筑建造资质';
	case 8: return '动产抵押';
	case 9: return '股权质押';
	case 10: return '代位权(立案)';
	case 11: return '代位权(开庭)';
	case 12: return '代位权(文书)';
	case 13: return '失信（列入）';
	case 14: return '失信（移除）';
	case 15: return '涉诉（立案）';
	case 16: return '涉诉（文书）';
	case 17: return '经营异常';
	case 18: return '税收违法';
	default: return '-';
	}
};

const icon = (value) => {
	switch (value) {
	case 1: return 'auction-2';
	case 2: return 'land-transfer';
	case 3: return 'land-mortgage';
	case 4: return 'intangible-mining';
	case 5: return 'intangible-dump';
	case 6: return 'intangible-trademark';
	case 7: return 'intangible-build';
	case 8: return 'chattel-2';
	case 9: return 'stock-2';
	case 10: return 'subrogation-2';
	case 11: return 'subrogation-2';
	case 12: return 'broken-add';
	case 13: return 'broken-remove';
	case 14: return 'lawsuit-trial';
	case 15: return 'lawsuit-judgment';
	case 16: return 'abnormal';
	case 17: return 'tax';
	case 18: return 'tax';
	default: return '-';
	}
};


class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetAuctionModalVisible: false,
			landTransferModalVisible: false,
			landMortgageModalVisible: false,
			miningModalVisible: false,
			emissionModalVisible: false,
			trademarkModalVisible: false,
			constructionModalVisible: false,
			chattelMortgageModalVisible: false,
			equityPledgeModalVisible: false,
			subrogationTrialModalVisible: false,
			subrogationJudgmentModalVisible: false,
			subrogationCourtModalVisible: false,
			brokenModalVisible: false,
			data: props.data || [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props;
		if (data !== nextProps.data) {
			this.setState(() => ({
				data: nextProps.data,
			}));
		}
	}

	handleClick = (item) => {
		const openModalMap = new Map([
			[1, () => { this.setState(() => ({ assetAuctionModalVisible: true })); }],
			[2, () => { this.setState(() => ({ landTransferModalVisible: true })); }],
			[3, () => { this.setState(() => ({ landMortgageModalVisible: true })); }],
			[4, () => { this.setState(() => ({ miningModalVisible: true })); }],
			[5, () => { this.setState(() => ({ emissionModalVisible: true })); }],
			[6, () => { this.setState(() => ({ trademarkModalVisible: true })); }],
			[7, () => { this.setState(() => ({ constructionModalVisible: true })); }],
			[8, () => { this.setState(() => ({ chattelMortgageModalVisible: true })); }],
			[9, () => { this.setState(() => ({ equityPledgeModalVisible: true })); }],
			[10, () => { this.setState(() => ({ subrogationTrialModalVisible: true })); }],
			[11, () => { this.setState(() => ({ subrogationCourtModalVisible: true })); }],
			[12, () => { this.setState(() => ({ subrogationJudgmentModalVisible: true })); }],

			[13, () => { this.setState(() => ({ brokenModalVisible: true })); }],
			[14, () => { this.setState(() => ({ brokenModalVisible: true })); }],
			['default', ['资产拍卖', 1]],
		]);
		const openModalMapType = openModalMap.get(item.type) || openModalMap.get('default');
		openModalMapType.call(this);
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			emissionModalVisible: false,
			landTransferModalVisible: false,
			assetAuctionModalVisible: false,
			landMortgageModalVisible: false,
			miningModalVisible: false,
			trademarkModalVisible: false,
			constructionModalVisible: false,
			chattelMortgageModalVisible: false,
			equityPledgeModalVisible: false,
			subrogationTrialModalVisible: false,
			subrogationJudgmentModalVisible: false,
			subrogationCourtModalVisible: false,
			brokenModalVisible: false,
		});
	};

	handleNavigate = () => {
		navigate('/info/monitor');
	};


	render() {
		const {
			data, emissionModalVisible, assetAuctionModalVisible, landTransferModalVisible, landMortgageModalVisible, miningModalVisible, trademarkModalVisible, constructionModalVisible,
			chattelMortgageModalVisible, equityPledgeModalVisible, subrogationTrialModalVisible, subrogationJudgmentModalVisible, subrogationCourtModalVisible, brokenModalVisible,
		} = this.state;

		// const { data } = this.props;
		const isData = Array.isArray(data) && data.length > 0;
		// console.log(isData, data, 333);
		return (
			<div className="detail-container">
				{/* <Button type="primary" onClick={this.startScrollUp}>向上滚动</Button> */}
				{/* <Button type="primary" onClick={this.startScrollDown}>向下滚动</Button> */}
				{/* <Button type="danger" onClick={this.endScroll}>停止滚动</Button> */}
				{
					isData ? data.map(item => (
						<div className="detail-container-content" onClick={() => this.handleClick(item)}>
							<div className="detail-container-content-left">
								<div className="detail-container-content-left-icon">
										罗山矿业
								</div>
							</div>
							<div className="detail-container-content-right">
								<div className="detail-container-content-right-header">
									<div className="detail-container-content-right-header-name">
										{item.name}
									</div>
									<div className="detail-container-content-right-header-time">
										{item.time}
									</div>
								</div>
								<div className="detail-container-content-right-item">
									<div className="detail-container-content-right-item-detail">
										{item.content}
									</div>
									<div className={`detail-container-content-right-item-tag ${(item.type === 12 || item.type === 13) ? 'red' : 'yellow'}`}>
										<Icon type={`icon-${icon(item.type)}`} className="detail-container-content-right-item-tag-icon" />
										{tag(item.type)}
									</div>
								</div>
							</div>
						</div>
					)) : (
						<div className="detail-container-noData">
							<div className="detail-container-noData-img" />
							<span className="detail-container-noData-text">暂无重要数据提醒</span>
							<div>
								<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '40px' }}>查看全部匹配信息概览</Button>
							</div>
						</div>
					)
				}
				{/** 资产拍卖Modal */}
				{assetAuctionModalVisible && (
					<AssetAuctionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						assetAuctionModalVisible={assetAuctionModalVisible}
					/>
				)}
				{/** 土地出让Modal */}
				{landTransferModalVisible && (
					<LandTransferModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						landTransferModalVisible={landTransferModalVisible}
					/>
				)}
				{/** 土地抵押Modal */}
				{landMortgageModalVisible && (
					<LandMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						landMortgageModalVisible={landMortgageModalVisible}
					/>
				)}
				{/** 采矿权发证Modal */}
				{miningModalVisible && (
					<MiningModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						miningModalVisible={miningModalVisible}
					/>
				)}
				{/** 排污权Modal */}
				{emissionModalVisible && (
					<EmissionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						emissionModalVisible={emissionModalVisible}
					/>
				)}
				{/** 商标专利Modal */}
				{trademarkModalVisible && (
					<TrademarkModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						trademarkModalVisible={trademarkModalVisible}
					/>
				)}
				{/** 建筑建造Modal */}
				{constructionModalVisible && (
					<Construction
						onCancel={this.onCancel}
						onOk={this.onOk}
						constructionModalVisible={constructionModalVisible}
					/>
				)}

				{/** 动产抵押Modal */}
				{chattelMortgageModalVisible && (
					<ChattelMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						chattelMortgageModalVisible={chattelMortgageModalVisible}
					/>
				)}
				{/** 股权质押Modal */}
				{equityPledgeModalVisible && (
					<EquityPledgeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						equityPledgeModalVisible={equityPledgeModalVisible}
					/>
				)}
				{/** 代位权(立案)Modal */}
				{subrogationTrialModalVisible && (
					<SubrogationTrialModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						subrogationTrialModalVisible={subrogationTrialModalVisible}
					/>
				)}
				{/** 代位权(开庭)Modal */}
				{subrogationCourtModalVisible && (
					<SubrogationCourtModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						subrogationCourtModalVisible={subrogationCourtModalVisible}
					/>
				)}

				{/** 代位权(文书)Modal */}
				{subrogationJudgmentModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						subrogationJudgmentModalVisible={subrogationJudgmentModalVisible}
					/>
				)}
				{/** 失信（列入）Modal */}
				{brokenModalVisible && (
					<BrokenModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 失信（移除）Modal */}
				{brokenModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 代位权(文书)Modal */}
				{subrogationJudgmentModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						subrogationJudgmentModal={subrogationJudgmentModalVisible}
					/>
				)}
			</div>
		);
	}
}

export default DetailItem;
