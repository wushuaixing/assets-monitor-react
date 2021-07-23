import React from 'react';
import {
	Modal, Icon, Steps, Select, Input, DatePicker, Radio, message, Popconfirm as PopConfirm, Switch,
} from 'antd';
import noData from '@/assets/img/home/img_blank_nodata.png';
import { Spin, Button as Btn } from '@/common';
import { clearEmpty, linkDom } from '@/utils';
import {
	pushList as pushListApi, pushSave, processList, processSave, processDel, getCurrentRemindInfo,
} from '@/utils/api/monitor-info/assets-follow';
import { floatFormat } from '@/utils/format';
import { debounce } from '@/utils/index';
import { formatDateTime } from '@/utils/changeTime';
import './style.scss';

// step的描述内容
export const StepDesc = (props) => {
	const {
		recovery, content, remindingTime, username,
	} = props;

	return (
		<div className="font-desc">
			{
				<li style={{ marginBottom: '6px' }}>
					跟进人：
					<span style={{ color: '#20242E' }}>
						{username}
					</span>
				</li>
			}
			{
				recovery ? (
					<li>
						本次追回金额：
						<span style={{ color: '#20242E' }}>
							{recovery !== -1 && floatFormat(recovery.toFixed(2))}
						</span>
					</li>
				) : null
			}
			{
				content ? (
					<li style={{ marginTop: '6px', marginBottom: '6px' }}>
						备注：
						<span style={{ color: '#20242E', wordBreak: 'break-all' }}>
							{content}
						</span>
					</li>
				) : null
			}
			{
				remindingTime ? (
					<li>
						提醒时间：
						<span style={{ color: '#20242E' }}>
							{new Date(remindingTime * 1000).format('yyyy-MM-dd 10:00')}
						</span>
					</li>
				) : null
			}
		</div>
	);
};

// process 的 状态转移
export const ProcessTran = (type) => {
// （6-跟进中、9-已完成、12-已忽略、15-已放弃）
	if (type === 6 || type === 3) return '保持跟进';
	if (type === 9) return '完成跟进';
	if (type === 12) return '已忽略';
	if (type === 15) return '放弃跟进';
	return null;
};

// process 状态默认
const toStatus = (source) => {
	const { process } = source;
	if (process === 0 || process === 3 || process === 6 || process === 12) return 6;
	return process;
};


export default class FollowInfo extends React.Component {
	constructor(props) {
		super(props);
		const { source: { process } } = props;
		this.state = {
			addStatus: false,
			loading: false,
			loadingList: true,
			loadingChild: false,
			dataSource: [],
			processSource: [],
			recovery: '',
			expend: '',
			remark: '',
			remindTime: '',
			remindWay: '',
			pushList: [],
			status: process === 0 ? toStatus(props.source) : '',
			// 新增推送人
			add_name: '',
			add_type: 0,
			add_way: 1,
			add_content: '',
			accruingMoney: 0,
			switchBun: false,
		};
	}

	componentWillMount() {
		const { source: { commentTotal } } = this.props;
		if (commentTotal === 0) {
			this.setState({ addStatus: true });
		} else {
			this.toGetProcessList();
		}
	}

	onChangeValue = (event, field) => {
		if (field === 'status') {
			this.setState({
				switchBun: false,
				recovery: '',
				remark: '',
				pushList: [],
				remindTime: '',
			});
		}
		if (event) {
			let value;
			value = event.target ? event.target.value : event;
			if (value.length > 160) return;
			if (field === 'remark') value = value.slice(0, 160);
			this.setState({
				[field]: value,
			});
		} else {
			this.setState({
				[field]: event,
			});
		}
	};

	onAddContentBlurEvent = (val) => {
		if (val) {
			const value = val.target ? val.target.value : val;
			const data = this.state;
			if (data.add_way === 1 && value) {
				const res = /^1[34578][0-9]\d{8}$/.test(value);
				if (!res) {
					message.error('请输入正确的手机号码！');
					return false;
				}
			}
			if (data.add_way === 2 && value) {
				const res = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-z A-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
				if (!res) {
					message.error('请输入正确的邮箱！');
					return false;
				}
			}
			return true;
		}
		return false;
	};

	// 获取推送人列表
	toGetPushList = async () => {
		const { data, code } = await pushListApi({ num: 20, page: 1 });
		if (code === 200) {
			this.setState({
				dataSource: data.list,
			});
			return data.list;
		}
		return [];
	};

	handleFilterList = async () => {
		const { pushList } = this.state;
		const data = await this.toGetPushList();
		const list = data ? data.map(item => item.id) : [];
		const filterList = pushList.filter(item => list.includes(item));
		this.setState({
			pushList: filterList,
		});
	}

	// 获取跟进信息
	toGetProcessList = () => {
		const { source: { id } } = this.props;
		processList({ id }).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				let recovery = 0;
				data.forEach((item) => {
					recovery += Number(item.recovery);
				});
				this.setState({
					processSource: data || [],
					loadingList: false,
					accruingMoney: recovery,
				});
			} else {
				this.setState({
					loadingList: false,
				});
			}
		}).catch(() => {
			this.setState({
				loadingList: false,
			});
		});
	};

	// 新增推送人
	handlePushSave = () => {
		const data = this.state;
		if (data.add_name === '' || data.add_content === '') {
			message.error('新增推送人的姓名或提醒方式相关内容不能为空！', 2);
			return false;
		}
		if (this.onAddContentBlurEvent(data.add_content) === false) return false;
		const param = {
			name: data.add_name,
			role: data.add_type,
			mobile: data.add_way === 1 ? data.add_content : '',
			email: data.add_way === 2 ? data.add_content : '',
		};
		if (data.loadingChild) return false;
		this.setState({ loadingChild: true });
		pushSave(clearEmpty(param)).then((res) => {
			const { code } = res;
			if (code === 200) {
				message.success('新增推送人成功！');
				const { pushList, dataSource } = this.state;
				dataSource.push(res.data);
				pushList.push(res.data.id);
				this.setState({
					dataSource,
					loadingChild: false,
					add_name: '',
					add_content: '',
					pushList,
				});
				// this.toGetPushList(true);
			} else {
				this.setState({ loadingChild: false });
				message.error(res.message || '网络异常请稍后再试！');
			}
		}).catch(() => {
			this.setState({ loadingChild: false });
		});
		return true;
	};

	// 新增推送信息
	handleProcessSave = () => {
		const {
			 recovery, expend, remark, remindTime, pushList, status, addStatus, switchBun,
		} = this.state;
		const { source: { id, index, recovery: _recovery }, onRefresh, onClose } = this.props;
		// 未点击 新增跟进记录 直接关闭弹窗
		if (!addStatus) {
			onClose();
			return false;
		}
		if (recovery || expend) {
			const regExp = /^\d+(?:\.\d{0,2})?/;
			if (recovery) {
				const rStr = recovery.toString();
				const matchRes = (rStr.match(regExp) || [])[0];
				const str = matchRes !== rStr ? '收入金额输入有误，请输入有效的金额数值！' : '';
				if (str) {
					message.warning(str, 2);
					return true;
				}
			}
		}


		const param = clearEmpty({
			monitorId: id,
			process: status,
			recovery,
			expend,
			content: remark,
			remindingTime: remindTime ? new Date(remindTime).format('yyyy-MM-dd') : '',
			remindSetIdList: pushList.length > 0 ? pushList : '',
			remindType: switchBun ? 3 : '',
		});


		// 字段校验
		if (!param.remindingTime && switchBun) {
			return message.warning('请选择提醒时间', 2);
		}

		if (!param.remindSetIdList && switchBun) {
			return message.warning('请选择提醒的对象', 2);
		}

		// req 阶段
		// if (loading) return false;
		this.setState({ loading: true });
		processSave(param).then((res) => {
			const { code } = res;
			if (code === 200) {
				message.success('操作成功！');
				// 刷新跟进信息
				this.toGetProcessList();
				const _rec = Number(_recovery) + Number(param.recovery || 0);
				if (param.recovery > 0 && onRefresh) {
					onRefresh({
						id,
						recovery: _rec > 0 ? _rec : null,
						index,
					}, 'recovery');
				}
				if (onRefresh) onRefresh({ id, process: status, index }, 'process');
				this.setState({
					addStatus: false,
				});
			} else {
				this.setState({ loading: false });
				message.error(res.message || '网络异常请稍后再试！');
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
		return true;
	};

	// 删除推送记录
	handleStepConfirm = (item, index) => {
		const { id } = item;
		const { processSource } = this.state;
		processDel({ id }).then((res) => {
			if (res.code === 200) {
				message.success('跟进记录删除成功！');
				const _processSource = JSON.parse(JSON.stringify(processSource));
				_processSource.splice(index, 1);
				this.setState({ processSource: _processSource });
				this.toGetProcessList();
			} else {
				message.error(res.message || '跟进记录删除失败，请稍后再试！');
			}
		}).catch(() => {
			message.error('网络异常请稍后再试');
		});
	};

	// onInputChangeField
	onInputChangeField = (event, field) => {
		const { value } = event.srcElement;
		if (value) {
			if (value.length > 160) {
				// eslint-disable-next-line no-param-reassign
				event.srcElement.value = value.slice(0, 160);
				document.activeElement.blur();
			}
			this.setState({
				[field]: value.slice(0, 160),
			});
		}
	};

	onInputChangeNew = (e, field) => {
		const event = e || window.event;
		const target = event.target || event.srcElement;
		this.setState({
			[field]: target.value,
		});
	};

	// 开关改变事件
	switchChange = (checked) => {
		if (checked) {
			this.toGetCurrentRemindInfo();
			this.toGetPushList();
			this.setState({
				switchBun: true,
			});
		} else {
			this.setState({
				switchBun: false,
			});
		}
	}

	// 获取当前推送信息
	toGetCurrentRemindInfo = () => {
		getCurrentRemindInfo().then((res) => {
			if (res.code === 200) {
				if (res.data) {
					const { id } = res.data;
					this.setState({
						pushList: [id],
					});
				}
			}
		}).catch();
	}

	render() {
		const {
			loading, loadingList, dataSource, processSource, addStatus, remark, recovery, status, accruingMoney, switchBun,
		} = this.state;
		const {
			visible, onClose, source: { process, commentTotal }, source,
		} = this.props;
		const data = this.state;
		const getField = (field, option = {}) => ({
			value: data[field],
			onChange: ((val) => {
				if (option.onChange) {
					const res = option.onChange(val, data[field]);
					if (res) this.onChangeValue(val, field);
				} else {
					this.onChangeValue(val, field);
				}
			}),
		});

		const getFieldIE = field => ({
			value: data[field],
			[global.GLOBAL_MEIE_BROWSER ? 'onchange' : 'oninput']: ((val) => {
				this.onChangeValue(val, field);
			}),
		});


		const markContent = (item) => {
			const { email, mobile } = item;
			if (email && mobile) return `「${mobile},${email}」`;
			if (email) return `「${email}」`;
			if (mobile) return `「${mobile}」`;
			return '';
		};

		const getContainer = () => document.getElementById('yc-assets-follow-body');
		return (
			<Modal
				title={addStatus ? '添加跟进记录' : '跟进'}
				visible={visible}
				width="600"
				className="yc-follow-model"
				maskClosable={false}
				onCancel={onClose}
				footer={
					addStatus ? (
						[<Btn
							onClick={processSource.length ? () => this.setState({
								addStatus: false,
								status: toStatus(source),
							}) : onClose}
							style={{ width: 88, color: '#20242E' }}
							title="取 消"
						/>, <Btn
							type="primary"
							loading={loading}
							onClick={debounce(this.handleProcessSave, 300)}
							style={{ width: 88 }}
							title="确 认"
						/>]
					) : (
						[<Btn onClick={onClose} style={{ width: 88 }} title="关 闭" />]
					)
				}
			>
				<div className="yc-assets-follow-body" id="yc-assets-follow-body">
					<div className="yc-follow-add">
						{
							addStatus ? (
								<div className="follow-content">
									<li className="follow-list-item">
										<div className="list-item-title">跟进状态</div>
										<div className="list-item-content">
											<Radio.Group {...getField('status')}>
												<Radio key="a" value={6}>跟进中</Radio>
												<Radio key="b" value={9}>完成跟进</Radio>
												<Radio key="c" value={15}>放弃跟进</Radio>
												{/* <Radio key="c" value={15}>放弃跟进</Radio> */}
											</Radio.Group>
										</div>
									</li>
									{
										status !== 15 ? (
											<React.Fragment>
												<li className="follow-list-item">
													<div className="list-item-title">本次追回金额</div>
													<div className="list-item-content">
														<Input
															style={{ width: '100%', height: '34px' }}
															maxlength={14}
															value={recovery}
															onChange={e => this.onInputChangeNew(e, 'recovery')}
															placeholder="请输入整数金额"
														/>
														<span className="list-item-content-unit">元</span>
													</div>
												</li>
												<li className="follow-list-item">
													<div className="list-item-title">跟进备注</div>
													<div className="list-item-content">
														<Input type="textarea" rows={6} {...getFieldIE('remark')} placeholder="请输入备注信息" maxlength={160} />
														<span className="remark-count">{`${remark ? remark.length : 0}/160`}</span>
													</div>
												</li>
												<li className="follow-list-item" style={{ marginBottom: '30px' }}>
													<div className="list-item-title">设置提醒</div>
													<div className="list-item-content">
														<Switch checkedChildren="开" checked={switchBun} unCheckedChildren="关" onChange={this.switchChange} />
													</div>
													<span className="list-item-content-suffix">通过站内信、短信、邮件的方式进行提醒</span>
												</li>
											</React.Fragment>
										) : (
											<li className="follow-list-item">
												<div className="list-item-title">跟进备注：</div>
												<div className="list-item-content">
													<Input type="textarea" rows={6} {...getFieldIE('remark')} placeholder="请输入备注信息" maxlength={160} />
													<span className="remark-count">
														{`${remark ? remark.length : 0}/160`}
													</span>
												</div>
											</li>
										)
									}
									{
										switchBun ? (
											<div className="follow-content-remind">
												<li className="follow-content-remind-list-item">
													<div className="follow-content-remind-list-item-title">提醒时间</div>
													<div className="follow-content-remind-list-item-content follow-content-remind-list-item-part">
														<DatePicker
															{...getField('remindTime')}
															getCalendarContainer={getContainer}
															placeholder="设置提醒时间"
															disabledDate={(time) => {
																if (!time) {
																	return false;
																}
																return time.getTime() <= new Date().getTime();
															}}
														/>
														<span className="follow-content-remind-list-item-content-time">上午10点</span>
													</div>
												</li>
												<li className="follow-content-remind-list-item">
													<div className="follow-content-remind-list-item-time">
														开拍时间：
														{formatDateTime(source.start)}
													</div>
												</li>
												<li className="follow-content-remind-list-item">
													<div className="follow-content-remind-list-item-title">提醒对象</div>
													<div className="follow-content-remind-list-item-content" style={{ marginTop: '18px' }} onFocus={() => this.handleFilterList()}>
														<Select
															multiple
															style={{ width: '288px' }}
															placeholder="选择提醒对象"
															notFoundContent="暂无推送对象"
															getPopupContainer={getContainer}
															{...getField('pushList', {
																onChange: (val) => {
																	if (val.length <= 3) return true;
																	message.warning('推送对象最多选择3个');
																	return false;
																},
															})}
														>
															{
																dataSource.map(item => (
																	<Select.Option key={item.id} value={item.id}>
																		{`${item.name} ${markContent(item)}`}
																	</Select.Option>
																))
															}
														</Select>
														<div className="follow-content-remind-list-item-content-corner" />
														<div className="follow-content-remind-list-item-remind">
															{linkDom('#/organization/setting', '提醒对象管理')}
														</div>
													</div>
												</li>
											</div>
										) : null
									}
								</div>
							) : null
						}
					</div>
					{
						(process !== 0 || commentTotal !== 0) && !addStatus ? [
							<div className="yc-follow-list">
								<Spin visible={loadingList} minHeight={100}>
									<div className="follow-add">
										<div className="follow-add-title">历史跟进记录</div>
										<div
											className="follow-add-btn"
											onClick={() => this.setState({
												addStatus: true,
												status: toStatus(source),
												recovery: '',
												remark: '',
												switchBun: false,
												pushList: [],
												remindTime: '',
											})}
										>
											{/* <span className="follow-add-btn-icon">+</span> */}
											<i className="iconfont icon-tianjia follow-add-btn-icon" />
											<span>添加跟进信息</span>
										</div>
									</div>
									{
										accruingMoney ? (
											<div className="yc-accruingMoney">
												<span className="yc-accruingMoney-left">累计追回金额：</span>
												<span className="yc-accruingMoney-right">
													{floatFormat(accruingMoney)}
													元
												</span>
											</div>
										) : null
									}
									{
										!loadingList && processSource.length > 0 ? (
											<Steps direction="vertical" size="small" className="follow-list-step">
												{
													processSource.map((item, index) => (
														<Steps.Step
															status="process"
															title={([
																<div className="font-title">{item.updateTime ? new Date(item.updateTime * 1000).format('yyyy-MM-dd hh:mm:ss') : ''}</div>,
																<span className={`list-step-title-mark-status mark-status-${item.process}`}>
																	{ProcessTran(item.process)}
																</span>,
																<React.Fragment>
																	{
																		item.self ? (
																			<PopConfirm
																				placement="leftBottom"
																				title="确定删除这条记录吗？"
																				onConfirm={() => this.handleStepConfirm(item, index)}
																			>
																				<Icon type="delete" className="list-step-title-icon" />
																			</PopConfirm>
																		)
																			: <Icon type="delete" className="list-step-title-icon" style={{ color: '#ffffff', cursor: 'default' }} />
																	}
																</React.Fragment>,
															])}
															icon="clock-circle"
															description={<StepDesc {...item} />}
														/>
													))
												}
											</Steps>
										) : (!loadingList && (
											<figure>
												<img src={noData} />
												<p>暂无历史跟进记录</p>
											</figure>
										))
									}
								</Spin>
							</div>,
						] : ''
					}
				</div>
			</Modal>
		);
	}
}
