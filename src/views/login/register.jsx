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
} from '@/utils/api/user';
import BASE_URL from '@/utils/api/config';
import rsaEncrypt from '@/utils/encrypt';
import PasswordModal from './passwordModal';
import { handleRule, debounce } from '@/utils';
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
			codeStatus: false,
			autocompleteType: 'off',
			type: 'account',
			verifyCodeStatus: 'sendBefore',
			second: 60,
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/ant-form-item-control/.test(className)) {
				this.handleSubmit();
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

	// // const token = cookie.get('token'); // 获取token
	handleSubmitAccount = () => {
		const { rememberPassword } = this.state;
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		console.log(Math.random().toString(36).slice(-8));
		const beforeLogin = {
			username: fields.username,
			random: (Math.random().toString(36).slice(-8)),
		};
		const params = {
			...fields,
			password: rsaEncrypt(fields.password),
		};
		form.validateFields((errors) => {
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

	handleSubmitPhone = () => {
		const { form } = this.props;
		console.log(Math.random().toString(36).slice(-8));
		form.validateFields((errors) => {
			console.log('errors === ', errors);
			if (errors) {
				return;
			}
			this.setState({
				loading: false,
			});
		});
	};

	verificationCode = () => {
		// const imgs = server.get(`${verificationCodeImg}?${Math.random()}`);
		this.setState({
			codeImg: `${verificationCodeImg}?${Math.random()}`,
		});
	};

	sendVerifyCode = () => {
		const { verifyCodeStatus } = this.state;
		const ticker = setInterval(() => {
			if (this.state.second <= 0) {
				clearInterval(ticker);
				this.setState({
					second: 60,
					verifyCodeStatus: 'sendBefore',
				});
			} else {
				this.setState({
					second: this.state.second - 1,
				});
			}
		}, 1000);

		if (verifyCodeStatus === 'sendBefore') {
			this.setState({
				verifyCodeStatus: 'sendAfter',
			});
			if (this.state.second > 0) {
				ticker();
			} else {
				clearInterval(ticker);
				this.setState({
					second: 60,
					verifyCodeStatus: 'sendBefore',
				});
			}
		}
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

	onChangeTab = (val) => {
		this.setState({
			type: val === '1' ? 'account' : 'phone',
		});
	};

	render() {
		const {
			loading, codeImg, passwordModalVisible, codeStatus, autocompleteType, verifyCodeStatus, second,
		} = this.state;
		const {
			form: { getFieldProps }, changeType, btnColor,
		} = this.props;
		// const fields = getFieldsValue();
		// const passWordType = fields.password && fields.password.length > 0 ? 'password' : inputType;
		const imgCodeHeight = codeStatus && 424;
		// 判断ie8到11
		const isIe = document.documentMode === 8 || document.documentMode === 9 || document.documentMode === 10 || document.documentMode === 11;
		return (
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
									<Form.Item>
										<Icon
											type="icon-username"
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
												validateTrigger: isIe ? 'onBlur' : 'onChange',
												// getValueFromEvent: event => event.target.value.replace(/[\u4E00-\u9FA5]/g, ''),
												rules: [
													{
														required: true,
														message: '请输入手机号',
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
											placeholder="请输入验证码"
											maxLength="20"
											style={{ fontSize: 14 }}
											titleWidth={40}
											{...getFieldProps('verifyPwd', {
												validateTrigger: isIe ? 'onBlur' : 'onChange',
												rules: [
													{
														required: true,
														message: '请输入验证码',
													},
												],
											})}
										/>
										{
											verifyCodeStatus === 'sendBefore'
												?												(
													<span onClick={this.sendVerifyCode} className="sendVerifyCode">
														<a>发送验证码</a>
													</span>
												)
												 :												(
													<span className="resend">
														{second}
s之后重新发送
													</span>
												)
										}
									</Form.Item>
								</div>
								<Button
									type="primary"
									className="yc-login-btn"
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
			</div>
		);
	}
}

export default createForm()(Login);
