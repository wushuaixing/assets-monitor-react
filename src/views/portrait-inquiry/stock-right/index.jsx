import React from 'react';
import ReactECharts from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
// 导入折线图
import 'echarts/lib/chart/line'; // 折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import './style.scss';

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


	render() {
		return [
			<ReactECharts option={this.getOption()} style={{ height: '400px' }} echarts={echarts} />,
			<div id="main" />,
		];
	}
}
