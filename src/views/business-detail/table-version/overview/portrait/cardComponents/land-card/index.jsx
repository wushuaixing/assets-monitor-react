import React from 'react';
import { overviewLand, businessOverviewLand } from 'api/detail/overview';
import { navigate } from '@reach/router';
import { getQueryByName } from '@/utils';
import { toThousands } from '@/utils/changeTime';
import getCount from '@/views/portrait-inquiry/common/getCount';
import landImg from '@/assets/img/business/landCard.png';
import Card from '../card';
import matching from '@/assets/img/business/matching.png';
import './style.scss';

export default class Land extends React.Component {
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
		const id = getQueryByName(window.location.href, 'id') || 353121;
		// const { portrait } = this.props;
		const params = {
			obligorId: id,
			businessId: id,
			type: 1,
		};
		// const api = portrait === 'business' ? businessOverviewLand : overviewLand;
		// 业务列表信息
		overviewLand(params).then((res) => {
			if (res.code === 200) {
				const dataSource = res.data.roleDistributions;
				const dataSourceNum = getCount(dataSource);
				this.setState({
					dataSource,
					dataSourceNum,
					gmtCreate: res.data.gmtCreate,
				});
			}
		}).catch(() => { this.setState({ dataSource: [] }); });
	};

	handleNavigation = () => {
		navigate('/business/detail/info/102?eleID=e-assets-land');
	};

	render() {
		const { dataSource, dataSourceNum, gmtCreate } = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<span>
				{dataSourceNum > 0 ? (
					<Card
						imgCard={landImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
						text="土地信息"
						styleName="land-card"
					>
						<div className="card-content" onClick={this.handleNavigation} style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
							<div className="card-content-role">
								{isBusiness ? (
									<div className="card-content-role-itemLeft">
										<img className="card-left-img" src={matching} alt="" />
										<span style={{ marginRight: '2px', fontWeight: 'bold' }}>3</span>
									人匹配到无形资产
									</div>
								) : null}
								{
								newDataSource && newDataSource.map(item => (
									<div className="card-content-role-itemLeft" key={item.type} style={item.amount && item.amount > 100000000 ? { position: 'relative', left: '-20px' } : {}}>
										<span className="card-content-role-text">{item.typeName}</span>
										<span className="card-content-role-info">：</span>
										<span className="card-content-role-num">
											{item.count}
											条
										</span>
										{item.type === 1 && item.amount ? (
											<span style={{ paddingLeft: '5px' }}>
										(涉及土地价值
												<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(item.amount)}</span>
										元)
											</span>
										) : null }
										{item.type === 2 && item.amount ? (
											<span style={{ paddingLeft: '5px' }}>
										(涉及抵押额
												<span style={{ color: '#FB5A5C', padding: '0 5px' }}>{ toThousands(item.amount)}</span>
										元)
											</span>
										) : null}
									</div>
								))
							}
							</div>
						</div>
					</Card>
				) : null}
			</span>

		);
	}
}
