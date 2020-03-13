import React from 'react';
import { overviewBidding } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import biddingImg from '@/assets/img/business/BiddingCard.png';
import Card from '../card';
import './style.scss';

export default class Bidding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			biddingNum: 0,
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
		overviewBidding(params).then((res) => {
			if (res.code === 200) {
				const { bidding, gmtCreate } = res.data;
				this.setState({
					biddingNum: bidding,
					gmtCreate,
				});
			}
		}).catch(() => {});
	};

	render() {
		const { biddingNum, gmtCreate } = this.state;
		return (
			<span>
				{biddingNum > 0 ? (
					<Card
						imgCard={biddingImg}
						count={biddingNum}
						gmtCreate={gmtCreate}
						customStyle={{ width: '366px', height: '120px', marginBottom: '20px' }}
						text="招投标"
						styleName="bidding-card"
					>
						<div className="card-content">
							<div className="card-content-role">
								{biddingNum}
								<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '5px' }}>条相关匹配信息，请核实</span>
							</div>
						</div>
					</Card>
				) : null}
			</span>

		);
	}
}
