import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title) => ({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	color: ['#45A1FF', '#4DCAC9', '#59C874', '#FCD44A', '#F2657A', '#965EE3'],
	series: [
		{
			name: title,
			type: 'pie',
			radius: ['45%', '70%'],
			center: ['15%', '50%'],
			label: {
				normal: {
					formatter: '{b}\n  {c}',
				},
			},
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
					labelLine: {
						show: false,
					},
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: '15',
							fontWeight: 'bold',
						},
					},
				},
			},
			data: Data,
		},
	],
});

class RingEcharts extends React.Component {
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

	toDrawEcharts =() => {
		const { Data, id, title } = this.props;
		const DOM = document.getElementById(`${id}RingEcharts`);
		const myChart = window.echarts.init(DOM);
		const option = getOption(Data, id, title);
		const { color, series: { 0: { data: dataList } } } = option;
		const { Text, Circle } = window.zrDefine;
		const zr = myChart.getZrender();
		const base = {
			x: 200,
			y: 50,
		};
		dataList.forEach((item, index) => {
			const x = base.x + (dataList.length === 4 ? (index > 1 ? 1 : 0) * 60 + (index > 1 ? 1 : 0) * 120 : (index > 2 ? 1 : 0) * 60 + (index > 2 ? 1 : 0) * 120);
			const y = base.y + (dataList.length === 4 ? 20 * (index > 1 ? index - 2 : index) : 20 * (index > 2 ? index - 3 : index));
			console.log(dataList.length, x, 11);

			const shapeCircle = new Circle({
				style: {
					x,
					y,
					r: 2,
					brushType: 'both',
					color: color[index],
					strokeColor: color[index],
					lineWidth: 3,
				},
			});
			const text1 = new Text({
				style: {
					x: x + 10,
					y: y + 2,
					text: item.name,
					textFont: 'normal 12px verdana',
					textAlign: 'left',
					color: '#333',
				},
			});
			text1.hoverable = false;
			const text2 = new Text({
				style: {
					x: x + 110,
					y: y + 2,
					text: item.value,
					textFont: 'bold 12px Arial',
					textAlign: 'right',
					color: '#333',
				},
			});
			text2.hoverable = false;
			const text3 = new Text({
				style: {
					x: x + 130,
					y: y + 2,
					text: '条',
					textFont: 'normal 12px verdana',
					textAlign: 'right',
					color: '#333',
				},
			});
			text3.hoverable = false;
			zr.addShape(shapeCircle);
			zr.addShape(text1);
			zr.addShape(text2);
			zr.addShape(text3);
		});
		myChart.setOption(option);
	};

	render() {
		const { id, title } = this.props;
		return (
			<div>
				<div className="yc-ring-title">{title}</div>
				<div className="yc-ring-rcharts" style={{ width: 532, height: 150 }} id={`${id}RingEcharts`} />
			</div>
		);
	}
}

export default RingEcharts;
