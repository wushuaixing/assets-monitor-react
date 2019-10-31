import React from 'react';
import { Button } from '@/common';
import Trial from './trial';
import Court from './court';
import Judgment from './judgment';
import Dishonest from './dishonest';

const subItems = [
	{
		id: 1,
		name: '立案',
		total: 10,
		disabled: false,
		tagName: 'e-lawsuits-trial',
		component: Trial,
	},
	{
		id: 2,
		name: '开庭',
		total: 10,
		disabled: false,
		tagName: 'e-lawsuits-court',
		component: Court,
	},
	{
		id: 3,
		name: '涉诉文书',
		total: 10,
		disabled: false,
		tagName: 'e-lawsuits-judgment',
		component: Judgment,
	},
	{
		id: 4,
		name: '失信记录',
		total: 1,
		disabled: false,
		tagName: 'e-lawsuits-dishonest',
		component: Dishonest,
	},
];
export default class Lawsuits extends React.Component {
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
					Item.total ? <Item.component id={Item.tagName} /> : ''))}
			</div>
		);
	}
}
