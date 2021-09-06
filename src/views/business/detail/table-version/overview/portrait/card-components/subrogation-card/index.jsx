import React from 'react';
import { navigateDetail } from '@/utils';
import { Col, Row } from 'antd';
import Card from '../card';
import './style.scss';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				 gmtCreate, allNum, obligorTotal, courtNotice, judgment, trial, bankruptcyCount,
			},
		} = this.props;
		return (
			<React.Fragment>
				{
					allNum > 0 ? (
						<Card
							IconType="subrogation"
							obligorTotal={obligorTotal}
							IconColor={{ color: '#948BFF' }}
							portrait={portrait}
							count={allNum}
							gmtCreate={gmtCreate}
							obligorName="人匹配到代位权信息"
							customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
							onClick={() => navigateDetail('e-assets-subrogation')}
							text={portrait === 'debtor_personal' ? '代位权-裁判文书' : '代位权'}
							styleName="subrogation-card"
						>
							<Row gutter={24} className="business-intangible-container">
								<Col className="gutter-row" span={12}>
									<div className="business-intangible-container-card">
										<span className="business-intangible-container-card-name">立案信息</span>
										：
										<span className="business-intangible-container-card-num">{trial}</span>
										条
									</div>
								</Col>
								<Col className="gutter-row" span={12}>
									<div className="business-intangible-container-card">
										<span className="business-intangible-container-card-name">开庭公告</span>
										：
										<span className="business-intangible-container-card-num">{courtNotice}</span>
										条
									</div>
								</Col>
								<Col className="gutter-row" span={12}>
									<div className="business-intangible-container-card">
										<span className="business-intangible-container-card-name">裁判文书</span>
										：
										<span className="business-intangible-container-card-num">{judgment}</span>
										条
									</div>
								</Col>
								<Col className="gutter-row" span={12}>
									<div className="business-intangible-container-card">
										<span className="business-intangible-container-card-name">破产代位</span>
										：
										<span className="business-intangible-container-card-num">{bankruptcyCount}</span>
										条
									</div>
								</Col>
							</Row>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
