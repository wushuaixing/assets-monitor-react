import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import DetailItem from '../components/detail-item';
import './style.scss';

const compare = property => (a, b) => {
	const first = a[property];
	const second = b[property];
	return second - first;
};


let newAssetRemindArray = [];
let newRiskRemindArray = [];
const ringMap = new Map([
	['资产拍卖', ['资产拍卖', 1]],
	['土地信息', ['土地信息', 2]],
	['无形资产', ['无形资产', 3]],
	['动产抵押', ['动产抵押', 4]],
	['股权质押', ['股权质押', 5]],
	['代位权', ['代位权', 6]],
	['招投标', ['招投标', 11]],
	['破产重组', ['破产重组', 7]],
	['失信记录', ['失信记录', 8]],
	['涉诉风险', ['涉诉风险', 9]],
	['经营风险', ['经营风险', 10]],
	['default', ['资产拍卖', 1]],
]);

class dynamicUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			typeNum: 0,
			assetRemindArray: [],
			riskRemindArray: [],
			assetObligorIdNum: 0,
			riskObligorIdNum: 0,
			RingEchartsObj: {},
			clear: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			AssetImportantReminderList, AssetImportantReminderObligorIdList, RiskImportantReminderList, RiskImportantReminderObligorIdList,
		} = nextProps;
		if (AssetImportantReminderList && Array.isArray(AssetImportantReminderList) && AssetImportantReminderList.length > 0) {
			newAssetRemindArray = [...AssetImportantReminderList];
			const newAssetImportantReminderObligorIdList = AssetImportantReminderObligorIdList.filter(i => i !== 0);
			const newAssetImportantReminderObligorIdListNum = new Set([...newAssetImportantReminderObligorIdList]).size;
			this.setState(() => ({
				assetRemindArray: AssetImportantReminderList,
				assetObligorIdNum: newAssetImportantReminderObligorIdListNum,
			}));
		}

		if (RiskImportantReminderList && Array.isArray(RiskImportantReminderList) && RiskImportantReminderList.length > 0) {
			newRiskRemindArray = [...RiskImportantReminderList];
			const newRiskImportantReminderObligorIdList = RiskImportantReminderObligorIdList.filter(i => i !== 0);
			const newRiskImportantReminderObligorIdListNum = new Set([...newRiskImportantReminderObligorIdList]).size;
			this.setState(() => ({
				riskRemindArray: RiskImportantReminderList,
				riskObligorIdNum: newRiskImportantReminderObligorIdListNum,
			}));
		}
	}

	assetArray = (selected, name, remindArray, clear) => {
		const actionType = ringMap.get(name) || ringMap.get('default');
		let asset = [...remindArray.filter(item => item.type === actionType[1])];
		if (clear) {
			asset = [];
			newAssetRemindArray = remindArray;
		}
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newAssetRemindArray = newAssetRemindArray.filter(item => item.type !== actionType[1]);
			} else {
				newAssetRemindArray = asset && asset.length > 0 ? newAssetRemindArray.concat(asset) : newAssetRemindArray;
			}
		}

		return newAssetRemindArray.sort(compare('timestamp'));
	};

	riskArray = (selected, name, remindArray, clear) => {
		const actionType = ringMap.get(name) || ringMap.get('default');
		let risk = [...remindArray.filter(item => item.type === actionType[1])];
		if (clear) {
			risk = [];
			newRiskRemindArray = remindArray;
		}
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newRiskRemindArray = newRiskRemindArray.filter(item => item.type !== actionType[1]);
			} else {
				newRiskRemindArray = risk && risk.length > 0 ? newRiskRemindArray.concat(risk) : newRiskRemindArray;
			}
		}
		return newRiskRemindArray.sort(compare('timestamp'));
	};

	getDynamicType = (val) => {
		const { RingEchartsObj } = this.state;
		const { selected } = RingEchartsObj;
		if (selected) {
			Object.getOwnPropertyNames(selected).forEach((key) => {
				selected[key] = true;
			});
		}

		this.setState(() => ({
			typeNum: val,
			clear: true,
			RingEchartsObj,
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
			typeNum, assetRemindArray, RingEchartsObj, assetObligorIdNum, riskRemindArray, riskObligorIdNum, clear,
		} = this.state;
		const { assetPropsData, riskPropsData } = this.props;
		const hasAssetPropsData = Object.keys(assetPropsData).length !== 0;
		const hasRiskPropsData = Object.keys(riskPropsData).length !== 0;
		const lessAssetNum = hasAssetPropsData && assetPropsData.totalNum < 3 && assetPropsData.totalNum > 0;
		const lessRiskNum = hasRiskPropsData && riskPropsData.totalNum < 3 && riskPropsData.totalNum > 0;
		const assetPropsDataArray = hasAssetPropsData && assetPropsData.assetDataArray;
		const riskPropsDataArray = hasRiskPropsData && riskPropsData.riskDataArray;

		const newAssetArr = [...assetRemindArray];
		const newRiskArr = [...riskRemindArray];
		let assetArr = (newAssetArr.sort(compare('timestamp')));
		let riskArr = (newRiskArr.sort(compare('timestamp')));

		const params = {
			getDynamicType: this.getDynamicType,
			assetTotalNum: hasAssetPropsData ? assetPropsData.totalNum : 0,
			riskTotalNum: hasRiskPropsData ? riskPropsData.totalNum : 0,
		};
		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: assetPropsDataArray,
			assetRemindArray,
		};
		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: riskPropsDataArray,
			riskRemindArray,
		};

		if (Object.keys(RingEchartsObj).length !== 0) {
			const { selected, name } = RingEchartsObj;
			assetArr = this.assetArray(selected, name, assetRemindArray, clear);
			riskArr = this.riskArray(selected, name, riskRemindArray);
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
								<RingEcharts id="assetAuction" {...assetParams} title="资产挖掘" />
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
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{assetObligorIdNum}</span>
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
								<RingEcharts id="assetAuction" {...riskParams} title="风险参考" />
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
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{riskObligorIdNum}</span>
									名债务人有风险信息更新，以下为重要信息提醒
									</div>
								</div>
								<DetailItem data={riskArr} />
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
