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
					name: '东阳市罗山矿业有限公司', time: '2020-04-26', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, timeStamp: 1587830400,
				},
				{
					name: '东阳市罗山矿业有限公司', time: '2019-04-26', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, timeStamp: 1556208000,
				},
				{
					name: '东阳市罗山矿业有限公司', time: '2020-04-20', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, timeStamp: 1587312000,
				},
				{
					name: '东阳市罗山矿业有限公司', time: '2020-04-26', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, timeStamp: 1587830400,
				},
				{
					name: '东阳市罗山矿业有限公司', time: '2020-04-26', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, timeStamp: 1587830400,
				},
			],
			RingEchartsObj: {},
		};
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

		let assetArr = newAssetArr.sort(compare('timeStamp'));

		const params = {
			getDynamicType: this.getDynamicType,
		};
		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: assetData,
		};
		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: riskData,
		};

		if (Object.keys(RingEchartsObj).length !== 0) {
			const { name, selected } = RingEchartsObj;
			if (name === '资产拍卖') {
				if (selected[name] === false) {
					assetArr = remindArray.filter(item => item.type !== 3).sort(compare('timeStamp'));
				}
			}
			if (name === '无形资产') {
				if (selected[name] === false) {
					assetArr = remindArray.filter(item => item.type !== 1).sort(compare('timeStamp'));
				}
			}
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
								<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>66</span>
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
