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
			let res = '';
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
						position: 'inside',
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
		// const { Text } = window.zrDefine;
		window.myChart = myChart;
		const base = {
			x: 20,
			y: 17,
		};
		const newDataList = dataList.slice().reverse();
		const list = [];
		newDataList.forEach((item, index) => {
			const { x } = base;
			const y = base.y + 30 * (index);
			const typeName = item.typeName && item.typeName.length > 10 ? `${item.typeName.substr(0, 10)}...` : `${item.typeName}`;
			const type = item.type && item.type.length > 10 ? `${item.type.substr(0, 10)}...` : `${item.type}`;

			list.push(<span style={{ left: x + 10, top: y }} className="yc-p-span">{typeName !== 'undefined' ? typeName : type}</span>);
			list.push(<span style={{ left: x + 180, top: y, textAlign: 'left' }} className="yc-p-span">{`${item.count} 条`}</span>);
		});
		// window[`${id}ColumnarEcharts`] = myChart;
		this.setState({
			list,
		});
		myChart.setOption(getOption(Data, id, title, newColumArray));
	};

	render() {
		const { title, id, Data } = this.props;
		const { list } = this.state;
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
				<div className="yc-position">
					{list}
					<div className="yc-columnar-echarts" style={{ width: 532, height: newArray.length * 40 || 50 }} id={`${id}ColumnarEcharts`} />
				</div>
			</div>
		);
	}
}

export default ColumnarEcharts;
