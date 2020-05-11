import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { Row, Col } from 'antd';
import {
	emissionCount, miningCount, trademarkRightCount, constructCount,
} from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Intangible extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			emissionNum: 0,
			miningNum: 0,
			trademarkRightNum: 0,
			constructNum: 0,
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
		emissionCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					emissionNum: res.data,
				});
			}
		});
		miningCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					miningNum: res.data,
				});
			}
		});
		trademarkRightCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					trademarkRightNum: res.data,
				});
			}
		});
		constructCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					constructNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, intangiblePropsData, intangiblePropsData: {
				intangibleArray, totalCount, loading, gmtUpdate,
			},
		} = this.props;
		const {
			emissionNum, miningNum, trademarkRightNum, constructNum,
		} = this.state;
		const unReadCount = emissionNum + miningNum + trademarkRightNum + constructNum;
		return (
			<Card
				IconType="intangible"
				Loading={loading}
				onClick={() => navigate(url)}
				IconColor={{ color: '#FFC531' }}
				customStyle={hasCountStyle}
				text="无形资产"
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={unReadCount}
			>
				{Object.keys(intangiblePropsData).length !== 0 && (
					<Row gutter={24} className="risk-intangible-container">
						{
							intangibleArray.map((item, index) => (
								<div>
									{
										index > 2 ? (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
													条
												</div>
											</Col>
										) : (
											<Col className="gutter-row" span={12}>
												<div className="risk-intangible-container-card">
													{item.typeName}
													：
													<span className={`risk-intangible-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{item.count || 0}</span>
													条
												</div>
											</Col>
										)
									}
								</div>
							))
						}
					</Row>
				)}
			</Card>
		);
	}
}
