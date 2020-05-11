import React, { PureComponent } from 'react';
import { subrogationTrialCount, subrogationCourtCount, subrogationJudgmentCount } from 'api/monitor-info/excavate/count';
import { navigate } from '@reach/router';
import Card from '../card';
import './style.scss';

export default class Subrogation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			trialNum: 0,
			courtNum: 0,
			judgmentNum: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount=() => {
		const params = {
			isRead: 0,
		};
		subrogationTrialCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					trialNum: res.data,
				});
			}
		});
		subrogationCourtCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					courtNum: res.data,
				});
			}
		});
		subrogationJudgmentCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					judgmentNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, subrogationPropsData, subrogationPropsData: {
				restore, execute, otherCase, gmtUpdate, totalCount,
			},
		} = this.props;
		const { trialNum, courtNum, judgmentNum } = this.state;
		const unReadCount = trialNum + courtNum + judgmentNum;
		return (
			<Card
				IconType="subrogation"
				onClick={() => navigate(url)}
				IconColor={{ color: '#948BFF' }}
				customStyle={{ width: '366px', height: '155px', marginBottom: '20px' }}
				text="代位权"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(subrogationPropsData).length !== 0 && (
					<div className="risk-subrogation-container">
						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							执行案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{execute || 0}</span>
							笔

							{restore > 0 ? (
								<div className="card-content-left-arrow">
									<div className="card-content-popover-content">
										{restore}
										笔执恢案件
									</div>
								</div>
							) : null}
						</div>

						<div className={`risk-subrogation-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							其他案件：
							<span className={`risk-subrogation-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{otherCase || 0}</span>
							笔
						</div>
					</div>
				)}
			</Card>

		);
	}
}
