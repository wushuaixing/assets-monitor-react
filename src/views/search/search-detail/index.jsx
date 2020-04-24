import React from 'react';
import Router from '@/utils/Router';
import Write from './writ';
import Auction from './auction';
import Finance from './finance';
import Lawsuits from './lawsuits';
import Bankruptcy from './bankruptcy';
import { BreadCrumb } from '@/common';

const source = rule => ([
	{
		id: 1,
		name: '拍卖信息',
		url: '/search/detail',
		number: 0,
		open: !!(rule && rule.xxsspmxx),
		components: Auction,
	},
	{
		id: 2,
		name: '涉诉信息',
		url: '/search/detail/lawsuits',
		number: 0,
		open: !!(rule && rule.xxssssxx),
		components: Lawsuits,
	},
	{
		id: 3,
		name: '文书信息',
		url: '/search/detail/writ',
		number: 0,
		open: !!(rule && rule.xxsswsxx),
		components: Write,
	},
	{
		id: 4,
		name: '金融资产',
		url: '/search/detail/finance',
		number: 0,
		open: !!(rule && rule.xxssjrzc),
		components: Finance,
	},
	{
		id: 5,
		name: '破产重组',
		url: '/search/detail/bankruptcy',
		number: 0,
		open: !!(rule && rule.xxsspccz),
		components: Bankruptcy,
	},
]);

const SearchBase = (props) => {
	const { rule } = props && props;
	const displayArray = source(rule).filter(item => item.open === true); // 过滤权限
	let text = '拍卖信息';
	displayArray.forEach((i) => { if (new RegExp(i.url).test(window.location.hash))text = i.name; });
	return (
		<React.Fragment>
			<BreadCrumb list={[
				{ id: 1, name: '信息搜索', link: '/info/search' },
				{ id: 2, name: '分类搜索', link: '/info/search/several' },
				{ id: 3, name: text },
			]}
			/>
			<div className="yc-line" />
			<div className="yc-business yc-page-content">
				<Router>
					{ displayArray.map(Item => <Item.components path={`${Item.url}/*`} />) }
				</Router>
			</div>
		</React.Fragment>
	);
};


const SearchRouter = (props) => {
	const { rule } = props;

	return (
		<Router>
			<SearchBase rule={rule} path="/*" />
		</Router>
	);
};
export default SearchRouter;
