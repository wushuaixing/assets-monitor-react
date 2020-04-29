import React, { PureComponent } from 'react';
import {
	Bankruptcy, Broken, Lawsuit, Operation,
} from '../components';
import './style.scss';

export default class Risk extends PureComponent {
	constructor(props) {
		super(props);
		document.title = '资产挖掘';
		console.log(props.rule, 123);
		const isRule = props && props.rule && props.rule.children;
		this.state = {
			config: [
				{
					id: 1,
					title: '破产重组',
					rule: isRule && props.rule.children.fxjkqypccz,
					url: '/risk/bankruptcy',
					Component: Bankruptcy,

				},
				{
					id: 2,
					title: '失信记录',
					rule: isRule && props.rule.children.jkxxsxjl,
					url: '/risk/broken',
					Component: Broken,
				},
				{
					id: 3,
					title: '涉诉信息',
					rule: isRule && props.rule.children.fxjkssjk,
					url: '/risk',
					Component: Lawsuit,

				},
				{
					id: 4,
					title: '经营风险',
					rule: isRule && props.rule.children.fxjkssjk,
					url: '/risk/operation',
					Component: Operation,
				},
			],
		};
	}

	isObject = value => value != null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';

	render() {
		const { config } = this.state;
		// 权限过滤
		const ruleResultArr = config.filter(i => this.isObject(i.rule));
		return (
			<div className="monitor-excavate-container">
				{
					ruleResultArr.map(Item => <Item.Component title={Item.title} url={Item.url} />)
				}
			</div>
		);
	}
}
