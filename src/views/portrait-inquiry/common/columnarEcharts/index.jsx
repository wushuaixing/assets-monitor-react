import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title, newColumArray) => ({
	grid: { // 绘图区调整
		height: newColumArray.length * 30,
		x: 20, // 左留白
		y: 10, // 上留白
		x2: 10, // 右留白
		y2: 20, // 下留白
		borderWidth: '0',
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
			data: newColumArray,
		},
	],

	series: [
		{
			name: title,
			type: 'bar',
			barMinHeight: 220,
			borderwidth: 0,
			data: newColumArray,
			itemStyle: {
				normal: {
					color: '#73AEEA',
					label: {
						show: false, // 开启显示
						position: 'inside', // 内显示
						textStyle: {
							fontWeight: 'bolder',
							fontSize: '12',
							color: '#fff',
						},
					},
				}, // 柱状图颜色
				// emphasis: {
				// 	color: '#73AEEA',
				// 	label: {
				// 		show: false, // 开启显示
				// 		textStyle: {
				// 			fontWeight: 'bolder',
				// 			fontSize: '12',
				// 			color: '#fff',
				// 		},
				// 	},
				// },
			},
		},
	],
});

class ColumnarEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newColumArray: [],
		};
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
		// 添加需要的字段名称
		const newColumArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newColumArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
		this.setState({
			newColumArray,
		});
		const DOM = document.getElementById(`${id}ColumnarEcharts`);
		const myChart = window.echarts.init(DOM);
		const option = getOption(Data, id, title, newColumArray);
		const { series: { 0: { data: dataList } } } = option;
		const { Text } = window.zrDefine;
		const zr = myChart.getZrender();
		const base = {
			x: 20,
			y: 27,
		};
		const newDataList = dataList.slice().reverse();
		newDataList.forEach((item, index) => {
			const { x } = base;
			const y = base.y + 30 * (index);

			const text1 = new Text({
				style: {
					x: x + 10,
					y,
					text: item.typeName || item.type,
					textFont: 'normal 12px verdana',
					textAlign: 'left',
					color: '#FFFFFF',
				},
			});
			text1.hoverable = false;
			const text2 = new Text({
				style: {
					x: x + 180,
					y,
					text: item.count,
					textFont: 'bold 12px Arial',
					textAlign: 'right',
					color: '#FFFFFF',
				},
			});
			text2.hoverable = false;
			const text3 = new Text({
				style: {
					x: x + 200,
					y,
					text: '条',
					textFont: 'normal 12px verdana',
					textAlign: 'right',
					color: '#FFFFFF',
				},
			});
			text3.hoverable = false;
			zr.addShape(text1);
			text1.zlevel = 9999;
			zr.addShape(text2);
			text2.zlevel = 9999;
			zr.addShape(text3);
			text3.zlevel = 9999;
		});
		// window[`${id}ColumnarEcharts`] = myChart;
		myChart.setOption(getOption(Data, id, title, newColumArray));
	};

	render() {
		const { title, id } = this.props;
		const { newColumArray } = this.state;

		return (
			<div>
				<div className="yc-columnar-title">{title}</div>
				<div className="yc-columnar-echarts" style={{ width: 532, height: newColumArray.length * 40 || 50 }} id={`${id}ColumnarEcharts`} />
			</div>
		);
	}
}

export default ColumnarEcharts;
