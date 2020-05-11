import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { lawsuitCourtCount, lawsuitJudgmentCount, lawsuitTrialCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '175px', marginBottom: '20px' };
export default class Lawsuit extends PureComponent {
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
		lawsuitTrialCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					trialNum: res.data,
				});
			}
		});
		lawsuitCourtCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					courtNum: res.data,
				});
			}
		});
		lawsuitJudgmentCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					judgmentNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, litigationPropsData, litigationPropsData: {
				gmtUpdate, obligorTotal, totalCount,
			},
		} = this.props;
		const { trialNum, courtNum, judgmentNum } = this.state;
		const unReadCount = trialNum + courtNum + judgmentNum;
		return (
			<Card
				Risk
				IconType="lawsuit"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FB8E3C' }}
				customStyle={hasCountStyle}
				text="涉诉信息"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(litigationPropsData).length !== 0 && (
					<div className="risk-lawsuit-card">
						涉诉风险债务人：
						<span className={`risk-lawsuit-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{obligorTotal || 0}</span>
						名，点击查看涉诉详情
					</div>
				)}
			</Card>
		);
	}
}
