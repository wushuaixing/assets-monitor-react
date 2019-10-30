import React from 'react';
import './style.scss';
import data from './data';

export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			DataOwn: [data],
		};
	}

	componentDidMount() {
		const { DataOwn } = this.state;
		const myChart = window.echarts.init(document.getElementById('main'));
		myChart.setOption({

			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove',
			},

			series: [
				{
					type: 'tree',
					data: DataOwn,
					left: '2%',
					right: '2%',
					top: '20%',
					bottom: '8%',

					symbol: 'rectangle',
					symbolSize: [60, 30],

					orient: 'BT',

					expandAndCollapse: true,


					label: {
						/* formatter: '{b|{b}}', */
						/*formatter: function(params) {

							//console.log(params.name, params.data.children.length,params.data)
							let dataName='{a|'+ params.data.name +'}';
							/!*if(params.data.children.length >1){
								for(let i=0; i<params.data.children.length; i++){
									console.log(params.data.children[i].children)
									dataName += '{a|'+ params.data.children[i].name +'}{b|'+ params.data.children[i].children +'}';
									console.log(dataName)
								}
							}
							else{*!/
								dataName +='{b|'+ params.data.name +'}';
							//}

							//
							return dataName;
						},
						rich: {
							a: {

								verticalAlign:'bottom',
								backgroundColor: 'black',
							},
							b: {
								lineHeight: 30,
								verticalAlign:'top',
								borderWidth:4,
								backgroundColor: 'red',

							}
						},*/
						position: 'inside',
						rotate: 0,
						verticalAlign: 'middle',
					},

					leaves: {
						label: {
							position: 'inside',
							rotate: 0,
							verticalAlign: 'middle',
						},
					},
					itemStyle: {
						color: '#f6faff',
						borderColor: '#1e81e1',
					},

					lineStyle: {
						color: 'steelblue',
						width: '1.5',
						/* symbol: 'arrow', */
					},
					animationDurationUpdate: 750,
				},
			],
		});
	}

	render() {
		return (
			<div className="container" id="main" style={{ width: 1000, height: 500 }} />
		);
	}
}
