import React from 'react';
import { Button } from '@/common';

const subItems = [
	{
		id: 1,
		name: '基本信息',
		total: 10,
		disabled: false,
	},
	{
		id: 2,
		name: '主要人员',
		total: 10,
		disabled: false,
	},
	{
		id: 3,
		name: '股东信息',
		total: 10,
		disabled: false,
	},
	{
		id: 4,
		name: '股权穿透图',
		total: 0,
		disabled: true,
	},
	{
		id: 5,
		name: '分支机构',
		total: 10,
		disabled: false,
	},
	{
		id: 6,
		name: '对外投资',
		total: 10,
		disabled: false,
	},
	{
		id: 7,
		name: '工商变更',
		total: 10,
		disabled: false,
	},
];
export default class Info extends React.Component {
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
