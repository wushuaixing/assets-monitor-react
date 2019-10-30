import React from 'react';
import ReactECharts from 'echarts-for-react';

import './style.scss';

import edata from './data';

export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	componentDidMount() {

	}

	onChartReadyCallback=() => {
		console.log('onChartReadyCallback');
	};

	 /* arrowAdd=(node) => {
		const per = node.percent;
		const temp = node;
		node = {
			name: per,
			orient: 'BT',
			symbol: 'arrow',
			symbolSize: [12, 12],
			lineStyle: {
				width: 1,
				color: '#333',
			},
			itemStyle: {
				position: 'right',
				color: '#1e81e1',
				borderColor: '#1e81e1',
			},
			children: [temp],
		};
		return node;
	}; */

	getOption =() => {
		const _data = edata;

		const { children } = _data;
		// _data.DetailList = undefined;
		// console.log(children[0].children);
		_data.symbol = 'rectangle';
		_data.symbolSize = [140, 40];
		_data.labelClick = true;
		_data.itemStyle = {
			color: '#1e81e1',
			borderColor: '#1e81e1',
		};
		if (children) {
			for (let i = 0; i < children.length; i++) {
				if (children[i].children.length > 1) {
					for (let j = 0; j < children[i].children.length; j++) {
						children[i].children[j].symbol = 'rectangle';
						children[i].children[j].symbolSize = [110, 42];
						children[i].children[j].itemStyle = {
							color: '#f3f9fe',
							borderColor: '#1e81e1',
						};
						// children[i].children[j] = this.arrowAdd(children[i].children[j]);
					}
				}
				children[i].symbol = 'rectangle';
				children[i].symbolSize = [146, 62];
				children[i].itemStyle = {
					color: 'white',
					borderColor: '#333',
				};
				 // children[i] = this.arrowAdd(children[i]);
			}
		}
		// console.log(_data);

		return ({

			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove',
			},

			series: [{
				type: 'tree',
				orient: 'BT',
				nodePadding: 25,
				layerPadding: 40,
				symbol: 'circle',
				expandAndCollapse: 'true',
				rootLocation: {
					x: '50%',
					y: '50%',
				},
				direction: 'inverse',
				data: [_data],
			},
		],
	});


	render() {
		return (
			<ReactECharts option={this.getOption()} style={{ width: 1000, height: 500 }} />
		);
	}
}
