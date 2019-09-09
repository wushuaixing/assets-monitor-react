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
		display: !!(rule && rule.xxsszcpm),
		types: [
			{
				placeholder: '姓名、公司名称',
				id: 'name',
				type: 'name',
				name: '债务人',
			},
			{
				placeholder: '身份证、统一社会信用代码',
				id: 'number',
				type: 'number',
				name: '证件号',
			},
			{
				placeholder: '房产证、土地证号',
				id: 'certificate',
				type: 'certificate',
				name: '产权证',
			},
			{
				placeholder: '地址信息',
				id: 'addr',
				type: 'addr',
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
				id: 'bg0',
				type: 'bg0',
				name: '被告',
			},
			{
				placeholder: '姓名、公司名称',
				id: 'yg0',
				type: 'yg0',
				name: '原告',
			},
			{
				placeholder: '案件编号',
				id: 'ah',
				type: 'ah',
				name: '案号',
			},
		],
	},
	{
		id: 3,
		name: '文书信息',
		router: 'writ',
		display: !!(rule && rule.xxss_wsss),
		types: [
			{
				placeholder: '姓名、公司名称、关键字',
				id: 'content',
				type: 'content',
				name: '全文',
			},
			{
				placeholder: '案件编号',
				id: 'ah',
				type: 'ah',
				name: '案号',
			},
			{
				placeholder: '案件内容提要',
				id: 'reason',
				type: 'reason',
				name: '案由',
			},
		],
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
	const [highSearch, setHighSearch] = useState(false);

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
