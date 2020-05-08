import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Operation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			operationArray: [
				{ name: '经营异常', num: 12 },
				{ name: '工商变更', num: 12 },
				{ name: '税收违法', num: 12 },
				{ name: '严重违法', num: 12 },
				{ name: '行政处罚', num: 12 },
				{ name: '环保处罚', num: 12 },
			],
			totalCount: 72,
		};
	}

	render() {
		const { url } = this.props;
		const { operationArray, totalCount } = this.state;
		return (
			<Card
				Risk
				IconType="operation-risk"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB5A5C' }}
				customStyle={hasCountStyle}
				text="经营风险"
				totalCount={totalCount}
			>
				<Row gutter={24} className="risk-operation-container">
					{
						operationArray.map((item, index) => (
							<div>
								{
									index > 2 ? (
										<Col className="gutter-row" span={12}>
											<div className="risk-operation-container-card">
												{item.name}
												：
												<span className="risk-operation-container-card-num">{item.num}</span>
												条
											</div>
										</Col>
									) : (
										<Col className="gutter-row" span={12}>
											<div className="risk-operation-container-card">
												{item.name}
												：
												<span className="risk-operation-container-card-num">{item.num}</span>
												条
											</div>
										</Col>
									)
								}
							</div>

						))
					}
				</Row>
			</Card>
		);
	}
}
