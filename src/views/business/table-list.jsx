import React from 'react';
import API from '@/utils/api/business-list';
import { getQueryByName } from '@/utils';
import { Tabs, Spin } from '@/common';
import Table0010 from '../asset-excavate/assets-auction/table-intact';
import Table0020 from '../asset-excavate/subrogation/table-intact';
import Table0031 from '../asset-excavate/financial-assets/table/table-reslut';
import Table0032 from '../asset-excavate/financial-assets/table/table-biding';
import Table0033 from '../asset-excavate/financial-assets/table/table-publicity';
import Table0040 from '../risk-monitor/lawsuits-monitor/table-intact';
import Table0050 from '../risk-monitor/bankruptcy/table-intact';
import Table0060 from '../asset-excavate/public-proclamation/table-intact';
import Table0070 from './table-dishonest';
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
			status: Boolean(c.subrogationCourtSessionCount || c.subrogationFilingCount || c.subrogationJudgmentCourt) && false,
			child: [
				{ id: 21, name: '立案信息', status: Boolean(c.subrogationFilingCount) },
				{ id: 22, name: '开庭公告', status: Boolean(c.subrogationCourtSessionCount) },
				{ id: 23, name: '裁判文书', status: Boolean(c.subrogationJudgmentCourt) },
			],
		},
		{
			id: 3,
			name: '金融资产',
			field: 'assets',
			status: Boolean(c.financeCount || c.auctionBiddingCount),
			child: [
				{ id: 31, name: '股权质押', status: Boolean(c.auctionBiddingCount) },
				{ id: 32, name: '竞价项目', status: Boolean(c.auctionBiddingCount) },
				{ id: 33, name: '公示项目', status: Boolean(c.financeCount) },
			],
		},
		{
			id: 4,
			name: '涉诉监控',
			field: 'monitor',
			status: Boolean(c.trialCourtSessionCount || c.trialFilingCount) && false,
			child: [
				{ id: 41, name: '立案信息', status: Boolean(c.trialFilingCount) },
				{ id: 42, name: '开庭公告', status: Boolean(c.trialCourtSessionCount) },
				{ id: 43, name: '裁判文书', status: Boolean(c.trialJudgmentCount) },
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
		{
			id: 7,
			name: '失信记录',
			field: 'dishonest',
			status: Boolean(c.dishonestCount),
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
			switch (_subrogation) {
			case 21:
				return <Table0020 normal noSort sourceType={1} reqUrl={API[model].trialListD} id={id} />;
			case 22:
				return <Table0020 normal noSort sourceType={2} reqUrl={API[model].courtSessionListD} id={id} />;
			case 23:
				return <Table0020 normal noSort sourceType={3} reqUrl={API[model].judgmentD} id={id} />;
			default:
				return null;
			}
		}
		return null;
	}
	if (field === 'assets') {
		const _assets = assets || source[0].id;
		if (_assets) {
			switch (_assets) {
			case 31:
				return <Table0031 normal noSort reqUrl={API[model].auctionBiddingList} id={id} />;
			case 32:
				return <Table0032 normal noSort reqUrl={API[model].auctionBiddingList} id={id} />;
			case 33:
				return <Table0033 normal noSort reqUrl={API[model].financeList} id={id} />;
			default:
				return null;
			}
		}
		return null;
	}
	if (field === 'monitor') {
		const _monitor = monitor || source[0].id;
		if (_monitor) {
			switch (_monitor) {
			case 41:
				return <Table0040 normal noSort sourceType={1} reqUrl={API[model].trialListS} id={id} />;
			case 42:
				return <Table0040 normal noSort sourceType={2} reqUrl={API[model].courtSessionListS} id={id} />;
			case 43:
				return <Table0040 normal noSort sourceType={3} reqUrl={API[model].courtSessionListS} id={id} />;
			default:
				return null;
			}
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
	if (field === 'dishonest') return <Table0070 normal noSort id={id} />;
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
