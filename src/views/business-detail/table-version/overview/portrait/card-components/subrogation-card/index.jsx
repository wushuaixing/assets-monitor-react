import React from 'react';
import SubrogationImg from '@/assets/img/business/subCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import './style.scss';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick = () => {
		const { onClick } = this.props;
		if (onClick) { onClick(); }
	};

	render() {
		const {
			portrait, dataSource: {
				execute, gmtCreate, restore, allNum, otherCase, obligorTotal,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<React.Fragment>
				{
					allNum > 0 ? (
						<Card
							imgCard={SubrogationImg}
							count={allNum}
							gmtCreate={gmtCreate}
							customStyle={{ width: '366px', height: '140px', marginBottom: '20px' }}
							text={portrait === 'debtor_personal' ? '代位权-裁判文书' : '代位权'}
							styleName="subrogation-card"
						>
							<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
								<div className="card-content-role">
									{isBusiness && obligorTotal ? (
										<div className="card-content-role-itemLeft">
											<img className="card-left-img" src={matching} alt="" />
											<span className="portrait-card-num">{obligorTotal}</span>
											人匹配到代位权信息
										</div>
									) : null}
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
							</div>
						</Card>
					) : null
				}
			</React.Fragment>
		);
	}
}
