import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import Abnormal from './abnormal';
import Bankruptcy from './bankruptcy';
import Illegal from './illegal';
import Punishment from './punishment';
import Tax from './tax';
import Dishonest from './dishonest';
import Lawsuit from './lawsuit';
import Environment from './environment';

import { roleState } from '@/utils/rule';

const toGetTotal = (field, data) => {
	let count = 0;
	const reg = new RegExp(field);
	data.forEach((item) => {
		if (reg.test(item.id)) {
			count += item.field ? item.data[item.field] : item.data;
		}
	});
	return count;
};

const subItems = data => ([
	{
		id: 30200,
		baseId: 3020,
		name: '破产重组',
		total: data ? toGetTotal('3020', data) : 0,
		info: data ? data.filter(i => /3020/.test(i.id)) : '',
		role: roleState('fxjk', 'fxjkqypccz') && false,
		component: Bankruptcy,
		tagName: 'e-manage-bankruptcy',
	},
	{
		id: 20400,
		baseId: 2040,
		name: '失信记录',
		total: data ? toGetTotal('2040', data) : 0,
		info: data ? data.filter(i => /2040/.test(i.id)) : '',
		tagName: 'e-manage-dishonest',
		role: false,
		// component: Dishonest,
	},
	{
		id: 20500,
		baseId: 2050,
		name: '限高记录',
		total: data ? toGetTotal('2050', data) : 0,
		info: data ? data.filter(i => /2050/.test(i.id)) : '',
		tagName: 'e-manage-limitHeight',
		role: false,
		component: Dishonest,
	},
	{
		id: 20600,
		baseId: 2060,
		name: '涉诉信息',
		total: data ? toGetTotal('2060', data) : 0,
		info: data ? data.filter(i => /2060/.test(i.id)) : '',
		tagName: 'e-manage-lawsuits',
		role: roleState('fxjk', 'fxjkssjk'),
		component: Lawsuit,
	},
	{
		id: 30300,
		baseId: 3030,
		name: '经营异常',
		total: data ? toGetTotal('3030', data) : 0,
		info: data ? data.filter(i => /3030/.test(i.id)) : '',
		role: roleState('fxjk', 'jyfxjyyc'),
		component: Abnormal,
		tagName: 'e-manage-abnormal',
	},
	{
		id: 30400,
		baseId: 3040,
		name: '严重违法',
		total: data ? toGetTotal('3040', data) : 0,
		info: data ? data.filter(i => /3040/.test(i.id)) : '',
		role: roleState('fxjk', 'jyfxyzwf'),
		component: Illegal,
		tagName: 'e-manage-illegal',
	},
	{
		id: 30500,
		baseId: 3060,
		name: '税收违法',
		total: data ? toGetTotal('3050', data) : 0,
		info: data ? data.filter(i => /3050/.test(i.id)) : '',
		role: roleState('fxjk', 'jyfxsswf'),
		component: Tax,
		tagName: 'e-manage-tax',
	},
	{
		id: 30600,
		baseId: 3060,
		name: '行政处罚',
		total: data ? toGetTotal('3060', data) : 0,
		info: data ? data.filter(i => /3060/.test(i.id)) : '',
		role: roleState('fxjk', 'jyfxxzcf'),
		component: Punishment,
		tagName: 'e-manage-punishment',
	},
	{
		id: 30700,
		baseId: 3070,
		name: '环保处罚',
		total: data ? toGetTotal('3070', data) : 0,
		info: data ? data.filter(i => /3070/.test(i.id)) : '',
		role: roleState('fxjk', 'jyfxhbcf'),
		component: Environment,
		tagName: 'e-manage-environment',
	},
]);
class Risk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count),
			loading: Boolean(props.count.length === 0),
		};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems());
	}


	componentWillReceiveProps(nextProps) {
		const { count } = this.props;
		if (nextProps.count.length) {
			if (JSON.stringify(nextProps.count) !== JSON.stringify(count)) {
				this.setState({
					loading: nextProps.count.length === 0,
					config: subItems(nextProps.count),
				}, () => {
					const { toPushChild } = this.props;
					toPushChild(this.toGetSubItems());
				});
			}
		}
	}

	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		const _height = 168 || document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	toGetSubItems=() => {
		const { config } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					config.map(item => (
						<Button
							className="intro-btn-items"
							disabled={!item.total}
							onClick={() => this.handleScroll(item.tagName)}
						>
							{item.name}
							{item.total ? ` ${item.total}` : ' 0'}
						</Button>
					))
				}
			</div>
		);
	};

	render() {
		const { config, loading } = this.state;
		const { count, portrait } = this.props;
		const aryResult = (subItems(count).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{
					loading ? <Spin visible minHeight={350} /> : (
						<div>
							{
								aryResult ? config.map(Item => (
									Item.total && Item.role ? <Item.component id={Item.tagName} data={Item.info} portrait={portrait} /> : ''))
									: <NoContent />
							}
						</div>
					)
				}
			</div>
		);
	}
}
Risk.config = {
	items: subItems(),
	idList: (subItems().filter(i => i.role)).map(i => i.baseId),
	status: Boolean((subItems().filter(i => i.role)).length),
};

export default Risk;
