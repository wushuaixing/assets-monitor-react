import React from 'react';
import {
	BreadCrumb, Button, timeRule, Icon,
} from '@/common';
import { format } from '@/utils/changeTime';
import {
	Radio, DatePicker, Modal, Icon as Iconfont,
} from 'antd';
import { getLastExportInfo, exportReport } from '@/utils/api/business';
import { debounce } from '@/utils';
import WarningPng from '@/assets/img/icon/warning.png';
import './index.scss';

let timer = null;

class BusinessExportView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '业务视图-导出业务报告';
		this.state = {
			reportType: 1,
			businessPushTotal: '',
			lastExportDate: null,
			queryDateStart: null,
			queryDateEnd: format(new Date()),
			generating: null,
			errorModalVisible: false,
			warnModalVisible: false,
			warnModalData: {
				type: '',
				title: '',
				content: '',
			},
		};
	}

	componentDidMount() {
		const { reportType } = this.state;
		this.getExport(reportType);
	}

	// 获取导出信息
	getExport = (reportType) => {
		const params = {
			reportType,
		};
		getLastExportInfo(params).then((res) => {
			const {
				data: {
					businessPushTotal,
					lastExportDate,
					generating,
				},
			} = res;
			this.setState({
				businessPushTotal,
				lastExportDate,
				queryDateStart: lastExportDate || '2021-05-01',
				generating,
			});
		});
	}

	onChangeValue = (event, field) => {
		if (event) {
			let value = event.target ? event.target.value : event;
			if (field === 'reportType') this.getExport(value);
			if (field === 'queryDateStart') value = format(value);
			this.setState({
				[field]: value,
			});
		} else {
			this.setState({
				[field]: event,
			});
		}
	};

	// 导出业务报告
	handleExportBusiness = () => {
		const {
			reportType, queryDateStart, queryDateEnd,
		} = this.state;
		const params = reportType ? { reportType }
			: {
				reportType,
				queryDateStart,
				queryDateEnd,
			};
		exportReport(params).then((res) => {
			if (res.code === 200) {
				const { code, msg } = res.data;
				switch (code) {
				case 200:
					this.openErrorModal();
					break;
				case 403:
					this.handleOpenWarnModal('warning', '权限不足', msg);
					break;
				case 500:
					this.handleOpenWarnModal('error', '导出失败', msg);
					break;
				default:
					break;
				}
			}
		});
	};

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	};

	closeErrorModal = () => {
		this.setState({
			errorModalVisible: false,
		});
		this.handleNavigate();
	};

	handleNavigate = () => {
		window.history.back(-1);
	}

	handleOpenWarnModal = (type, title, content) => {
		this.setState({
			warnModalVisible: true,
			warnModalData: {
				type,
				title,
				content,
			},
		});
	}

	handleCloseWarnModal = () => {
		this.setState({
			warnModalVisible: false,
		});
	}

	render() {
		const {
			reportType, businessPushTotal, lastExportDate, generating, errorModalVisible, warnModalVisible, warnModalData,
		} = this.state;

		return (
			<div className="business-export">
				<div className="info-navigation">
					<BreadCrumb
						list={[
							{ id: -1, name: '业务管理', link: '/business/view/' },
							{ id: 1, name: '业务视图', link: '/business/view' },
							{ id: 2, name: '导出业务报告', link: '' },
						]}
					/>
				</div>
				<div className="business-export-info">
					<div className="business-export-info-title">导出业务报告</div>
					{
						generating && (
							<div className="business-export-info-message">
								<Icon type="icon-warning" className="message-icon" />
								<span className="message-warning">有报告正在生成中，请在报告生成后再发起新的导出任务。</span>
							</div>
						)
					}
					<div className="business-export-info-form">
						<div className="form-type">
							<span className="label">选择报告类型：</span>
							<Radio.Group onChange={e => this.onChangeValue(e, 'reportType')} value={reportType}>
								<Radio key="a" value={1}>完整业务报告</Radio>
								<Radio key="b" value={0}>增量数据报告</Radio>
							</Radio.Group>
						</div>
						{ reportType ? null : (
							<div className="form-date">
								<span className="label">时间范围：</span>
								<DatePicker
									size="large"
									style={{ width: 164 }}
									defaultValue={lastExportDate || '2021-05-01'}
									onChange={e => this.onChangeValue(e, 'queryDateStart')}
									disabledDate={(time) => {
										const stateStatus = !timeRule.disabledStartDate(time, format(new Date() - 31536000000));
										const endStatus = !timeRule.disabledEndDate(time, format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)));
										return stateStatus || endStatus;
									}}
								/>
								<span className="yc-query-item-title">至</span>
								<DatePicker
									size="large"
									style={{ width: 88 }}
									placeholder="今天"
									className="date-disabled"
									disabled
								/>
								{ lastExportDate && (
									<div className="export-time">
										（本账号上次导出报告的日期为：
										<span className="date">{lastExportDate}</span>
										）
									</div>
								)
								}
							</div>
						)
						}
						<div className="form-business">
							<span className="label">开启推送的业务数：</span>
							<span className="business-number">{ businessPushTotal !== '' ? `${businessPushTotal}笔` : '-' }</span>
						</div>
					</div>
					<div className="business-export-info-remind">
						*导出文件较大，请您耐心等待，生成成功后，会通过
						<span>短信</span>
						和
						<span>站内消息</span>
						通知您，请及时查看并下载！(文件有效期：7天)
					</div>
					<div className="business-export-info-btn">
						<Button
							type="primary"
							size="large"
							className="yc-high-search"
							onClick={debounce(this.handleExportBusiness, 300)}
						>
							确定
						</Button>
						<Button
							size="large"
							onClick={this.handleNavigate}
						>
							返回
						</Button>
					</div>
				</div>
				<div className="business-export-footer">
					<ul className="complete">
						<li>完整业务报告</li>
						<li>完整业务报告是按业务展示相关债务人全面的资产/风险信息，可作为制定清收策略的参考信息</li>
						<li>每笔业务都会生成一个独立的pdf文件</li>
					</ul>
					<div className="line" />
					<ul className="increment">
						<li>增量数据报告</li>
						<li>增量数据报告展示的是单个负责人/机构所管理的债务人，在指定时间范围内，新增的资产/风险信息，可作为贷后定期检查的工具</li>
						<li>我们会为每个负责人/机构生成1个独立的excel文件</li>
					</ul>
				</div>
				{errorModalVisible && (
					<Modal
						visible={errorModalVisible}
						onCancel={this.handleCancel}
						footer={false}
						width={420}
						height={202}
						closable={false}
						className="yc-business-warn-modal"
					>
						<div className="yc-confirm-body">
							<div className="yc-body-content">
								<div className="yc-confirm-header">
									<img src={WarningPng} alt="警告" width="24" height="24" />
									<span className="yc-confirm-title" style={{ marginLeft: 10 }}>报告正在生成中，请耐心等待。</span>
								</div>
								<div className="yc-confirm-content">
									生成成功后，会通过短信和站内消息通知您。
								</div>
							</div>
							<div className="yc-body-footer">
								<Button onClick={this.closeErrorModal} className="yc-back-footer-btn" type="primary">确定并返回上一页</Button>
							</div>
						</div>
					</Modal>
				)
				}
				{
					<Modal
						visible={warnModalVisible}
						closable={false}
						footer={false}
						width={420}
						height={202}
						className="yc-business-warn-modal"
					>
						<div className="yc-confirm-body">
							<div className="yc-body-content">
								<div className="yc-confirm-header">
									{
										warnModalData.type === 'warning' ? <Icon type="icon-warning" style={{ fontSize: 24, color: '#FB8E3C' }} />
											: <Iconfont type="cross-circle" style={{ fontSize: 24, color: '#FB5A5C' }} />
									}
									<span className="yc-confirm-title" style={{ marginLeft: 10 }}>{warnModalData.title}</span>
								</div>
								<div className="yc-confirm-content">
									{warnModalData.content}
								</div>
							</div>
							<div className="yc-body-footer">
								<Button onClick={this.handleCloseWarnModal} className="yc-confirm-footer-btn" type="primary">我知道了</Button>
							</div>
						</div>
					</Modal>
				}
			</div>
		);
	}
}

export default BusinessExportView;
