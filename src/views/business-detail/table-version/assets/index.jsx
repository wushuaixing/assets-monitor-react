import React from 'react';
import { Button, NoContent, Spin } from '@/common';
import { roleState } from '@/utils/rule';
import Auction from './auction';
import Subrogation from './subrogation';
import Land from './land';
import Intangible from './intangible';
import Stock from './stock';
import Chattel from './chattel';
import Bidding from './bidding';

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

const subItems = (data, portrait) => {
	let status = 'normal';
	if (portrait === 'business') status = false;
	if (portrait === 'debtor_enterprise') status = false;
	if (portrait === 'debtor_personal') status = 'normal';
	return [
		{
			id: 10100,
			baseId: 1010,
			name: '资产拍卖',
			total: data ? toGetTotal('1010', data) : 0,
			info: data ? data.filter(i => /1010/.test(i.id)) : '',
			tagName: 'e-assets-auction',
			component: Auction,
			isStatus: 'normal',
			role: roleState('zcwj', 'zcwjzcpm'),
		},
		{
			id: 10400,
			baseId: 1040,
			name: '无形资产',
			total: data ? toGetTotal('1040', data) : 0,
			info: data ? data.filter(i => /1040/.test(i.id)) : '',
			disabled: true,
			tagName: 'e-assets-intangible',
			component: Intangible,
			isStatus: 'only',
			role: roleState('zcwj', 'zcwjwxzc'),
		},
		{
			id: 10300,
			baseId: 1030,
			name: '土地信息',
			total: data ? toGetTotal('1030', data) : 0,
			info: data ? data.filter(i => /1030/.test(i.id)) : '',
			tagName: 'e-assets-land',
			component: Land,
			isStatus: 'only',
			role: roleState('zcwj', 'zcwjtdsj'),
		},
		{
			id: 10200,
			baseId: 1020,
			name: '代位权',
			total: data ? toGetTotal('1020', data) : 0,
			info: data ? data.filter(i => /1020/.test(i.id)) : '',
			tagName: 'e-assets-subrogation',
			component: Subrogation,
			isStatus: 'normal',
			role: roleState('zcwj', 'zcwjdwq'),
		},
		{
			id: 10500,
			baseId: 1050,
			name: '股权质押',
			total: data ? toGetTotal('1050', data) : 0,
			info: data ? data.filter(i => /1050/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjjrzj'),
			tagName: 'e-assets-stock',
			component: Stock,
			isStatus: 'only',
		},
		{
			id: 10600,
			baseId: 1060,
			name: '动产抵押',
			total: data ? toGetTotal('1060', data) : 0,
			info: data ? data.filter(i => /1060/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjdcdy'),
			tagName: 'e-assets-chattel',
			component: Chattel,
			isStatus: 'only',
		},
		{
			id: 10700,
			baseId: 1070,
			name: '招投标',
			total: data ? toGetTotal('1070', data) : 0,
			info: data ? data.filter(i => /1070/.test(i.id)) : '',
			role: roleState('zcwj', 'zcwjzbzb'),
			disabled: true,
			tagName: 'e-assets-bidding',
			component: Bidding,
			isStatus: 'only',
		},
	].filter(i => (status ? i.isStatus === status : i.isStatus));
};

class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count, props.portrait),
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
					config: subItems(nextProps.count, nextProps.portrait),
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
			window.scrollTo(0, document.getElementById(eleID).offsetTop + _height);
		}
	};

	toGetSubItems=() => {
		const { config } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{
					config.map(item => (
						<Button className="intro-btn-items" disabled={item.total === 0} onClick={() => this.handleScroll(item.tagName)}>
							{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
						</Button>
					))
				}
			</div>
		);
	};


	render() {
		const { config } = this.state;
		const { count, portrait, loading } = this.props;
		const aryResult = (subItems(count, portrait).filter(i => i.total > 0)).length;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				<Spin visible={loading} minHeight={350}>
					{
						aryResult ? config.map(Item => (
							Item.total && Item.role ? <Item.component id={Item.tagName} data={Item.info} portrait={portrait} /> : ''))
							: <NoContent />
					}
				</Spin>
			</div>
		);
	}
}
Assets.config = {
	items: p => subItems('', p),
	idList: p => (subItems('', p).filter(i => i.role)).map(i => i.baseId),
	status: p => Boolean((subItems('', p).filter(i => i.role)).length),
};
export default Assets;
