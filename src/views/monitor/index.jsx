import React from 'react';
import { navigate } from '@reach/router';
import './style.scss';
import Router from '@/utils/Router';
import { Tabs, Button } from '@/common';
import { unReadCount } from '@/utils/api/monitor-info';

// 主要内容模块
import Assets from './assets-auction';
import Subrogation from './subrogation';
import Financial from './financial-assets';
import Lawsuits from './lawsuits-monitor';
import Bankruptcy from './bankruptcy';
import Public from './public-proclamation';
// 我的关注
import Attention from './my-attention';

import Star from '@/assets/img/icon/btn_attention_h.png';

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
			id: 4,
			name: '涉诉监控',
			url: '/monitor/lawsuits',
			status: rule.jkxxssjk,
			paramUrl: '',
			number: 0,
			dot: false,
			components: Lawsuits,
		},
		{
			id: 5,
			name: '企业破产重组',
			url: '/monitor/bankruptcy',
			status: rule.jkxxpccz,
			paramUrl: '',
			number: 0,
			dot: false,
			components: Bankruptcy,
		},
		{
			id: 6,
			name: '公示公告',
			url: '/monitor/public',
			paramUrl: '',
			status: rule.gsgg_bidding || rule.gsgg_epb || rule.gsgg_tax,
			number: 0,
			dot: false,
			components: Public,
		},
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
					if (_item.id === 4)_item.dot = data.trialCourtSessionCount + data.trialFilingCount;
					if (_item.id === 5)_item.dot = data.bankruptcyCount;
					if (_item.id === 6)_item.dot = data.biddingCount + data.taxCount + data.epbCount;
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
			{/* <BusinessDetail path="/monitor/business/detail/*" parent="监控信息" parentUrl="/" /> */}
			{/* <DebtorDetail path="/business/debtor/detail/*" /> */}
		</Router>
	);
};
export default monitorRouter;
