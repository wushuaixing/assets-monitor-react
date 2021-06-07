import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import { electronicNewspaperCount } from 'api/monitor-info/excavate/count';
import Card from '../card';
import './style.scss';

const hasCountStyle = { width: '366px', height: '155px', marginBottom: '20px' };
export default class Bidding extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			assetBiddingNum: 0,
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
		electronicNewspaperCount(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					assetBiddingNum: res.data.total,
				});
			}
		});
	};

	render() {
		const {
			url, epaperPropsData, epaperPropsData: {
				electronicNewspaperCount, gmtUpdate, totalCount,
			},
		} = this.props;
		const { assetBiddingNum } = this.state;
		return (
			<Card
				IconType="dianzibao"
				IconColor={{ color: '#00C2E2' }}
				customStyle={hasCountStyle}
				text="电子报"
				onClick={() => navigate(url)}
				totalCount={totalCount}
				updateTime={gmtUpdate}
				unReadText="条未读信息"
				unReadNum={assetBiddingNum}
			>
				{Object.keys(epaperPropsData).length !== 0 && (
				<div className={`risk-bankruptcy-card ${!totalCount && 'monitor-card-noCount-color'}`}>
					<span className={`risk-bankruptcy-card-num ${!totalCount && 'monitor-card-noCount-color'}`}>{electronicNewspaperCount || 0}</span>
					条相关匹配信息
					{totalCount ? '，请核实' : ''}
				</div>
				)}
			</Card>
		);
	}
}
