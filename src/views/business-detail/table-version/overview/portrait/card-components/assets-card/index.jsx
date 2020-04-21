import React from 'react';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import img from '@/assets/img/business/assestCard.png';
import assetsPrice from '@/assets/img/business/assets_price.png';
import Card from '../card';
import { generateUrlWithParams, getHrefQuery } from '@/utils';
import './style.scss';


export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick = () => {
		const id = getHrefQuery('id');
		if (id) {
			navigate(generateUrlWithParams('/business/debtor/detail/info/102', {
				id,
				ele: 'e-assets-auction',
			}));
		}
	};

	newRoleDistributions = () => {
		const { dataSource: { auctionPropsData } } = this.props;
		const unKnownRoleArray = [];
		const newArray = [];
		auctionPropsData.roleDistributions.forEach((item) => {
			if (item.type === -1) {
				unKnownRoleArray.push(item);
			}
			if (item.type !== -1) {
				newArray.push(item);
			}
		});
		return [...newArray, ...unKnownRoleArray];
	};

	render() {
		const { portrait, dataSource: { auctionPropsData } } = this.props;
		const roleDistributions = auctionPropsData && Array.isArray((auctionPropsData.roleDistributions)) && auctionPropsData.roleDistributions.length > 0;

		return (
			<React.Fragment>
				{
					auctionPropsData.count > 0
						? (
							<Card
								portrait={portrait}
								imgCard={img}
								obligorTotal={auctionPropsData.obligorTotal}
								count={auctionPropsData.count}
								gmtCreate={auctionPropsData.gmtCreate}
								customStyle={portrait === 'business' ? { width: '754px', height: '140px', marginBottom: '20px' } : { width: '754px', height: '120px', marginBottom: '20px' }}
								text="资产拍卖"
								onClick={this.handleClick}
								styleName="assets-card"
							>
								<div className="card-content" style={portrait === 'business' ? { padding: '20px 0' } : {}} onClick={this.handleClick}>
									<div className="card-content-price">
										<img className="card-content-left-img" src={assetsPrice} alt="" />
										<div>相关资产价值约</div>
										<div>
											<span style={{ color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>{auctionPropsData.assetTotal ? toThousands(auctionPropsData.assetTotal) : '-'}</span>
											元
										</div>
									</div>
									<div className="card-content-role">
										{
											roleDistributions && this.newRoleDistributions().map((item, index) => {
												if (index > 1) {
													if (index > 3) {
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
														<div className="card-content-role-itemMiddle">
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
							</Card>
						) : null
				}
			</React.Fragment>
		);
	}
}
