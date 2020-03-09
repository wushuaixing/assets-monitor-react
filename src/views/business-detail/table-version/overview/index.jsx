import React from 'react';
import Portrait from './portrait';
import Visualize from './visualize';
import { Button } from '@/common';

const subItems = [
	{
		id: 1,
		name: '画像',
		tagName: 'e-assets-businessInfo',
		component: Portrait,
	},
	{
		id: 2,
		name: '可视化',
		tagName: 'e-assets-keyPersonnel',
		component: Visualize,
	},
];

export default class Overview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 1,
		};
	}

	componentDidMount() {
		const { toPushChild } = this.props;
		toPushChild(this.toGetSubItems());
	}

	toChangeItemType = (item) => {
		const { active } = this.state;
		if (active === item.id) return;
		this.setState({ active: item.id }, () => {
			const { toPushChild } = this.props;
			toPushChild(this.toGetSubItems());
		});
	};

	toGetSubItems =() => {
		const { active } = this.state;
		return (
			<div className="yc-intro-sub-items">
				{ subItems.map(item => (
					<Button
						className="intro-btn-items"
						active={item.id === active}
						onClick={() => this.toChangeItemType(item)}
					>
						{item.name}
					</Button>
				))}
			</div>
		);
	};

	render() {
		const { active } = this.state;
		const { portrait } = this.props;
		return (
			<div className="inquiry-assets info-assets-padding">
				{ active === 1 ? <Portrait portrait={portrait} /> : null }
				{ active === 2 ? <Visualize portrait={portrait} /> : null }
			</div>
		);
	}
}
