import React from 'react';
import { overviewRisk } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';
import informationImg from '@/assets/img/business/InformationCard.png';
import Card from '../card';
import './style.scss';
import matching from '@/assets/img/business/matching.png';

export default class Information extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			dataSourceNum: 0,
			gmtCreate: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 324155;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewRisk(params).then((res) => {
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.abnormal, typeName: '经营异常' });
				dataSource.push({ count: res.data.tax, typeName: '税收违法' });
				dataSource.push({ count: res.data.punishment, typeName: '行政处罚' });
				dataSource.push({ count: res.data.change, typeName: '工商变更' });
				dataSource.push({ count: res.data.illegal, typeName: '严重违法' });
				dataSource.push({ count: res.data.epb, typeName: '环保处罚' });
				const dataSourceNum = getCount(dataSource);
				this.setState({
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
				});
			}
		}).catch(() => {
			this.setState({
				dataSource: [],
			});
		});
	};

	render() {
		const { dataSource, dataSourceNum, gmtCreate } = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		// const newDataSource = [
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// 	{ count: 1, type: -1, typeName: '未知角色' },
		// ];
		return (
			<span>
				{dataSourceNum > 0
					? (
						<Card
							imgCard={informationImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
							text="经营风险"
							styleName="information-card"
						>
							<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
								<div className="card-content-role">
									{isBusiness ? (
										<div className="card-content-role-itemLeft">
											<img className="card-left-img" src={matching} alt="" />
											<span style={{ marginRight: '2px', fontWeight: 'bold' }}>3</span>
											人匹配到资产拍卖信息
										</div>
									) : null}
									{
										newDataSource && newDataSource.map((item, index) => {
											if (index > 2) {
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
