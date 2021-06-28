import React from 'react';
import { execPersonRisk } from '@/utils/api/professional-work/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import { floatFormat } from '@/utils/format';
import './style.scss';

export default class Execute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			yearDistributions: [],
			totalExecMoney: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, getAssetProfile, portrait,
		} = this.props;
		this.setState({
			loading: true,
		});
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		// const api = execPersonRisk;
		execPersonRisk(params).then((res) => {
			if (res.code === 200) {
				const { yearDistributions, totalExecMoney } = res.data;
				const allNum = getCount(yearDistributions);
				getAssetProfile(allNum, 'Execute');
				this.setState({
					loading: false,
					yearDistributions, // 年份分布
					totalExecMoney,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { yearDistributions, loading, totalExecMoney } = this.state;
		return (
			<div>
				{
					getCount(yearDistributions) > 0
					&& (
						<Spin visible={loading}>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${getCount(yearDistributions)} 条`}
								</span>
								<span className="container-title-name">被执行信息</span>
							</div>
							<div className="overview-container-money">
								<span className="overview-container-money-moneyLeft">执行标的总金额：</span>
								<span className="overview-container-money-moneyRight">{totalExecMoney ? `${floatFormat(totalExecMoney)}` : '--'}</span>
								<span className="overview-container-money-moneyLeft">{totalExecMoney ? '元' : ''}</span>
							</div>
							<div className="overview-container-content">
								{getCount(yearDistributions) > 0 && <TimeLine title="年份分布" Data={yearDistributions} id="Limit" />}
							</div>
						</Spin>
					)}
			</div>
		);
	}
}
