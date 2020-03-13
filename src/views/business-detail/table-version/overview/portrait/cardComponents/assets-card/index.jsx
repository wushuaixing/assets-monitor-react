import React from 'react';
import './style.scss';
import { overviewAuction } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
// import Card from
import { toThousands } from '@/utils/changeTime';
import Card from '../card';
import img from '@/assets/img/business/assestCard.png';
import assetsPrice from '@/assets/img/business/assets_price.png';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: {},
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 348229;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewAuction(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data,
					// businessData: res.data,
				});
			} else {
				// this.setState({ businessData: [] });
			}
		}).catch(() => {});
	};

	render() {
		const { dataSource } = this.state;
		const roleDistributions = dataSource && Array.isArray((dataSource.roleDistributions)) && dataSource.roleDistributions.length > 0;
		// dataSource.roleDistributions = [
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// ];
		return (
			<span>
				{
					dataSource.count > 0
						? (
							<Card
								imgCard={img}
								count={dataSource.count}
								gmtCreate={dataSource.gmtCreate}
								customStyle={{ width: '754px', height: '120px', marginBottom: '20px' }}
								text="资产拍卖"
								styleName="assets-card"
							>
								<div className="card-content">
									<div className="card-content-price">
										<img className="card-content-left-img" src={assetsPrice} alt="" />
										<div>相关资产价值约</div>
										<div>
											<span style={{ color: '#FB5A5C', fontSize: '16px', marginRight: '5px' }}>{dataSource.assetTotal ? toThousands(dataSource.assetTotal) : '-'}</span>
										元
										</div>
									</div>
									<div className="card-content-role">
										{
										roleDistributions && dataSource.roleDistributions.map((item, index) => {
											if (index > 1) {
												if (index > 3) {
													return (
														<div className="card-content-role-itemRight">
															<span className="card-content-role-text">{item.typeName}</span>
															<span className="card-content-role-info">：</span>
															<span className="card-content-role-num">
																{item.count}
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
															{item.count}
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
														{item.count}
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
			</span>
		);
	}
}
