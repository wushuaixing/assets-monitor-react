import React from 'react';
import { navigate } from '@reach/router';
import './style.scss';
import Router from '@/utils/Router';
import { Tabs, Button } from '@/common';
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
import BusinessDetail from '../business/business-detail';
import DebtorDetail from '../business/debtor-detail';
// DebtorDetail
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
			dot: true,
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
			dot: true,
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
const MonitorMain = (props) => {
	const { rule } = props;
	const source = toGetRuth(rule);
	// console.log(source);
	return (
		<React.Fragment>
			<Tabs
				id="TABS"
				rightRender={() => (
					<Button
						style={{ marginTop: 6, marginRight: 25, width: 95 }}
						onClick={() => navigate('/monitor/attention')}
						size="large"
						icon={() => <img src={Star} alt="" className="yc-img-normal" style={{ width: 16, marginTop: -2 }} />}
						title="我的关注"
					/>
				)}
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
};

const monitorRouter = (props) => {
	const { rule } = props;
	return (
		<Router>
			<MonitorMain path="/*" rule={rule} />
			<Attention path="/monitor/attention/*" rule={rule} />
			<BusinessDetail path="/monitor/business/detail/*" parent="监控信息" parentUrl="/" />
			<DebtorDetail path="/monitor/debtor/detail/*" />
		</Router>
	);
};
export default monitorRouter;
