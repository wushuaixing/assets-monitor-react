import React, { PureComponent } from 'react';
import { Button } from 'antd';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import DetailItem from '../components/detail-item';
import './style.scss';
import { navigate } from '../../../../patchs/Router';

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
			remindArray: [
				// {
				// 	name: '资产拍卖', time: '1', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 1, detailType: 101, timeStamp: 1,
				// },
				// {
				// 	name: '土地出让结果', time: '2', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 201, timeStamp: 2,
				// },
				// {
				// 	name: '土地转让', time: '3', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 202, timeStamp: 3,
				// },
				// {
				// 	name: '土地抵押', time: '4', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 2, detailType: 203, timeStamp: 4,
				// },
				// {
				// 	name: '排污权', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 301, timeStamp: 5,
				// },
				// {
				// 	name: '矿业权', time: '6', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 302, timeStamp: 6,
				// },
				// {
				// 	name: '商标专利', time: '7', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 303, timeStamp: 7,
				// },
				// {
				// 	name: '建筑建造资质', time: '8', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 3, detailType: 304, timeStamp: 8,
				// },
				// {
				// 	name: '动产抵押', time: '9', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 4, detailType: 401, timeStamp: 9,
				// },
				// {
				// 	name: '股权质押', time: '10', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 5, detailType: 501, timeStamp: 10,
				// },
				// {
				// 	name: '代位权开庭', time: '11', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 601, timeStamp: 11,
				// },
				// {
				// 	name: '代位权立案', time: '12', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 602, timeStamp: 12,
				// },
				// {
				// 	name: '代位权裁判文书', time: '13', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 6, detailType: 603, timeStamp: 13,
				// },
				// {
				// 	name: '破产重组', time: '14', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 7, detailType: 701, timeStamp: 14,
				// },
				// {
				// 	name: '失信列入', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 8, detailType: 801, timeStamp: 15,
				// },
				// {
				// 	name: '失信移除', time: '11', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 8, detailType: 802, timeStamp: 11,
				// },
				// {
				// 	name: '涉诉开庭', time: '12', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 901, timeStamp: 12,
				// },
				// {
				// 	name: '涉诉立案', time: '13', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 902, timeStamp: 13,
				// },
				// {
				// 	name: '涉诉裁判文书', time: '14', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 9, detailType: 903, timeStamp: 14,
				// },
				// {
				// 	name: '经营异常', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1001, timeStamp: 15,
				// },
				// {
				// 	name: '严重违法', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1002, timeStamp: 15,
				// },
				// {
				// 	name: '税收违法', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1003, timeStamp: 15,
				// },
				// {
				// 	name: '行政处罚', time: '5', content: '2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封', type: 10, detailType: 1004, timeStamp: 15,
				// },
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

	handleNavigate = () => {
		navigate('/business');
	};

	render() {
		const {
			typeNum, remindArray, RingEchartsObj,
		} = this.state;
		const { assetPropsData, riskPropsData } = this.props;
		const hasAssetPropsData = Object.keys(assetPropsData).length !== 0;
		const hasRiskPropsData = Object.keys(riskPropsData).length !== 0;
		const lessAssetNum = hasAssetPropsData && assetPropsData.totalNum < 3 && assetPropsData.totalNum > 0;
		const lessRiskNum = hasRiskPropsData && riskPropsData.totalNum < 3 && riskPropsData.totalNum > 0;

		const newAssetArr = [...remindArray];
		let assetArr = (newAssetArr.sort(compare('timeStamp')));
		const params = {
			getDynamicType: this.getDynamicType,
			assetTotalNum: hasAssetPropsData ? assetPropsData.totalNum : 0,
			riskTotalNum: hasRiskPropsData ? riskPropsData.totalNum : 0,
		};

		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			setRemindArray: this.setRemindArray,
			Data: hasAssetPropsData && assetPropsData.assetDataArray,
			remindArray,
		};
		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: hasRiskPropsData && riskPropsData.riskDataArray,
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
						{hasAssetPropsData && assetPropsData.totalNum !== 0 ? (
							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name">
								新增
									<span className="seven-update-content-title-num">{hasAssetPropsData && assetPropsData.totalNum}</span>
								条资产挖掘信息
								</div>
								<RingEcharts id="assetAuction" {...assetParams} />
								{lessAssetNum && (
									<div className="seven-update-content-title-noNum">
										数据太少？建议
										<span className="seven-update-content-title-noNum-findMore" onClick={() => this.handleNavigate('/business')}>去导入更多债务人</span>
										，以匹配更多价值信息
									</div>
								)}
								<div className="seven-update-content-title">
									<div className="seven-update-content-title-item" />
									<div className="seven-update-content-title-name">
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{assetArr.length}</span>
									名债务人有资产信息更新，以下为重要信息提醒
									</div>
								</div>
								<DetailItem data={assetArr} />
							</div>
						) : (
							<div className="detail-container-noData">
								<div className="detail-container-noData-allImg" />
								<span className="detail-container-noData-text">暂未匹配到新的资产信息，建议去导入更多债务人，以匹配更多价值信息</span>
								<div>
									<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '40px' }}>导入更多债务人</Button>
								</div>
							</div>
						)}
					</div>
				)}

				{typeNum === 1 && (
					<div className="seven-update-content">

						{hasRiskPropsData && riskPropsData.totalNum !== 0 ? (
							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name">
								新增
									<span className="seven-update-content-title-num">{hasRiskPropsData && riskPropsData.totalNum}</span>
								条风险参考信息
								</div>
								<RingEcharts id="assetAuction" {...riskParams} />
								{lessRiskNum && (
									<div className="seven-update-content-title-noNum">
										数据太少？建议
										<span className="seven-update-content-title-noNum-findMore" onClick={() => this.handleNavigate('/business')}>去导入更多债务人</span>
										，以匹配更多价值信息
									</div>
								)}
								<div className="seven-update-content-title">
									<div className="seven-update-content-title-item" />
									<div className="seven-update-content-title-name">
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>0</span>
									名债务人有风险信息更新，以下为重要信息提醒
									</div>
								</div>
								<DetailItem data={remindArray} />
							</div>
						) : (
							<div className="detail-container-noData">
								<div className="detail-container-noData-allImg" />
								<span className="detail-container-noData-text">暂未匹配到新的风险信息，建议去导入更多债务人，以匹配更多价值信息</span>
								<div>
									<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '40px' }}>导入更多债务人</Button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default dynamicUpdate;
