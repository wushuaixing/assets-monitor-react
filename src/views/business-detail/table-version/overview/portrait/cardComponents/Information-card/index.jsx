import React from 'react';
import { overviewRisk } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';
import intangibleImg from '@/assets/img/business/intangibleCard.png';
import Card from '../card';
import './style.scss';

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
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<span>
				{dataSourceNum > 0
					? (
						<Card
							imgCard={intangibleImg}
							count={dataSourceNum}
							gmtCreate={gmtCreate}
							customStyle={{ width: '366px', height: '140px', marginBottom: '20px' }}
							text="经营风险"
							styleName="information-card"
						>
							<div className="card-content">
								<div className="card-content-role">
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
