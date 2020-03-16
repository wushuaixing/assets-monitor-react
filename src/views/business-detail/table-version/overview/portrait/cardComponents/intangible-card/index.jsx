import React from 'react';
import { overviewIntangible } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import getCount from '@/views/portrait-inquiry/common/getCount';
import intangibleImg from '@/assets/img/business/intangibleCard.png';
import Card from '../card';
import matching from '@/assets/img/business/matching.png';
import './style.scss';

export default class Intangible extends React.Component {
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
		const obligorId = getQueryByName(window.location.href, 'id') || 326740;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewIntangible(params).then((res) => {
			if (res.code === 200) {
				const dataSource = [];
				dataSource.push({ count: res.data.construct, typeName: '建造资质' });
				dataSource.push({ count: res.data.emission, typeName: '排污权发证' });
				dataSource.push({ count: res.data.mining, typeName: '矿业权发证' });
				dataSource.push({ count: res.data.trademark, typeName: '商标专利' });
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
		// ];
		return (
			<span>
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
								{isBusiness ? (
									<div className="card-content-role-itemLeft">
										<img className="card-left-img" src={matching} alt="" />
										<span style={{ marginRight: '2px', fontWeight: 'bold' }}>3</span>
									人匹配到无形资产
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
						</Card>
					) : null
				}
			</span>

		);
	}
}
