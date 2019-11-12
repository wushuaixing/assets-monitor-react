import React from 'react';
import { Affix, Icon } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import QueryView from '../common/queryView';
import { Tabs, Button, Spin } from '@/common';
import { getQueryByName, timeStandard, toEmpty } from '@/utils';
import { companyInfo } from '@/utils/api/portrait-inquiry';
import Overview from './overview';
import Assets from './assets';
import Lawsuits from './lawsuits';
import Manage from './manage';
import Info from './info';
// import Dishonest from '@/assets/img/icon/icon_shixin.png';

import './style.scss';

/* 基本选项 */
const source = () => [
	{
		id: 101,
		name: '　概况　',
		field: 'totalCount',
	},
	{
		id: 102,
		name: '资产',
		number: 56,
		showNumber: true,
	},
	{
		id: 103,
		name: '涉诉',
		number: 82,
		showNumber: true,
		field: 'followingCount',
	},
	{
		id: 104,
		name: '经营',
		number: 26,
		showNumber: true,
		field: 'finishedCount',
	},
	{
		id: 105,
		name: '工商基本信息',
		field: 'ignoreCount',
	},
];

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
		download, data: {
			name, regStatus, legalPersonName, regCapital, formerNames, estiblishTime,
		},
	} = props;
	const _formerNames = (formerNames || []).join(' ');
	const style = {
		minWidth: 80,
		display: 'inline-block',
	};
	return (
		<div className="enterprise-info">
			<div className="intro-icon">
				<span>{name && name.slice(0, 4)}</span>
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
						{name}
						{/* <img className="intro-title-tag" src={Dishonest} alt="" /> */}
					</span>
					{
						regStatus ? <span className={`inquiry-list-regStatus${getRegStatusClass(regStatus)}`} style={{ marginTop: 2 }}>{regStatus}</span> : null
					}
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">法定代表人：</span>
						<span className="yc-public-title" style={style}>{legalPersonName || '--'}</span>
					</li>
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">注册资本：</span>
						<span className="yc-public-title" style={style}>{toEmpty(regCapital) ? regCapital : '--'}</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">成立日期：</span>
						<span className="yc-public-title">{timeStandard(estiblishTime)}</span>
					</li>
				</div>
				<div className="intro-used">
					<li className="intro-info-list">
						<span className="yc-public-remark">曾用名：</span>
						<span className="yc-public-title">{toEmpty(_formerNames) ? _formerNames : '--'}</span>
					</li>
				</div>
			</div>
			<Button className="intro-download" onClick={download}>
				<Icon type="download" />
				下载
			</Button>
		</div>
	);
};
/* 企业概要-简单版 */
const EnterpriseInfoSimple = (props) => {
	const { download, data } = props;
	return (
		<div className="enterprise-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					{data.name}
					{/* <img className="intro-title-tag" src={Dishonest} alt="" /> */}
				</span>
				{
					data.regStatus ? <span className={`inquiry-list-regStatus${getRegStatusClass(data.regStatus)}`} style={{ marginTop: 2 }}>{data.regStatus}</span> : ''
				}
			</div>
			<Button className="intro-download" onClick={download}>
				<Icon type="download" />
				下载
			</Button>
		</div>
	);
};

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[0]) : 101,
			affixStatus: false,
			loading: false,
			infoSource: {},
		};
	}

	componentWillMount() {
		const companyId = getQueryByName(window.location.href, 'id');
		companyInfo({ companyId }).then((res) => {
			if (res.code === 200) {
				this.setState({ infoSource: res.data });
			}
		});
		console.log(companyId);
	}

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
			tabConfig, childDom, sourceType, affixStatus, loading, infoSource,
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
										? <EnterpriseInfoSimple download={this.handleDownload} data={infoSource} />
										: <EnterpriseInfo download={this.handleDownload} data={infoSource} />
								}
								<Tabs.Simple
									onChange={this.onSourceType}
									source={tabConfig}
									defaultCurrent={sourceType}
								/>
								{childDom}
							</div>
						</Spin>

					</Affix>
					<Router>
						<Overview toPushChild={this.handleAddChild} path="/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/enterprise/102/*" />
						<Lawsuits toPushChild={this.handleAddChild} path="/inquiry/enterprise/103/*" />
						<Manage toPushChild={this.handleAddChild} path="/inquiry/enterprise/104/*" />
						<Info toPushChild={this.handleAddChild} path="/inquiry/enterprise/105/*" />
					</Router>
				</div>
			</div>
		);
	}
}
