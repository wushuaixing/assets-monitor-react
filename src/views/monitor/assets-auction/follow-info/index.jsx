import React from 'react';
import {
	Modal, Button, Icon, Steps, Select, InputNumber, Input, DatePicker, Checkbox, Radio, message,
} from 'antd';
import { Spin } from '@/common';
import { linkDom } from '@/utils';
import {
	pushList, pushSave, processList, processSave,
} from '@/utils/api/monitor-info/assets-follow';
import './style.scss';

export default class FollowInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addStatus: false,
			loading: false,
			loadingList: true,
			loadingChild: false,
			dataSource: [],
			processSource: [],
			incomeMoney: '',
			expendMoney: '',
			remark: '',
			remindTime: '',
			remindWay: '',
			pushList: [],
			status: 1,
			add_name: '',
			add_type: 1,
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

	onChangeValue=(val, field) => {
		const value = val.target ? val.target.value : val;
		this.setState({
			[field]: value,
		});
	};

	onAddContentBlurEvent=(val) => {
		const value = val.target ? val.target.value : val;
		const data = this.state;
		console.log('add_way:', data.add_way);
		console.log('value:', value);
	};

	// 获取推送人列表
	toGetPushList=() => {
		const { dataSource } = this.state;
		if (dataSource.length === 0) {
			pushList({ num: 20, page: 1 }).then((res) => {
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
					processSource: data.list,
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

	};

	// 新增推送信息
	handleProcessSave =() => {

	};

	render() {
		const {
			loading, loadingChild, loadingList, dataSource, processSource, addStatus,
		} = this.state;
		const { visible, onClose, source: { process } } = this.props;
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
				footer={[
					<Button key="back" type="ghost" size="large" onClick={onClose}>取 消</Button>,
					<Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
						{'确 定'}
					</Button>,
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
											<InputNumber
												style={{ width: '100%' }}
												{...getField('incomeMoney')}
												placeholder="请输入收入金额"
												min={1}
												max={999999999999}
												onBlur={() => document.activeElement.blur()}
											/>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">支出金额(元)：</div>
										<div className="list-item-content">
											<InputNumber
												style={{ width: '100%' }}
												{...getField('expendMoney')}
												placeholder="请输入支出金额"
												min={1}
												max={999999999999}
												onBlur={() => document.activeElement.blur()}

											/>
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">备注：</div>
										<div className="list-item-content">
											<Input type="textarea" rows={5} {...getField('remark')} />
										</div>
									</li>
									<li className="follow-list-item">
										<div className="list-item-title">提醒时间：</div>
										<div className="list-item-content">
											<DatePicker
												{...getField('remindTime')}
												getCalendarContainer={getContainer}
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
																	<Select.Option key={item.id} value={item.name} label={item.name + item.phone}>
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
															style={{ width: 80, marginRight: 3 }}
															className="item-class"
															{...getField('add_name')}
														/>
														<Select
															defaultValue={1}
															style={{ width: 94, marginRight: 3 }}
															className="item-class"
															getPopupContainer={getContainer}
															{...getField('add_type')}
														>
															<Select.Option value={1}>系统账号</Select.Option>
															<Select.Option value={2}>非系统账号</Select.Option>
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
														<Button style={{ width: 66 }} className="item-class" loading={loadingChild}>保存</Button>
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
											<Radio.Group value={1}>
												<Radio key="a" value={1}>跟进中</Radio>
												<Radio key="b" value={2}>完成跟进</Radio>
												<Radio key="c" value={3}>放弃跟进</Radio>
											</Radio.Group>
										</div>
									</li>
								</div>
							) : (
								<div
									className="follow-add-title"
									onClick={() => this.setState({
										addStatus: true,
									})}
								>
									<Icon type="plus-circle" />
									<span>添加跟进信息</span>
								</div>
							)
						}
					</div>
					<div className="yc-follow-line" />
					{
						process !== 0 ? (
							<div className="yc-follow-list">
								<Spin visible={loadingList}>
									<div className="follow-add-title">跟进记录</div>
									<Steps direction="vertical" size="small" className="follow-list-step">
										{
											processSource.map(item => (
												<Steps.Step
													status="process"
													title={`步骤${item}`}
													icon="clock-circle"
													description="这里是多信息的描述"
												/>
											))
										}
									</Steps>
								</Spin>
							</div>
						) : null
					}

				</div>
			</Modal>
		);
	}
}
