/** 首页 * */

import React from 'react';
import './style.scss';


class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {
			RingData: [
				{ value: 335, name: '已成交' },
				{ value: 234, name: '正在进行' },
				{ value: 135, name: '即将开始' },
				{ value: 310, name: '已流拍' },
				{ value: 1548, name: '中止' },
				{ value: 135, name: '撤回' },
			],
		};
	}

	componentDidMount() {
		const { RingData } = this.state;
		// 基于准备好的dom，初始化echarts实例
		const myChart = window.echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)',
			},

			legend: {
				// orient: 'vertical',
				data: ['已成交', '正在进行', '即将开始', '已流拍', '中止', '撤回'],
				// x: 'right',
				// 取消图例上的点击事件，这个看需求
				// selectedMode: false,
				// 分布方式，水平：'horizontal'，垂直：'vertical'
				orient: 'vertical',
				// 水平对齐方式，可设置为'left','center','right',number(px)
				x: 'right',
				// 垂直对齐方式，可设置为'top','center','bottom',number(px)
				y: 'center',
				// 距顶部的距离，其他同理
				icon: 'circle',
				// 距左边的距离，其他同理
				left: 200,
				// 图标大小,宽和高
				itemWidth: 6,
				itemHeight: 6,

				// 如需自定义添加内容，可在series的data定义相应的数据，最后返回处理后的内容
				formatter: (name) => {
					let res = '';
					for (let i = 0; i < RingData.length; i += 1) {
						if (RingData[i].name === name) {
							res = RingData[i].value;
						}
					}
					const arr = [
						`{a|${name}}`,
						`{b|${res} 条}`,
					];
					return arr.join('');
				},
				textStyle: {
					rich: {
						a: {
							align: 'left',
							color: '#4E5566',
							width: 72,
							padding: [0, 0, 0, 10],
						},
						b: {
							align: 'right',
							color: '#20242E',
							width: 40,
							padding: [0, 0, 0, 10],
						},
					},
				},
			},

			color: ['#45A1FF', '#4DCAC9', '#59C874', '#FCD44A', '#F2657A', '#965EE3'],
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: ['45%', '70%'],
					center: ['20%', '50%'],
					// x: '0%', // for funnel
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center',
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '15',
								fontWeight: 'bold',
							},
						},
					},
					labelLine: {
						normal: {
							show: false,
						},
					},
					data: RingData,
				},
			],
		});
	}

	render() {
		return (
			<div>
				<div className="yc-ring-rcharts" id="main" style={{ width: 450, height: 150 }} />
			</div>
		);
	}
}

export default RingEcharts;
