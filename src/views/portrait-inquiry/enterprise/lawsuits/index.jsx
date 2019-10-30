import React from 'react';
import { Button } from '@/common';

const subItems = [
	{
		id: 1,
		name: '立案',
		total: 10,
		disabled: false,
	},
	{
		id: 2,
		name: '开庭',
		total: 10,
		disabled: false,
	},
	{
		id: 3,
		name: '涉诉文书',
		total: 10,
		disabled: false,
	},
	{
		id: 4,
		name: '失信记录',
		total: 0,
		disabled: true,
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

	toGetSubItems=() => (
		<div className="yc-intro-sub-items">
			{
				subItems.map(item => (
					<Button
						className="intro-btn-items"
						disabled={item.disabled}
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
				{'default'}
			</div>
		);
	}
}
