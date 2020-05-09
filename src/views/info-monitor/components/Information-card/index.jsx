import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Operation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			url, riskPropsData, riskPropsData: {
				dataSource, totalCount, gmtUpdate,
			},
		} = this.props;
		// console.log(dataSource);
		const newData = dataSource && dataSource.length > 0 && dataSource.filter((i => i.count !== null));
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
													<span className="risk-operation-container-card-num">{item.count}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-operation-container-card">
													{item.typeName}
													：
													<span className="risk-operation-container-card-num">{item.count}</span>
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
