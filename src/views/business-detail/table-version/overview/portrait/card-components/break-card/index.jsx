import React from 'react';
import breakImg from '@/assets/img/business/breakCard.png';
import Card from '../card';
import './style.scss';

export default class Break extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const {
			portrait, dataSource: {
				dataSource, gmtCreate, dishonestStatusArray, dataSourceNum,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		const isDishonest = dishonestStatusArray && dishonestStatusArray[0].dishonestStatus === 1;
		return (
			<React.Fragment>
				{dataSourceNum > 0
					? (
						<Card
							imgCard={breakImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
							text="失信记录"
							styleName="break-card"
						>
							{!isBusiness && (
							<div className="card-content">
								<div className="card-content-role">
									{
										<span style={{ fontSize: '12px' }}>
										当前失信状态：
											<span
												style={isDishonest ? { color: '#FB5A5C' } : { color: '#B2B8C9' }}
											>
												{isDishonest ? '已失信' : '曾失信'}
											</span>
										</span>
									}
									{
										newDataSource && newDataSource.map((item, index) => {
											if (index > 0) {
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
							</div>
							)}
							{isBusiness && (
								<div className="business-card-content">
									<div className="card-content-role">
										{
											newDataSource && newDataSource.map((item, index) => {
												console.log(item.typeName && item.typeName.length);
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
															{item.typeName && item.typeName.length > 4 ? '名' : '条'}
														</span>
													</div>
												);
											})
										}
									</div>
								</div>
							)}
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
