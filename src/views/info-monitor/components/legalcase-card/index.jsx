import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { legalCaseCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '148px', marginBottom: '20px' };
export default class legalCase extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			legalCaseNum: 0,
		};
	}

	componentDidMount() {
		this.toInfoCount();
	}

	// 获取统计信息
	toInfoCount = () => {
		const params = {
			isRead: 0,
		};
		legalCaseCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					legalCaseNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, legalCasePropsData, legalCasePropsData: {
				endCaseCount,
				removeCount,
				totalCount,
			},
		} = this.props;
		const { legalCaseNum } = this.state;
		return (
			<Card
				Risk
				IconType="zhongbenanjian"
				onClick={() => navigate(url)}
				IconColor={{ color: '#5A6BFB' }}
				customStyle={hasCountStyle}
				text="终本案件"
				totalCount={totalCount}
				unReadText="条未读信息"
				unReadNum={legalCaseNum}
			>
				{Object.keys(legalCasePropsData).length !== 0 && (
					<div className="risk-limit-container">
						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							未移除：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{endCaseCount || 0}</span>
							条
						</div>

						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							已移除：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{removeCount || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
