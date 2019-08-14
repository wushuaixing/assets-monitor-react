import React from 'react';
// import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

const source = [
	{
		id: 1, name: '资产拍卖', url: '', number: 0, dot: false,
	},
	{
		id: 2, name: '代位权', url: '', number: 0, dot: true,
	},
	{
		id: 3, name: '金融资产', url: '', number: 0, dot: false,
	},
	{
		id: 4, name: '涉诉监控', url: '', number: 0, dot: true,
	},
	{
		id: 5, name: '企业破产重组', url: '', number: 0, dot: false,
	},
	{
		id: 6, name: '公示公告', url: '', number: 0, dot: false,
	},
];
const HomeRouter = () => (
	<div>
		<Tabs rightRender={() => <span>eeee</span>} onChange={res => console.log(res)} source={source} />

		<span>只是首页</span>
		<Tabs onChange={res => console.log(res)} source={source} simple />
	</div>
);
export default HomeRouter;
