import React from 'react';
import AssociatedBusiness from './associated-business';
import AssetProfile from './asset-profile';
import RiskInformation from './risk-information';
import {
	getQueryByName,
} from '@/utils';
import { businessList } from '@/utils/api/detail/overview';
import './style.scss';

export default class Portrait extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			businessData: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 348229;
		const params = {
			obligorId,
		};
		// 业务列表信息
		businessList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					businessData: res.data,
				});
			} else {
				this.setState({ businessData: [] });
			}
		}).catch(() => {});
	};

	render() {
		const { businessData } = this.state;
		// const isbusinessData = Array.isArray(businessData) && businessData.length > 0; // 业务列表
		// console.log(businessData, isbusinessData);
		return (
			<div className="yc-portrait-container">
				{/* 关联业务 */}
				<AssociatedBusiness dataSource={businessData} />
				{/* 资产概况 */}
				<AssetProfile />
				{/* 风险信息 */}
				<RiskInformation />
			</div>
		);
	}
}
