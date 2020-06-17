import React from 'react';
import { NavTab } from '@/common';
import {
	portrait, portraitEd, search, searchEd,
} from '@/assets/img/nav-tab';
import Router from '@/utils/Router';
import Business from '../business/business-views';
import Debtor from '../business/debtor-views';

export default class InfoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{
					id: 1,
					title: '业务视图',
					img: portrait,
					selectImg: portraitEd,
					url: '/business/view/*',
					status: true,
					rule: props.rule,
					Component: Business,
				},
				{
					id: 2,
					title: '债务人',
					img: search,
					selectImg: searchEd,
					url: '/business/view/debtor/*',
					rule: props.rule,
					status: true,
					Component: Debtor,
				},
			].filter(i => this.isObject(i.rule)),
		};
	}

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	render() {
		const { config } = this.state;
		return [
			<NavTab source={config} />,
			<Router>
				{ config.map(Item => <Item.Component path={Item.url} rule={Item.rule} />)}
			</Router>,
		];
	}
}
