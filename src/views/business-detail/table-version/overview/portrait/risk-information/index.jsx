import React from 'react';
import {
	overviewBankruptcy, // 债务人破产重组
	businessOverviewBankruptcy, // 业务破产重组
	overviewLitigation, // 债务人涉诉信息
	businessOverviewLitigation, // 业务涉诉
	overviewRisk, // 债务人经营风险
	businessOverviewRisk, // 业务经营风险
} from 'api/detail/overview';
import { Spin } from '@/common';
import Bankruptcy from '../cardComponents/Bankruptcy-card';
import Involved from '../cardComponents/Involved-card';
import Information from '../cardComponents/Information-card';
import './style.scss';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bankruptcyPropsData: {}, // 破产重组
			litigationPropsData: {}, // 涉诉信息
			riskPropsData: {}, // 经营风险
		};
	}

	componentDidMount() {
		const obligorId = getQueryByName(window.location.href, 'id') || 347917;
		const businessId = getQueryByName(window.location.href, 'id') || 22584;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 1 } : { obligorId, type: 1 };


		Promise.all([this.getBankruptcyData(params, portrait), this.getLitigationData(params, portrait), this.getRiskData(params, portrait)]).then((res) => {
			this.setState({
				bankruptcyPropsData: res[0],
				litigationPropsData: res[1],
				riskPropsData: res[2],
			});
		});
	}

	// 破产重组
	getBankruptcyData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewBankruptcy : overviewBankruptcy;
		return api(params).then((res) => {
			let bankruptcyPropsData = {};
			if (res.code === 200) {
				const { bankruptcy, gmtCreate } = res.data;
				bankruptcyPropsData = {
					bankruptcyNum: bankruptcy,
					gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return bankruptcyPropsData;
		}).catch(() => { this.setState({ bankruptcyPropsData: {} }); });
	};

	// 涉诉信息
	getLitigationData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewLitigation : overviewLitigation;
		return api(params).then((res) => {
			let litigationPropsData = {};
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.trial, typeName: '立案' });
				dataSource.push({ count: res.data.courtNotice, typeName: '开庭' });
				dataSource.push({ count: res.data.judgment, typeName: '裁判文书' });
				const dataSourceNum = getCount(dataSource);
				litigationPropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return litigationPropsData;
		}).catch(() => { this.setState({ litigationPropsData: {} }); });
	};

	// 经营风险
	getRiskData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessOverviewRisk : overviewRisk;
		return api(params).then((res) => {
			let riskPropsData = {};
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.abnormal, typeName: '经营异常' });
				dataSource.push({ count: res.data.tax, typeName: '税收违法' });
				dataSource.push({ count: res.data.punishment, typeName: '行政处罚' });
				dataSource.push({ count: res.data.change, typeName: '工商变更' });
				dataSource.push({ count: res.data.illegal, typeName: '严重违法' });
				dataSource.push({ count: res.data.epb, typeName: '环保处罚' });
				const dataSourceNum = getCount(dataSource);
				riskPropsData = {
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
					obligorTotal: res.data.obligorTotal || null,
				};
			}
			return riskPropsData;
		}).catch(() => {
			this.setState({ riskPropsData: {} });
		});
	};

	// 判断对象是否为空
	isEmptyObject = () => {
		const {
			bankruptcyPropsData, litigationPropsData, riskPropsData,
		} = this.state;
		return Object.keys(bankruptcyPropsData).length === 0 && Object.keys(litigationPropsData).length === 0 && Object.keys(riskPropsData).length === 0;
	};

	// 判断内部是否存数据
	isHasValue = () => {
		const {
			bankruptcyPropsData, litigationPropsData, riskPropsData,
		} = this.state;
		return bankruptcyPropsData.bankruptcyNum > 0 || litigationPropsData.dataSourceNum > 0 || riskPropsData.dataSourceNum > 0;
	};

	render() {
		const { portrait } = this.props;
		const { bankruptcyPropsData, litigationPropsData, riskPropsData } = this.state;
		const isLoading = this.isEmptyObject();
		const isHasValue = this.isHasValue();
		return (
			<div>
				<Spin visible={isLoading}>
					{isHasValue ? (
						<div>
							<div className="overview-container-title" style={{ marginTop: '20px' }}>
								<div className="overview-left-item" />
								<span className="container-title-name">风险信息</span>
							</div>
							<div className="overview-container-cardContent">
								{/* 破产重组 */}
								<Bankruptcy dataSource={bankruptcyPropsData} portrait={portrait} />
								{/* 涉诉信息 */}
								<Involved dataSource={litigationPropsData} portrait={portrait} />
								{/* 经营风险 */}
								<Information dataSource={riskPropsData} portrait={portrait} />
							</div>
						</div>
					) : null}
				</Spin>

			</div>
		);
	}
}
