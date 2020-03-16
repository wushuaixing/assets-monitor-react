import React from 'react';
import { overviewBankruptcy } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import bankruptcyImg from '@/assets/img/business/BankruptcyCard.png';
import Card from '../card';
import './style.scss';

export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bankruptcyNum: 0,
			gmtCreate: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 319839;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewBankruptcy(params).then((res) => {
			if (res.code === 200) {
				const { bankruptcy, gmtCreate } = res.data;
				this.setState({
					bankruptcyNum: bankruptcy,
					gmtCreate,
				});
			}
		}).catch(() => {});
	};

	render() {
		const { bankruptcyNum, gmtCreate } = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<span>
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
								{bankruptcyNum}
								<span style={{ fontSize: '12px', color: '#4E5566', paddingLeft: '5px' }}>条破产重组风险信息</span>
							</div>
						</div>
					</Card>
				) : null}
			</span>

		);
	}
}
