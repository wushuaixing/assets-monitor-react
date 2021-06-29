import React from 'react';
import { execEndCaseRisk } from '@/utils/api/professional-work/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import { floatFormat } from '@/utils/format';
import './style.scss';

export default class LimitHeight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			execMoneyTotal: '',
			unExecMoneyTotal: '',
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
				const { unExecMoneyTotal, execMoneyTotal } = res.data;
				const allNum = getCount(timeLineData);
				getAssetProfile(allNum, 'LegalCase');
				this.setState({
					loading: false,
					execMoneyTotal,
					unExecMoneyTotal,
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
			timeLineData, loading, execMoneyTotal, unExecMoneyTotal,
		} = this.state;
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
								<span className="container-title-name">终本案件</span>
							</div>
							<div className="overview-container-content-legalcase">
								<span className="overview-container-content-legalcase-item">
									执行标的总金额：
									<span className="overview-container-content-legalcase-bold">{execMoneyTotal ? `${floatFormat(execMoneyTotal)}` : '--'}</span>
									<span>{execMoneyTotal ? '元' : ''}</span>
								</span>
								<span className="overview-container-content-legalcase-item">
									未履行总金额：
									<span className="overview-container-content-legalcase-bold">{unExecMoneyTotal ? `${floatFormat(unExecMoneyTotal)}` : '--'}</span>
									<span>{unExecMoneyTotal ? '元' : ''}</span>
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
