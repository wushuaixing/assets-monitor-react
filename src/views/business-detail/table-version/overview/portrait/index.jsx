import React from 'react';
import AssociatedBusiness from './associated-business';
import AssetProfile from './asset-profile';
import BusinessRelated from './business-related';
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
			loading: false,
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
		this.setState({ loading: true });
		// 业务列表信息
		businessList(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					businessData: res.data,
					loading: false,
				});
			} else {
				this.setState({ businessData: [] });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { businessData, loading } = this.state;
		const { portrait } = this.props;
		const isBusinessData = Array.isArray(businessData) && businessData.length > 0; // 业务列表
		return (
			<div className="yc-portrait-container">
				{/* 关联业务 */}
				{
					isBusinessData ? (portrait && portrait === 'business' ? <BusinessRelated dataSource={businessData} loading={loading} />
						: <AssociatedBusiness dataSource={businessData} loading={loading} />) : null
				}
				{/* 资产概况 */}
				<AssetProfile portrait={portrait} loading={loading} />
				{/* 风险信息 */}
				<RiskInformation portrait={portrait} loading={loading} />
			</div>
		);
	}
}
