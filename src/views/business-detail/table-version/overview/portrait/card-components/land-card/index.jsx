import React from 'react';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import landImg from '@/assets/img/business/landCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import './style.scss';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNavigation = () => {
		navigate('/business/detail/info/102?eleID=e-assets-land');
	};

	render() {
		const {
			portrait, dataSource: {
				dataSource, dataSourceNum, gmtCreate, obligorTotal,
			},
		} = this.props;
		const isBusiness = portrait && portrait === 'business';
		const isArray = dataSource && Array.isArray((dataSource)) && dataSource.length > 0;
		const newDataSource = isArray && dataSource.filter(i => i.count > 0);
		return (
			<React.Fragment>
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
								{isBusiness && obligorTotal ? (
									<div className="card-content-role-itemLeft">
										<img className="card-left-img" src={matching} alt="" />
										<span className="portrait-card-num">{obligorTotal}</span>
									人匹配到无形资产
									</div>
								) : null}
								{
								newDataSource && newDataSource.map(item => (
									<div
										className="card-content-role-itemLeft"
										key={item.type}
										style={newDataSource[0].amount > 10000000000 || (newDataSource[1] && newDataSource[1].amount > 10000000000)
											? { position: 'relative', left: '-20px' } : null}
									>
										<span className="card-content-role-text">{item.typeName}</span>
										<span className="card-content-role-info">：</span>
										<span className="card-content-role-num">
											<span className="portrait-card-num">{item.count}</span>
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
			</React.Fragment>
		);
	}
}