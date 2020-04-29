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
	['代位权', ['代位权', 2]],
	['土地信息', ['土地信息', 3]],
	['股权质押', ['股权质押', 4]],
	['动产抵押', ['动产抵押', 5]],
	['招投标', ['招投标', 6]],
	['无形资产', ['无形资产', 7]],
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
	return newRemindArray;
};
// const riskArray = (selected, name, remindArray) => {
// 	const actionType = assetMap.get(name) || assetMap.get('default');
// 	const asset = [...remindArray.filter(item => item.type === actionType[1])];
// 	if (name === actionType[0]) {
// 		if (selected[name] === false) {
// 			newRemindArray = newRemindArray.filter(item => item.type !== actionType[1]);
// 		} else {
// 			newRemindArray = newRemindArray.concat(asset);
// 		}
// 	}
// 	return newRemindArray;
// };

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
					name: '1东阳市罗山矿业有限公司', time: '1', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, timeStamp: 1,
				},
				{
					name: '2东阳市罗山矿业有限公司', time: '2', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, timeStamp: 2,
				},
				{
					name: '3东阳市罗山矿业有限公司', time: '3', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, timeStamp: 3,
				},
				{
					name: '4东阳市罗山矿业有限公司', time: '4', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 4, timeStamp: 4,
				},
				{
					name: '5东阳市罗山矿业有限公司', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 5, timeStamp: 5,
				},
				{
					name: '1东阳市罗山矿业有限公司', time: '1', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, timeStamp: 1,
				},
				{
					name: '2东阳市罗山矿业有限公司', time: '2', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 7, timeStamp: 2,
				},
				{
					name: '3东阳市罗山矿业有限公司', time: '3', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 8, timeStamp: 3,
				},
				{
					name: '4东阳市罗山矿业有限公司', time: '4', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, timeStamp: 4,
				},
				{
					name: '5东阳市罗山矿业有限公司', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, timeStamp: 5,
				},
				{
					name: '1东阳市罗山矿业有限公司', time: '1', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 11, timeStamp: 1,
				},
				{
					name: '2东阳市罗山矿业有限公司', time: '2', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 12, timeStamp: 2,
				},
				{
					name: '3东阳市罗山矿业有限公司', time: '3', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 13, timeStamp: 3,
				},
				{
					name: '4东阳市罗山矿业有限公司', time: '4', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 14, timeStamp: 4,
				},
				{
					name: '5东阳市罗山矿业有限公司', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 15, timeStamp: 5,
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
