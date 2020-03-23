import React from 'react';
import EquityPledgeImg from '@/assets/img/business/EquityPledgeCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import './style.scss';

export default class EquityPledge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

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
			<span>
				{dataSourceNum > 0 ? (
					<Card
						imgCard={EquityPledgeImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
						text="股权质押"
						styleName="equityPledge-card"
					>
						<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
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
										<div className="card-content-role-itemLeft" key={item.type}>
											<span className="card-content-role-text">{item.type === 1 ? '股权持有人' : '股权质权人'}</span>
											<span className="card-content-role-info">：</span>
											<span className="card-content-role-num">
												<span className="portrait-card-num">{item.count}</span>
												条
											</span>
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
