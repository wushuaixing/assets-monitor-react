import React from 'react';
import { Button } from '@/common';
import Auction from './auction';
import Subrogation from './subrogation';
import Land from './land';
import Intangible from './intangible';
import Stock from './stock';
import Chattel from './chattel';

const subItems = [
	{
		id: 1,
		name: '资产拍卖',
		total: 10,
		disabled: false,
		tagName: 'e-assets-auction',
		component: Auction,
	},
	{
		id: 2,
		name: '代位权',
		total: 10,
		disabled: false,
		tagName: 'e-assets-subrogation',
		component: Subrogation,
	},
	{
		id: 3,
		name: '土地信息',
		total: 10,
		disabled: false,
		tagName: 'e-assets-land',
		component: Land,
	},
	{
		id: 4,
		name: '无形资产',
		total: 0,
		disabled: true,
		tagName: 'e-assets-intangible',
		component: Intangible,
	},
	{
		id: 5,
		name: '股权质押',
		total: 10,
		disabled: false,
		tagName: 'e-assets-stock',
		component: Stock,
	},
	{
		id: 6,
		name: '动产抵押',
		total: 10,
		disabled: false,
		tagName: 'e-assets-chattel',
		component: Chattel,
	},
];
export default class Assets extends React.Component {
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
		const _height = document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			window.scrollTo(0, document.getElementById(eleID).offsetTop - _height);
		}
	};

	toGetSubItems=() => (
		<div className="yc-intro-sub-items">
			{
				subItems.map(item => (
					<Button className="intro-btn-items" disabled={item.disabled} onClick={() => this.handleScroll(item.tagName)}>
						{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
					</Button>
				))
			}
		</div>
	);

	render() {
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{subItems.map(Item => (
					Item.total ? <Item.component id={Item.tagName} /> : ''))}
			</div>
		);
	}
}
