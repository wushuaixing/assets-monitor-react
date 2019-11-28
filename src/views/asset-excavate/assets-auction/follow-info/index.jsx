import React from 'react';
import {
	Modal, Button, Icon, Steps, Select, Input, DatePicker, Checkbox, Radio, message, Popconfirm as PopConfirm,
} from 'antd';
import { Spin, Button as Btn, Icon as IconType } from '@/common';
import { clearEmpty, linkDom } from '@/utils';
import {
	pushList as pushListApi, pushSave, processList, processSave, processDel,
} from '@/utils/api/monitor-info/assets-follow';
import { floatFormat } from '@/utils/format';
import './style.scss';

// step的描述内容
const StepDesc = (props) => {
	const {
		recovery, expend, content, remindingTime, remindType, remindMobiles,
	} = props;
	// 提醒方式(1-系统消息、2-短信/邮件、3-系统+短信/邮件
	const remindTypeContent = (type) => {
		if (type === 1) return '系统消息';
		if (type === 2) return '短信/邮件';
		if (type === 3) return '系统+短信/邮件';
		return null;
	};
	const remindMobilesContent = (function methods(data) {
		if (data) {
			return (JSON.parse(data).map(item => item.name)).join(',');
		}
		return null;
	}(remindMobiles));

	return (
		<React.Fragment>
			{
				recovery || expend ? (
					<li>
						{ recovery ? `收入金额/元：${recovery !== -1 ? floatFormat(recovery.toFixed(2)) : '--'}；  ` : null}
						{ expend ? `支出金额/元：${expend !== -1 ? floatFormat(expend.toFixed(2)) : '--'} ；` : null}
					</li>
				) : null
			}
			{
				content ? `备注：${content}` : null
			}
			{
				remindingTime || remindType ? (
					<li>
						{ remindingTime ? `提醒日期：${new Date(remindingTime * 1000).format('yyyy-MM-dd (早上10点)')}； ` : null}
						{ remindType ? `提醒方式：${remindTypeContent(remindType)}${remindMobilesContent ? `(${remindMobilesContent})` : ''}` : ''}
					</li>
				) : null
			}
		</React.Fragment>
	);
};

// process 的 状态转移
const ProcessTran = (type) => {
// （6-跟进中、9-已完成、12-已忽略、15-已放弃）
	if (type === 6 || type === 3) return '跟进中';
	if (type === 9) return '已完成';
	if (type === 12) return '已忽略';
	if (type === 15) return '已放弃';
	return null;
};

// process 状态默认
const toStatus = (source) => {
	const { process } = source;
	if (process === 0 || process === 3 || process === 6 || process === 12 || process === 15) return 6;
	return process;
};

// 跟进记录 remindType
const remindType = (item) => {
	if (item.length === 2) return 3;
	if (item.indexOf('email') > -1) return 2;
	if (item.indexOf('system') > -1) return 1;
	return '';
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
		};
	}

	componentWillMount() {
		const { source: { process } } = this.props;
		if (process === 0) {
			this.setState({ addStatus: true });
		} else {
			this.toGetProcessList();
		}
	}

	onChangeValue=(event, field) => {
		if (event) {
			let value;
			if (global.GLOBAL_MEIE_BROWSER) {
				// eslint-disable-next-line prefer-destructuring
				value = event.value;
			} else {
				value = event.target ? event.target.value : event;
			}
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

	onAddContentBlurEvent=(val) => {
		if (val) {
			const value = val.target ? val.target.value : val;
			const data = this.state;
			console.log(data.add_way);
			if (data.add_way === 1 && value) {
				const res = /^1[34578][0-9]\d{8}$/.test(value);
				if (!res) {
					message.error('请输入正确的手机号码！');
					return false;
				}
			} if (data.add_way === 2 && value) {
				const res = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
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
	toGetPushList=(refresh) => {
		const { dataSource } = this.state;
		if (dataSource.length === 0 || refresh) {
			pushListApi({ num: 20, page: 1 }).then((res) => {
				const { data, code } = res;
				if (code === 200) {
					this.setState({
						dataSource: data.list,
					});
				}
			});
		}
	};

	// 获取跟进信息
	toGetProcessList=() => {
		const { source: { id } } = this.props;
		processList({ id }).then((res) => {
			const { data, code } = res;
			if (code === 200) {
				this.setState({
					processSource: data || [],
					loadingList: false,
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
	handlePushSave =() => {
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
		pushSave(clearEmpty(param))
			.then((res) => {
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
			})
			.catch(() => {
				this.setState({ loadingChild: false });
			});
		return true;
	};

	// 新增推送信息
	handleProcessSave =(toProcess) => {
		const {
			loading, recovery, expend, remark, remindTime, remindWay, pushList, status, addStatus,
		} = this.state;
		const { source: { id, index, recovery: _recovery }, onRefresh, onClose } = this.props;

		// 未点击 新增跟进记录 直接关闭弹窗
		if (!addStatus) { onClose(); return false; }


		const param = toProcess === 15 ? {
			monitorId: id,
			process: 15,
		} : clearEmpty({
			monitorId: id,
			process: status,
			recovery,
			expend,
			content: remark,
			remindingTime: remindTime ? new Date(remindTime).format('yyyy-MM-dd') : '',
			remindSetIdList: pushList.length > 0 ? pushList : '',
			remindType: remindType(remindWay),
		});

		// 字段校验
		if (toProcess !== 15) {
			if (!param.remindingTime && param.remindType) {
				return message.error('已选择提醒方式，提醒时间不能为空', 2);
			}
			if (param.remindingTime && !param.remindType) {
				return message.error('已填写提醒时间，提醒方式不能为空', 2);
			}
			if ((param.remindType === 3 || param.remindType === 2) && !param.remindSetIdList) {
				return message.error('当推送方式勾选，短信/邮件，推送人不能为空', 2);
			}
		}

		// // 未变动校验中。。。
		// if (Object.keys(param).length === 2 && param.monitorId && param.process && toProcess !== 15) {
		// 	// console.log('未变动', process, toStatus({ process }), _param.process);
		// 	if ((process === 3 || process === 6) && param.process === 6) {
		// 		if (onClose) { onClose(); }
		// 		return true;
		// 	}
		// }

		// req 阶段
		if (loading) return false;
		this.setState({ loading: true });
		processSave(param)
			.then((res) => {
				const { code } = res;
				if (code === 200) {
					message.success('添加跟进信息成功！');
					const _rec = ((_recovery > -1 ? _recovery : 0) + Number(param.recovery || 0)) || -1;
					// console.log(_recovery, param.recovery, _rec);
					if (param.recovery > 0 && onRefresh) {
						onRefresh({
							id,
							recovery: _rec,
							index,
						}, 'recovery');
					}
					if (onRefresh)onRefresh({ id, process: toProcess || status, index }, 'process');
					if (onClose) { onClose(); }
				} else {
					this.setState({ loading: false });
					message.error(res.message || '网络异常请稍后再试！');
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
		return true;
	};

	// 删除推送记录
	handleStepConfirm=(item, index) => {
		const { id } = item;
		const { processSource } = this.state;
		processDel({ id }).then((res) => {
			if (res.code === 200) {
				message.success('跟进记录删除成功！');
				const _processSource = JSON.parse(JSON.stringify(processSource));
				_processSource.splice(index, 1);
				this.setState({ processSource: _processSource });
			} else {
				message.error(res.message || '跟进记录删除失败，请稍后再试！');
			}
		}).catch(() => {
			message.error('网络异常请稍后再试');
		});
	};

	render() {
		const {
			loading, loadingChild, loadingList, dataSource, processSource, addStatus, remark, pushList,
		} = this.state;
		const {
			visible, onClose, source: { process }, source,
		} = this.props;
		const data = this.state;
		const plainOptions = [
			{ label: '系统提醒', value: 'system' },
			{ label: '短信/邮件', value: 'email' },
		];

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
			[global.GLOBAL_MEIE_BROWSER ? 'onpropertychange' : 'oninput']: ((val) => {
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
				title="资产跟进信息"
				visible={visible}
				width="600"
				className="yc-follow-model"
				maskClosable={false}
				onCancel={onClose}
				footer={[
					<p className="yc-public-floatLeft">
						{
							process !== 15 ? <Btn type="warning-text" size="normal" onClick={() => this.handleProcessSave(15)}>放弃跟进</Btn> : ''
						}
					</p>,
					<Button key="back" type="ghost" size="large" onClick={onClose}>取 消</Button>,
					<Btn
						type="primary"
						loading={loading}
						size="large"
						onClick={() => this.handleProcessSave()}
						style={{ width: 100 }}
						title="确定"
					/>,
				]}
			>
				<div className="yc-assets-follow-body" id="yc-assets-follow-body">
					<div className="yc-follow-add">
						{
							addStatus ? (
								<div className="follow-content">
									<div className="follow-add-title">跟进信息</div>
									<div className="list-height-hr" />
									<li className="follow-list-item">
										<div className="list-item-title">收入金额(元)：</div>
										<div className="list-item-content">
											<Input
												style={{ width: '100%' }}
												{...getField('recovery')}
												placeholder="请输入收入金额"
												maxlength={10}
												onBlur={() => document.activeElement.blur()}
											/>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">支出金额(元)：</div>
										<div className="list-item-content">
											<Input
												style={{ width: '100%' }}
												{...getField('expend')}
												placeholder="请输入支出金额"
												maxlength={10}
												onBlur={() => document.activeElement.blur()}
											/>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">备注：</div>
										<div className="list-item-content">
											<Input type="textarea" rows={5} {...getFieldIE('remark')} placeholder="请输入" maxlength={160} />
											<span className="remark-count">{`${remark ? remark.length : 0}/160`}</span>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">提醒时间：</div>
										<div className="list-item-content">
											<DatePicker
												{...getField('remindTime')}
												getCalendarContainer={getContainer}
												disabledDate={(time) => {
													if (!time) {
														return false;
													}
													return time.getTime() <= new Date().getTime();
												}}
											/>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">提醒方式：</div>
										<div className="list-item-content">
											<Checkbox.Group
												options={plainOptions}
												{...getField('remindWay', {
													onChange: (val) => {
														if (val.indexOf('email') !== -1) this.toGetPushList();
														return true;
													},
												})}
											/>
										</div>
									</li>
									{
										data.remindWay.indexOf('email') !== -1 ? (
											<li className="follow-list-item">
												<div className="list-item-title">推送人：</div>
												<div className="list-item-content">
													<p>
														<Select
															multiple
															style={{ width: '100%' }}
															placeholder="请选择相关推送人（最多选择3个）"
															getPopupContainer={getContainer}
															{...getField('pushList', {
																onChange: (val) => {
																	if (val.length <= 3) return true;
																	message.error('相关推送人最多选择3个');
																	return false;
																},
															})}
														>
															{
																dataSource.map(item => (
																	<Select.Option key={item.id} value={item.id}>
																		<span className="select-option-name">{item.name}</span>
																		<span className="select-option-mark" style={{ marginLeft: 10 }}>{markContent(item)}</span>
																	</Select.Option>
																))
															}
														</Select>
													</p>
													<p style={{ marginTop: 3, fontSize: 0 }}>
														<Input
															placeholder="请输入姓名"
															style={{ width: 78, marginRight: 3 }}
															className="item-class"
															{...getField('add_name')}
														/>
														<Select
															defaultValue={0}
															style={{ width: 94, marginRight: 3 }}
															className="item-class"
															getPopupContainer={getContainer}
															{...getField('add_type')}
														>
															<Select.Option value={0}>系统账号</Select.Option>
															<Select.Option value={1}>非系统账号</Select.Option>
														</Select>
														<Select
															defaultValue={1}
															style={{ width: 60, marginRight: 3 }}
															className="item-class"
															getPopupContainer={getContainer}
															{...getField('add_way', {
																onChange: (val, oldValue) => {
																	if (val !== oldValue) {
																		this.setState({ add_content: '' });
																	}
																	return true;
																},
															})}
														>
															<Select.Option value={1}>手机</Select.Option>
															<Select.Option value={2}>邮箱</Select.Option>
														</Select>
														<Input
															placeholder={data.add_way === 1 ? '请输入手机号' : '请输入邮箱'}
															style={{ width: 120, marginRight: 3 }}
															className="item-class"
															ref={e => this.DOM = e}
															{...getField('add_content')}
															onBlur={this.onAddContentBlurEvent}
														/>
														<Button
															style={{ width: 66 }}
															className="item-class"
															loading={loadingChild}
															onClick={this.handlePushSave}
															disabled={pushList.length >= 3}
														>
															保存
														</Button>
													</p>
													<p style={{ overflow: 'hidden' }}>
														<div className="yc-follow-line" style={{ margin: '3px 0' }} />
														<div style={{ textAlign: 'right', lineHeight: '16px' }}>
															{linkDom('#/organization', '推送设置中心')}
														</div>
													</p>
												</div>
											</li>
										) : null
									}

									<li className="follow-list-item">
										<div className="list-item-title">跟进状态：</div>
										<div className="list-item-content">
											<Radio.Group {...getField('status')}>
												<Radio key="a" value={6}>跟进中</Radio>
												<Radio key="b" value={9}>完成跟进</Radio>
												{/* <Radio key="c" value={15}>放弃跟进</Radio> */}
											</Radio.Group>
										</div>
									</li>
								</div>
							) : (
								<div
									className="follow-add-title cursor-pointer"
									onClick={() => this.setState({
										addStatus: true,
										status: toStatus(source),
									})}
								>
									<IconType type="icon-add" style={{ color: '#1c80e1', marginRight: 10 }} />
									<span>添加跟进信息</span>
								</div>
							)
						}
					</div>
					{
						process !== 0 ? <div className="yc-follow-line" /> : ''
					}
					{
						process !== 0 ? (
							<div className="yc-follow-list">
								<Spin visible={loadingList} minHeight={100}>
									<div className="follow-add-title">跟进记录</div>
									{
										processSource.length ? (
											<Steps direction="vertical" size="small" className="follow-list-step">
												{
													processSource.map((item, index) => (
														<Steps.Step
															status="process"
															title={([
																<span>{item.username}</span>,
																<PopConfirm
																	placement="leftBottom"
																	title="确定删除这条记录吗？"
																	onConfirm={() => this.handleStepConfirm(item, index)}
																>
																	<Icon type="delete" className="list-step-title-icon" />
																</PopConfirm>,
																<span
																	className={`list-step-title-mark-status mark-status-${item.process}`}
																>
																	{ProcessTran(item.process)}
																</span>,
																<span className="list-step-title-mark-time">
																	{item.updateTime ? new Date(item.updateTime * 1000).format('yyyy-MM-dd hh:mm:ss') : ''}
																</span>,
															])}
															icon="clock-circle"
															description={<StepDesc {...item} />}
														/>
													))
												}
											</Steps>
										) : <div>暂无跟进记录</div>
									}
								</Spin>
							</div>
						) : null
					}

				</div>
			</Modal>
		);
	}
}
