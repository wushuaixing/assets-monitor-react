import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title) => ({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	legend: {
		// orient: 'vertical',
		orient: 'vertical',
		// 水平对齐方式，可设置为'left','center','right',number(px)
		x: '300px',
		// 垂直对齐方式，可设置为'top','center','bottom',number(px)
		y: 'center',
		itemGap: 5,
		// 距顶部的距离，其他同理
		zlevel: 3,
		data: Data,
		formatter: (name) => {
			let res = '';
			for (let i = 0; i < Data.length; i += 1) {
				if (Data[i].name === name) {
					res = Data[i].value;
				}
			}
			const arr = [
				`${name}`,
				`${res} 条`,
			];

			return arr.join('');
		},
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
		const { Data, id, title } = this.props;
		const myChart = window.echarts.init(document.getElementById(`${id}RingEcharts`));

		myChart.setOption(getOption(Data, id, title));
	}


	componentDidUpdate(prevProps) {
		const { Data, id, title } = this.props;
		if (prevProps.Data !== Data) {
			const myChart = window.echarts.init(document.getElementById(`${id}RingEcharts`));
			myChart.setOption(getOption(Data, id, title));
		}
	}

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
