import React, { useState } from 'react';
import './index.scss';
import Tabs from './search-tab';
import Datas from './search-data';
import Router from '@/utils/Router';
import Detail from './search-detail';

const tabSource = rule => ([
	{
		id: 1,
		name: '拍卖信息',
		router: 'auction',
		display: !!(rule && rule.xxsspmxx),
		types: [
			{
				placeholder: '姓名、公司名称',
				id: 1,
				name: '债务人',
			},
			{
				placeholder: '身份证、统一社会信用代码',
				id: 2,
				name: '证件号',
			},
			{
				placeholder: '房产证、土地证号',
				id: 3,
				name: '产权证',
			},
			{
				placeholder: '地址信息',
				id: 4,
				name: '地址',
			},
		],
	},
	{
		id: 2,
		name: '涉诉信息',
		router: 'lawsuits',
		display: !!(rule && rule.xxssssxx),
		types: [
			{
				placeholder: '姓名、公司名称',
				id: 1,
				name: '被告',
			},
			{
				placeholder: '姓名、公司名称',
				id: 2,
				name: '原告',
			},
			{
				placeholder: '案件编号',
				id: 3,
				name: '案号',
			},
		],
	},
	{
		id: 3,
		name: '文书信息',
		router: 'writ',
		display: !!(rule && rule.xxsswsxx),
		types: [
			{
				placeholder: '姓名、公司名称、关键字',
				id: 1,
				name: '全文',
			},
			{
				placeholder: '案件编号',
				id: 2,
				name: '案号',
			},
			{
				placeholder: '案件内容提要',
				id: 3,
				name: '案由',
			},
		],
	},
	{
		id: 4,
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
	const [highSearch, setHighSearch] = useState(false);

	return (
		<div className="search-wrapper">
			<p>信息搜索</p>
			<div className="tab-search">
				<Tabs
					simple
					source={tabSource(rule)}
					onChange={(item) => {
						setActive(item);
					}}
				/>
				{
					active.id !== 4 ? (
						<p
							className="high-search"
							onClick={(() => {
								setHighSearch(!highSearch);
							})}
						>
							{highSearch ? '收起高级搜索' : '切换高级搜索'}
						</p>
					) : null
				}

				<div>
					<Datas active={active} highSearch={highSearch} />
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
