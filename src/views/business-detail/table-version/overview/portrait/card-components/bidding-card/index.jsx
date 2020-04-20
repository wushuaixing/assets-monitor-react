import React from 'react';
import biddingImg from '@/assets/img/business/BiddingCard.png';
import matching from '@/assets/img/business/matching.png';
import Card from '../card';
import './style.scss';

export default class Bidding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { portrait, dataSource: { biddingNum, gmtCreate, obligorTotal } } = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<React.Fragment>
				{biddingNum > 0 ? (
					<Card
						imgCard={biddingImg}
						count={biddingNum}
						gmtCreate={gmtCreate}
						customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
						text="招投标"
						styleName="bidding-card"
					>
						<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
							{isBusiness && obligorTotal ? (
								<div className="card-content-role-itemLeft">
									<img className="card-left-img" src={matching} alt="" />
									<span className="portrait-card-num">{obligorTotal}</span>
									人匹配到招投标信息
								</div>
							) : null}
							<div className="card-content-role">
								<span className="portrait-card-num">{biddingNum}</span>
								<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '3px' }}>条相关匹配信息，请核实</span>
							</div>
						</div>
					</Card>
				) : null}
			</React.Fragment>
		);
	}
}
