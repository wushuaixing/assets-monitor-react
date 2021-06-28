import React from 'react';
import { execEndCaseRisk } from '@/utils/api/professional-work/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import './style.scss';

export default class LimitHeight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			obligorId, getAssetProfile,
		} = this.props;
		this.setState({
			loading: true,
		});
		const params = { obligorId, type: 2 };
		const api = execEndCaseRisk;
		api(params).then((res) => {
			if (res.code === 200) {
				console.log('unblock === ', res);
				const timeLineData = res.data.yearDistributions;
				const allNum = getCount(timeLineData);
				getAssetProfile(allNum, 'LegalCase');
				this.setState({
					loading: false,
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
		const { timeLineData, loading } = this.state;
		return (
			<div>
				{
					getCount(timeLineData) > 0
					&& (
						<Spin visible={loading}>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${getCount(timeLineData)} 条`}
								</span>
								<span className="container-title-name">终本文案</span>
							</div>
							<div className="overview-container-content-legalcase">
								<span className="overview-container-content-legalcase-item">
									执行标的总金额：
									<span className="overview-container-content-legalcase-bold">10,000,000</span>
									元
								</span>
								<span className="overview-container-content-legalcase-item">
									未履行总金额：
									<span className="overview-container-content-legalcase-bold">10,000,000</span>
									元
								</span>
							</div>
							<div className="overview-container-content">
								{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="Limit" />}
							</div>
						</Spin>
					)}
			</div>
		);
	}
}
