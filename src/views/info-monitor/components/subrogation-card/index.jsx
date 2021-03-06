import React, { PureComponent } from 'react';
import {
	subrogationTrialCount, subrogationCourtCount, subrogationJudgmentCount, bankruptcySubrogationCount,
} from 'api/monitor-info/excavate/count';
import { navigate } from '@reach/router';
import { promiseAll } from '@/utils/promise';
import { Col, Row } from 'antd';
import Card from '../card';
import './style.scss';

export default class Subrogation extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			unReadCount: 0,
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
		const promiseArray = [];
		promiseArray.push(subrogationTrialCount(params));
		promiseArray.push(subrogationCourtCount(params));
		promiseArray.push(subrogationJudgmentCount(params));
		promiseArray.push(bankruptcySubrogationCount(params));
		// 将传入promise.all的数组进行遍历，如果catch住reject结果，
		// 直接返回，这样就可以在最后结果中将所有结果都获取到,返回的其实是resolved
		// console.log(promiseArray, 123);
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((res) => {
			let total = 0;
			res.forEach((i) => {
				total += i.data;
			});
			this.setState(() => ({
				unReadCount: total,
			}));
			// console.log('all promise are resolved', values);
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
	};

	render() {
		const {
			url, subrogationPropsData, subrogationPropsData: {
				 gmtUpdate, totalCount, bankruptcyCount, judgment, trial, courtNotice,
			},
		} = this.props;
		const { unReadCount } = this.state;
		return (
			<Card
				IconType="subrogation"
				onClick={() => navigate(url)}
				IconColor={{ color: '#948BFF' }}
				customStyle={{ width: '366px', height: '148px', marginBottom: '20px' }}
				text="代位权"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				 {Object.keys(subrogationPropsData).length !== 0 && (
					 <Row gutter={24} className="risk-intangible-container">
						<div>
							<Col className="gutter-row" span={12}>
								<div className="risk-intangible-container-card">
									立案信息
									：
									<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{trial}</span>
									条
								</div>
							</Col>
							<Col className="gutter-row" span={12}>
								<div className="risk-intangible-container-card">
									开庭公告
									：
									<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{courtNotice}</span>
									条
								</div>
							</Col>
							<Col className="gutter-row" span={12}>
								<div className="risk-intangible-container-card">
									裁判文书
									：
									<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{judgment}</span>
									条
								</div>
							</Col>
							<Col className="gutter-row" span={12}>
								<div className="risk-intangible-container-card">
									破产代位
									：
									<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{bankruptcyCount}</span>
									条
								</div>
							</Col>
						</div>
					</Row>
				 )}
			</Card>
		);
	}
}
