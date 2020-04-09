import React from 'react';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
import Router from '@/utils/Router';
import { Button, Tabs, Icon } from '@/common';
import { unReadCount } from '@/utils/api/monitor-info';
import { toGetRuleSource } from '@/utils';
// 主要内容模块
import Assets from './assets-auction'; // 资产拍卖
import Subrogation from './subrogation'; // 代位权
import LandData from './land-data'; // 土地数据
import Tender from './tender-bid'; // 招标中标
import Financial from './financial-assets'; // 金融资产
import Mortgage from './chattel-mortgage'; // 动产抵押
import Intangible from './intangible-assets'; // 无形资产
// import Public from './public-proclamation'; // 公示公告
// import Attention from '../my-attention'; // 我的关注
import VersionUpdateModal from '../_layoutView/versionUpdateModal';
import ClearProcess from './assets-auction/clearProcess'; // 资产清收流程

const cookie = new Cookies();

const noPage = () => <div>暂未开发</div>;

// 获取展示配置
const toGetRuth = (moduleID) => {
	const result = toGetRuleSource(global.ruleSource, moduleID);
	// console.log(result.children);
	return result.children.map((item) => {
		const _item = item;
		let components = '';
		if (item.id === `${moduleID}01`) {
			components = Assets;
		} else if (item.id === `${moduleID}02`) {
			components = Subrogation;
		} else if (item.id === `${moduleID}03`) {
			components = LandData;
		} else if (item.id === `${moduleID}04`) {
			components = Tender;
		} else if (item.id === `${moduleID}05`) {
			components = Financial;
		} else if (item.id === `${moduleID}06`) {
			components = Mortgage;
		} else if (item.id === `${moduleID}07`) {
			components = Intangible;
		} else {
			components = noPage;
		}
		_item.paramUrl = item.paramUrl || '';
		_item.components = components;
		return _item;
	});
};

// 主界面
class MonitorMain extends React.Component {
	constructor(props) {
		super(props);
		const _source = toGetRuth('YC02');
		this.state = {
			source: _source,
			VersionUpdateModalVisible: false,
		};
		this.sourceType = '';
	}

	componentDidMount() {
		this.onUnReadCount();
		this.setUnReadCount = setInterval(() => {
			this.onUnReadCount();
		}, 30 * 1000);
		const versionUpdate = cookie.get('versionUpdate');
		// console.log(versionUpdate === 'false');
		if (versionUpdate === 'true') {
			this.setState({
				VersionUpdateModalVisible: true,
			});
		}
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	/* 更新未读数据统计 */
	toRefreshCount = (typeID, count) => {
		const { source } = this.state;
		const _source = source.map((item) => {
			const _item = item;
			if (_item.id === typeID) _item.dot = count;
			return _item;
		});
		this.setState({ source: _source });
	};

	onUnReadCount = () => {
		const { source } = this.state;
		unReadCount({ event: 'loop' }).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _source = source.map((item) => {
					const _item = item;
					// console.log(_item.id, 123);
					if (_item.id === 'YC0201') _item.dot = data.auctionCount;
					if (_item.id === 'YC0202') _item.dot = data.subrogationCourtSessionCount || data.subrogationFilingCount || data.subrogationJudgmentCourt;
					if (_item.id === 'YC0203') _item.dot = data.landTransferFlag || data.landTransactionFlag || data.landMortgageFlag; // 土地数据
					if (_item.id === 'YC0204') _item.dot = data.biddingCount; // 招标中标
					if (_item.id === 'YC0205') _item.dot = data.financeCount || data.stockPledgeFlag; // 金融资产
					if (_item.id === 'YC0206') _item.dot = data.mortgageFlag; // 动产抵押
					if (_item.id === 'YC0207') _item.dot = data.intangibleConstructFlag || data.intangibleEmissionFlag || data.intangibleMiningFlag || data.intangibleTrademarkFlag; // 动产抵押
					return _item;
				});
				this.setState({ source: _source });
			}
		});
	};

	toNavigate = () => {
		navigate(`/my/attention?init=YC02${this.sourceType ? `&process=${this.sourceType}` : ''}`);
	};

	onCancel = () => {
		this.setState({
			VersionUpdateModalVisible: false,
		});
		cookie.set('versionUpdate', false);
	};

	render() {
		const { source, VersionUpdateModalVisible } = this.state;
		const { rule } = this.props;
		const _source = source.filter(item => item.status);
		// 		// console.log(_source);
		return (
			<React.Fragment>
				<Tabs
					id="TABS"
					rightRender={() => (
						<Button
							style={{
								marginTop: 8,
								marginRight: 20,
								width: 95,
								padding: '2px 9px',
							}}
							onClick={this.toNavigate}
							className="attention-btn-icon"
							size="large"
							icon={() => (
								<Icon
									type="icon-follow-ed"
									// style={{ fontsize: 14, color: '#7D8699' }}
									className="yc-btn-icon"
								/>
							)}
							title="我的关注"
						/>
					)}
					onActive={(val) => {
						console.log(val);
						this.sourceType = val;
					}}
					onChange={res => navigate(res.url + res.paramUrl || '')}
					source={source}
				/>
				<div className="yc-monitor yc-page-content">
					<Router>
						{
							_source.map(Item => (
								<Item.components
									path={`${Item.url}/*`}
									rule={rule}
									toRefreshCount={this.toRefreshCount}
								/>
							))
						}
					</Router>
				</div>
				{/** 版本更新Modal */}
				{VersionUpdateModalVisible && (
					<VersionUpdateModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						VersionUpdateModalVisible={VersionUpdateModalVisible}
					/>
				)}
			</React.Fragment>
		);
	}
}

const monitorRouter = (props) => {
	const { rule } = props;
	return (
		<Router>
			<MonitorMain path="/*" rule={rule} />
			{/* <Attention path="/monitor/attention/*" rule={rule} /> */}
			<ClearProcess path="/monitor/clearProcess/*" />
		</Router>
	);
};
export default monitorRouter;
