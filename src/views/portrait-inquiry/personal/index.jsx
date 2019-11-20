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
import assets from '@/utils/api/portrait-inquiry/personal/assets';
import risk from '@/utils/api/portrait-inquiry/personal/risk';
import { getInfo } from '@/utils/api/portrait-inquiry/personal/overview';
import { Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { requestAll } from '@/utils/promise';
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
		number: 0,
		showNumber: false,
		disabled: true,
	},
	{
		id: 203,
		name: '风险',
		number: 0,
		showNumber: false,
		disabled: true,
	},
];

/* 企业概要 */
const PersonalInfo = (props) => {
	const { download, info, urlInfo } = props;
	return (
		<div className="personal-info">
			<div className="intro-icon">
				<span>{info.name ? info.name.slice(0, 1) : ''}</span>
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold intro-title-name">
						{info.name || urlInfo.name}
						{info.isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
					</span>
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">证件号：</span>
						<span className="yc-public-title">{info.number || urlInfo.num}</span>
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
	const { download, info } = props;
	return (
		<div className="personal-info">
			<div className="intro-title">
				<span className="yc-public-title-large-bold intro-title-name">
					{info.name}
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
		const defaultSourceType = window.location.hash.match(/\/personal\/(\d{3})\/?/);
		this.state = {
			loading: true,
			infoSource: '',
			tabConfig: source(),
			countSource: {
				assets: [],
				risk: [],
			},
			childDom: '',
			affixStatus: false,
			sourceType: defaultSourceType ? Number(defaultSourceType[1]) : 201,
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
	}

	componentWillMount() {
		this.toTouchCount();
		this.getData();
	}

	componentWillReceiveProps() {
		const { sourceType, childDom } = this.state;
		const defaultSourceType = Number((window.location.hash.match(/\/personal\/(\d{3})\/?/) || [])[1]) || 201;

		if (sourceType !== defaultSourceType || JSON.stringify(this.info) !== JSON.stringify(this.toGetInfo())) {
			this.info = this.toGetInfo();
			this.setState({
				sourceType: defaultSourceType,
				childDom: defaultSourceType === 201 ? '' : childDom,
			}, () => {
				this.toTouchCount();
			});
		}
	}

	getData = () => {
		const params = this.info;
		getInfo(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					infoSource: res.data,
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	toGetInfo=() => ({
		obligorName: getQueryByName(window.location.href, 'name'),
		obligorNumber: getQueryByName(window.location.href, 'num'),
	});

	toTouchCount=() => {
		const params = this.info;
		[{ d: assets, f: 'assets', i: 1 }, { d: risk, f: 'risk', i: 2 }]
			.forEach(item => this.toGetChildCount(params, item.d, item.f, item.i));
	};

	/* 获取子项统计 */
	toGetChildCount=(params, apiData, field, index) => {
		/* ...... */
		const { tabConfig: con, countSource: cou } = this.state;
		const reqList = Object.keys(apiData).map(item => ({
			api: apiData[item].count(params, apiData[item].id),
			info: { id: apiData[item].id },
		}));
		requestAll(reqList).then((res) => {
			let count = 0;
			res.forEach(item => count += item.field ? item.data[item.field] : item.data);
			con[index].disabled = !count;
			con[index].number = count;
			con[index].showNumber = Boolean(count);
			cou[field] = res;
			this.setState({
				tabConfig: con,
				countSource: cou,
			});
		});
	};

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
			tabConfig, sourceType, childDom, affixStatus, countSource, loading, infoSource,
		} = this.state;

		return (
			<div className="yc-inquiry-personal">
				<QueryView type={2} />
				<div className="mark-line" />
				<div className="inquiry-personal-content">
					<Spin visible={loading}>
						<Affix onChange={this.onChangeAffix}>

							<div className={`personal-intro${childDom ? '' : ' personal-intro-child'}${affixStatus ? ' personal-intro-affix' : ''}`} id="personal-intro">
								{
									affixStatus
										? <PersonalInfoSimple download={this.handleDownload} info={infoSource} urlInfo={this.info} />
										: <PersonalInfo download={this.handleDownload} info={infoSource} urlInfo={this.info} />
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

					</Spin>
					<Router>
						<OverView toPushChild={this.handleAddChild} path="/*" />
						<Assets toPushChild={this.handleAddChild} path="/inquiry/personal/202/*" count={countSource.assets} />
						<Risk toPushChild={this.handleAddChild} path="/inquiry/personal/203/*" count={countSource.risk} />
					</Router>

				</div>
			</div>
		);
	}
}
