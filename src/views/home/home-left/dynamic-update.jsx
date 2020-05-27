import React, { PureComponent } from 'react';
import { Button, Tooltip } from 'antd';
import { navigate } from '@reach/router';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import DetailItem from '../components/detail-item';
import './style.scss';
import { Icon } from '@/common';

const compare = property => (a, b) => {
	const first = a[property];
	const second = b[property];
	return second - first;
};


let newAssetRemindArray = [];
let newRiskRemindArray = [];
let newAssetTotalNumArray = [];
let newRiskTotalNumArray = [];
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
	['涉诉信息', ['涉诉信息', 9]],
	['经营风险', ['经营风险', 10]],
	['金融资产', ['金融资产', 12]],
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
			UnReadNum: 0,
			clear: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			assetPropsData, riskPropsData, AssetImportantReminderList, AssetImportantReminderObligorIdList, RiskImportantReminderList, RiskImportantReminderObligorIdList,
		} = nextProps;
		if (assetPropsData && assetPropsData.assetDataArray && assetPropsData.assetDataArray.length !== 0) {
			newAssetTotalNumArray = JSON.parse(JSON.stringify(assetPropsData && assetPropsData.assetDataArray));
		}
		if (riskPropsData && riskPropsData.riskDataArray && riskPropsData.riskDataArray.length !== 0) {
			newRiskTotalNumArray = JSON.parse(JSON.stringify(riskPropsData && riskPropsData.riskDataArray));
		}
		if ((AssetImportantReminderList && Array.isArray(AssetImportantReminderList) && AssetImportantReminderList.length > 0) || AssetImportantReminderObligorIdList) {
			newAssetRemindArray = [...AssetImportantReminderList];
			const hasUnRead = AssetImportantReminderList && AssetImportantReminderList.filter(i => i.isRead === 0).length;
			this.getUnReadNum(hasUnRead);
			const newAssetImportantReminderObligorIdList = AssetImportantReminderObligorIdList.filter(i => i !== 0);
			const newAssetImportantReminderObligorIdListNum = new Set([...newAssetImportantReminderObligorIdList]).size;
			this.setState(() => ({
				assetRemindArray: AssetImportantReminderList,
				assetObligorIdNum: newAssetImportantReminderObligorIdListNum,
			}));
		}

		if ((RiskImportantReminderList && Array.isArray(RiskImportantReminderList) && RiskImportantReminderList.length > 0) || RiskImportantReminderObligorIdList) {
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
		let newList = [];
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newList = newAssetRemindArray.filter(item => item.type !== actionType[1]);
			} else {
				newList = asset && asset.length > 0 ? newAssetRemindArray.concat(asset) : newAssetRemindArray;
			}
		}
		newAssetRemindArray = newList.sort(compare('timestamp'));
		return newAssetRemindArray;
		// return newAssetRemindArray;
	};

	riskArray = (selected, name, remindArray, clear) => {
		const actionType = ringMap.get(name) || ringMap.get('default');
		let risk = [...remindArray.filter(item => item.type === actionType[1])];
		if (clear) {
			risk = [];
			newRiskRemindArray = remindArray;
		}
		let newList = [];
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newList = newRiskRemindArray.filter(item => item.type !== actionType[1]);
			} else {
				newList = risk && risk.length > 0 ? newRiskRemindArray.concat(risk) : newRiskRemindArray;
			}
		}
		newRiskRemindArray = newList.sort(compare('timestamp'));
		return newRiskRemindArray;
		// return newRiskRemindArray;
	};

	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i.count;
		});
		return total;
	};

	assetArrayNum = (selected, name, remindArray, clear) => {
		const actionType = ringMap.get(name) || ringMap.get('default');
		let asset = [...remindArray.filter(item => item.type === actionType[1])];
		if (clear) {
			asset = [];
			newAssetTotalNumArray = remindArray;
		}
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newAssetTotalNumArray = newAssetTotalNumArray.filter(item => item.type !== actionType[1]);
			} else {
				newAssetTotalNumArray = asset && asset.length > 0 ? newAssetTotalNumArray.concat(asset) : newAssetTotalNumArray;
			}
		}
		return newAssetTotalNumArray;
	};

	riskArrayNum = (selected, name, remindArray, clear) => {
		const actionType = ringMap.get(name) || ringMap.get('default');
		let asset = [...remindArray.filter(item => item.type === actionType[1])];
		if (clear) {
			asset = [];
			newRiskTotalNumArray = remindArray;
		}
		if (name === actionType[0]) {
			if (selected[name] === false) {
				this.setState(() => ({ clear: false }));
				newRiskTotalNumArray = newRiskTotalNumArray.filter(item => item.type !== actionType[1]);
			} else {
				newRiskTotalNumArray = asset && asset.length > 0 ? newRiskTotalNumArray.concat(asset) : newRiskTotalNumArray;
			}
		}
		return newRiskTotalNumArray;
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

	getUnReadNum = (value) => {
		this.setState(() => ({
			UnReadNum: value,
		}));
	};

	render() {
		const {
			typeNum, assetRemindArray, RingEchartsObj, assetObligorIdNum, riskRemindArray, riskObligorIdNum, clear, UnReadNum,
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

		let assetArrNum = (newAssetTotalNumArray);
		let riskArrNum = (newRiskTotalNumArray);

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
			riskArr = this.riskArray(selected, name, riskRemindArray, clear);
			assetArrNum = this.assetArrayNum(selected, name, hasAssetPropsData && assetPropsData.assetDataArray, clear);
			riskArrNum = this.riskArrayNum(selected, name, hasRiskPropsData && riskPropsData.riskDataArray, clear);
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
									<span className="seven-update-content-title-num">{assetArrNum && this.getTotal(assetArrNum)}</span>
									条资产挖掘信息

									<Tooltip
										placement="top"
										title="点击图例，显示/隐藏不同数据类型的重要信息提醒"
										arrowPointAtCenter
									>
										<span style={{ marginLeft: 5 }}>
											<Icon
												type="icon-question"
												style={{
													color: '#7D8699', fontSize: 16, cursor: 'pointer',
												}}
											/>
										</span>
									</Tooltip>

									<span className="seven-update-content-title-addNum">
										<span className="seven-update-content-title-addNum-icon" />
										<span className="seven-update-content-title-addNum-text">
											{assetObligorIdNum}
											名债务人有资产信息更新
										</span>
									</span>
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
										{/* assetObligorIdNum */}
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{assetArr && assetArr.length}</span>
										条重要信息提醒
										{UnReadNum ?	<span className="seven-update-content-title-icon" /> : null}
									</div>
								</div>
								<DetailItem data={assetArr} getUnReadNum={this.getUnReadNum} />
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
									<span className="seven-update-content-title-num">{riskArrNum && this.getTotal(riskArrNum)}</span>
								条风险参考信息
									<Tooltip
										placement="top"
										title="点击图例，显示/隐藏不同数据类型的重要信息提醒"
										arrowPointAtCenter
									>
										<span style={{ marginLeft: 5 }}>
											<Icon
												type="icon-question"
												style={{
													color: '#7D8699', fontSize: 16, cursor: 'pointer',
												}}
											/>
										</span>
									</Tooltip>
									<span className="seven-update-content-title-addNum">
										<span className="seven-update-content-title-addNum-icon" />
										<span className="seven-update-content-title-addNum-text">
											{riskObligorIdNum}
											名债务人有资产信息更新
										</span>
									</span>
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
										{/* riskObligorIdNum */}
										<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>{riskArr && riskArr.length}</span>
										条重要信息提醒
										{UnReadNum ?	<span className="seven-update-content-title-icon" /> : null}
									</div>
								</div>
								<DetailItem data={riskArr} getUnReadNum={this.getUnReadNum} />
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
