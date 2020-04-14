import React from 'react';
import {
	overviewBankruptcy, // 债务人破产重组
	businessOverviewBankruptcy, // 业务破产重组
	overviewLitigation, // 债务人涉诉信息
	businessOverviewLitigation, // 业务涉诉
	overviewRisk, // 债务人经营风险
	businessOverviewRisk, // 业务经营风险
	overviewDishonest, // 债务人失信
	businessOverviewDishonest, // 业务失信
} from '@/utils/api/professional-work/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { promiseAll } from '@/utils/promise';
import getCount from '@/views/portrait-inquiry/common/getCount';
import Bankruptcy from '../card-components/Bankruptcy-card';
import Involved from '../card-components/Involved-card';
import Information from '../card-components/Information-card';
import Break from '../card-components/break-card';
import './style.scss';

const constantNumber = 99999999; // 默认值
const apiType = (value, portrait) => {
	switch (value) {
	case 'Bankruptcy': return portrait === 'business' ? businessOverviewBankruptcy : overviewBankruptcy;
	case 'Dishonest': return portrait === 'business' ? businessOverviewDishonest : overviewDishonest;
	case 'Litigation': return portrait === 'business' ? businessOverviewLitigation : overviewLitigation;
	case 'Risk': return portrait === 'business' ? businessOverviewRisk : overviewRisk;
	default: return {};
	}
};
export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			bankruptcyPropsData: {}, // 破产重组
			dishonestPropsData: {}, // 失信记录
			litigationPropsData: {}, // 涉诉信息
			riskPropsData: {}, // 经营风险
		};
	}

	componentDidMount() {
		const urlId = getQueryByName(window.location.href, 'id') || constantNumber;
		const obligorId = urlId;
		const businessId = urlId;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId, type: 1 } : { obligorId, type: 1 };
		this.setState(() => ({ isLoading: true }));
		// 风险卡片列表
		this.getData(params, portrait);
	}

	getData = (value, portrait) => {
		const params = { ...value };
		const promiseArray = [];
		promiseArray.push(apiType('Bankruptcy', portrait)(params)); // 破产重组
		promiseArray.push(apiType('Dishonest', portrait)(params)); // 失信记录
		promiseArray.push(apiType('Litigation', portrait)(params)); // 涉诉信息
		promiseArray.push(apiType('Risk', portrait)(params)); // 经营风险
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((values) => {
			const isArray = Array.isArray(values) && values.length > 0;
			this.setState({ isLoading: false });
			// 破产重组
			this.getBankruptcyData(isArray, values);
			// 失信记录
			this.getDishonestData(isArray, values);
			// 涉诉信息
			this.getLitigationData(isArray, values);
			// 经营风险
			this.getRiskData(isArray, values);

			console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	// 破产重组
	getBankruptcyData = (isArray, values) => {
		const res = values[0];
		if (isArray && res && res.code === 200) {
			const { bankruptcy, gmtCreate } = res.data;
			const bankruptcyPropsData = {
				bankruptcyNum: bankruptcy,
				gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				bankruptcyPropsData,
			}));
		}
	};

	// 失信记录
	getDishonestData = (isArray, values) => {
		const res = values[1];
		console.log(res, 333);
		if (isArray && res && res.code === 200) {
			const { remove, gmtCreate, included } = res.data;

			const dataSource = [];
			dataSource.push({ count: included, typeName: '列入' });
			dataSource.push({ count: remove, typeName: '已移除' });
			const dataSourceNum = getCount(dataSource);
			const dishonestPropsData = {
				removeNum: remove, // 移除数量
				includedNum: included, // 列入数量
				dataSource,
				gmtCreate,
				dataSourceNum,
				dishonestStatusArray: res.data.obligorStatusList,
			};
			this.setState(() => ({
				dishonestPropsData,
			}));
		}
	};

	// 涉诉信息
	getLitigationData = (isArray, values) => {
		const res = values[2];
		if (isArray && res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.trial, typeName: '立案' });
			dataSource.push({ count: res.data.courtNotice, typeName: '开庭' });
			dataSource.push({ count: res.data.judgment, typeName: '裁判文书' });
			const dataSourceNum = getCount(dataSource);
			const litigationPropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				litigationPropsData,
			}));
		}
	};

	// 经营风险
	getRiskData = (isArray, values) => {
		const res = values[3];
		if (isArray && res && res.code === 200) {
			const dataSource = [];
			dataSource.push({ count: res.data.abnormal, typeName: '经营异常' });
			dataSource.push({ count: res.data.tax, typeName: '税收违法' });
			dataSource.push({ count: res.data.punishment, typeName: '行政处罚' });
			// dataSource.push({ count: res.data.change, typeName: '工商变更' });
			dataSource.push({ count: res.data.illegal, typeName: '严重违法' });
			dataSource.push({ count: res.data.epb, typeName: '环保处罚' });
			const dataSourceNum = getCount(dataSource);
			const riskPropsData = {
				dataSource,
				dataSourceNum,
				gmtCreate: res.data.gmtCreate,
				obligorTotal: res.data.obligorTotal || null,
			};
			this.setState(() => ({
				riskPropsData,
			}));
		}
	};

	// 判断内部是否存数据
	isHasValue = () => {
		const {
			bankruptcyPropsData, litigationPropsData, riskPropsData, dishonestPropsData,
		} = this.state;
		return bankruptcyPropsData.bankruptcyNum > 0 || litigationPropsData.dataSourceNum > 0 || riskPropsData.dataSourceNum > 0;
	};

	render() {
		const { portrait } = this.props;
		const {
			bankruptcyPropsData, dishonestPropsData, litigationPropsData, riskPropsData, isLoading,
		} = this.state;
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
								{/* 失信记录 */}
								<Break portrait={portrait} dataSource={dishonestPropsData} />
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
