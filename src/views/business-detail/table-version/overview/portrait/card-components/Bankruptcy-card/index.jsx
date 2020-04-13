import React from 'react';
import bankruptcyImg from '@/assets/img/business/BankruptcyCard.png';
import Card from '../card';
import './style.scss';

export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { portrait, dataSource: { bankruptcyNum, gmtCreate, obligorTotal } } = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<React.Fragment>
				{bankruptcyNum > 0 ? (
					<Card
						imgCard={bankruptcyImg}
						count={bankruptcyNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '165px', marginBottom: '20px' } : { width: '366px', height: '140px', marginBottom: '20px' }}
						text="破产重组"
						styleName="bankruptcy-card"
					>
						<div className="card-content">
							<div className="card-content-role">
								{
									isBusiness ? (
										<div>
										破产/重整风险企业：
											<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '5px' }}>
												{obligorTotal}
												{' '}
												家
											</span>
										</div>
									) : (
										<div>
											{bankruptcyNum}
											<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '5px' }}>条破产重组风险信息</span>
										</div>
									)
								}
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
