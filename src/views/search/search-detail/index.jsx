import React from 'react';
import { navigate } from '@reach/router';

import Router from '@/utils/Router';
import Tabs from '@/common/tabs';

import Write from './writ';
import Auction from './auction';
import Finance from './finance';
import Lawsuits from './lawsuits';
// import Asset from './asset-information';

const source = [
	{
		id: 1,
		name: '拍卖信息',
		url: '/search/detail',
		number: 0,
		dot: false,
		components: Auction,
	},
	{
		id: 2,
		name: '涉诉信息',
		url: '/search/detail/lawsuits',
		number: 0,
		dot: false,
		components: Lawsuits,
	},
	{
		id: 3,
		name: '文书信息',
		url: '/search/detail/writ',
		number: 0,
		dot: false,
		components: Write,
	},
	{
		id: 4,
		name: '金融信息',
		url: '/search/detail/finance',
		number: 0,
		dot: false,
		components: Finance,
	},
];

const SearchBase = () => (
	<React.Fragment>
		<Tabs
			onChange={res => navigate(res.url)}
			source={source}
		/>
		<div className="yc-business yc-page-content">
			<Router>
				{
					source.map(Item => <Item.components path={`${Item.url}/*`} />)
				}
			</Router>
		</div>
	</React.Fragment>

);
const SearchRouter = () => (
	<Router>
		<SearchBase path="/*" />
		{/* <Auction path="/search/detail/*" />
		<Lawsuits path="/search/detail/lawsuits/*" />
		<Write path="/search/detail/writ/*" />
		<Finance path="/search/detail/finance/*" /> */}
	</Router>
);
export default SearchRouter;
