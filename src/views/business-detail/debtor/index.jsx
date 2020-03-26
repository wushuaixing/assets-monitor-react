import React from 'react';
import { Affix, message } from 'antd';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
/* utils */
import { requestAll } from '@/utils/promise';
import { getQueryByName } from '@/utils';
/* api collection */
import assets from '@/utils/api/detail/assets';
import risk from '@/utils/api/detail/risk';
import { debtorInfo } from '@/utils/api/detail';
/* components */
import { Tabs, BreadCrumb } from '@/common';
import DebtorInfo from '@/views/business-detail/table-version/debtor-info';
import Overview from '@/views/business-detail/table-version/overview';
import Assets from '@/views/business-detail/table-version/assets';
import Risk from '@/views/business-detail/table-version/risk';
import Info from '@/views/business-detail/table-version/info';
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
		path: '/business/debtor/detail/info/102/*',
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
		path: '/business/debtor/detail/info/103/*',
		config: Risk.config,
		status: Risk.config.status,
		component: Risk,
		apiData: risk,
		source: [],
	},
	{
		id: 105,
		name: '工商基本信息',
		path: '/business/debtor/detail/info/105/*',
		status: true,
		component: Info,
	},
].filter(i => i.status);

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '债务人详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		const defaultSourceType = window.location.hash.match(/\/detail\/info\/(\d{3})\/?/);
		super(props);
		const tabConfig = source();
		const typeStr = tabConfig.map(i => i.id).join('/') || '';
		this.state = {
			tabConfig: source(),
			childDom: '',
			sourceType: defaultSourceType && typeStr.match(defaultSourceType[1])[0] ? Number(defaultSourceType[1]) : 101,
			affixStatus: false,
			loading: true,
			infoSource: {},
			// loading
			assetLoading: true,
			riskLoading: true,
		};
		this.portrait = 'debtor_enterprise';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const obligorId = getQueryByName(window.location.href, 'id') || 353323;
		debtorInfo({ obligorId }).then((res) => {
			if (res.code === 200) {
				const { obligorName } = res.data;
				if (obligorName && obligorName.length > 4) {
					this.portrait = 'debtor_enterprise';
				} else {
					this.portrait = 'debtor_personal';
					if (tabConfig && tabConfig.length === 4) {
						tabConfig.pop();
					}
				}
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
		const obligorId = getQueryByName(window.location.href, 'id') || 348229;
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
								api: apiData[k].count({
									obligorId,
								}),
								info: { id: apiData[k].id },
							});
						}
					});
				});
			}
			if (apiArray.length) {
				requestAll(apiArray).then((res) => {
					let count = 0;
					res.forEach(i => count += i.data);
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
		console.log('onChangeAffix:', val);
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
				navigate(`/business/debtor/detail/info/${val}${params}`);
			});
		}
	};

	render() {
		const {
			tabConfig, childDom, sourceType, infoSource, affixStatus,
		} = this.state;
		const { loading, assetLoading, riskLoading } = this.state;
		const classList = ['info-detail', 'info-wrapper'];
		if (affixStatus) classList.push('enterprise-intro-affix');
		const params = {
			loading,
			assetLoading,
			riskLoading,
			toPushChild: this.handleAddChild, // tab 追加子项
			portrait: this.portrait,
		};
		return (
			<div className="yc-information-detail-wrapper">
				<div className="info-navigation info-wrapper">
					<BreadCrumb list={[
						{ id: 1, name: '债务人', link: '/business/debtor' },
						{ id: 2, name: '债务人详情', link: '' },
					]}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<Affix onChange={this.onChangeAffix}>
					<div className={classList.join(' ')}>
						<DebtorInfo data={infoSource} affixStatus={affixStatus} portrait={this.portrait} />
						<Tabs.Simple
							onChange={this.onSourceType}
							source={tabConfig}
							symbol="none"
							defaultCurrent={sourceType}
						/>
						{childDom}
					</div>
				</Affix>
				<div className="info-content">
					<Router>
						{ !loading && tabConfig.map(I => <I.component count={I.source} path={I.path} {...params} />) }
					</Router>
				</div>
			</div>
		);
	}
}
