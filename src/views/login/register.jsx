/** 登录页 * */
import React from 'react';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
import {
	Form, Button, message, Spin, Input, Tabs,
} from 'antd';
import { Icon } from '@/common';
import {
	login, // login
	loginPreCheck, // 登录前校验
	getVerificationCode, // 获取手机验证码
	loginPhoneCode, // 手机验证码登录
} from '@/utils/api/user';
import BASE_URL from '@/utils/api/config';
import rsaEncrypt from '@/utils/encrypt';
import { handleRule, debounce } from '@/utils';
import CustomAgency from '@/common/custom/agency';
import PasswordModal from './passwordModal';
import './style.scss';

const cookie = new Cookies();
const createForm = Form.create;
const verificationCodeImg = `${BASE_URL}/yc/open/verificationCode`;
const { TabPane } = Tabs;

class Login extends React.Component {
	constructor(props) {
		super(props);
		document.title = '用户登录';
		this.state = {
			loading: false,
			rememberPassword: cookie.get('rememberPassword'),
			codeImg: verificationCodeImg,
			passwordModalVisible: false,
			accountVisible: false,
			codeStatus: false,
			autocompleteType: 'off',
			verifyCodeStatus: 'sendBefore', // sendBefore,获取验证码，sending 60s后重新发送 sendAfter 重新发送
			second: 60,
			sendBtnTxt: '获取验证码',
			type: 'username', // username 密码登录，phone 手机验证码登录
			username: '',
			phone: '',
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const { type } = this.state;
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/ant-form-item-control/.test(className) && type === 'username') {
				this.handleSubmitAccount();
				document.activeElement.blur();
			} else if (/ant-form-item-control/.test(className) && type === 'phone') {
				this.handleSubmitPhone();
				document.activeElement.blur();
			}
		}
	};

	// 记住密码
	checkboxChange = (e) => {
		cookie.set('rememberPassword', e.target.checked, { SameSite: 'none' });
		this.setState({
			rememberPassword: e.target.checked,
		});
	};

	// error = () => {
	// 	Modal.error({
	// 		title: <span className="error-title">账号过期提醒</span>,
	// 		className: 'error-modal',
	// 		content: <div className="error-content">
	// 			<div>账号已过期，建议添加微信。</div>
	// 			<div>客服微信:180-7294-2900（同电话）</div>
	// 		</div>,
	// 	});
	// };

	// 密码登录的登录点击事件
	handleSubmitAccount = () => {
		const { rememberPassword } = this.state;
		const {
			form,
		} = this.props;
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const beforeLogin = {
			username: fields.username,
			random: (Math.random().toString(36).slice(-8)),
		};
		const params = {
	    username: fields.username,
			imageVerifyCode: fields.imageVerifyCode,
			password: rsaEncrypt(fields.password),
		};
		form.validateFields(['username', 'password'], (errors) => {
			if (errors) {
				return;
			}
			this.setState({
				loading: false,
			});
			const { codeStatus: status } = this.state;
			loginPreCheck(beforeLogin).then((_res) => {
				if (_res.code === 200) {
					const { mustVerifyImageCode, errorTime } = (_res.data) || {};
					this.setState({
						// errorTime,
						codeStatus: mustVerifyImageCode,
					});
					if (errorTime >= 3 && !status) return;
					login(params).then((res) => {
						if (res.code === 200) {
							cookie.remove('isSpecial');
							if (rememberPassword === 'false') {
								cookie.remove('userName');
							} else {
								cookie.set('userName', fields.username);
							}
							message.success('登录成功');
							cookie.set('token', res.data.token);
							cookie.set('firstLogin', res.data.firstLogin);
							cookie.set('versionUpdate', res.data.versionUpdate);
							const rule = handleRule(res.data.rules);
							global.PORTRAIT_INQUIRY_ALLOW = res.data.isPortraitLimit;
							// 判断是否是第一次登录
							if (res.data.firstLogin === true) {
								navigate('/change/password');
							} else {
								this.setState({
									loading: false,
								});
								if (rule.menu_zcwj) {
									// navigate('/monitor?process=-1');
									navigate('/');
								} else if (rule.menu_xxss) {
									navigate('/');
								} else {
									navigate('/');
								}
							}
						} else if (res.code === 15002) {
							this.setState({
								loading: false,
								accountVisible: true,
							}, () => {
								// this.error();
							});
						} else {
							if (res.data && res.data.errorTime > 4) {
								if (res.data.errorTime >= 10) {
									message.warning(res.message);
									return;
								}
								message.warning(`账号密码错误，您还可以尝试${res.data.errorTimeLeft}次`);
							} else {
								message.error(res.message);
							}
							this.verificationCode();
							this.setState({
								loading: false,
								codeStatus: res.data.errorTime >= 3,
							}, () => {
								this.verificationCode();
							});
						}
					}).catch(() => {
						// message.error('服务器出错');
						this.setState({
							loading: false,
						});
					});
				}
			});
		});
	};

	// 手机验证码登录的登录点击事件
	handleSubmitPhone = () => {
		const { form } = this.props;
		console.log(Math.random().toString(36).slice(-8));
		const fields = form.getFieldsValue();
		const validatorArray = fields.phone ? ['verifyCode'] : ['phone'];
		form.validateFields(validatorArray, (errors) => {
			if (errors) {
				return;
			}
			const wechatSmsLogin = {
				mobile: fields.phone,
				mobileCode: fields.verifyCode,
			};
			loginPhoneCode(wechatSmsLogin).then((res) => {
				if (res.code === 200) {
					cookie.remove('isSpecial');
					message.success('登录成功');
					cookie.set('token', res.data.token);
					cookie.set('firstLogin', res.data.firstLogin);
					cookie.set('versionUpdate', res.data.versionUpdate);
					global.PORTRAIT_INQUIRY_ALLOW = res.data.isPortraitLimit;
					// 判断是否是第一次登录
					if (res.data.firstLogin === true) {
						navigate('/change/password');
					} else {
						navigate('/');
					}
				} else if (res.data && res.data.errorTime > 4) {
					if (res.data.errorTime >= 10) {
						message.warning(res.message);
						return;
					}
					message.warning(`账号密码错误，您还可以尝试${res.data.errorTimeLeft}次`);
				} else if (res.code === 15002) {
					this.setState({
						accountVisible: true,
					});
				} else {
					message.error(res.message);
				}
			}).catch(() => { });
		});
	};

	verificationCode = () => {
		// const imgs = server.get(`${verificationCodeImg}?${Math.random()}`);
		this.setState({
			codeImg: `${verificationCodeImg}?${Math.random()}`,
		});
	};

	// eslint-disable-next-line consistent-return
	sendVerifyCode = () => {
		const { form } = this.props;
		const { verifyCodeStatus } = this.state;
		if (verifyCodeStatus === 'sending') return false;
		const fields = form.getFieldsValue();
		const params = {
			mobile: fields.phone,
		};
		// 校验手机号是否正确,
		// eslint-disable-next-line consistent-return
		form.validateFields(['phone'], (errors) => {
			if (errors) {
				return false;
			}
			getVerificationCode(params).then((res) => {
				if (res.code === 200) {
					this.ticker = setInterval(() => {
						const { second } = this.state;
						if (second <= 0) {
							clearInterval(this.ticker);
							this.setState({
								second: 60,
								verifyCodeStatus: 'sendAfter',
								sendBtnTxt: '重新发送',
							});
						} else {
							this.setState({
								second: second - 1,
								verifyCodeStatus: 'sending',
								sendBtnTxt: `${second}s后重新发送`,
							});
						}
					}, 1000);
				} else if (res.code === 15002) {
					this.setState({
						accountVisible: true,
					});
				}
			}).catch(() => {
				this.setState({
					loading: false,
				});
			});
		});
	};

	clearInputValue = (type) => {
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { resetFields, getFieldsValue } = form;
		const fields = getFieldsValue();
		if (type === 'first') {
			if (fields.username && fields.username.length) {
				resetFields(['username']);
				this.setState({
				});
			}
		}

		if (type === 'second') {
			if (fields.password && fields.password.length) {
				resetFields(['password']);
				this.setState({

				});
			}
		}
	};

	// 打开修改密码弹框
	openModal = () => {
		this.setState({
			passwordModalVisible: true,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			passwordModalVisible: false,
		});
	};

	// 切换tab点击事件
	onChangeTab = (val) => {
		const { form } = this.props;
		const { getFieldsValue, setFieldsValue } = form;
		const fields = getFieldsValue();
		this.setState({
			type: val === '1' ? 'username' : 'phone',
		});
		// 当切换验证码登录的时候，获取密码登录的账号
		if (val === '2') {
			this.setState({
				username: fields.username,
			});
			setFieldsValue({ phone: fields.username });
		} else {
			this.setState({
				phone: fields.phone,
			});
			setFieldsValue({ username: fields.phone });
		}
	};

	render() {
		const {
			loading, codeImg, passwordModalVisible, codeStatus, autocompleteType, sendBtnTxt, verifyCodeStatus, username, phone, accountVisible,
		} = this.state;
		const {
			form: { getFieldProps }, changeType, btnColor,
		} = this.props;
		// const fields = getFieldsValue();
		// const passWordType = fields.password && fields.password.length > 0 ? 'password' : inputType;
		const imgCodeHeight = codeStatus && 424;
		// 判断ie8到11
		const isIe = document.documentMode === 8 || document.documentMode === 9 || document.documentMode === 10 || document.documentMode === 11;
		const nodeProps = {
			accountVisible,
			onCancel: () => this.setState({ accountVisible: false }),
		};
		const isSpecial = cookie.get('isSpecial');
		return (
			<React.Fragment>
				{
					!isSpecial && (
					<div style={{ height: imgCodeHeight }} className="yc-login-main">
						<div style={{ opacity: 0, height: 0, display: 'none' }}>
							<input type="text" />
							<input type="password" />
						</div>
						<Spin spinning={loading}>
							<Tabs defaultActiveKey="1" className="tabType" onChange={this.onChangeTab}>
								<TabPane tab="密码登录" key="1">
									<Form>
										<div className="yc-form-wrapper" style={{ paddingTop: 30 }}>
											<Form.Item>
												<Icon
													type="icon-username"
													className="yc-form-icon"
												/>
												<Input
													className="yc-login-input"
													placeholder="请输入11位数字"
													maxLength="11"
													autocomplete="new-password"
													type="text"
													style={{ fontSize: 14 }}
													// value={userName}
													{...getFieldProps('username', {
														initialValue: phone,
														validateTrigger: isIe ? 'onBlur' : 'onChange',
														// getValueFromEvent: event => event.target.value.replace(/[\u4E00-\u9FA5]/g, ''),
														rules: [
															{
																required: true,
																message: '请输入用户名',
															},
															// {
															// 	pattern: /^[^\s]*$/,
															// 	message: '请勿输入空格',
															// },
															{
																pattern: new RegExp('^[0-9a-zA-Z-]{1,}$', 'g'),
																message: '请勿输入空格,中文和特殊字符',
															},
														],
													})}
												/>
											</Form.Item>
										</div>
										<div className="yc-form-wrapper">
											<Form.Item>
												<Icon
													type="icon-password"
													className="yc-form-icon"
													style={{ fontSize: 19 }}
												/>
												<Input
													type="text"
													autocomplete="new-password"
													style={{
														opacity: 0,
														height: 0,
														display: 'none',
													}}
												/>
												<Input
													className="yc-login-input"
													type="password"
													autocomplete={autocompleteType}
													placeholder="请输入密码"
													maxLength="20"
													style={{ fontSize: 14 }}
													titleWidth={40}
													{...getFieldProps('password', {
														validateTrigger: isIe ? 'onBlur' : 'onChange',
														rules: [
															{
																required: true,
																message: '请输入密码',
															},
														],
													})}
												/>
											</Form.Item>
										</div>
										{
											codeStatus && (
												<div className="yc-form-wrapper">
													<Form.Item>
														<Icon type="icon-resetImg" className="yc-form-icon" />
														<Input
															className="yc-login-input"
															placeholder="请输入验证码"
															titleWidth={40}
															maxLength="4"
															titleIcon
															{...getFieldProps('imageVerifyCode', {
																validateTrigger: isIe ? 'onBlur' : 'onChange',
																rules: [
																	{
																		required: true,
																		message: '请输入验证码',
																	},
																],
															})}
														/>
														<img onClick={this.verificationCode} className="yc-verificationCode" src={codeImg} alt="" referrerpolicy="no-referrer" />
													</Form.Item>
												</div>
											)
										}
										<div className="yc-login-clearfix">
											<li className="yc-checked">
												<div className="yc-checked-right">
													<span onClick={() => changeType(2)} className="yc-forget-password">忘记密码？</span>
												</div>
											</li>
										</div>
										<Button
											type="primary"
											className="yc-login-btn"
											onClick={debounce(this.handleSubmitAccount, 300)}
											style={{
												backgroundColor: btnColor,
												border: `1px solid ${btnColor}`,
											}}
										>
											登录
										</Button>
									</Form>
								</TabPane>
								<TabPane tab="验证码登录" key="2">
									<Form>
										<div className="yc-form-wrapper" style={{ paddingTop: 30 }}>
											<Form.Item className="verifyInput">
												<Icon
													type="icon-tel"
													className="yc-form-icon"
												/>
												<Input
													className="yc-login-input"
													placeholder="请输入手机号"
													maxLength="11"
													autocomplete="new-password"
													type="text"
													style={{ fontSize: 14 }}
													{...getFieldProps('phone', {
														initialValue: username,
														validateTrigger: isIe ? 'onBlur' : 'onChange',
														// getValueFromEvent: event => event.target.value.replace(/[\u4E00-\u9FA5]/g, ''),
														rules: [
															{
																required: true,
																message: '请输入手机号',
															},
															{
																pattern: new RegExp(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, 'g'),
																message: '手机号格式不正确',
															},
														],
													})}
												/>
											</Form.Item>
										</div>
										<div className="yc-form-wrapper">
											<Form.Item className="verifyInput">
												<Icon
													type="icon-resetImg"
													className="yc-form-icon"
													style={{ fontSize: 19 }}
												/>
												<Input
													type="text"
													autocomplete="new-password"
													style={{
														opacity: 0,
														height: 0,
														display: 'none',
													}}
												/>
												<Input
													className="yc-login-input"
													type="number"
													autocomplete={autocompleteType}
													placeholder="请输入验证码"
													maxLength="20"
													style={{ fontSize: 14 }}
													titleWidth={40}
													{...getFieldProps('verifyCode', {
														validateTrigger: isIe ? 'onBlur' : 'onChange',
														rules: [
															{
																required: true,
																message: '请输入验证码',
															},
														],
													})}
												/>
												<span onClick={this.sendVerifyCode} className={`sendVerifyCode sendVerifyCode-${verifyCodeStatus}`}>
													{sendBtnTxt}
												</span>
											</Form.Item>
										</div>
										<Button
											type="primary"
											className="yc-login-btn-phone"
											onClick={debounce(this.handleSubmitPhone, 300)}
											style={{
												backgroundColor: btnColor,
												border: `1px solid ${btnColor}`,
											}}
										>
											登录
										</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Spin>
						{/** 修改密码Modal */}
						{passwordModalVisible && (
						<PasswordModal
							onCancel={this.onCancel}
							onOk={this.onOk}
							passwordModalVisible={passwordModalVisible}
						/>
						)}
						{/** 账号过期弹窗 */}
						{
							accountVisible && (
								<CustomAgency nodeName="overdueAccount" nodeProps={{ ...nodeProps }} />
							)
						}
					</div>
					)
				}
			</React.Fragment>
		);
	}
}

export default createForm()(Login);
