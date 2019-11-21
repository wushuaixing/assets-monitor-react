import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title, newColumArray) => ({
	tooltip: {
		// trigger: 'item',
		trigger: 'item',
		// formatter: '{a} <br/>{b} : {c} {d}',
		formatter(params) {
			const datasArray = params.series.data.slice().reverse();
			let res = `${params[0]}<br/>`;
			for (let i = 0; i < datasArray.length; i += 1) {
				res += `${datasArray[i].name}：${
					datasArray[i].value} 条<br/>`;
			}
			return res;
		},
	},
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
						show: false,
					},
				}, // 柱状图颜色
				emphasis: {
					color: '#73AEEA',
					label: {
						show: false, // 开启显示
						textStyle: {
							fontWeight: 'bolder',
							fontSize: '12',
							color: 'transparent',
						},
					},
				},
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
		// 添加需要的字段名称
		const newColumArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newColumArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
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

			const typeName = item.typeName && item.typeName.length > 10 ? `${item.typeName.substr(0, 10)}...` : `${item.typeName}`;
			const type = item.type && item.type.length > 10 ? `${item.type.substr(0, 10)}...` : `${item.type}`;

			const text1 = new Text({
				style: {
					x: x + 10,
					y,
					text: typeName !== 'undefined' ? typeName : type,
					textFont: 'normal 12px verdana',
					textAlign: 'left',
					color: '#FFFFFF',
				},
			});
			text1.zlevel = 1;
			text1.z = 5;
			text1.hoverable = false;
			text1.clickable = false;
			console.log('111111', text1);
			zr.addShape(text1);
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

			text2.zlevel = 9999;
			zr.addShape(text2);
			text3.zlevel = 9999;
			zr.addShape(text3);
		});
		// window[`${id}ColumnarEcharts`] = myChart;
		myChart.setOption(getOption(Data, id, title, newColumArray));
	};

	render() {
		const { title, id, Data } = this.props;
		const newArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
		return (
			<div>
				<div className="yc-columnar-title">{title}</div>
				<div className="yc-columnar-echarts" style={{ width: 532, height: newArray.length * 40 || 50 }} id={`${id}ColumnarEcharts`} />
			</div>
		);
	}
}

export default ColumnarEcharts;
