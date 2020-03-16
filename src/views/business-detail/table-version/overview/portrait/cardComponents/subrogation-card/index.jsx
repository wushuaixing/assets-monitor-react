import React from 'react';
import { overviewSubrogation } from 'api/detail/overview';
import { getQueryByName } from '@/utils';
import SubrogationImg from '@/assets/img/business/subCard.png';
import Card from '../card';
import './style.scss';
import matching from '@/assets/img/business/matching.png';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restore: 0, // 执行案件中的执恢案件
			execute: 0, // 执行案件
			otherCase: 0, // 其他案件
			allNum: 0, // 总数
			gmtCreate: '',
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const obligorId = getQueryByName(window.location.href, 'id') || 348350;
		const params = {
			obligorId,
			type: 1,
		};
		// 业务列表信息
		overviewSubrogation(params).then((res) => {
			if (res.code === 200) {
				const {
					restore, execute, trial, judgment, courtNotice, gmtCreate,
				} = res.data;
				const allNum = trial + judgment + courtNotice;
				const otherCase = (trial + judgment + courtNotice) - execute;
				this.setState({
					restore,
					execute,
					allNum,
					otherCase,
					gmtCreate,
				});
			}
		}).catch();
	};

	render() {
		const {
			execute, gmtCreate, restore, allNum, otherCase,
		} = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait && portrait === 'business';
		return (
			<span>
				{
					allNum > 0 ? (
						<Card
							imgCard={SubrogationImg}
							count={allNum}
							gmtCreate={gmtCreate}
							customStyle={isBusiness ? { width: '366px', height: '140px', marginBottom: '20px' } : { width: '366px', height: '120px', marginBottom: '20px' }}
							text="代位权"
							styleName="subrogation-card"
						>
							<div className="card-content" style={isBusiness ? { padding: '13px 10px 13px 34px' } : {}}>
								<div className="card-content-role">
									{isBusiness ? (
										<div className="card-content-role-itemLeft">
											<img className="card-left-img" src={matching} alt="" />
											<span style={{ marginRight: '2px', fontWeight: 'bold' }}>3</span>
											人匹配到无形资产
										</div>
									) : null}
									{execute > 0 ? (
										<div className="card-content-role-itemLeft">
											<span className="card-content-role-text">执行案件</span>
											<span className="card-content-role-info">：</span>
											<span className="card-content-role-num">
												{execute}
											条
											</span>

											{restore > 0 ? (
												<div className="card-content-left-arrow">
													<div className="card-content-popover-content">
													5 笔执恢案件
													</div>
												</div>
											) : null}

										</div>
									) : null}

									{otherCase > 0 ? (
										<div className="card-content-role-itemLeft">
											<span className="card-content-role-text">其他案件</span>
											<span className="card-content-role-info">：</span>
											<span className="card-content-role-num">
												{otherCase}
											条
											</span>
										</div>
									) : null}

								</div>
							</div>
						</Card>
					) : null
				}
			</span>
		);
	}
}
