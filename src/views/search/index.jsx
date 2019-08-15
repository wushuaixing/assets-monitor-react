import React from 'react';
import './index.scss';
import Tabs from './search-tab';
// import Router from '@/utils/Router';
const tabSource = [
	{
		id: 1,
		name: '拍卖信息',
		types: [
			{
				id: 1,
				name: '债务人',
			},
			{
				id: 2,
				name: '证件号',
			},
			{
				id: 3,
				name: '产权证',
			},
			{
				id: 4,
				name: '地址',
			},
		],
	},
	{
		id: 2,
		name: '涉诉信息',
		types: [
			{
				id: 1,
				name: '被告',
			},
			{
				id: 2,
				name: '原告',
			},
			{
				id: 3,
				name: '案号',
			},
		],
	},
	{
		id: 3,
		name: '文书信息',
		types: [
			{
				id: 1,
				name: '全文',
			},
			{
				id: 2,
				name: '案号',
			},
			{
				id: 3,
				name: '案由',
			},
		],
	},
	{
		id: 4,
		name: '金融资产',
		types: [],
	},
];
const
const HomeRouter = () => (
	<div className="search-wrapper">
		<p>信息搜索</p>
		<div className="tab-search">
			<Tabs
				simple
				source={tabSource}
				onChange={(item) => {
					console.log(item);
				}}
			/>
			<div>
				这是内容
			</div>
		</div>
	</div>
);
export default HomeRouter;
