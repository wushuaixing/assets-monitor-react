import React from 'react';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { Tabs, Button } from '@/common';
import { unReadCount } from '@/utils/api/monitor-info';
import './style.scss';
// 主要内容模块
import Assets from './assets-auction'; // 资产拍卖
import Subrogation from './subrogation'; // 代位权
import LandData from './land-data'; // 土地数据
import Tender from './tender-bid'; // 招标中标
import Financial from './financial-assets'; // 金融资产
import Mortgage from './chattel-mortgage'; // 动产抵押
// import Public from './public-proclamation'; // 公示公告
import Attention from '../my-attention'; // 我的关注
import ClearProcess from './assets-auction/clearProcess';// 资产清收流程
import Star from '@/assets/img/icon/btn_attention_h.png';

// const noPage = () => <div>暂未开发</div>;
// 获取展示配置
const toGetRuth = (rules) => {
	const rule = rules.children;
	const source = [
		{
			id: 1,
			name: '资产拍卖',
			url: '/monitor',
			paramUrl: '?process=-1',
			status: rule.jkxxzcpm,
			number: 0,
			dot: false,
			components: Assets,
		},
		{
			id: 2,
			name: '代位权',
			url: '/monitor/subrogation',
			status: rule.jkxxdwq,
			paramUrl: '',
			number: 0,
			dot: false,
			components: Subrogation,
		},
		{
			id: 10,
			name: '土地数据',
			url: '/monitor/land',
			paramUrl: '',
			status: true,
			number: 0,
			dot: false,
			components: LandData,
		},
		{
			id: 13,
			name: '招标中标',
			url: '/monitor/tender',
			paramUrl: '',
			status: true,
			number: 0,
			dot: false,
			components: Tender,
		},
		// {
		// 	id: 6,
		// 	name: '公示公告',
		// 	url: '/monitor/public',
		// 	paramUrl: '',
		// 	status: (rule.gsgg_bidding || rule.gsgg_epb || rule.gsgg_tax) && false,
		// 	number: 0,
		// 	dot: false,
		// 	components: Public,
		// },
		{
			id: 3,
			name: '金融资产',
			url: '/monitor/financial',
			status: rule.jkxxjrzcgsxm || rule.jkxxjrzcjjxm,
			paramUrl: '',
			number: 0,
			dot: false,
			components: Financial,
		},
		{
			id: 11,
			name: '动产抵押',
			url: '/monitor/mortgage',
			paramUrl: '',
			status: true,
			number: 0,
			dot: false,
			components: Mortgage,
		},
		// {
		// 	id: 12,
		// 	name: '权证',
		// 	url: '/monitor/2',
		// 	paramUrl: '',
		// 	status: false,
		// 	number: 0,
		// 	dot: false,
		// 	components: noPage,
		// },

	];
	return source.filter(item => item.status);
};

// 主界面
class MonitorMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			source: toGetRuth(props.rule),
		};
		this.sourceType = '';
	}

	componentWillMount() {
		this.onUnReadCount();
		this.setUnReadCount = setInterval(() => {
			this.onUnReadCount();
		}, 30 * 1000);
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	onUnReadCount=() => {
		const { source } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _source = source.map((item) => {
					const _item = item;
					if (_item.id === 1)_item.dot = data.auctionCount;
					if (_item.id === 2)_item.dot = data.subrogationCourtSessionCount + data.subrogationFilingCount;
					if (_item.id === 3)_item.dot = data.financeCount;
					// if (_item.id === 4)_item.dot = data.trialCourtSessionCount + data.trialFilingCount;
					// if (_item.id === 5)_item.dot = data.bankruptcyCount;
					// if (_item.id === 6)_item.dot = data.biddingCount + data.taxCount + data.epbCount;
					return _item;
				});
				this.setState({ source: _source });
			}
		});
	};

	toNavigate=() => {
		navigate(`/monitor/attention${this.sourceType ? `?process=${this.sourceType}` : ''}`);
	};

	render() {
		const { source } = this.state;
		const { rule } = this.props;
		return (
			<React.Fragment>
				<Tabs
					id="TABS"
					rightRender={() => (
						<Button
							style={{ marginTop: 6, marginRight: 25, width: 95 }}
							onClick={this.toNavigate}
							size="large"
							icon={() => <img src={Star} alt="" className="yc-img-normal" style={{ width: 16, marginTop: -2 }} />}
							title="我的关注"
						/>
					)}
					onActive={val => this.sourceType = val}
					onChange={res => navigate(res.url + res.paramUrl || '')}
					source={source}
				/>
				<div className="yc-monitor yc-page-content">
					<Router>
						{
							source.map(Item => <Item.components path={`${Item.url}/*`} rule={rule} />)
						}
					</Router>
				</div>
			</React.Fragment>
		);
	}
}

const monitorRouter = (props) => {
	const { rule } = props;
	return (
		<Router>
			<MonitorMain path="/*" rule={rule} />
			<Attention path="/monitor/attention/*" rule={rule} />
			<ClearProcess path="/monitor/clearProcess/*" />
		</Router>
	);
};
export default monitorRouter;
