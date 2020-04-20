import React from 'react';
import involvedImg from '@/assets/img/business/InvolvedCard.png';
import Card from '../card';
import './style.scss';

export default class Involved extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			portrait, dataSource: {
				dataSource, dataSourceNum, gmtCreate, obligorTotal, otherCase, execute, restore,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<React.Fragment>
				{dataSourceNum > 0 ? (
					<Card
						imgCard={involvedImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
						text={portrait === 'debtor_personal' ? '涉诉信息-裁判文书' : '涉诉信息'}
						styleName="Involved-card"
					>
						<div className="card-content" style={isBusiness ? { height: '20px' } : {}}>
							<div className="card-content-role">
								{
									isBusiness
										? (
											<div>
												<span style={{ fontSize: '12px', color: '#4E5566', paddingRight: '5px' }}>涉诉风险债务人：</span>
												<span className="portrait-card-num">{obligorTotal}</span>
												名
											</div>
										) : (portrait === 'debtor_personal' ? (
											<div>
												{execute > 0 ? (
													<div className="card-content-role-itemLeft">
														<span className="card-content-role-text">执行案件</span>
														<span className="card-content-role-info">：</span>
														<span className="card-content-role-num">
															<span className="portrait-card-num">{execute}</span>
															条
														</span>

														{restore > 0 ? (
															<div className="card-content-left-arrow">
																<div className="card-content-popover-content">
																	{restore}
																	{' '}
																笔执恢案件
																</div>
															</div>
														) : null}

													</div>
												) : null}

												{otherCase > 0 ? (
													<div className="card-content-role-itemLeft">
														<span className="card-content-role-text">其他案件</span>
														<span className="card-content-role-info">：</span>
														<span className="card-content-role-num">

															<span className="portrait-card-num">{otherCase}</span>
															条
														</span>
													</div>
												) : null}
											</div>
										) : newDataSource && newDataSource.map(item => (
											<div className="card-content-role-itemLeft" key={item.type}>
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="card-content-role-num">
													<span className="portrait-card-num">{item.count}</span>
													笔
												</span>
											</div>
										)))
								}
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
