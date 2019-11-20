import React from 'react';
import { Button, Spin } from '@/common';
import Auction from './auction';
import Subrogation from './subrogation';
import { toGetTotal } from '@/utils/promise';

const subItems = data => ([
	{
		id: 10100,
		name: '资产拍卖',
		total: data ? toGetTotal('1010', data) : 0,
		info: data ? data.filter(i => /1010/.test(i.id)) : '',
		tagName: 'e-assets-auction',
		component: Auction,
	},
	{
		id: 10200,
		name: '代位权',
		total: data ? toGetTotal('1020', data) : 0,
		info: data ? data.filter(i => /1020/.test(i.id)) : '',
		tagName: 'e-assets-subrogation',
		component: Subrogation,
	},
]);

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: subItems(props.count),
			loading: !props.count.length,
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
		const _height = document.getElementById('personal-intro').clientHeight;
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
							disabled={item.total === 0}
							onClick={() => this.handleScroll(item.tagName)}
						>
							{`${item.name}${item.total ? ` ${item.total}` : ' 0'}`}
						</Button>
					))
				}
			</div>
		);
	};


	render() {
		const { config, loading } = this.state;
		return (
			<div className="inquiry-assets" style={{ padding: '10px 20px' }}>
				{
					loading ? <Spin visible minHeight={350} /> : (
						config.map(Item => (
							Item.total ? <Item.component id={Item.tagName} data={Item.info} /> : ''))
					)
				}
			</div>
		);
	}
}
