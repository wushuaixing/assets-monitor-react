import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Intangible extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const {
			url, intangiblePropsData, intangiblePropsData: {
				intangibleArray, totalCount, loading, gmtUpdate,
			},
		} = this.props;

		return (
			<Card
				IconType="intangible"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#FFC531' }}
				customStyle={hasCountStyle}
				text="无形资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
			>
				{Object.keys(intangiblePropsData).length !== 0 && (
					<Row gutter={24} className="risk-intangible-container">
						{
							intangibleArray.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className="risk-intangible-container-card-num">{item.count || 0}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className="risk-intangible-container-card-num">{item.count || 0}</span>
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
