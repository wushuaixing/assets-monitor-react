import React from 'react';
import {
	Affix, Modal, Icon,
	// Pagination,
} from 'antd';
import { navigate } from '@reach/router';
// import Router from '@/utils/Router';
/* utils */
import { requestAll } from '@/utils/promise';
import {
	getQueryByName, timeStandard, getHrefQuery,
} from '@/utils';
/* api collection */
// import businessAssets from '@/utils/api/professional-work/business/assets';
// import businessRisk from '@/utils/api/professional-work/business/risk';
import {
	businessInfo,
	// exportListBusiness
} from '@/utils/api/professional-work';
/* components */
import {
	// Tabs, Download,
	Icon as IconType, BreadCrumb, Button, Spin,
} from '@/common';
import { businessList } from '@/utils/api/professional-work/overview';
// import ShapeImg from '@/assets/img/business/Shape.png';
import Overview from '@/views/business/detail/table-version/overview';
import Assets from '@/views/business/detail/table-version/assets';
import Risk from '@/views/business/detail/table-version/risk';
import BusinessImg from '@/assets/img/business/icon_business.png';
// import isBreak from '@/assets/img/business/status_shixin.png';
// import beforeBreak from '@/assets/img/business/status_cengshixin.png';
import ChangeModal from './change-modal/changeList';
import { setSource } from './cache';
import '../style.scss';
import RelationTable from './relation-table';

const constantNumber = 99999999; // 默认值
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
		apiData: '',
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
		apiData: '',
		source: [],
	},
].filter(i => i.status);

const EnterpriseInfo = (props) => {
	const {
		data, onEdit, onRecord, affixStatus,
	} = props;
	const {
		 businessPushType,
	} = data;
	const {
		 orgName, uploadTime, caseNumber,
	} = data;
	const style = {
		// minWidth: 80,
		display: 'inline-block',
	};
	// console.log(affixStatus);
	return (
		<div className={`enterprise-info${affixStatus ? ' enterprise-info__simple' : ''}`}>
			<div className="intro-icon">
				<img className="intro-icon-img-auto" src={BusinessImg} alt="" />
			</div>
			<div className="intro-content">
				<div className="intro-title">
					<span className="yc-public-title-large-bold">
						业务编号：
						{caseNumber || '-'}
					</span>
					{
						businessPushType !== null ? (
							<span
								className="inquiry-list-regStatus regStatus-blue"
								style={businessPushType ? { marginTop: 2 } : {
									marginTop: 2, color: '#7D8699', backgroundColor: '#F0F1F5', border: '1px solid #DADDE6',
								}}
							>
								{'当前推送状态：'}
								{businessPushType ? '开启' : '关闭'}
							</span>
						) : null
					}
				</div>
				<div className="intro-used">

					<li className="intro-info-list intro-list-border">
						<span className="yc-public-remark">负责人/机构：</span>
						<span className="yc-public-title" style={style}>{orgName || '-'}</span>
					</li>
					<li className="intro-info-list">
						<span className="yc-public-remark">上传时间：</span>
						<span className="yc-public-title">{timeStandard(uploadTime)}</span>
					</li>
				</div>
			</div>
			{affixStatus ? <Operation onEdit={onEdit} onRecord={onRecord} customStyle={{ top: '4px' }} /> : null }
		</div>
	);
};

const Operation = (props) => {
	const { onEdit, onRecord, customStyle } = props;
	return (
		<div className="intro-download" style={customStyle}>
			{
				!global.isProxyLimit && (
					<Button className="intro-download-button" onClick={onEdit}>
						<IconType type="icon-edit" style={{ marginRight: 5 }} />
						编辑
					</Button>
				)}
			<Button className="intro-download-button" onClick={onRecord}>
				<IconType type="icon-change-record" style={{ marginRight: 5 }} />
				变更记录
			</Button>
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
			// assetLoading: true,
			// riskLoading: true,
			changeListModalVisible: false,
			errorModalVisible: false,
			timeLeft: 3,
			// apiError: false,
			dataList: [],
			// totals: 0,
			// current: 1, // 当前页
			// pageSize: 10, // 默认展示条数
			relationTableLoading: false,
		};
		this.portrait = 'business';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {
		const { tabConfig } = this.state;
		const businessId = getQueryByName(window.location.href, 'id') || constantNumber;
		this.setState({ loading: true });
		this.relationBusinessData();
		businessInfo({ businessId }).then((res) => {
			if (res.code === 200) {
				this.setState({
					infoSource: res.data,
					loading: false,
				});
				/* 请求子项数据 */
				tabConfig.forEach((item, index) => this.toGetSubItemsTotal(item, index, this.portrait));
			} else {
				// message.error('网络请求失败！');
				let time = 3;
				const timer = setInterval(() => {
					time -= 1;
					this.setState({
						timeLeft: time,
					});
					if (time === 0) {
						this.closeErrorModal();
						clearInterval(timer);
					}
				}, 1000);
				this.openErrorModal();
				this.setState({
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({
				loading: false,
			});
		});
	}

	/* 获取各类子项总数 */
	toGetSubItemsTotal=((item, index, portrait) => {
		const businessId = getQueryByName(window.location.href, 'id');
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
								api: apiData[k].count({ businessId }),
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

	// 业务相关人列表
	relationBusinessData = () => {
		this.setState({ relationTableLoading: true });
		const businessId = getQueryByName(window.location.href, 'id') || constantNumber;
		businessList({ businessId }).then((res) => {
			if (res.code === 200) {
				this.setState({ dataList: res.data, relationTableLoading: false });
			} else {
				this.setState({ dataList: [], relationTableLoading: false });
			}
		}).catch(() => {
			this.setState({ relationTableLoading: false });
		});
	};

	handleEdit=() => {
		const { infoSource } = this.state;
		const businessId = getQueryByName(window.location.href, 'id') || constantNumber;
		setSource(infoSource);
		navigate(`/business/detail/edit/info?id=${businessId}`);
	};

	// 打开担保人弹窗
	openPeopleModal = (id) => {
		this.setState({
			changeListModalVisible: true,
			businessId: id,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			changeListModalVisible: false,
		});
	};

	handleDownload=() => {
		console.log('handleDownload');
	};

	handleAddChild=(val, id) => {
		this.childDomId = id;
		this.setState({
			childDom: val,
		});
	};

	onChangeAffix=(val) => {
		this.setState({ affixStatus: val });
	};

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	};

	closeErrorModal = () => {
		window.close();
		this.setState({
			errorModalVisible: false,
		});
	};

	/* tab change */
	onSourceType=(val, item) => {
		const { sourceType, childDom } = this.state;
		const { href } = window.location;
		const eleStr = getHrefQuery('ele');
		let params = href.match(/\?/) ? href.slice(href.match(/\?/).index) : '';
		if (item) {
			params = eleStr ? params.replace(eleStr, '') : params;
		}
		if (val !== sourceType) {
			this.setState({
				sourceType: val,
				childDom: this.childDomId !== val ? '' : childDom,
			}, () => {
				navigate(`/business/detail/info/${val}${params}`);
			});
		}
	};

	render() {
		const {
			infoSource, changeListModalVisible, businessId, timeLeft, errorModalVisible, affixStatus, loading, dataList, relationTableLoading,
		} = this.state;
		const classList = ['info-detail', 'info-wrapper'];
		if (affixStatus) classList.push('enterprise-intro-affix');
		return (
			<div className="yc-information-detail-wrapper">
				<div className="info-navigation">
					<BreadCrumb
						list={[
							{ id: -1, name: '业务管理', link: '/business/view/' },
							{ id: 1, name: '业务视图', link: '/business/view' },
							{ id: 2, name: '业务详情', link: '' },
						]}
						suffix={(
							<div className="info-navigation-suffix" style={{ zIndex: 1 }}>
								<Operation onEdit={this.handleEdit} onRecord={this.openPeopleModal} />
							</div>
						)}
					/>
					{/* <Operation onEdit={this.onEdit} onRcord={this.onRecord} /> */}
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<Affix onChange={this.onChangeAffix}>
					<Spin visible={loading}>
						<div className={classList.join(' ')}>
							<EnterpriseInfo data={infoSource} onEdit={this.handleEdit} onRecord={this.openPeopleModal} affixStatus={affixStatus} />
						</div>
					</Spin>
				</Affix>
				<Spin visible={relationTableLoading}>
					<RelationTable dataSource={dataList} getData={this.relationBusinessData} />
				</Spin>
				{/** 担保人Modal */}
				{changeListModalVisible && (
					<ChangeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						businessId={businessId}
						changeListModalVisible={changeListModalVisible}
					/>
				)}
				{errorModalVisible && 	(
					<Modal
						visible={errorModalVisible}
						onCancel={this.handleCancel}
						footer={false}
						width={500}
						closable={false}
					>

						<div className="yc-confirm-body">
							<div className="yc-confirm-header">
								<Icon style={{ fontSize: 28, color: '#f66c5b', marginRight: 8 }} type="cross-circle-o" />
								<span className="yc-confirm-title">业务已删除</span>
							</div>
							<div className="yc-confirm-content">
								<span style={{ color: '#1C80E1', fontSize: 14, marginRight: 5 }}>{timeLeft}</span>
								秒后自动关闭页面
							</div>
							<div className="yc-confirm-btn">
								<Button onClick={this.closeErrorModal} className="yc-confirm-footer-btn" type="primary">知道了</Button>
							</div>
						</div>

					</Modal>
				)}
			</div>
		);
	}
}
