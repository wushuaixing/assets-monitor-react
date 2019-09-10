import React from 'react';
import { Tabs } from '@/common';
import Table0010 from '../monitor/assets-auction/table-intact';
import Table0020 from '../monitor/subrogation/table-intact';
import Table0031 from '../monitor/financial-assets/table/table-biding';
import Table0032 from '../monitor/financial-assets/table/table-publicity';
import Table0040 from '../monitor/lawsuits-monitor/table-intact';
import Table0050 from '../monitor/bankruptcy/table-intact';
import Table0060 from '../monitor/public-proclamation/table-intact';
import { viewCount } from '@/utils/api/business';
import { getQueryByName } from '@/utils';

const toGetDefaultConfig = (c) => {
	const base = [
		{
			id: 1,
			name: '资产拍卖',
			status: Boolean(c.auctionCount),
		},
		{
			id: 2,
			name: '代位权',
			status: Boolean(c.subrogationCourtSessionCount || c.subrogationFilingCount),
			child: [
				{ id: 21, name: '立案信息', status: Boolean(c.subrogationFilingCount) },
				{ id: 22, name: '开庭公告', status: Boolean(c.subrogationCourtSessionCount) },
			],
		},
		{
			id: 3,
			name: '金融资产',
			status: Boolean(c.financeCount || c.auctionBiddingCount),
			child: [
				{ id: 31, name: '竞价项目', status: Boolean(c.auctionBiddingCount) },
				{ id: 32, name: '公示项目', status: Boolean(c.financeCount) },
			],
		},
		{
			id: 4,
			name: '涉诉监控',
			status: Boolean(c.trialCourtSessionCount || c.trialFilingCount),
			child: [
				{ id: 41, name: '立案信息', status: Boolean(c.trialFilingCount) },
				{ id: 42, name: '开庭公告', status: Boolean(c.trialCourtSessionCount) },
			],
		},
		{
			id: 5,
			name: '企业破产重组',
			status: Boolean(c.bankruptcyCount),
		},
		{
			id: 6,
			name: '公示公告',
			status: Boolean(c.biddingCount || c.epbCount || c.taxCount),
			child: [
				{ id: 61, name: '招标中标', status: Boolean(c.biddingCount) },
				{ id: 62, name: '重大税收违法', status: Boolean(c.taxCount) },
				{ id: 63, name: '环境行政处罚', status: Boolean(c.epbCount) },
			],
		},
	];
	return base.filter(item => item.status);
};

export default class HTMLTableElement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			config: '',
		};
	}

	componentWillMount() {
		const { hash } = window.location;
		this.userId = getQueryByName(hash, 'id');
		viewCount(this.userId).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const config = toGetDefaultConfig(data);
				console.log(config);
			}
		});
	}

	componentDidMount() {
	}

	render() {
		const { loading } = this.state;
		return (
			<div> </div>
		);
	}
}
