import React from 'react';
import { Button } from '@/common';

const subItems = [
	{
		id: 1,
		name: '资产拍卖',
		total: 10,
		disabled: false,
	},
	{
		id: 2,
		name: '代位权',
		total: 10,
		disabled: false,
	},
	{
		id: 3,
		name: '土地信息',
		total: 10,
		disabled: false,
	},
	{
		id: 4,
		name: '无形资产',
		total: 0,
		disabled: true,
	},
	{
		id: 5,
		name: '股权质押',
		total: 10,
		disabled: false,
	},
	{
		id: 6,
		name: '动产抵押',
		total: 10,
		disabled: false,
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
