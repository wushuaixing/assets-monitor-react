import React from 'react';
import { Button } from '@/common';
import EssentialInfo from './components/essentialInfo';
import KeyPersonnel from './components/keyPersonnel';
import ShareholderInfo from './components/shareholderInfo';
import EquityPenetration from './components/equityPenetration';
import Branch from './components/branch';
import OutboundInvestment from './components/outboundInvestment';
import BusinessCircles from './components/businessCircles';

const subItems = [
	{
		id: 1,
		name: '基本信息',
		total: 10,
		disabled: false,
		tagName: 'e-assets-essentialInfo',
		component: EssentialInfo,
	},
	{
		id: 2,
		name: '主要人员',
		total: 10,
		disabled: false,
		tagName: 'e-assets-keyPersonnel',
		component: KeyPersonnel,
	},
	{
		id: 3,
		name: '股东信息',
		total: 10,
		disabled: false,
		tagName: 'e-assets-shareholderInfo',
		component: ShareholderInfo,
	},
	{
		id: 4,
		name: '股权穿透图',
		total: 0,
		disabled: true,
		tagName: 'e-assets-equityPenetration',
		component: EquityPenetration,
	},
	{
		id: 5,
		name: '分支机构',
		total: 10,
		disabled: false,
		tagName: 'e-assets-branch',
		component: Branch,
	},
	{
		id: 6,
		name: '对外投资',
		total: 10,
		disabled: false,
		tagName: 'e-assets-outboundInvestment',
		component: OutboundInvestment,
	},
	{
		id: 7,
		name: '工商变更',
		total: 10,
		disabled: false,
		tagName: 'e-assets-businessCircles',
		component: BusinessCircles,
	},
];
export default class Info extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
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
