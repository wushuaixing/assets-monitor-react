import React from 'react';
import { Affix, message } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
/* utils */
import { requestAll } from '@/utils/promise';
import {
	getQueryByName, timeStandard, toEmpty, reviseNum,
} from '@/utils';
/* api collection */
import assets from '@/utils/api/detail/assets';
import risk from '@/utils/api/detail/risk';
import { companyInfo, exportListEnp } from '@/utils/api/portrait-inquiry';
/* components */
import {
	Tabs, Download, Icon as IconType, BreadCrumb, Button,
} from '@/common';
import Overview from '@/views/business-detail/table-version/overview';
import Assets from '@/views/business-detail/table-version/assets';
import Risk from '@/views/business-detail/table-version/risk';
import PublicImg from '@/assets/img/business/icon_zwrpeople.png';
import Dishonest from '@/assets/img/icon/icon_shixin.png';
import '../style.scss';

/* 基本选项 */
const source = () => [
	{
		id: 101,
		name: '概览',
		number: 0,
		showNumber: false,
		path: '/*',
		status: true,
		component: Overview,
		source: [],
	},
	{
		id: 102,
		name: '资产',
		showNumber: false,
		path: '/business/detail/info/102/*',
		config: Assets.config,
		status: Assets.config.status,
		component: Assets,
		apiData: assets,
		source: [],
	},
	{
		id: 103,
		name: '风险',
		showNumber: false,
		path: '/business/detail/info/103/*',
		config: Risk.config,
		status: Risk.config.status,
		component: Risk,
		apiData: risk,
		source: [],
	},
].filter(i => i.status);

const EnterpriseInfo = (props) => {
	const {
		data, onEdit, onRecord, affixStatus,
	} = props;
	const {
		dishonestStatus: isDishonest, pushState,
	} = data;
	const {
		obligorName: name, legalPersonName, regCapital, establishTime,
	} = data;

	const style = {
		minWidth: 80,
		display: 'inline-block',
	};

	return (
		<div className={`enterprise-info${affixStatus ? ' enterprise-info__simple' : ''}`}>
			<div className="intro-icon">
				<img className="intro-icon-img-auto" src={PublicImg} alt="" />
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold">{name}</span>
					{
						pushState !== null ? (
							<span className="inquiry-list-regStatus regStatus-green" style={{ marginTop: 2, marginRight: 5 }}>
								{'当前推送状态：'}
								{pushState ? '开启' : '关闭'}
							</span>
						) : null
					}
				</div>
				<div className="intro-base-info">
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">借款人：</span>
						<span className="yc-public-title intro-title-name" style={style}>
							{legalPersonName || '--'}
							{isDishonest ? <img className="intro-title-tag" src={Dishonest} alt="" /> : null}
						</span>
					</li>
					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">证件号/统一社会信用代码：</span>
						<span className="yc-public-title" style={style}>{toEmpty(regCapital) ? reviseNum(regCapital) : '--'}</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">借款人推送状态：</span>
						<span className="yc-public-title">{timeStandard(establishTime)}</span>
					</li>
				</div>
				<div className="intro-used">

					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">负责人/机构：</span>
						<span className="yc-public-title" style={style}>{legalPersonName || '--'}</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">上传时间：</span>
						<span className="yc-public-title">{timeStandard(establishTime)}</span>
					</li>
				</div>
			</div>
			<div className="intro-download">
				<Button className="intro-download-button" onClick={onEdit}>编辑</Button>
				<Button className="intro-download-button" onClick={onRecord}>变更记录</Button>
				<Download
					style={{ width: 84, height: 30 }}
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
		document.title = '业务详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		const defaultSourceType = window.location.hash.match(/\/detail\/info\/(\d{3})\/?/);
		super(props);
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType ? Number(defaultSourceType[1]) : 101,
			affixStatus: false,
			loading: true,
			infoSource: {},
			// loading
			assetLoading: true,
			riskLoading: true,
		};
		this.portrait = 'business';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const companyId = getQueryByName(window.location.href, 'id') || 494493;
		companyInfo({ companyId }).then((res) => {
			if (res.code === 200) {
				this.setState({
					infoSource: res.data,
					loading: false,
				});
				/* 请求子项数据 */
				tabConfig.forEach((item, index) => this.toGetSubItemsTotal(item, index, this.portrait));
			} else {
				message.error('网络请求失败！');
				this.setState({
					loading: false,
					assetLoading: false,
					riskLoading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
				assetLoading: false,
				riskLoading: false,
			});
		});
	}

	/* 获取各类子项总数 */
	toGetSubItemsTotal=((item, index, portrait) => {
		if (item.config) {
			const { apiData, config: { idList: _idList, status: _status } } = item;
			const { tabConfig } = this.state;
			const apiArray = [];
			const idList = _idList(portrait);
			const status = _status(portrait);
			if (idList.length > 0 && status) {
				Object.keys(apiData).forEach((k) => {
					idList.forEach((i) => {
						const tempRep = new RegExp(`^${i}`);
						if (tempRep.test(k)) {
							apiArray.push({
								api: apiData[k].count({}),
								info: { id: apiData[k].id },
							});
						}
					});
				});
			}
			if (apiArray.length) {
				requestAll(apiArray).then((res) => {
					let count = 0;
					res.forEach(i => count += i.field ? i.data[i.field] : i.data);
					tabConfig[index].number = count;
					tabConfig[index].showNumber = true;
					tabConfig[index].source = res;
					const l = {};
					if (item.id === 102) l.assetLoading = false;
					if (item.id === 103) l.riskLoading = false;
					this.setState({ tabConfig, ...l });
				});
			}
		}
	});


	handleEdit=() => {};

	handleRecord=() => {};

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
	};

	/* tab change */
	onSourceType=(val) => {
		const { sourceType } = this.state;
		const { href } = window.location;
		const params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: '',
			}, () => {
				navigate(`/business/detail/info/${val}${params}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, infoSource,
		} = this.state;
		const {
			affixStatus, loading, assetLoading, riskLoading,
		} = this.state;
		const classList = ['info-detail', 'info-wrapper'];
		if (affixStatus) classList.push('enterprise-intro-affix');
		const params = {
			assetLoading,
			riskLoading,
			toPushChild: this.handleAddChild, // tab 追加子项
			portrait: this.portrait,
		};
		return (
			<div className="yc-information-detail-wrapper">
				<div className="info-navigation info-wrapper">
					<BreadCrumb list={[
						{ id: 1, name: '业务视图', link: '/business' },
						{ id: 2, name: '业务详情', link: '' },
					]}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<Affix onChange={this.onChangeAffix}>
					<div className={classList.join(' ')}>
						<EnterpriseInfo data={infoSource} onEdit={this.handleEdit} onRcord={this.handleRecord} affixStatus={affixStatus} />
						<Tabs.Simple onChange={this.onSourceType} source={tabConfig} symbol="none" defaultCurrent={sourceType} />
						{childDom}
					</div>
				</Affix>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<div className="info-content">
					<Router>
						{ !loading && tabConfig.map(I => <I.component count={I.source} path={I.path} {...params} />) }
					</Router>
				</div>
			</div>
		);
	}
}
