import React, { PureComponent } from 'react';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import DetailItem from '../components/detail-item';
import './style.scss';

class sevenUpdate extends PureComponent {
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
		};
	}

	getDynamicType = (val) => {
		this.setState(() => ({
			typeNum: val,
		}));
	};

	render() {
		const { typeNum, assetData, riskData } = this.state;
		const params = {
			getDynamicType: this.getDynamicType,
		};

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
						<RingEcharts id="assetAuction" Data={assetData} />

						<div className="seven-update-content-title">
							<div className="seven-update-content-title-item" />
							<div className="seven-update-content-title-name">
								<span className="seven-update-content-title-num">66</span>
								名债务人有资产信息更新，以下为重要信息提醒
							</div>
						</div>
						<DetailItem />

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
								<span className="seven-update-content-title-num" style={{ paddingLeft: 0 }}>17</span>
								条风险参考信息
							</div>

							<RingEcharts id="assetAuction" Data={riskData} />

							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name">
									<span className="seven-update-content-title-num">60</span>
									名债务人有风险信息更新，以下为重要信息提醒
								</div>
							</div>
						</div>


					</div>
				)}
			</div>
		);
	}
}

export default sevenUpdate;
