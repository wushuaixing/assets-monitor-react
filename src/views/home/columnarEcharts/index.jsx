import React from 'react';
import './style.scss';


class ColumnarEcharts extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {
			columnarData: [
				{ value: 18, name: '资产所有人' },
				{ value: 12, name: '债权人' },
				{ value: 9, name: '竞买人' },
				{ value: 16, name: '资产线索' },
				{ value: 12, name: '债权人' },
				{ value: 12, name: '债权人' },
				{ value: 9, name: '竞买人' },
				{ value: 16, name: '资产线索' },
			],
		};
	}

	componentDidMount() {
		const { columnarData } = this.state;

		// 基于准备好的dom，初始化echarts实例
		const myChart = window.echarts.init(document.getElementById('columnar'));
		// 绘制图表
		myChart.setOption({
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				},
			},

			grid: { // 绘图区调整
				x: 40, // 左留白
				y: 10, // 上留白
				x2: 10, // 右留白
				y2: 10, // 下留白
				containLabel: true,
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
					name: '利润',
					type: 'bar',

					barWidth: 20,
					data: columnarData,
					itemStyle: {
						normal: {
							color: '#73AEEA',
							label: {
								formatter: (obj) => {
									let res = '';
									for (let i = 0; i < columnarData.length; i += 1) {
										if (columnarData[i].name === obj.name) {
											res = columnarData[i].value;
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
											width: 100,
											padding: [0, 0, 0, 10],
											color: '#fff',
											fontSize: 12,
										},
										b: {
											position: [0, 20],
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
	}

	render() {
		const { columnarData } = this.state;
		return (
			<div>
				<div className="yc-columnar-rcharts" id="columnar" style={{ width: 450, height: columnarData.length * 40 }} />
			</div>
		);
	}
}

export default ColumnarEcharts;
