import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title) => ({

	grid: { // 绘图区调整
		x: 20, // 左留白
		y: 10, // 上留白
		x2: 10, // 右留白
		y2: 10, // 下留白
		show: false,
		borderWidth: '0',
	},
	xAxis: [
		{
			show: false,
			type: 'value',
			boundaryGap: [0, 0],
			position: 'top',
			axisTick: {
				alignWithLabel: false,
			},
		},
	],

	yAxis: [
		{
			type: 'category',
			show: false,
			data: Data,
		},
	],

	series: [
		{
			name: title,
			type: 'bar',
			barMinHeight: 200,
			barWidth: 25,
			borderwidth: 0,
			data: Data,
			itemStyle: {
				normal: {
					color: '#73AEEA',
					label: {
						show: true, // 开启显示
						position: 'inside', // 内显示
						formatter: (obj) => {
							let res = '';
							for (let i = 0; i < Data.length; i += 1) {
								if (Data[i].name === obj.data.name) {
									res = Data[i].value;
								}
							}
							const arr = [
								`${obj.data.name}`,
								`  ${res} 条`,
							];
							return arr.join('');
						},
						textStyle: {
							fontWeight: 'bolder',
							fontSize: '12',
							color: '#fff',
						},
					},
				}, // 柱状图颜色
			},
		},
	],
});

class ColumnarEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.toDrawEcharts();
	}

	componentDidUpdate(prevProps) {
		const { Data } = this.props;
		if (prevProps.Data !== Data) {
			this.toDrawEcharts();
		}
	}

	toDrawEcharts=() => {
		const { Data, id, title } = this.props;
		const DOM = document.getElementById(`${id}ColumnarEcharts`);
		const myChart = window.echarts.init(DOM);
		// window[`${id}ColumnarEcharts`] = myChart;
		myChart.setOption(getOption(Data, id, title));
	};

	render() {
		const { title, Data, id } = this.props;
		return (
			<div>
				<div className="yc-columnar-title">{title}</div>
				<div className="yc-ring-rcharts" style={{ width: 532, height: Data.length * 40 }} id={`${id}ColumnarEcharts`} />
			</div>
		);
	}
}

export default ColumnarEcharts;
