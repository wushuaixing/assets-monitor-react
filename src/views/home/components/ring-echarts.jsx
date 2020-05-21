import React, { PureComponent } from 'react';
import echarts from '@/static/echarts/echarts4.7/echarts.min';

const getOption = (Data, id, title, newRingArray, customColorArray) => ({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b}: {c} ({d}%)',
	},
	color: customColorArray || ['#1C80E1', '#45A1FF', '#59C874', '#FCD44A', '#FB8E3C', '#F2657A', '#965EE3', '#4561FF'],
	legend: {
		itemWidth: 6, // 图例大小  我这里用的是圆
		itemGap: 16, // 图例之间的间隔
		orient: 'horizontal', // 布局方式，默认水平布局，另可选vertical
		x: '150px',
		// 垂直对齐方式，可设置为'top','center','bottom',number(px)
		y: 'center',
		// y: '80%', // 垂直放的位置，可以写top，center，bottom，也可以写px或者百分比。x轴方向同理，默认center
		icon: 'circle', // 图例的形状，选择类型有："circle"（圆形）、"rectangle"（长方形）、"triangle"（三角形）、"diamond"（菱形）、"emptyCircle"（空心圆）、
		data: newRingArray,
		formatter(name) {
			let number = '';
			for (let i = 0; i < newRingArray.length; i += 1) {
				if (newRingArray[i].name === name) {
					number = newRingArray[i].count;
				}
			}
			let arr = [];
			if (newRingArray.length === 4) {
				arr = [
					`{c|${name}} {d|${number}} {f|条}`,
				];
			} else {
				arr = [
					`{a|${name}} {b|${number}} {f|条}`,
				];
			}

			return arr.join('\n');
		},
		textStyle: {
			rich: {
				a: {
					width: 40,
					fontSize: 12,
					color: '#4E5566',
					padding: [0, 0, 0, 6],
				},
				b: {
					width: 45,
					fontSize: 12,
					color: '#20242E',
					fontWeight: 700,
					// padding: [0, 0, 0, 0],
					align: 'center',
				},
				c: {
					width: 40,
					fontSize: 12,
					color: '#4E5566',
					padding: [0, 0, 0, 6],
				},
				d: {
					width: 45,
					fontSize: 12,
					color: '#20242E',
					fontWeight: 700,
					padding: [0, 0, 0, 12],
					align: 'center',
				},
				f: {
					color: '#4e5566',
				},
			},
		},
	},

	series: [
		{
			name: title,
			hoverOffset: 5,
			type: 'pie',
			radius: ['45%', '70%'],
			center: ['12%', '50%'],
			label: {
				show: false,
				position: 'center',
			},
			emphasis: {
				label: {
					show: true,
					fontSize: '14',
					fontWeight: 'bold',
				},
			},
			labelLine: {
				show: false,
			},
			data: newRingArray,
		},
	],
});

const getIeOption = (Data, id, title, newRingArray, customColorArray) => ({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	color: customColorArray || ['#1C80E1', '#45A1FF', '#59C874', '#FCD44A', '#FB8E3C', '#F2657A', '#965EE3', '#4561FF'],
	legend: {
		selectedMode: false, // 取消图例上的点击事件
		orient: 'vertical',
		// 水平对齐方式，可设置为'left','center','right',number(px)
		x: '180px',
		// 垂直对齐方式，可设置为'top','center','bottom',number(px)
		y: '60px',
		itemGap: 5,
		icon: 'rectangle',
		// 距顶部的距离，其他同理
		data: newRingArray,
		formatter: (name) => {
			let res = '';
			for (let i = 0; i < newRingArray.length; i += 1) {
				if (newRingArray[i].name === name) {
					res = newRingArray[i].count;
				}
			}
			const arr = [
				`${name}  `,
				`${res} 条`,
			];
			return arr.join('');
		},
		textStyle: {
			width: 40,
			fontSize: 12,
			color: '#4E5566',
			padding: [0, 0, 0, 6],
			textAlign: 'left',
		},
	},
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
							fontSize: '14',
							fontWeight: 'bold',
						},
					},
				},
			},
			data: newRingArray,
		},
	],
});
class RingEcharts extends PureComponent {
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
		const {
			id, title, customColorArray, Data, getRingEchartsType,
		} = this.props;
		// 判断是否是ie8
		const isIe = document.documentMode === 8;
		// 添加需要的字段名称
		const newRingArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newRingArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
		const DOM = document.getElementById(`${id}RingEcharts`);
		const myChart = isIe ? window.echarts.init(DOM) : echarts.init(DOM);
		myChart.on('legendSelectChanged', (obj) => {
			const { selected, name } = obj;
			// const legend = obj.name; // 使用 legendToggleSelect Action 会重新触发 legendSelectChanged Event，导致本函数重复运行 // 使得 无 selected 对象
			if (name && selected !== undefined) {
				getRingEchartsType(obj);
			}
		});

		const option = isIe ? getIeOption(Data, id, title, newRingArray, customColorArray) : getOption(Data, id, title, newRingArray, customColorArray);

		myChart.setOption(option);
	};

	render() {
		const { id } = this.props;
		return (
			<div>
				<div className="yc-ring-echarts" style={{ width: 560, height: 150, marginBottom: '15px' }} id={`${id}RingEcharts`} />
			</div>
		);
	}
}

export default RingEcharts;
