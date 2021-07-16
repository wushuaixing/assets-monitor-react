import React from 'react';
import {
	BreadCrumb, Button, timeRule, Icon,
} from '@/common';
import { format } from '@/utils/changeTime';
import {
	Radio, DatePicker, Modal,
} from 'antd';
import { getLastExportInfo, exportReport } from '@/utils/api/business';
import WarningPng from '@/assets/img/icon/warning.png';
import './index.scss';

function ModalWarning(type, title, text) {
	const modalVisible = Modal[type]({
		title,
		content: text,
		okText: '我知道了',
		onOk() {
			modalVisible.destroy();
		},
	});
}

let timer = null;

class BusinessExportView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '业务视图-导出业务报告';
		this.state = {
			reportType: 1,
			businessPushTotal: null,
			lastExportDate: null,
			queryDateStart: null,
			queryDateEnd: format(new Date()),
			generating: null,
			errorModalVisible: false,
			timeLeft: 3,
		};
	}

	componentDidMount() {
		const { reportType } = this.state;
		this.getExport(reportType);
	}

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
					this.handleExportSuccess();
					break;
				case 403:
					ModalWarning('warning', '权限不足', msg);
					break;
				case 500:
					ModalWarning('error', '导出失败', msg);
					break;
				default:
					break;
				}
			}
		});
	};

	handleExportSuccess = () => {
		let time = 3;
		timer = setInterval(() => {
			time -= 1;
			this.setState({
				timeLeft: time,
			});
			if (time === 0) {
				this.closeErrorModal();
				if (timer) {
					clearInterval(timer);
					timer = null;
				}
			}
		}, 1000);
		this.openErrorModal();
	}

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

	handleCloseModal = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		this.closeErrorModal();
	}

	render() {
		const {
			reportType, businessPushTotal, lastExportDate, generating, errorModalVisible, timeLeft,
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
									placeholder="导出时间"
									defaultValue={lastExportDate || '2021-05-01'}
									onChange={e => this.onChangeValue(e, 'queryDateStart')}
									disabledDate={(time) => {
										const stateStatus = !timeRule.disabledStartDate(time, format(new Date() - 31536000000));
										const endStatus = !timeRule.disabledEndDate(time, format(new Date()));
										return stateStatus || endStatus;
									}}
								/>
								<span className="yc-query-item-title">至</span>
								<DatePicker
									size="large"
									style={{ width: 88 }}
									placeholder="今天"
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
							<span className="business-number">{ businessPushTotal }</span>
							笔
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
							onClick={this.handleExportBusiness}
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
						<li>完整业务报告展示的是单笔业务中的债务人，完整的的资产/风险画像。可作为制定清收策略的参考信息</li>
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
						width={500}
						closable={false}
					>

						<div className="yc-confirm-body" style={{ padding: '30px' }}>
							<div className="yc-confirm-header">
								<img src={WarningPng} alt="警告" width="24" height="24" />
								<span className="yc-confirm-title" style={{ marginLeft: 10 }}>报告正在生成中，请耐心等待。</span>
							</div>
							<div className="yc-confirm-content" style={{ marginTop: 20 }}>
								<span style={{ color: '#1C80E1', fontSize: 14, marginRight: 5 }}>{timeLeft}</span>
								秒后将返回上一页
							</div>
							<div className="yc-confirm-btn">
								<Button onClick={this.handleCloseModal} className="yc-confirm-footer-btn" type="primary">我知道了</Button>
							</div>
						</div>
					</Modal>
				)
				}
			</div>
		);
	}
}

export default BusinessExportView;
