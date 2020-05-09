import React, { PureComponent } from 'react';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import DetailItem from '../components/detail-item';
import './style.scss';

const compare = property => (a, b) => {
	const first = a[property];
	const second = b[property];
	return first - second;
};


let newRemindArray = [];
const assetMap = new Map([
	['资产拍卖', ['资产拍卖', 1]],
	['土地信息', ['土地信息', 2]],
	['无形资产', ['无形资产', 3]],
	['动产抵押', ['动产抵押', 4]],
	['股权质押', ['股权质押', 5]],
	['代位权', ['代位权', 6]],
	['招投标', ['招投标', 7]],
	['default', ['资产拍卖', 1]],
]);

const assetArray = (selected, name, remindArray) => {
	const actionType = assetMap.get(name) || assetMap.get('default');
	const asset = [...remindArray.filter(item => item.type === actionType[1])];
	if (name === actionType[0]) {
		if (selected[name] === false) {
			newRemindArray = newRemindArray.filter(item => item.type !== actionType[1]);
		} else {
			newRemindArray = newRemindArray.concat(asset);
		}
	}
	return newRemindArray.sort(compare('timeStamp'));
};

class dynamicUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			typeNum: 0,
			assetData: [
				{
					count: 18, type: 3, typeName: '资产拍卖', name: '资产拍卖', value: 2,
				},
				{
					count: 9, type: 3, typeName: '代位权', name: '代位权', value: 2,
				},
				{
					count: 12, type: 3, typeName: '土地信息', name: '土地信息', value: 2,
				},
				{
					count: 10, type: 3, typeName: '股权质押', name: '股权质押', value: 2,
				},
				{
					count: 7, type: 3, typeName: '动产抵押', name: '动产抵押', value: 2,
				},
				{
					count: 9, type: 3, typeName: '招投标', name: '招投标', value: 2,
				},
				{
					count: 9, type: 3, typeName: '无形资产', name: '无形资产', value: 2,
				},
			],
			riskData: [
				{
					count: 18, type: 3, typeName: '破产重组', name: '破产重组', value: 2,
				},
				{
					count: 2, type: 3, typeName: '失信记录', name: '失信记录', value: 2,
				},
				{
					count: 12, type: 3, typeName: '涉诉信息', name: '涉诉信息', value: 2,
				},
				{
					count: 10, type: 3, typeName: '经营风险', name: '经营风险', value: 2,
				},
			],
			remindArray: [
				{
					name: '资产拍卖', time: '1', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, detailType: 101, timeStamp: 1,
				},
				{
					name: '土地出让结果', time: '2', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 201, timeStamp: 2,
				},
				{
					name: '土地转让', time: '3', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 202, timeStamp: 3,
				},
				{
					name: '土地抵押', time: '4', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 203, timeStamp: 4,
				},
				{
					name: '排污权', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 301, timeStamp: 5,
				},
				{
					name: '矿业权', time: '6', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 302, timeStamp: 6,
				},
				{
					name: '商标专利', time: '7', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 303, timeStamp: 7,
				},
				{
					name: '建筑建造资质', time: '8', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 304, timeStamp: 8,
				},
				{
					name: '动产抵押', time: '9', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 4, detailType: 401, timeStamp: 9,
				},
				{
					name: '股权质押', time: '10', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 5, detailType: 501, timeStamp: 10,
				},
				{
					name: '代位权开庭', time: '11', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 601, timeStamp: 11,
				},
				{
					name: '代位权立案', time: '12', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 602, timeStamp: 12,
				},
				{
					name: '代位权裁判文书', time: '13', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 603, timeStamp: 13,
				},
				{
					name: '破产重组', time: '14', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 7, detailType: 701, timeStamp: 14,
				},
				{
					name: '失信列入', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 8, detailType: 801, timeStamp: 15,
				},
				{
					name: '失信移除', time: '11', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 8, detailType: 802, timeStamp: 11,
				},
				{
					name: '涉诉开庭', time: '12', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 901, timeStamp: 12,
				},
				{
					name: '涉诉立案', time: '13', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 902, timeStamp: 13,
				},
				{
					name: '涉诉裁判文书', time: '14', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 903, timeStamp: 14,
				},
				{
					name: '经营异常', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1001, timeStamp: 15,
				},
				{
					name: '严重违法', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1002, timeStamp: 15,
				},
				{
					name: '税收违法', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1003, timeStamp: 15,
				},
				{
					name: '行政处罚', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1004, timeStamp: 15,
				},
			],
			RingEchartsObj: {},
		};
	}

	componentDidMount() {
		const { remindArray } = this.state;
		newRemindArray = [...remindArray];
	}


	getDynamicType = (val) => {
		this.setState(() => ({
			typeNum: val,
		}));
	};

	getRingEchartsType = (val) => {
		this.setState(() => ({
			RingEchartsObj: val,
		}));
	};


	render() {
		const {
			typeNum, assetData, riskData, remindArray, RingEchartsObj,
		} = this.state;
		const newAssetArr = [...remindArray];

		let assetArr = (newAssetArr.sort(compare('timeStamp')));

		const params = {
			getDynamicType: this.getDynamicType,
		};
		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			setRemindArray: this.setRemindArray,
			Data: assetData,
			remindArray,
		};
		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: riskData,
		};

		if (Object.keys(RingEchartsObj).length !== 0) {
			const { selected, name } = RingEchartsObj;
			assetArr = assetArray(selected, name, remindArray);
		}

		return (
			<div className="seven-update-container">
				<DynamicTab {...params} />
				{typeNum === 0 && (
				<div className="seven-update-content">

					<div className="seven-update-content-title">
						<div className="seven-update-content-title-item" />
						<div className="seven-update-content-title-name">
							新增
							<span className="seven-update-content-title-num">12</span>
							条资产挖掘信息
						</div>
						<RingEcharts id="assetAuction" {...assetParams} />

						<div className="seven-update-content-title">
							<div className="seven-update-content-title-item" />
							<div className="seven-update-content-title-name">
								<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{assetArr.length}</span>
								名债务人有资产信息更新，以下为重要信息提醒
							</div>
						</div>
						<DetailItem data={assetArr} />
					</div>
				</div>
				)}

				{typeNum === 1
				&& (
					<div className="seven-update-content">

						<div className="seven-update-content-title">
							<div className="seven-update-content-title-item" />
							<div className="seven-update-content-title-name">
								新增
								<span className="seven-update-content-title-num">17</span>
								条风险参考信息
							</div>

							<RingEcharts id="assetAuction" {...riskParams} />

							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name">
									<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>60</span>
									名债务人有风险信息更新，以下为重要信息提醒
								</div>
							</div>
							<DetailItem data={remindArray} />
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default dynamicUpdate;
