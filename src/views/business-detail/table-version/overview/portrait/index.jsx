import React from 'react';
import AssociatedBusiness from './associated-business';
import AssetProfile from './asset-profile';
import BusinessRelated from './business-related';
import RiskInformation from './risk-information';
import {
	getQueryByName,
} from '@/utils';
import {
	obligorList, // 债务人列表
	businessList, // 业务列表
} from '@/utils/api/detail/overview';
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
		const obligorId = getQueryByName(window.location.href, 'id') || 347917;
		const businessId = getQueryByName(window.location.href, 'id') || 22584;
		const { portrait } = this.props;
		const params = portrait === 'business' ? { businessId } : { obligorId };
		this.getData(params, portrait);
	}

	getData = (value, portrait) => {
		const params = { ...value };
		const api = portrait === 'business' ? businessList : obligorList;
		this.setState({ loading: true });
		// 业务列表信息
		api(params).then((res) => {
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
		// const isBusinessData = Array.isArray(businessData) && businessData.length > 0; // 业务列表
		return (
			<div className="yc-portrait-container">
				{/* 关联业务 */}
				{
				 portrait && portrait === 'business' ? <BusinessRelated dataSource={businessData} loading={loading} /> : <AssociatedBusiness dataSource={businessData} loading={loading} />
				}
				{/* 资产概况 */}
				<AssetProfile portrait={portrait} loading={loading} />
				{/* 风险信息 */}
				<RiskInformation portrait={portrait} loading={loading} />
			</div>
		);
	}
}
