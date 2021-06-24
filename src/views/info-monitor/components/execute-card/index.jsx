import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { executeCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';


const hasCountStyle = { width: '366px', height: '148px', marginBottom: '20px' };
export default class executeCase extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			limitHeightNum: 0,
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
		executeCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					limitHeightNum: res.data,
				});
			}
		});
	};

	render() {
		const {
			url, executePropsData, executePropsData: {
				removedCount, totalCount, unRemovedCount,
			},
		} = this.props;
		const { limitHeightNum } = this.state;
		return (
			<Card
				Risk
				IconType="beizhihangxinxi"
				onClick={() => navigate(url)}
				IconColor={{ color: '#FF6133' }}
				customStyle={hasCountStyle}
				text="被执行信息"
				totalCount={totalCount}
				unReadText="条未读信息"
				unReadNum={limitHeightNum}
			>
				{Object.keys(executePropsData).length !== 0 && (
					<div className="risk-limit-container">
						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`} style={{ paddingBottom: '16px' }}>
							未移除：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{removedCount || 0}</span>
							条
						</div>

						<div className={`risk-limit-container-card ${!totalCount && 'monitor-card-noCount-color'}`}>
							未移除：
							<span className={`risk-limit-container-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{unRemovedCount || 0}</span>
							条
						</div>
					</div>
				)}
			</Card>
		);
	}
}
