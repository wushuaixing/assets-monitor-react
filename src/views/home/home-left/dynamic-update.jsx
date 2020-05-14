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
	return first - second;
};


let newAssetRemindArray = [];
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
			newAssetRemindArray = newAssetRemindArray.filter(item => item.type !== actionType[1]);
		} else {
			newAssetRemindArray = newAssetRemindArray.concat(asset);
		}
	}
	return newAssetRemindArray.sort(compare('timestamp'));
};

class dynamicUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			typeNum: 0,
			assetRemindArray: [],
			riskRemindArray: [],
			assetObligorIdNum: 0,
			RingEchartsObj: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		const { AssetImportantReminderList, AssetImportantReminderObligorIdList } = nextProps;
		if (AssetImportantReminderList && Array.isArray(AssetImportantReminderList) && AssetImportantReminderList.length > 0) {
			newAssetRemindArray = [...AssetImportantReminderList];
			const newAssetImportantReminderObligorIdList = AssetImportantReminderObligorIdList.filter(i => i !== 0);
			const newAssetImportantReminderObligorIdListNum = new Set([...newAssetImportantReminderObligorIdList]).size;
			this.setState(() => ({
				assetRemindArray: AssetImportantReminderList,
				assetObligorIdNum: newAssetImportantReminderObligorIdListNum,
			}));
		}
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
			typeNum, assetRemindArray, RingEchartsObj, assetObligorIdNum, riskRemindArray
		} = this.state;
		const { assetPropsData, riskPropsData } = this.props;
		const hasAssetPropsData = Object.keys(assetPropsData).length !== 0;
		const hasRiskPropsData = Object.keys(riskPropsData).length !== 0;
		const lessAssetNum = hasAssetPropsData && assetPropsData.totalNum < 3 && assetPropsData.totalNum > 0;
		const lessRiskNum = hasRiskPropsData && riskPropsData.totalNum < 3 && riskPropsData.totalNum > 0;
		const assetPropsDataArray = hasAssetPropsData && assetPropsData.assetDataArray;
		const riskPropsDataArray = hasRiskPropsData && riskPropsData.riskDataArray;

		const newAssetArr = [...assetRemindArray];
		let assetArr = (newAssetArr.sort(compare('timestamp')));

		const params = {
			getDynamicType: this.getDynamicType,
			assetTotalNum: hasAssetPropsData ? assetPropsData.totalNum : 0,
			riskTotalNum: hasRiskPropsData ? riskPropsData.totalNum : 0,
		};
		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			setRemindArray: this.setRemindArray,
			Data: assetPropsDataArray,
			assetRemindArray,
		};
		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: riskPropsDataArray,
		};

		if (Object.keys(RingEchartsObj).length !== 0) {
			const { selected, name } = RingEchartsObj;
			assetArr = assetArray(selected, name, assetRemindArray);
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
								<DetailItem data={riskRemindArray} />
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
