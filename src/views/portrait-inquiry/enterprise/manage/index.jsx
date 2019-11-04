import React from 'react';
import { Button } from '@/common';
import Abnormal from './abnormal';
import Bankruptcy from './bankruptcy';
import Bidding from './bidding';
import Illegal from './illegal';
import Punishment from './punishment';
import Tax from './tax';

const subItems = [
	{
		id: 1,
		name: '招投标',
		total: 0,
		disabled: true,
		tagName: 'e-manage-bidding',
		component: Bidding,
	},
	{
		id: 2,
		name: '破产重组',
		total: 10,
		disabled: false,
		component: Bankruptcy,
		tagName: 'e-manage-bankruptcy',
	},
	{
		id: 3,
		name: '经营异常',
		total: 10,
		disabled: false,
		component: Abnormal,
		tagName: 'e-manage-abnormal',
	},
	{
		id: 4,
		name: '严重违法',
		total: 0,
		disabled: false,
		component: Illegal,
		tagName: 'e-manage-illegal',
	},
	{
		id: 5,
		name: '税收违法',
		total: 10,
		disabled: false,
		component: Tax,
		tagName: 'e-manage-tax',

	},
	{
		id: 6,
		name: '行政处罚',
		total: 10,
		disabled: false,
		component: Punishment,
		tagName: 'e-manage-punishment',

	},
];
export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems());
	}

	handleScroll=(eleID) => {
		const dom = document.getElementById(eleID);
		const _height = 168 || document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	toGetSubItems=() => (
		<div className="yc-intro-sub-items">
			{
				subItems.map(item => (
					<Button
						className="intro-btn-items"
						disabled={item.disabled}
						onClick={() => this.handleScroll(item.tagName)}
					>
						{item.name}
						{item.total ? ` ${item.total}` : ' 0'}
					</Button>
				))
			}
		</div>
	);

	render() {
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{subItems.map(Item => (
					!Item.disabled ? <Item.component id={Item.tagName} /> : ''))}
			</div>
		);
	}
}
