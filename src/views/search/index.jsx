import React, { useState, useEffect } from 'react';
import Tabs from './search-tab';
import Datas from './search-data';
import Router from '@/utils/Router';
import Detail from './search-detail';
import './index.scss';

const tabSource = rule => ([
	{
		id: 1,
		name: '拍卖信息',
		router: 'auction',
		display: !!(rule && rule.xxsszcpm),
	},
	{
		id: 2,
		name: '涉诉信息',
		router: 'lawsuits',
		display: !!(rule && rule.xxssssxx),
	},
	{
		id: 3,
		name: '文书信息',
		router: 'writ',
		display: !!(rule && rule.xxss_wsss),
	},
	{
		id: 4,
		type: 'content',
		name: '金融资产',
		router: 'finance',
		display: !!(rule && rule.xxssjrzc),
		types: [],
	},
]);
const HomeRouter = (props) => {
	const { rule } = props && props;

	const displayArray = tabSource(rule).filter(item => item.display === true); // 过滤权限
	const [active, setActive] = useState(displayArray[0]);
	useEffect(() => {
		// Update the document title using the browser API
		document.title = '信息搜索';
	});
	return (
		<div className="search-wrapper">
			<p>信息搜索</p>
			<div className="tab-search">
				<Tabs
					simple
					// TODO 改了权限，displayArray改成tabSource(rule),上传改回来
					source={displayArray}
					onChange={(item) => {
						setActive(item);
					}}
				/>

				<div>
					<Datas active={active} highSearch />
				</div>
			</div>
		</div>
	);
};
const BaseRouter = (props) => {
	const { rule: { children } } = props;

	return (
		<Router>
			<HomeRouter rule={children} path="/*" />
			<Detail rule={children} path="/search/detail/*" />
		</Router>
	);
};

export default BaseRouter;
