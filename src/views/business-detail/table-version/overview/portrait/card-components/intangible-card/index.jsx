import React from 'react';
import intangibleImg from '@/assets/img/business/intangibleCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import './style.scss';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				dataSource, dataSourceNum, gmtCreate, obligorTotal,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							imgCard={intangibleImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
							text="无形资产"
							styleName="intangible-card"
						>
							<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
								{isBusiness && obligorTotal ? (
									<div className="card-content-role-itemLeft">
										<img className="card-left-img" src={matching} alt="" />
										<span className="portrait-card-num">{obligorTotal}</span>
										人匹配到无形资产信息
									</div>
								) : null}
								{
									newDataSource && newDataSource.map((item, index) => {
										if (index > 1) {
											return (
												<div className="card-content-role-itemRight">
													<span className="card-content-role-text">{item.typeName}</span>
													<span className="card-content-role-info">：</span>
													<span className="card-content-role-num">
														<span className="portrait-card-num">{item.count}</span>
														条
													</span>
												</div>
											);
										}
										return (
											<div className="card-content-role-itemLeft">
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="card-content-role-num">
													<span className="portrait-card-num">{item.count}</span>
													条
												</span>
											</div>
										);
									})
								}
							</div>
						</Card>
					) : null
				}
			</React.Fragment>

		);
	}
}
