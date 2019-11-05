import React from 'react';
import Router from '@/utils/Router';
import QueryView from '../common/queryView';
import { Tabs, Button } from '@/common';
import Overview from './overview';
import Assets from './assets';
import Lawsuits from './lawsuits';
import Manage from './manage';
import Info from './info';
import { Affix, Icon } from 'antd';
import { navigate } from '@reach/router';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
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
/* 企业概要 */
const EnterpriseInfo = (props) => {
	const { download } = props;
	return (
		<div className="enterprise-info">
			<div className="intro-icon">
				<span>浙江天赐</span>
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
						{'浙江天赐生态科技有限公司'}
						<img className="intro-title-tag" src={Dishonest} alt="" />
					</span>
					<span className="intro-title-status">续存</span>
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">法定代表人：</span>
						<span className="yc-public-title">井永柱</span>
					</li>
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">注册资本：</span>
						<span className="yc-public-title">10655.81万元人民币</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">成立日期：</span>
						<span className="yc-public-title">2003-04-29</span>
					</li>
				</div>
				<div className="intro-used">
					<li className="intro-info-list">
						<span className="yc-public-remark">曾用名：</span>
						<span className="yc-public-title">杭州浙大天赐生态科技有限公司</span>
					</li>
				</div>
			</div>
			<Button className="intro-download" onClick={download}>
				<Icon type="download" />
				{'下载'}
			</Button>
		</div>
	);
};
/* 企业概要-简单版 */
const EnterpriseInfoSimple = (props) => {
	const { download } = props;
	return (
		<div className="enterprise-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					{'浙江天赐生态科技有限公司'}
					<img className="intro-title-tag" src={Dishonest} alt="" />
				</span>
				<span className="intro-title-status">续存</span>
			</div>
			<Button className="intro-download" onClick={download}>
				<Icon type="download" />
				{'下载'}
			</Button>
		</div>
	);
};

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		const defaultSourceType = window.location.hash.match(/\d{3}?/);
		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[0]) : 101,
			affixStatus: false,
		};
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
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/enterprise/${val}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, affixStatus,
		} = this.state;
		return (
			<div className="yc-inquiry-enterprise">
				<QueryView type={1} />
				<div className="mark-line" />
				<div className="inquiry-enterprise-content">
					<Affix onChange={this.onChangeAffix}>
						<div className={`enterprise-intro${childDom ? '' : ' enterprise-intro-child'}${affixStatus ? ' enterprise-intro-affix' : ''}`} id="enterprise-intro">
							{
								affixStatus
									? <EnterpriseInfoSimple download={this.handleDownload} />
									: <EnterpriseInfo download={this.handleDownload} />
							}
							<Tabs.Simple
								onChange={this.onSourceType}
								source={tabConfig}
								symbol="none"
								defaultCurrent={sourceType}
							/>
							{childDom}
						</div>
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
