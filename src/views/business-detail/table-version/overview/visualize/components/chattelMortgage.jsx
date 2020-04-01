import React from 'react';
import { overviewMortgage, businessOverviewMortgage } from 'api/detail/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import './style.scss';

const roleDistributionsType = (value) => {
	switch (value) {
	case 1: return '抵押物所有人';
	case 2: return '抵押权人';
	default: return '-';
	}
};

export default class ChattelMortgage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			roleDistributions: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, getAssetProfile, portrait,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewMortgage : overviewMortgage;
		this.setState({ loading: true });
		api(params).then((res) => {
			if (res.code === 200) {
				const { roleDistributions } = res.data;
				const timeLineData = res.data.yearDistributions;
				const allNum = getCount(roleDistributions) + getCount(timeLineData);
				getAssetProfile(allNum, 'ChattelMortgage');
				this.setState({
					loading: false,
					roleDistributions,
					timeLineData, // 年份分布
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const {
			timeLineData, loading, roleDistributions,
		} = this.state;
		return (
			<div>
				{
					getCount(roleDistributions) + getCount(timeLineData) > 0
					&& (
					<Spin visible={loading}>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{`${getCount(roleDistributions)} 条`}
							</span>
							<span className="container-title-name"> 动产抵押信息</span>
						</div>
						<div className="overview-container-content">
							{getCount(roleDistributions) > 0 && (
								<div>
									<div className="yc-timeline-title">角色分布</div>
									{
									roleDistributions && roleDistributions.filter(item => item.count > 0).map(item => (
										<div className="yc-role-container">
											<span className="yc-role-icon" />
											<div className="yc-role-name">
												{roleDistributionsType(item.type)}
											</div>
											<div className="yc-role-num">
												{`${item.count} 条`}
											</div>
											<div className="yc-role-description">{`(其中${item.invalidCount}条质押登记状态为无效)`}</div>
											<div className="yc-role-warning">{`*当前有效担保债权数额${item.amount}元`}</div>
										</div>
									))
								}
								</div>
							)}
							{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="ChattelMortgage" />}
						</div>
					</Spin>
					)}
			</div>
		);
	}
}
