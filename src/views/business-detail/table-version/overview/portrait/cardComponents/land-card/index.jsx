import React from 'react';
import { overviewLand } from 'api/detail/overview';
import { navigate } from '@reach/router';
import { getQueryByName } from '@/utils';
import { toThousands } from '@/utils/changeTime';
import getCount from '@/views/portrait-inquiry/common/getCount';
import landImg from '@/assets/img/business/landCard.png';
import Card from '../card';
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
		const obligorId = getQueryByName(window.location.href, 'id') || 353121;
		const params = {
			obligorId,
			type: 1,
		};
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
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<span>
				{dataSourceNum > 0 ? (
					<Card
						imgCard={landImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={{ width: '366px', height: '120px', marginBottom: '20px' }}
						text="土地信息"
						styleName="land-card"
					>
						<div className="card-content" onClick={this.handleNavigation}>
							<div className="card-content-role">
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
