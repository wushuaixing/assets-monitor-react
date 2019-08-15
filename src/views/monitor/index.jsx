import React from 'react';
import { navigate } from '@reach/router';

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

const source = [
	{
		id: 1,
		name: '资产拍卖',
		url: '/monitor',
		paramUrl: '?process=2',
		number: 0,
		dot: false,
		components: Assets,
	},
	{
		id: 2,
		name: '代位权',
		url: '/monitor/subrogation',
		number: 0,
		dot: true,
		components: Subrogation,
	},
	{
		id: 3,
		name: '金融资产',
		url: '/monitor/financial',
		number: 0,
		dot: false,
		components: Financial,
	},
	{
		id: 4,
		name: '涉诉监控',
		url: '/monitor/lawsuits',
		number: 0,
		dot: true,
		components: Lawsuits,
	},
	{
		id: 5,
		name: '企业破产重组',
		url: '/monitor/bankruptcy',
		number: 0,
		dot: false,
		components: Bankruptcy,
	},
	{
		id: 6,
		name: '公示公告',
		url: '/monitor/public',
		number: 0,
		dot: false,
		components: Public,
	},
];

const MonitorMain = () => (
	<React.Fragment>
		<Tabs
			rightRender={() => (
				<Button
					style={{ marginTop: 6, marginRight: 25, width: 95 }}
					onClick={() => navigate('/monitor/attention')}
					size="large"
					icon={() => <img src={Star} alt="" className="yc-img-normal" style={{ width: 16, marginTop: -2 }} />}
				>
					{'我的关注'}
				</Button>
			)}
			onChange={res => navigate(res.url + res.paramUrl || '')}
			source={source}
		/>
		<div className="yc-monitor yc-page-content">
			<Router>
				{
					source.map(Item => <Item.components path={`${Item.url}/*`} />)
				}
			</Router>
		</div>
	</React.Fragment>
);

const monitorRouter = () => (
	<Router>
		<MonitorMain path="/*" />
		<Attention path="/monitor/attention/*" />
	</Router>
);
export default monitorRouter;
