import React from 'react';
import { NavTab, Button } from '@/common';
import {
	portrait, portraitEd, search, searchEd,
} from '@/assets/img/nav-tab';
import Router from '@/utils/Router';
import Inquiry from '../portrait-inquiry';
import Search from '../search';

export default class InfoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{
					id: 1,
					title: '画像查询',
					img: portrait,
					selectImg: portraitEd,
					url: '/info/search/portrait/*',
					status: true,
					rule: props.rule.menu_hxcx,
					Component: Inquiry,
				},
				{
					id: 2,
					title: '分类搜索',
					img: search,
					selectImg: searchEd,
					url: '/info/search/several/*',
					rule: props.rule.menu_xxss,
					status: true,
					Component: Search,
				},
			],
		};
	}

	render() {
		const { config } = this.state;
		return [
			<NavTab
				source={config}
				suffix={<div style={{ margin: '13px 20px' }}><Button>我的收藏</Button></div>}
			/>,
			<Router>
				{ config.map(Item => <Item.Component path={Item.url} rule={Item.rule} />)}
			</Router>,
		];
	}
}
