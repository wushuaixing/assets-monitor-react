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
import ruleMethods from '@/utils/rule';
import './style.scss';

const mR = (id, childId) => ruleMethods.toGetRuleSource(global.ruleSource, id, childId);

const toGetDefaultConfig = (c) => {
	const riskOpr = mR('YC03', 'YC0303');
	const riskRule = id => (riskOpr ? (riskOpr.child.filter(i => i.id === id && i.status)).length : false);
	const base = [
		{
			id: 1,
			name: '资产拍卖',
			field: 'auction',
			status: Boolean(c.auctionCount) && mR('YC02', 'YC0201'),
		},
		{
			id: 2,
			name: '代位权',
			field: 'subrogation',
			status: Boolean(c.subrogationFilingCount || c.subrogationCourtSessionCount || c.subrogationJudgmentCourt) && mR('YC02', 'YC0202'),
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
			status: Boolean(c.financeCount || c.auctionBiddingCount) && mR('YC02', 'YC0205'),
			child: [
				// { id: 31, name: '股权质押', status: Boolean(c.auctionBiddingCount) },
				{ id: 32, name: '竞价项目', status: Boolean(c.auctionBiddingCount) },
				{ id: 33, name: '公示项目', status: Boolean(c.financeCount) },
			],
		},
		{
			id: 4,
			name: '涉诉监控',
			field: 'monitor',
			status: Boolean(c.trialCourtSessionCount || c.trialFilingCount || c.trialJudgmentCount) && mR('YC03', 'YC0301'),
			child: [
				{ id: 41, name: '立案信息', status: Boolean(c.trialFilingCount) },
				{ id: 42, name: '开庭公告', status: Boolean(c.trialCourtSessionCount) },
				{ id: 43, name: '裁判文书', status: Boolean(c.trialJudgmentCount) },
			],
		},
		{
			id: 5,
			name: '破产重组',
			field: 'bankrupt',
			status: Boolean(c.bankruptcyCount) && mR('YC03', 'YC0302'),
		},
		{
			id: 6,
			name: '公示公告',
			field: 'publicPro',
			status: Boolean(c.biddingCount || c.epbCount || c.taxCount) && (mR('YC02', 'YC0204') || riskRule('YC030304') || riskRule('YC030306')),
			child: [
				{ id: 61, name: '招标中标', status: Boolean(c.biddingCount) && mR('YC02', 'YC0204') },
				{ id: 62, name: '税收违法', status: Boolean(c.taxCount) && riskRule('YC030304') },
				{ id: 63, name: '环保处罚', status: Boolean(c.epbCount) && riskRule('YC030306') },
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
		field, source, subrogation, assets, monitor, publicPro, model, id, onPageChange,
	} = props;
	const arg = {
		normal: true,
		noSort: true,
		onPageChange,
	};
	if (field === 'auction') return <Table0010 {...arg} reqUrl={API[model].auctionList} id={id} />;
	if (field === 'subrogation') {
		const _subrogation = subrogation || source[0].id;
		if (_subrogation) {
			switch (_subrogation) {
			case 21:
				return <Table0020 {...arg} sourceType={1} reqUrl={API[model].trialListD} id={id} />;
			case 22:
				return <Table0020 {...arg} sourceType={2} reqUrl={API[model].courtSessionListD} id={id} />;
			case 23:
				return <Table0020 {...arg} sourceType={3} reqUrl={API[model].judgmentD} id={id} />;
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
				return <Table0031 {...arg} reqUrl={API[model].auctionBiddingList} id={id} />;
			case 32:
				return <Table0032 {...arg} reqUrl={API[model].auctionBiddingList} id={id} />;
			case 33:
				return <Table0033 {...arg} reqUrl={API[model].financeList} id={id} />;
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
				return <Table0040 {...arg} sourceType={1} reqUrl={API[model].trialListS} id={id} />;
			case 42:
				return <Table0040 {...arg} sourceType={2} reqUrl={API[model].courtSessionListS} id={id} />;
			case 43:
				return <Table0040 {...arg} sourceType={3} reqUrl={API[model].judgmentS} id={id} />;
			default:
				return null;
			}
		}
		return null;
	}
	if (field === 'bankrupt') return <Table0050 {...arg} reqUrl={API[model].bankruptcyList} id={id} />;
	if (field === 'publicPro') {
		const _publicPro = publicPro || source[0].id;
		if (_publicPro) {
			if (_publicPro === 61) return <Table0060 {...arg} sourceType={1} reqUrl={API[model].biddingList} id={id} />;
			if (_publicPro === 62) return <Table0060 {...arg} sourceType={2} reqUrl={API[model].taxList} id={id} />;
			if (_publicPro === 63) return <Table0060 {...arg} sourceType={3} reqUrl={API[model].epbList} id={id} />;
			return null;
		}
		return null;
	}
	if (field === 'dishonest') return <Table0070 {...arg} id={id} />;
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
		// console.log(mR('YC03', 'YC0303'));
	}

	onSourceType=(val, field) => {
		this.setState({
			[field]: val,
		});
	};

	handlePageChange=(field) => {
		const dom = document.getElementById(`detail-${field}`);
		// const _height = document.getElementById('enterprise-intro').clientHeight;
		if (dom) {
			dom.scrollIntoView();
			// console.log(document.getElementById(`detail-${field}`).offsetTop);
			// window.scrollTo(0, document.getElementById(`detail-${field}`).offsetTop - 168);
		}
	};

	render() {
		const { loading, config } = this.state;
		const { model } = this.props;
		return (
			<Spin visable={loading}>
				<div className="yc-business-detail-table-list">
					{
						config && config.map(item => (
							<div className="yc-detail-table-item" id={`detail-${item.field}`}>
								<Tabs.Simple
									onChange={val => this.onSourceType(val, item.field)}
									source={item.child}
									prefix={<div className="yc-tabs-simple-prefix">{item.name}</div>}
								/>
								<br />
								<ItemTable
									{...this.state}
									field={item.field}
									source={item.child}
									model={model}
									id={this.ID}
									onPageChange={() => this.handlePageChange(item.field)}
								/>
							</div>
						))
					}
				</div>
			</Spin>

		);
	}
}
