import React from 'react';
import { NavTab, Button, Icon } from '@/common';
import {
	excavate, excavateEd, risk, riskEd,
} from '@/assets/img/nav-tab';
import Router from '@/utils/Router';
import ExcavateOverview from './excavate';
import RiskOverview from './risk';
import './style.scss';

export default class InfoSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{
					id: 1,
					title: '资产挖掘',
					img: excavate,
					selectImg: excavateEd,
					url: '/info/monitor/excavate/*',
					status: true,
					rule: props.rule.menu_zcwj,
					Component: ExcavateOverview,
				},
				{
					id: 2,
					title: '风险监控',
					img: risk,
					selectImg: riskEd,
					url: '/info/monitor/risk/*',
					rule: props.rule.menu_fxjk,
					status: true,
					Component: RiskOverview,
				},
			],
		};
	}

	toGoAttentionPage =() => {
		console.log('It\'s about to go to my-attention page;');
	};

	render() {
		const { config } = this.state;
		return [
			<NavTab
				source={config}
				suffix={(
					<div className="yc-suffix-wrapper">
						<Button
							style={{ margin: '14px 20px 10px', width: 95, padding: '2px 9px' }}
							onClick={this.toGoAttentionPage}
							size="large"
							className="attention-btn-icon"
							icon={() => <Icon type="icon-follow-ed" className="yc-btn-icon" />}
							title="我的关注"
						/>
					</div>
				)}
			/>,
			<Router>
				{ config.map(Item => <Item.Component path={Item.url} rule={Item.rule} />)}
			</Router>,
		];
	}
}
