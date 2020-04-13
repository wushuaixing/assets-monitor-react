import React from 'react';
import involvedImg from '@/assets/img/business/InvolvedCard.png';
import Card from '../card';
import './style.scss';

export default class Involved extends React.Component {
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
						imgCard={involvedImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
						text="涉诉信息"
						styleName="Involved-card"
					>
						<div className="card-content" style={isBusiness ? { height: '20px' } : {}}>
							<div className="card-content-role">
								{
									isBusiness
										? (
											<div>
												<span style={{ fontSize: '12px', color: '#4E5566', paddingRight: '5px' }}>涉诉风险债务人：</span>
												<span className="portrait-card-num">{obligorTotal}</span>
												名
											</div>
										) : newDataSource && newDataSource.map(item => (
											<div className="card-content-role-itemLeft" key={item.type}>
												<span className="card-content-role-text">{item.typeName}</span>
												<span className="card-content-role-info">：</span>
												<span className="card-content-role-num">
													<span className="portrait-card-num">{item.count}</span>
													笔
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
