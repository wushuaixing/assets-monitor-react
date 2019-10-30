import React from 'react';
import { Button } from '@/common';

const subItems = [
	{
		id: 1,
		name: '招投标',
		total: 10,
		disabled: false,
	},
	{
		id: 2,
		name: '破产重组',
		total: 10,
		disabled: false,
	},
	{
		id: 3,
		name: '经营异常',
		total: 10,
		disabled: false,
	},
	{
		id: 4,
		name: '严重违法',
		total: 0,
		disabled: true,
	},
	{
		id: 5,
		name: '税收违法',
		total: 10,
		disabled: false,
	},
	{
		id: 6,
		name: '行政处罚',
		total: 10,
		disabled: false,
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
