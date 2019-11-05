import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

class ColumnarEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getOption =(Data, id, title) => ({
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
			},
		},

		grid: { // 绘图区调整
			x: 20, // 左留白
			y: 10, // 上留白
			x2: 10, // 右留白
			y2: 10, // 下留白
		},
		xAxis: [
			{
				show: false,
				type: 'value',
				boundaryGap: [0, 0],
				position: 'top',
			},
		],

		yAxis: [
			{
				type: 'category',
				show: false,
				// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
		],
		series: [
			{
				name: title,
				type: 'bar',
				barMinHeight: 200,
				barWidth: 25,
				data: Data,
				itemStyle: {
					normal: {
						color: '#73AEEA',
						label: {
							formatter: (obj) => {
								let res = '';
								for (let i = 0; i < Data.length; i += 1) {
									if (Data[i].name === obj.name) {
										res = Data[i].value;
									}
								}
								const arr = [
									`{a|${obj.name}}`,
									`{b|${res} 条}`,
								];
								return arr.join('');
							},
							textStyle: {
								rich: {
									a: {
										width: 160,
										padding: [0, 0, 0, 10],
										color: '#fff',
										fontSize: 12,
									},
									b: {
										width: 30,
										position: [0, 20],
										align: 'right',
										color: '#fff',
										fontSize: 12,
									},
								},
							},
							show: true, // 开启显示
							position: 'insideLeft', // 居左行内显示
						},
					}, // 柱状图颜色
				},
			},
		],
	});

	render() {
		const { title, Data, id } = this.props;
		return (
			<div>
				<div className="yc-columnar-title">{title}</div>
				{/*<ReactECharts className="yc-columnar-rcharts" option={this.getOption(Data, id, title)} style={{ width: 532, height: Data.length * 40 }} />*/}
			</div>
		);
	}
}

export default ColumnarEcharts;
