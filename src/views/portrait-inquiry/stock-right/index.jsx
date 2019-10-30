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

	getOption =() => ({
		title: {
			text: '用户骑行订单',
			x: 'center',
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: 'OFO订单量',
				type: 'line', // 这块要定义type类型，柱形图是bar,饼图是pie
				data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
			},
			],
		});
	};


	render() {
		return [
			<ReactECharts option={this.getOption()} style={{ width: 1000, height: 500 }} />,
			<div id="main" />,
		];
	}
}
