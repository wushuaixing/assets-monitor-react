import React from 'react';
import API from '@/utils/api/business-list';
import { getQueryByName } from '@/utils';
import { Tabs, Spin } from '@/common';
import Table0010 from '../monitor/assets-auction/table-intact';
import Table0020 from '../monitor/subrogation/table-intact';
import Table0031 from '../monitor/financial-assets/table/table-biding';
import Table0032 from '../monitor/financial-assets/table/table-publicity';
import Table0040 from '../monitor/lawsuits-monitor/table-intact';
import Table0050 from '../monitor/bankruptcy/table-intact';
import Table0060 from '../monitor/public-proclamation/table-intact';
import './style.scss';

const toGetDefaultConfig = (c) => {
	const base = [
		{
			id: 1,
			name: '资产拍卖',
			field: 'auction',
			status: Boolean(c.auctionCount),
		},
		{
			id: 2,
			name: '代位权',
			field: 'subrogation',
			status: Boolean(c.subrogationCourtSessionCount || c.subrogationFilingCount),
			child: [
				{ id: 21, name: '立案信息', status: Boolean(c.subrogationFilingCount) },
				{ id: 22, name: '开庭公告', status: Boolean(c.subrogationCourtSessionCount) },
			],
		},
		{
			id: 3,
			name: '金融资产',
			field: 'assets',
			status: Boolean(c.financeCount || c.auctionBiddingCount),
			child: [
				{ id: 31, name: '竞价项目', status: Boolean(c.auctionBiddingCount) },
				{ id: 32, name: '公示项目', status: Boolean(c.financeCount) },
			],
		},
		{
			id: 4,
			name: '涉诉监控',
			field: 'monitor',
			status: Boolean(c.trialCourtSessionCount || c.trialFilingCount),
			child: [
				{ id: 41, name: '立案信息', status: Boolean(c.trialFilingCount) },
				{ id: 42, name: '开庭公告', status: Boolean(c.trialCourtSessionCount) },
			],
		},
		{
			id: 5,
			name: '企业破产重组',
			field: 'bankrupt',
			status: Boolean(c.bankruptcyCount),
		},
		{
			id: 6,
			name: '公示公告',
			field: 'publicPro',
			status: Boolean(c.biddingCount || c.epbCount || c.taxCount),
			child: [
				{ id: 61, name: '招标中标', status: Boolean(c.biddingCount) },
				{ id: 62, name: '重大税收违法', status: Boolean(c.taxCount) },
				{ id: 63, name: '环境行政处罚', status: Boolean(c.epbCount) },
			],
		},
	];
	const _base = base.filter(item => item.status);
	return _base.map((item) => {
		const _item = item;
		if (item.child) {
			_item.child = _item.child.filter(it => it.status);
		}
		return _item;
	});
};

const ItemTable = (props) => {
	const {
		field, source, subrogation, assets, monitor, publicPro, model, id,
	} = props;
	if (field === 'auction') return <Table0010 normal noSort reqUrl={API[model].auctionList} id={id} />;
	if (field === 'subrogation') {
		const _subrogation = subrogation || source[0].id;
		if (_subrogation) {
			return _subrogation === 21
				? <Table0020 normal noSort sourceType={1} reqUrl={API[model].trialListD} id={id} />
				: <Table0020 normal noSort sourceType={2} reqUrl={API[model].courtSessionListD} id={id} />;
		}
		return null;
	}
	if (field === 'assets') {
		const _assets = assets || source[0].id;
		if (_assets) {
			return _assets === 31
				? <Table0031 normal noSort reqUrl={API[model].auctionBiddingList} id={id} />
				: <Table0032 normal noSort reqUrl={API[model].financeList} id={id} />;
		}
		return null;
	}
	if (field === 'monitor') {
		const _monitor = monitor || source[0].id;
		if (_monitor) {
			return _monitor === 41
				? <Table0040 normal noSort sourceType={1} reqUrl={API[model].trialListS} id={id} />
				: <Table0040 normal noSort sourceType={2} reqUrl={API[model].courtSessionListS} id={id} />;
		}
		return null;
	}
	if (field === 'bankrupt') return <Table0050 normal noSort reqUrl={API[model].bankruptcyList} id={id} />;
	if (field === 'publicPro') {
		const _publicPro = publicPro || source[0].id;
		if (_publicPro) {
			if (_publicPro === 61) return <Table0060 normal noSort sourceType={1} reqUrl={API[model].biddingList} id={id} />;
			if (_publicPro === 62) return <Table0060 normal noSort sourceType={2} reqUrl={API[model].taxList} id={id} />;
			if (_publicPro === 63) return <Table0060 normal noSort sourceType={3} reqUrl={API[model].epbList} id={id} />;
			return null;
		}
		return null;
	}
	return null;
};

export default class HTMLTableElement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			config: '',
			subrogation: '',
			assets: '',
			monitor: '',
			publicPro: '',
		};
	}

	componentWillMount() {
		const { hash } = window.location;
		this.ID = getQueryByName(hash, 'id');
		const { model } = this.props;
		API[model || 'obligor'].viewCount({}, this.ID).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const config = toGetDefaultConfig(data);
				this.setState({ config });
			}
		});
	}

	onSourceType=(val, field) => {
		this.setState({
			[field]: val,
		});
	};

	render() {
		const { loading, config } = this.state;
		const { model } = this.props;
		return (
			<Spin visable={loading}>
				<div className="yc-business-detail-table-list">
					{
						config && config.map(item => (
							<div className="yc-detail-table-item">
								<Tabs.Simple
									onChange={val => this.onSourceType(val, item.field)}
									source={item.child}
									prefix={<div className="yc-tabs-simple-prefix">{item.name}</div>}
								/>
								<br />
								<ItemTable {...this.state} field={item.field} source={item.child} model={model} id={this.ID} />
							</div>
						))
					}
				</div>
			</Spin>

		);
	}
}
