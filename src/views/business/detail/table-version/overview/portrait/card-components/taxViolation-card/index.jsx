import React from 'react';
import taxImg from '@/assets/img/business/taxCard.png';
import Card from '../card';
import './style.scss';
import { navigateDetailRisk } from '@/utils';

export default class Tax extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			 dataSource: {
				roleDistributions, dataSourceNum, gmtCreate,
			},
		} = this.props;
		const isArray = roleDistributions && Array.isArray((roleDistributions)) && roleDistributions.length > 0;
		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							imgCard={taxImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							customStyle={{ width: '366px', height: '140px', marginBottom: '20px' }}
							text="税收违法"
							onClick={() => navigateDetailRisk('e-manage-tax')}
							styleName="taxViolation-card"
						>
							<div className="card-content">
								<div className="card-content-role">
									{
										isArray && roleDistributions.map(item => (
											<div className="card-content-role-itemLeft">
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="card-content-role-num">
													<span className="portrait-card-num">{item.count}</span>
														条
												</span>
											</div>
										))
									}
								</div>
							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
