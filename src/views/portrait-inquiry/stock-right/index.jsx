import React from 'react';
import './style.scss';
import analogData, { imitateSource } from './analog-data';
import iconAdd from '@/assets/img/icon/icon_add.png';
import iconDelete from '@/assets/img/icon/icon_delete.png';
import iconArrow from '@/assets/img/icon/arrow.png';

/* 常用样式 */
const style = {
	font: {
		textFont: 'normal 12px verdana',
		textAlign: 'center',
		color: '#333',
		fontSize: 14,
		lineWidth: 0,
	},
	zLevel: {
		zlevel: 1,
		z: 5,
		ndelete: true,
		hoverable: false,
	},
	background: {
		any: {
			color: '#fff',
			borderWidth: '1',
			borderColor: '#ccc',
			label: {
				show: true,
				position: 'inside',
				textStyle: {
					fontSize: 14,
					color: '#333',
					fontStyle: 'normal',
				},
			},
		},
		per: {
			color: '#f3f9fe',
			borderColor: '#1e81e1',
			borderWidth: '1',
			label: {
				show: true,
				position: 'inside',
				textStyle: {
					color: 'black',
				},
			},
		},
	},
};

/* 处理配置文件，并返回 eCharts配置 */
const optionMethods = (source1, source2) => {
	const option = {
		calculable: false,
		series: [],
	};
	if (source1) {
		option.series.push({
			name: '股东',
			type: 'tree',
			rootLocation: { x: '50%', y: '50%' }, // 根节点位置  {x: 'center',y: 10}
			nodePadding: 20,
			layerPadding: 40,
			symbol: 'circle',
			orient: 'vertical',
			direction: 'inverse',
			roam: true,
			symbolSize: 40,
			itemStyle: {
				normal: {
					color: '#128bed',
					borderWidth: '1',
					borderColor: '#128bed',
					label: {
						position: 'inside',
						textStyle: {
							color: '#ffffff',
							fontSize: 14,
							fontStyle: 'normal',
						},
					},
				},
				emphasis: {
					color: 'rgba(255,255,255,0)',
					borderWidth: '1',
					borderColor: '#128bed',
				},
			},
			data: source1,
		});
	}
	if (source2) {
		option.series.push({
			name: '投资',
			type: 'tree',
			rootLocation: { x: '50%', y: '50%' }, // 根节点位置  {x: 'center',y: 10}
			nodePadding: 20,
			layerPadding: 40,
			symbol: 'circle',
			orient: 'vertical',
			roam: true,
			symbolSize: 40,
			itemStyle: {
				normal: {
					color: '#128bed',
					borderWidth: '1',
					borderColor: '#128bed',
					label: {
						show: !0,
						position: 'inside',
						textStyle: {
							color: '#ffffff',
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
			data: source2 || [],
		});
	}
	return option;
};

export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.resultSource = {
			holderData: '',
			investorData: '',
		};
	}

	componentDidMount() {
		const source = this.initOption();
		this.resultSource = {
			holderData: source.holderData,
			investorData: source.investorData,
		};

		this.myChart = window.echarts.init(document.getElementById('zRenderEcharts'));
		this.myChart.setOption(optionMethods(source.holderData, source.investorData));
		this.initZRender();
		this.myChart.getZrender().on('click', (e) => {
			if (e.target) {
				const { isCollapse, info } = e.target;
				if (isCollapse) this.handleOption(info);
			}
		});
	}

	/* 初始化构建 树图配置 */
	initOption=() => {
		const { holderList, investorList } = analogData;
		const holderData = [{
			name: analogData.name,
			symbolSize: [40 + analogData.name.length * 18 + 20, 50],
			symbol: 'rectangle',
			children: this.toAddArrowData(holderList, 'holder'),
		}];
		const investorData = [{
			name: analogData.name,
			symbolSize: [40 + analogData.name.length * 18 + 20, 50],
			symbol: 'rectangle',
			children: this.toAddArrowData(investorList, 'investor'),
		}];
		return { holderData, investorData };
	};

	/* 添加箭头样式 */
	toAddArrowData=(source, type) => {
		if ((source || []).length) {
			const sourceType = type === 'holder' ? 'holderList' : 'investorList';
			const iconStatus = (item) => {
				if (item.hasNode) {
					if ((item[sourceType] || []).length) return 'del';
					return 'add';
				}
				return '';
			};
			return	source.map(item => ({
				value: item.percent,
				symbol: 'arrow',
				symbolSize: 1,
				isArrow: true,
				itemStyle: {
					normal: {
						color: '#000',
						label: {
							position: 'right',
							lineHeight: 1,
						},
					},
				},
				children: [{
					symbol: 'rectangle',
					symbolSize: [160, 50],
					iconStatus: iconStatus(item),
					username: item.name,
					value: item.value,
					isElement: true,
					dataType: type,
					id: item.id,
					treeName: type,
					hasNode: item.hasNode,
					amount: item.amount,
					itemStyle: {
						normal: item.type === 2 ? { ...style.background.any } : { ...style.background.per },
					},
					children: item.hasNode ? this.toAddArrowData(item[sourceType], type) : [],
				}],
			}));
		}
		return [];
	};

	/* 获取ID对应的节点数据 */
	toGetIdItem=(eleId, type) => {
		const baseSource = this.resultSource[type === 'holder' ? 'holderData' : 'investorData'];
		let result = '';
		const recursion = (id, array) => {
			const _length = (array || []).length || 0;
			if (_length) {
				for (let i = 0; i < _length; i += 1) {
					if (array[i].id === id) result = array[i];
					if (array[i].isArrow || array[i].children) recursion(id, array[i].children);
				}
			}
		};
		recursion(eleId, baseSource);
		return result;
	};

	/* 处理树图数据 */
	handleOption=(params) => {
		const { id, iconStatus, treeName } = params;
		const idItem = this.toGetIdItem(id, treeName);
		if (typeof idItem === 'object') {
			if (iconStatus === 'del') {
				idItem.iconStatus = 'add';
				idItem.backup = idItem.children;
				idItem.children = [];
			} else if (idItem.hasNode) {
				if (idItem.backup) {
					idItem.iconStatus = 'del';
					idItem.children = idItem.backup;
					idItem.backup = [];
				} else {
					/* 获取数据源 */
					const addData = imitateSource[id];
					if (addData) {
						idItem.children = this.toAddArrowData(addData, treeName);
						idItem.iconStatus = 'del';
					}
				}
			}
		}
		this.myChart.clear();
		this.myChart.setOption(optionMethods(this.resultSource.holderData, this.resultSource.investorData));
		this.initZRender();
	};

	/* zRender */
	initZRender=() => {
		const { Text, ImageShape } = window.zrDefine;
		const myZr = this.myChart.getZrender();
		const shapeList = myZr.storage.getShapeList();

		for (let i = 0; i < shapeList.length; i += 1) {
			const locationX = shapeList[i].rotation[1];
			const locationY = shapeList[i].rotation[2];
			// 树节点数据源 myChartData
			if (shapeList[i]._echartsData) {
				const {
					hasNode, id, dataType, iconStatus, treeName, username, amount, isElement, isArrow,
				} = shapeList[i]._echartsData._data;

				/* 添加 公司名称 */
				if (isElement) {
					const shapeText = new Text({
						style: {
							x: locationX,
							y: locationY - 5,
							text: username,
							...style.font,
						},
						zlevel: 4,
					});
					myZr.addShape(Object.assign(shapeText, style.zLevel));
				}

				/* 添加 认缴金额 */
				if (amount) {
					const shapeText1 = new Text({
						style: {
							x: locationX,
							y: locationY + 10,
							text: `认缴金额：${amount}`,
							...style.font,
						},
						zlevel: 4,
					});
					myZr.addShape(Object.assign(shapeText1, style.zLevel));
				}

				/* 如果拥有子节点 添加加减号 */
				if (hasNode) {
					const shapeBtn = new ImageShape({
						style: {
							image: iconStatus === 'add' ? iconAdd : iconDelete, // 图片url或者图片对象
							x: locationX - 7,
							y: locationY - 41,
							width: 15,
							height: 16,
						},
					});
					shapeBtn.info = {
						hasNode, id, dataType, iconStatus, treeName,
					};
					shapeBtn.isCollapse = true;
					shapeBtn.clickable = true;
					myZr.addShape(Object.assign(shapeBtn, style.zLevel));
				}

				if (isArrow) {
					const shapeArrow = new ImageShape({
						style: {
							image: iconArrow, // 图片url或者图片对象
							x: locationX - 7,
							y: locationY - 9,
							width: 15,
							height: 16,
						},
					});
					myZr.addShape(Object.assign(shapeArrow, style.zLevel));
				}
			}
		}
	};


	render() {
		return (
			<div style={{ padding: 10 }}>
				<div id="zRenderEcharts" style={{ width: 1000, height: 700, border: '3px solid #ddd' }} />
			</div>
		);
	}
}
