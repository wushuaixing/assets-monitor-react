import React from 'react';
import { Affix, message } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { requestAll } from '@/utils/promise';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import lawsuits from '@/utils/api/portrait-inquiry/enterprise/lawsuits';
import manage from '@/utils/api/portrait-inquiry/enterprise/manage';
import QueryView from '../common/queryView';
import {
	Tabs, Spin, Download, Icon as IconType,
} from '@/common';
import {
	getQueryByName, timeStandard, toEmpty, reviseNum,
} from '@/utils';
import { companyInfo, dishonestStatus, exportListEnp } from '@/utils/api/portrait-inquiry';
import Overview from './overview';
import Assets from './assets';
import Lawsuits from './lawsuits';
import Manage from './manage';
import Info from './info';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
import './style.scss';


/* 基本选项 */
const source = () => [
	{
		id: 101,
		name: '概览',
		field: 'totalCount',
	},
	{
		id: 102,
		name: '资产',
		number: 0,
		showNumber: false,
	},
	{
		id: 103,
		name: '涉诉',
		number: 0,
		showNumber: false,
		field: 'followingCount',
	},
	{
		id: 104,
		name: '经营',
		number: 0,
		showNumber: false,
		field: 'finishedCount',
	},
	{
		id: 105,
		name: '工商基本信息',
		field: 'ignoreCount',
	},
];

/* 获取注册状态样式 */
const getRegStatusClass = (val) => {
	if (val) {
		if (val.match(/(存续|在业)/)) return ' regStatus-green';
		if (val.match(/(迁出|其他)/)) return ' regStatus-orange';
		if (val.match(/(撤销|吊销|清算|停业|注销)/)) return ' regStatus-red';
	}
	return '';
};

/* 企业概要 */
const EnterpriseInfo = (props) => {
	const {
		data: {
			name, regStatus, legalPersonName, regCapital, formerNames, establishTime, logoUrl,
		}, isDishonest,
	} = props;
	const _formerNames = (formerNames || []).join('、');
	const style = {
		minWidth: 80,
		display: 'inline-block',
	};

	return (
		<div className="enterprise-info">
			<div className="intro-icon">
				{
					logoUrl ? <img className="intro-icon-img" src={logoUrl} alt="" /> : <span>{name && name.slice(0, 4)}</span>
				}
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
						{name}
						{isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
					</span>
					{
						regStatus ? <span className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`} style={isDishonest ? { marginTop: 2, marginLeft: 45 } : { marginTop: 2 }}>{regStatus}</span> : null
					}
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">法定代表人：</span>
						<span className="yc-public-title" style={style}>{legalPersonName || '--'}</span>
					</li>
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">注册资本：</span>
						<span className="yc-public-title" style={style}>{toEmpty(regCapital) ? reviseNum(regCapital) : '--'}</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">成立日期：</span>
						<span className="yc-public-title">{timeStandard(establishTime)}</span>
					</li>
				</div>
				<div className="intro-used">
					<li className="intro-info-list">
						{
						toEmpty(_formerNames) ? [
							<span className="yc-public-remark">曾用名：</span>,
							<span className="yc-public-title">{_formerNames}</span>,
						] : null
					}
					</li>
				</div>
			</div>
			<div className="intro-download">
				<Download
					style={{ width: 84 }}
					condition={{
						companyId: getQueryByName(window.location.href, 'id'),
					}}
					icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
					api={exportListEnp}
					normal
					text="下载"
				/>
			</div>
		</div>
	);
};
/* 企业概要-简单版 */
const EnterpriseInfoSimple = (props) => {
	const { data, isDishonest } = props;
	return (
		<div className="enterprise-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					{data.name}
					{isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
				</span>
				{
					data.regStatus
						? <span className={`inquiry-list-regStatus${getRegStatusClass(data.regStatus)}`} style={isDishonest ? { marginTop: 2, marginLeft: 45 } : { marginTop: 2 }}>{data.regStatus}</span> : ''
				}
			</div>
			<div className="intro-download">
				<Download
					style={{ width: 84 }}
					condition={{
						companyId: getQueryByName(window.location.href, 'id'),
					}}
					icon={<IconType type="icon-download" style={{ marginRight: 5 }} />}
					api={exportListEnp}
					normal
					text="下载"
				/>
			</div>
		</div>
	);
};

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		const defaultSourceType = window.location.hash.match(/\/enterprise\/(\d{3})\/?/);

		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[1]) : 101,
			affixStatus: false,
			loading: true,
			infoSource: {},
			isDishonest: false,
			countSource: {
				assets: [],
				lawsuits: [],
				manage: [],
			},
		};
	}

	componentWillMount() {
		const companyId = getQueryByName(window.location.href, 'id');
		companyInfo({ companyId }).then((res) => {
			if (res.code === 200) {
				this.setState({
					infoSource: res.data,
					loading: false,
				});
				[{ d: assets, f: 'assets', i: 1 }, { d: lawsuits, f: 'lawsuits', i: 2 }, { d: manage, f: 'manage', i: 3 }]
					.forEach(item => this.toGetChildCount(companyId, item.d, item.f, item.i));
			} else {
				message.error('网络请求失败！');
				this.setState({
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
		dishonestStatus({ companyId }).then((res) => {
			if (res.code === 200) {
				this.setState({
					isDishonest: res.data,
				});
			}
		});
	}

	/* 获取子项统计 */
	toGetChildCount=(companyId, apiData, field, index) => {
		/* ...... */
		const { tabConfig: con, countSource: cou } = this.state;
		const reqList = Object.keys(apiData).map(item => ({
			api: apiData[item].count({ companyId }, apiData[item].id),
			info: { id: apiData[item].id },
		}));

		requestAll(reqList).then((res) => {
			let count = 0;
			res.forEach(item => count += item.field ? item.data[item.field] : item.data);
			con[index].number = count;
			con[index].showNumber = true;
			cou[field] = res;
			this.setState({
				tabConfig: con,
				countSource: cou,
			});
		});
	};

	handleDownload=() => {
		console.log('handleDownload');
	};

	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	onChangeAffix=(val) => {
		this.setState({ affixStatus: val });
		// console.log('onChangeAffix:', val);
	};

	onSourceType=(val) => {
		const { sourceType } = this.state;
		const { href } = window.location;
		const params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/enterprise/${val}${params}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, affixStatus, loading, infoSource, countSource, isDishonest,
		} = this.state;

		return (
			<div className="yc-inquiry-enterprise">
				<QueryView type={1} />
				<div className="mark-line" />
				<div className="inquiry-enterprise-content">
					<Affix onChange={this.onChangeAffix}>
						<Spin visible={loading}>
							<div className={`enterprise-intro${childDom ? '' : ' enterprise-intro-child'}${affixStatus ? ' enterprise-intro-affix' : ''}`} id="enterprise-intro">
								{
									affixStatus
										? <EnterpriseInfoSimple download={this.handleDownload} data={infoSource} isDishonest={isDishonest} />
										: <EnterpriseInfo download={this.handleDownload} data={infoSource} isDishonest={isDishonest} />
								}
								<Tabs.Simple
									onChange={this.onSourceType}
									source={tabConfig}
									symbol="none"
									defaultCurrent={sourceType}
								/>
								{childDom}
							</div>
						</Spin>
					</Affix>
					<Router>
						<Overview toPushChild={this.handleAddChild} path="/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/enterprise/102/*" count={countSource.assets} />
						<Lawsuits toPushChild={this.handleAddChild} path="/inquiry/enterprise/103/*" count={countSource.lawsuits} />
						<Manage toPushChild={this.handleAddChild} path="/inquiry/enterprise/104/*" count={countSource.manage} />
						<Info toPushChild={this.handleAddChild} path="/inquiry/enterprise/105/*" detailObj={infoSource} />
					</Router>
				</div>
			</div>
		);
	}
}
