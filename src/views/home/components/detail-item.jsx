import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import { postMarkRead } from 'api/monitor-info/mortgage'; // 动产抵押已读
import { readStatusResult } from '@/utils/api/monitor-info/finance'; // 股权质押
import Api from '@/utils/api/monitor-info/public'; // 土地数据已读
import {
	Mining, Construction as apiConstruction, Copyright, Dump,
} from '@/utils/api/monitor-info/intangible'; // 无形资产已读
import { Court, Trial, Judgment } from '@/utils/api/monitor-info/subrogation'; // 代位权
import { timeStandard } from '@/utils';
import { Icon } from '@/common';
import borrow from '@/assets/img/home/icon-borrow.png';
import EmissionModal from './dynamic-modal/emission-modal';
import AssetAuctionModal from './dynamic-modal/assets-auction-modal';
import LandResultModal from './dynamic-modal/land-result-modal';
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
	case 101: return '资产拍卖';
	case 201: return '出让结果';
	case 202: return '土地转让';
	case 203: return '土地抵押';
	case 301: return '排污权发证';
	case 302: return '采矿权发证';
	case 303: return '商标专利';
	case 304: return '建筑建造资质';
	case 401: return '动产抵押';
	case 501: return '股权质押';
	case 601: return '代位权(开庭)';
	case 602: return '代位权(立案)';
	case 603: return '代位权(文书)';
	case 701: return '破产重组';
	case 801: return '失信（列入）';
	case 802: return '失信（移除）';
	case 901: return '涉诉(开庭)';
	case 902: return '涉诉（立案）';
	case 903: return '涉诉（文书）';
	case 1001: return '经营异常';
	case 1002: return '严重违法';
	case 1003: return '税收违法';
	case 1004: return '行政处罚';
	default: return '-';
	}
};

const icon = (value) => {
	switch (value) {
	case 101: return 'auction-2';
	case 201: return 'land-result';
	case 202: return 'land-transfer';
	case 203: return 'land-mortgage';
	case 301: return 'intangible-dump';
	case 302: return 'intangible-mining';
	case 303: return 'intangible-trademark';
	case 304: return 'intangible-build';
	case 401: return 'chattel-2';
	case 501: return 'stock-2';
	case 601: return 'subrogation-court';
	case 602: return 'subrogation-trial';
	case 603: return 'subrogation-judgment';
	case 701: return 'bankruptcy-2';
	case 801: return 'broken-add';
	case 802: return 'broken-remove';
	case 901: return 'lawsuit-court';
	case 902: return 'lawsuit-trial';
	case 903: return 'lawsuit-judgment';
	case 1001: return 'abnormal';
	case 1002: return 'illegal';
	case 1003: return 'tax';
	case 1004: return 'punishment';
	default: return '-';
	}
};

let scrollInterval = '';
class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetAuctionModalVisible: false,
			LandResultModalVisible: false,
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
			dataSource: [],
			listMarginTop: '0',
			animate: false,
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

	// 表格发生变化
	onRefresh=(objValue, type) => {
		const { data } = this.state;
		const { index } = objValue;
		const _dataSource = [...data];
		_dataSource[index][type] = objValue[type];
		this.setState({
			data: _dataSource,
		});
	};

	isReadList = (item, index, api, type) => {
		const { id, isRead } = item;
		const idList = [];
		idList.push(id);
		if (!isRead) {
			api(type === 'idList' ? { idList } : { id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				} else {
					console.error(res.data.message);
				}
			});
		}
	};

	handleClick = (item, index) => {
		const openModalMap = new Map([
			[101, () => { this.setState(() => ({ assetAuctionModalVisible: true, dataSource: item.detailList })); }],
			[201, () => {
				this.isReadList(item, index, Api.readStatusResult);
				this.setState(() => ({ LandResultModalVisible: true, dataSource: item.detailList }));
			}],
			[202, () => {
				this.isReadList(item, index, Api.readStatusTransfer);
				this.setState(() => ({ landTransferModalVisible: true, dataSource: item.detailList }));
			}],
			[203, () => {
				this.isReadList(item, index, Api.readStatusMortgage);
				this.setState(() => ({ landMortgageModalVisible: true, dataSource: item.detailList }));
			}],
			[301, () => {
				this.isReadList(item, index, Dump.read, 'idList');
				this.setState(() => ({ emissionModalVisible: true, dataSource: item.detailList }));
			}],
			[302, () => {
				this.isReadList(item, index, Mining.read, 'idList');
				this.setState(() => ({ miningModalVisible: true, dataSource: item.detailList }));
			}],
			[303, () => {
				this.isReadList(item, index, Copyright.read);
				this.setState(() => ({ trademarkModalVisible: true, dataSource: item.detailList }));
			}],
			[304, () => {
				this.isReadList(item, index, apiConstruction.read);
			  this.setState(() => ({ constructionModalVisible: true, dataSource: item.detailList }));
			}],
			[401, () => {
				this.isReadList(item, index, postMarkRead);
				this.setState(() => ({ chattelMortgageModalVisible: true, dataSource: item.detailList }));
			}],
			[501, () => {
				this.isReadList(item, index, readStatusResult);
				this.setState(() => ({ equityPledgeModalVisible: true, dataSource: item.detailList }));
			}],
			[601, () => {
				this.isReadList(item, index, Court.read, 'idList');
				this.setState(() => ({ subrogationCourtModalVisible: true, dataSource: item.detailList }));
			}],
			[602, () => {
				this.isReadList(item, index, Trial.read, 'idList');
				this.setState(() => ({ subrogationTrialModalVisible: true, dataSource: item.detailList }));
			}],
			[603, () => {
				this.isReadList(item, index, Judgment.read, 'idList');
				this.setState(() => ({ subrogationJudgmentModalVisible: true, dataSource: item.detailList }));
			}],
			[13, () => { this.setState(() => ({ brokenModalVisible: true })); }],
			[14, () => { this.setState(() => ({ brokenModalVisible: true })); }],
			['default', ['资产拍卖', 1]],
		]);
		const openModalMapType = openModalMap.get(item.detailType) || openModalMap.get('default');
		openModalMapType.call(this);
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			emissionModalVisible: false,
			LandResultModalVisible: false,
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

	scrollUp= () => {
		const { data } = this.state;
		data.push(data[0]);
		const height = document.getElementById('scrollList').getElementsByTagName('div')[0].scrollHeight + 1;
		console.log(height);
		this.setState({
			animate: true,
			listMarginTop: `-${height}px`,
		});
		setTimeout(() => {
			data.shift();
			this.setState({
				animate: false,
				listMarginTop: '0',
			});
			this.forceUpdate();
		}, 2000);
	};

	scrollDown= () => {
		const { data } = this.state;
		const ulNode = document.getElementById('scrollList').getElementsByTagName('div')[0];
		ulNode.classList.remove('opacityAnimation');
		this.setState({
			// animate: true,
			// listMarginTop: `${ulNode.lastChild.scrollHeight}px`,
		});
		setTimeout(() => {
			data.unshift(data[data.length - 1]);
			ulNode.classList.add('opacityAnimation');
			console.log(ulNode.firstChild.classList);
			data.pop();
			this.setState({
				animate: false,
				// listMarginTop: '0',
			});
			this.forceUpdate();
		}, 1000);
	};

	startScrollUp= () => {
		this.endScroll();
		this.scrollUp();
		scrollInterval = setInterval(this.scrollUp, 3000);
	};

	startScrollDown= () => {
		this.endScroll();
		this.scrollDown();
		scrollInterval = setInterval(this.scrollDown, 3000);
	};

	endScroll= () => {
		clearInterval(scrollInterval);
	};

	render() {
		const {
			dataSource, data, emissionModalVisible, assetAuctionModalVisible, LandResultModalVisible, landTransferModalVisible, landMortgageModalVisible,
			miningModalVisible, trademarkModalVisible, 		constructionModalVisible, chattelMortgageModalVisible, equityPledgeModalVisible,
			subrogationTrialModalVisible, subrogationJudgmentModalVisible, subrogationCourtModalVisible, brokenModalVisible, listMarginTop, animate,

		} = this.state;

		const isData = Array.isArray(data) && data.length > 0;
		return (
			<div className={`detail-container ${animate && 'animate'}`} id="scrollList" style={{ marginTop: listMarginTop }}>
				  {/* <Button type="primary" onClick={this.startScrollUp}>向上滚动</Button> */}
				  {/* <Button type="primary" onClick={this.startScrollDown}>向下滚动</Button> */}
				  {/* <Button type="danger" onClick={this.endScroll}>停止滚动</Button> */}
				{
					isData ? data.map((item, index) => (
						<div className="detail-container-content" onClick={() => this.handleClick(item, index)}>
							{item.isRead === 0 ? <div className="detail-container-content-icon" /> : null}
							<div className="detail-container-content-left">
								<div className="detail-container-content-left-icon">
									{item.obligorName && item.obligorName.slice(0, 4)}
								</div>
							</div>
							<div className="detail-container-content-right">
								<div className="detail-container-content-right-header">
									<div className="detail-container-content-right-header-name">
										{item.obligorName || '-'}
										{item.mainObligor ? <img src={borrow} alt="" /> : null}
									</div>
									<div className="detail-container-content-right-header-time">
										{item.timestamp ? timeStandard(item.timestamp) : '-'}
									</div>
								</div>
								<div className="detail-container-content-right-item">
									<div className="detail-container-content-right-item-detail">
										{item.description || '-'}
									</div>
									<div className={`detail-container-content-right-item-tag ${(item.type === 12 || item.type === 13) ? 'red' : 'yellow'}`}>
										<Icon type={`icon-${icon(item.detailType)}`} className="detail-container-content-right-item-tag-icon" />
										{tag(item.detailType)}
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
						dataSource={dataSource}
						assetAuctionModalVisible={assetAuctionModalVisible}
					/>
				)}
				{/** 土地出让结果Modal */}
				{LandResultModalVisible && (
					<LandResultModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						LandResultModalVisible={LandResultModalVisible}
					/>
				)}
				{/** 土地转让Modal */}
				{landTransferModalVisible && (
					<LandTransferModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						landTransferModalVisible={landTransferModalVisible}
					/>
				)}
				{/** 土地抵押Modal */}
				{landMortgageModalVisible && (
					<LandMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						landMortgageModalVisible={landMortgageModalVisible}
					/>
				)}
				{/** 采矿权发证Modal */}
				{miningModalVisible && (
					<MiningModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						miningModalVisible={miningModalVisible}
					/>
				)}
				{/** 排污权Modal */}
				{emissionModalVisible && (
					<EmissionModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						emissionModalVisible={emissionModalVisible}
					/>
				)}
				{/** 商标专利Modal */}
				{trademarkModalVisible && (
					<TrademarkModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						trademarkModalVisible={trademarkModalVisible}
					/>
				)}
				{/** 建筑建造Modal */}
				{constructionModalVisible && (
					<Construction
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						constructionModalVisible={constructionModalVisible}
					/>
				)}

				{/** 动产抵押Modal */}
				{chattelMortgageModalVisible && (
					<ChattelMortgageModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						chattelMortgageModalVisible={chattelMortgageModalVisible}
					/>
				)}
				{/** 股权质押Modal */}
				{equityPledgeModalVisible && (
					<EquityPledgeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						equityPledgeModalVisible={equityPledgeModalVisible}
					/>
				)}
				{/** 代位权(立案)Modal */}
				{subrogationTrialModalVisible && (
					<SubrogationTrialModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationTrialModalVisible={subrogationTrialModalVisible}
					/>
				)}
				{/** 代位权(开庭)Modal */}
				{subrogationCourtModalVisible && (
					<SubrogationCourtModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationCourtModalVisible={subrogationCourtModalVisible}
					/>
				)}

				{/** 代位权(文书)Modal */}
				{subrogationJudgmentModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationJudgmentModalVisible={subrogationJudgmentModalVisible}
					/>
				)}
				{/** 失信（列入）Modal */}
				{brokenModalVisible && (
					<BrokenModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 失信（移除）Modal */}
				{brokenModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						brokenModalVisible={brokenModalVisible}
					/>
				)}
				{/** 代位权(文书)Modal */}
				{subrogationJudgmentModalVisible && (
					<SubrogationJudgmentModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						dataSource={dataSource}
						subrogationJudgmentModal={subrogationJudgmentModalVisible}
					/>
				)}
			</div>
		);
	}
}

export default DetailItem;
