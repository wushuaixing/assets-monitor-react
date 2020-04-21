import React from 'react';
import { navigate } from '@reach/router';
import { toThousands } from '@/utils/changeTime';
import chattelMortgageImg from '@/assets/img/business/chattelMortgageCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import { generateUrlWithParams, getHrefQuery } from '@/utils';
import './style.scss';


export default class ChattelMortgage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick = () => {
		const id = getHrefQuery('id');
		if (id) {
			navigate(generateUrlWithParams('/business/debtor/detail/info/102', {
				id,
				ele: 'e-assets-chattel',
			}));
		}
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
						onClick={this.handleClick}
						imgCard={chattelMortgageImg}
						count={dataSourceNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
						text="动产抵押"
						styleName="chattelMortgage-card"
					>
						<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
							<div className="card-content-role">
								{isBusiness && obligorTotal ? (
									<div className="card-content-role-itemLeft">
										<img className="card-left-img" src={matching} alt="" />
										<span className="portrait-card-num">{obligorTotal}</span>
										人匹配到动产抵押信息
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
											<span className="card-content-role-text">{item.type === 1 ? '抵押物所有人' : '抵押权人'}</span>
											<span className="card-content-role-info">：</span>
											<span className="card-content-role-num">
												<span className="portrait-card-num">{item.count}</span>
												条
											</span>
											{item.type === 2 && item.amount ? (
												<span style={{ paddingLeft: '5px' }}>
													(涉及债权额
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
