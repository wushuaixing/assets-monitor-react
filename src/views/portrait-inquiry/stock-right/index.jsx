import React from 'react';
// import ReactECharts from 'echarts-for-react';
import bg from '@/assets/background.png';
import './style.scss';

import eData from './data';
// import echarts from '@/static/echarts/echarts';
// import '@/static/echarts/chart/bar';
// import '@/static/echarts/echarts-all';
// import '@/static/echarts/zrender';
// const my = require('@/static/echarts/zrender');
const zr = window.zrender;
const ec = window.echarts;

const dataSource = [{
	name: '手机',
	value: 6,
	symbolSize: [90, 70],
	symbol: 'circle',
	itemStyle: {
		normal: {
			label: {
				show: false,
			},
		},
	},
	children: [{
		name: '530',
		value: 4,
		symbol: 'droplet',
		formatter: 'Template formatter: <br/>{b}<br/>{a}:{c}<br/>{a1}:{c1}',

		itemStyle: {
			normla: {
				label: {
					position: 'outer',
					formatter: '123123123123',
				},
			},
		},
		symbolSize: [60, 60],
		toggle: false,
		children: [],
		remark: [{
			name: '小米1',
			symbol: 'circle',
			symbolSize: 20,
			value: 4,
			itemStyle: {
				normal: {
					color: '#fa6900',
					label: {
						show: true,
						position: 'right',
					},

				},
				emphasis: {
					label: {
						show: false,
					},
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米2',
			value: 4,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'right',
						formatter: '{b}',
					},
					color: '#fa6900',
					borderWidth: 2,
					borderColor: '#cc66ff',

				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		],
	},
	{
		name: '苹果',
		symbol: 'circle',
		symbolSize: [60, 60],
		itemStyle: {
			normal: {
				color: '#F3F9FE',
				borderWidth: '1',
				borderColor: '#128bed',
				label: {
					show: !0,
					position: 'inside',
					textStyle: {
						color: '#333',
						fontFamily: 'MicroSoft YaHei',
						fontSize: 14,
						fontStyle: 'normal',
					},
				},
			},
			emphasis: {
				color: 'rgba(255,255,255,0)',
				borderWidth: '1',
				borderColor: 'rgba(255,255,255,0)',
			},

		},
		value: 4,
		toggle: false,
		children: [],
		remark: [{
			name: '小米2',
			value: 4,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'right',
						formatter: '{b}',
					},
					color: '#fa6900',
					borderWidth: 2,
					borderColor: '#cc66ff',

				},
				emphasis: {
					borderWidth: 0,
				},
			},
		}],
	},
	{
		name: '华为',
		symbol: 'rectangle',
		symbolSize: [146, 50],
		itemStyle: {
			normal: {
				color: '#fff',
				borderWidth: '1',
				borderColor: '#ccc',
				label: {
					show: true,
					position: 'inside',
					textStyle: {
						fontFamily: 'MicroSoft YaHei',
						fontSize: 18,
						color: '#333',
						fontStyle: 'normal',
					},
				},
			},
			emphasis: {
				color: 'rgba(255,255,255,0)',
				borderWidth: '1',
				borderColor: 'rgba(255,255,255,0)',
			},
		},
		value: 2,
		toggle: false,
		children: [],
		remark: [{
			name: '小米1',
			symbol: 'circle',
			symbolSize: 20,
			value: 4,
			itemStyle: {
				normal: {
					color: '#fa6900',
					label: {
						show: true,
						position: 'right',
					},

				},
				emphasis: {
					label: {
						show: false,
					},
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米2',
			value: 4,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'right',
						formatter: '{b}',
					},
					color: '#fa6900',
					borderWidth: 2,
					borderColor: '#cc66ff',

				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		],
	},
	{
		name: '联想',
		symbol: 'circle',
		symbolSize: [100, 40],
		itemStyle: {
			normal: {
				label: {
					show: false,
				},

			},
		},
		toggle: false,
		children: [],
		remark: [{
			name: '小米1',
			symbol: 'circle',
			symbolSize: 20,
			value: 4,
			itemStyle: {
				normal: {
					color: '#fa6900',
					label: {
						show: true,
						position: 'right',
					},

				},
				emphasis: {
					label: {
						show: false,
					},
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米2',
			value: 4,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'right',
						formatter: '{b}',
					},
					color: '#fa6900',
					borderWidth: 2,
					borderColor: '#cc66ff',

				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		{
			name: '小米3',
			value: 2,
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					label: {
						position: 'right',
					},
					color: '#fa6900',
					brushType: 'stroke',
					borderWidth: 1,
					borderColor: '#999966',
				},
				emphasis: {
					borderWidth: 0,
				},
			},
		},
		],
		value: 2,
	},
	],
}];
const optionMethods = _dataSource => ({
	calculable: false,
	series: [{
		name: '树图',
		type: 'tree',
		rootLocation: { x: '50%', y: '30%' }, // 根节点位置  {x: 'center',y: 10}
		nodePadding: 20,
		symbol: 'circle',
		orient: 'vertical',
		roam: true,
		symbolSize: 40,
		itemStyle: {
			normal: {
				color: '#fff',
				borderWidth: '1',
				borderColor: '#128bed',
				label: {
					show: !0,
					position: 'inside',
					textStyle: {
						color: '#000',
						fontFamily: 'MicroSoft YaHei',
						fontSize: 16,
						fontStyle: 'normal',
					},
				},
			},
			emphasis: {
				color: 'rgba(255,255,255,0)',
				borderWidth: '1',
				borderColor: '#128bed00',
			},
		},
		data: _dataSource,
	}],
});

export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	componentDidMount() {
		console.log(zr);
		const myChart = ec.init(document.getElementById('zRenderEcharts'));
		const { Text } = window.zrDefine;
		const shape = new Text({
			style: {
				x: 500,
				y: 155,
				textFont: 'normal 15px 微软雅黑',
				text: '测试内容\n测试内容',
				textAlign: 'center',
				color: '#333',
				fontSize: 14,
				lineWidth: 0,
			},
			highlightStyle: {
				lineWidth: 0,
				color: '#333',
				strokeColor: 'rgba(255,255,255,0)',
			},
			zlevel: 4,

		});
		shape.zlevel = 1;
		shape.z = 5;
		shape.ndelete = true;
		shape.hoverable = false;
		myChart.getZrender().addShape(shape);
		myChart.setOption(optionMethods(dataSource));
	}

	onChartReadyCallback=() => {
		console.log('onChartReadyCallback');
	};


	getOption =() => {
		const _data = eData;

		const { children } = _data;
		// _data.DetailList = undefined;
		// console.log(children[0].children);
		_data.symbol = 'rectangle';
		_data.symbolSize = [140, 40];
		_data.labelClick = true;
		_data.itemStyle = {
			color: '#1e81e1',
			borderColor: '#1e81e1',
		};
		if (children) {
			for (let i = 0; i < children.length; i += 1) {
				if (children[i].children.length > 1) {
					for (let j = 0; j < children[i].children.length; j += 1) {
						children[i].children[j].symbol = 'rectangle';
						children[i].children[j].symbolSize = [110, 42];
						children[i].children[j].itemStyle = {
							color: '#f3f9fe',
							borderColor: '#1e81e1',
						};
						// children[i].children[j] = this.arrowAdd(children[i].children[j]);
					}
				}
				children[i].symbol = 'rectangle';
				children[i].symbolSize = [146, 62];
				children[i].itemStyle = {
					color: 'white',
					borderColor: '#333',
				};
				// children[i] = this.arrowAdd(children[i]);
			}
		}
		// console.log(_data);

		return ({

			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove',
			},
			series: [{
				type: 'tree',
				orient: 'BT',
				nodePadding: 25,
				layerPadding: 40,
				symbol: 'rectangle',
				expandAndCollapse: 'true',
				rootLocation: {
					x: '50%',
					y: '50%',
				},
				direction: 'inverse',
				data: [_data],
				leaves: {
					label: {
						show: true,
						formatter: [
							'The whole box is a {term|Text Block}, with',
							'red border and grey background.',
							'{fregment1|A Text Fregment} ',
							'{fregment2|Another Text Fregment}',
							'Text fregments can be customized.',
						].join('\n'),
						backgroundColor: '#eee',
						// borderColor: '#333',
						borderColor: 'rgb(199,86,83)',
						position: 'insideTop',
						borderWidth: 2,
						borderRadius: 5,
						padding: 10,
						color: '#000',
						fontSize: 14,
						shadowBlur: 3,
						shadowColor: '#888',
						shadowOffsetX: 0,
						shadowOffsetY: 3,
						lineHeight: 30,
						rich: {
							term: {
								fontSize: 18,
								color: 'rgb(199,86,83)',
							},
							fregment1: {
								backgroundColor: '#000',
								color: 'yellow',
								padding: 5,
							},
							fregment2: {
								backgroundColor: {
									image: bg,
								},
								width: 100,
								height: 20,
								padding: 5,
							},

						},
					},
				},
			}],
		});
	};


	render() {
		return (
			<div id="zRenderEcharts" style={{ width: 1000, height: 500 }} />
		);
	}
}
