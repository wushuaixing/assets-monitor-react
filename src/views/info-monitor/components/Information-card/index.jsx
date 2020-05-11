import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import {
	riskChangeCount, riskPunishmentCount, riskEpbCount, riskIllegalCount, riskAbnormalCount, riskTaxCount,
} from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Operation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			riskChangeNum: 0,
			riskPunishmentNum: 0,
			riskEpbNum: 0,
			riskIllegalNum: 0,
			riskAbnormalNum: 0,
			riskTaxNum: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		const {
			rule: {
				jyfxgsbg, jyfxhbcf, jyfxjyyc, jyfxsswf, jyfxxzcf, jyfxyzwf,
			},
		} = this.props;
		// console.log(jyfxgsbg, jyfxhbcf, jyfxjyyc, jyfxsswf, jyfxxzcf, jyfxyzwf);
		const params = {
			isRead: 0,
		};
		if (jyfxgsbg) {
			riskChangeCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskChangeNum: res.data,
					});
				}
			});
		}
		if (jyfxxzcf) {
			riskPunishmentCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskPunishmentNum: res.data,
					});
				}
			});
		}

		if (jyfxhbcf) {
			riskEpbCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskEpbNum: res.data,
					});
				}
			});
		}

		if (jyfxyzwf) {
			riskIllegalCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskIllegalNum: res.data,
					});
				}
			});
		}

		if (jyfxjyyc) {
			riskAbnormalCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskAbnormalNum: res.data,
					});
				}
			});
		}

		if (jyfxsswf) {
			riskTaxCount(params).then((res) => {
				if (res.code === 200) {
					this.setState({
						riskTaxNum: res.data,
					});
				}
			});
		}
	};

	render() {
		const {
			url, riskPropsData, riskPropsData: {
				dataSource, totalCount, gmtUpdate,
			},
		} = this.props;

		const {
			riskChangeNum, riskPunishmentNum, riskEpbNum, riskIllegalNum, riskAbnormalNum, riskTaxNum,
		} = this.state;
		const unReadCount = riskChangeNum + riskPunishmentNum + riskEpbNum + riskIllegalNum + riskAbnormalNum + riskTaxNum;
		const newData = dataSource && dataSource.length > 0 && dataSource.filter((i => i.count !== null));
		if (newData && newData.length === 0) {
			navigate('/');
			window.location.reload();
		}
		return (
			<Card
				Risk
				IconType="operation-risk"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="经营风险"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(riskPropsData).length !== 0 && (
					<Row gutter={24} className="risk-operation-container">
						{
							newData.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-operation-container-card">
													{item.typeName}
													：
													<span className={`risk-operation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-operation-container-card">
													{item.typeName}
													：
													<span className={`risk-operation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count}</span>
													条
												</div>
											</Col>
										)
									}
								</div>
							))
						}
					</Row>
				)}
			</Card>
		);
	}
}
