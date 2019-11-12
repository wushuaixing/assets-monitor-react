import React from 'react';
import { Affix, Icon } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import QueryView from '../common/queryView';
import { Tabs, Button } from '@/common';
import OverView from './overview';
import Assets from './assets';
import Risk from './risk';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
import './style.scss';

const source = () => [
	{
		id: 201,
		name: '　概况　',
		field: 'totalCount',
	},
	{
		id: 202,
		name: '资产',
		number: 56,
		showNumber: true,
	},
	{
		id: 203,
		name: '风险',
		number: 82,
		showNumber: true,
		field: 'followingCount',
	},
];

/* 企业概要 */
const PersonalInfo = (props) => {
	const { download } = props;
	return (
		<div className="personal-info">
			<div className="intro-icon">
				<span>欧</span>
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
							欧家宝
						<img className="intro-title-tag" src={Dishonest} alt="" />
					</span>
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">证件号：</span>
						<span className="yc-public-title">330702198702091982</span>
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
const PersonalInfoSimple = (props) => {
	const { download } = props;
	return (
		<div className="personal-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					欧家宝
					<img className="intro-title-tag" src={Dishonest} alt="" />
				</span>
			</div>
			<Button className="intro-download" onClick={download}>
				<Icon type="download" />
				下载
			</Button>
		</div>
	);
};
export default class Personal extends React.Component {
	constructor(props) {
		document.title = '个人详情-画像查询';
		super(props);
		const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		this.state = {
			tabConfig: source(),
			childDom: '',
			affixStatus: false,
			sourceType: defaultSourceType ? Number(defaultSourceType[0]) : 201,
		};
	}

	handleAddChild=(val) => {
		this.setState({
			childDom: val,
		});
	};

	onSourceType=(val) => {
		const { sourceType } = this.state;
		const { href } = window.location;
		const params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (sourceType !== val) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/inquiry/personal/${val}${params}`);
			});
		}
	};

	onChangeAffix=(val) => {
		this.setState({ affixStatus: val });
		// console.log('onChangeAffix:', val);
	};

	render() {
		const {
			tabConfig, sourceType, childDom, affixStatus,
		} = this.state;
		return (
			<div className="yc-inquiry-personal">
				<QueryView type={2} />
				<div className="mark-line" />
				<div className="inquiry-personal-content">
					<Affix onChange={this.onChangeAffix}>
						<div className={`personal-intro${childDom ? '' : ' personal-intro-child'}${affixStatus ? ' personal-intro-affix' : ''}`} id="personal-intro">
							{
								affixStatus
									? <PersonalInfoSimple download={this.handleDownload} />
									: <PersonalInfo download={this.handleDownload} />
							}
							<Tabs.Simple
								onChange={this.onSourceType}
								source={tabConfig}
								defaultCurrent={sourceType}
							/>
							{childDom}
						</div>
					</Affix>

					<Router>
						<OverView toPushChild={this.handleAddChild} path="/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/personal/202/*" />
						<Risk toPushChild={this.handleAddChild} path="/inquiry/personal/203/*" />
					</Router>

				</div>
			</div>
		);
	}
}
