import React from 'react';
import './style.scss';


const dataSource = {
	name: '总公司',
	upper: [
		{
			name: '股东1',
			people: '老王',
			upper: [
				{ name: 'info1' },
				{ name: 'info2' },
				{ name: 'info3' },
			],
		},
		{
			name: '股东2',
			people: '老李',
			upper: [
				{ name: 'info11' },
				{ name: 'info22' },
			],
		},
	],
	lower: [
		{
			name: '分公司1',
			people: '老吴',
			lower: [
				{ name: 'info3' },
				{ name: 'info4' },
			],
		},
		{
			name: '分公司2',
			people: '老赵',
			lower: [
				{ name: 'info 7' },
				{ name: 'info 6' },
				{ name: 'info 8' },
				{ name: 'info 9' },
			],
		},
	],
};


export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// this.drawChart();
		window.drawTree(dataSource);
	}

	render() {
		return (
			<div className="container" id="d3_container">
				<div className="basic" id="tree" />
			</div>
		);
	}
}
