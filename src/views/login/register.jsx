/** 登录页 * */

import React from 'react';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Button, message, Spin,
} from 'antd';
import { Input, Icon } from '@/common';
import {
	login, // login
	loginPreCheck, // 登录前校验
} from '@/utils/api/user';
import BASE_URL from '@/utils/api/config';
import rsaEncrypt from '@/utils/encrypt';
import PasswordModal from './passwordModal';
import { handleRule } from '@/utils';
import './style.scss';

const verificationCodeImg = `${BASE_URL}/yc/open/verificationCode`;

const cookie = new Cookies();
const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		document.title = '用户登录';
		this.state = {
			loading: false,
			rememberPassword: cookie.get('rememberPassword'),
			userName: '',
			codeImg: verificationCodeImg,
			passwordModalVisible: false,
			errorTime: '',
			inputType: 'text',
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
		const rememberPassword = cookie.get('rememberPassword');
		if (rememberPassword === 'true') {
			const userName = cookie.get('userName');
			this.setState({
				userName,
			});
		}
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
		this.setState = () => null;
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
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
	handleSubmit = () => {
		const { rememberPassword } = this.state;
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		const beforeLogin = {
			username: fields.username,
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

			loginPreCheck(beforeLogin).then((_res) => {
				if (_res.code === 200) {
					console.log(_res);
					this.setState({
						errorTime: _res.data && _res.data.errorTime,
					});

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

							// 判断是否是第一次登录
							if (res.data.firstLogin === true) {
								navigate('/change/password');
							} else {
								this.setState({
									loading: false,
								});
								if (rule.menu_zcwj) {
									navigate('/monitor?process=-1');
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

	verificationCode = () => {
		// const imgs = server.get(`${verificationCodeImg}?${Math.random()}`);
		this.setState({
			codeImg: `${verificationCodeImg}?${Math.random()}`,
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

	render() {
		const {
			loading, userName, codeImg, passwordModalVisible, errorTime, inputType,
		} = this.state;
		const {
			form: { getFieldProps, getFieldsValue }, changeType, btnColor,
		} = this.props; // 会提示props is not definedC
		const fields = getFieldsValue();
		const passWordType = fields.password && fields.password.length > 0 ? 'password' : inputType;
		return (
			<div className="yc-login-main" style={errorTime >= 2 && errorTime < 10 && { height: 424 }}>

				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">用户登录</li>
						<div className="yc-form-wapper">
							<Form.Item>
								<Icon
									type="icon-username"
									className="yc-form-icon"
								/>
								<Input
									className="yc-login-input"
									placeholder="请输入11位数字"
									maxLength="11"
									// title={(<span className="yc-form-userName yc-form-icon" />)}
									titleWidth={40}
									titleIcon
									style={{ fontSize: 14 }}
									unSplitLine
									{...getFieldProps('username', {
										initialValue: userName && userName.length > 0 ? userName : '',
										rules: [
											{
												required: true,
												message: '请输入用户名',
											},
											{
												pattern: /^[^\s]*$/,
												message: '禁止输入空格',
											},
										],
										// getValueFromEvent: e => e.replace(/\s+/g, ''),
									})}
								/>
							</Form.Item>
						</div>
						<div className="yc-form-wapper">
							<Form.Item>
								<Icon
									type="icon-password"
									className="yc-form-icon"
									style={{ fontSize: 19 }}
								/>
								<Input
									className="yc-login-input"
									type={global.GLOBAL_MEIE_BROWSER ? 'password' : passWordType}
									// type={fields.password ? inputType : 'password'}
									placeholder="请输入密码"
									maxLength="16"
									// onKeyUp={this.onKeyup}
									style={{ fontSize: 14 }}
									titleWidth={40}
									titleIcon
									unSplitLine
									{...getFieldProps('password', {
										// initialValue: true,
										onChange: () => {
											this.setState({
												inputType: 'password',
											});
										},
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
							errorTime >= 2 && errorTime < 10 && (
							<div className="yc-form-wapper">
								<Form.Item>
									<Icon
										type="icon-resetImg"
										className="yc-form-icon"
									/>
									<Input
										className="yc-login-input"
										placeholder="请输入验证码"
										titleWidth={40}
										titleIcon
										{...getFieldProps('imageVerifyCode', {
											rules: [
												{
													required: true,
													message: '请输入验证码',
												},
											],
										})}
									/>
									{/* <span className="yc-form-resetImg yc-form-icon" /> */}
									<img onClick={this.verificationCode} className="yc-verificationCode" src={codeImg} alt="" referrerPolicy="no-referrer" />
								</Form.Item>
							</div>
							)
									}
						<div className="yc-login-clearfix">
							<li className="yc-checked">
								{/* <div className="yc-checked-left"> */}
								{/*	<Checkbox defaultChecked={rememberPassword === 'true'} onChange={this.checkboxChange}> */}
								{/*		下次自动登录 */}
								{/*	</Checkbox> */}
								{/* </div> */}
								<div className="yc-checked-right">
									<span onClick={() => changeType(2)} className="yc-forget-password">忘记密码？</span>
								</div>
							</li>
						</div>
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit} style={{ backgroundColor: btnColor, border: `1px solid ${btnColor}` }}>登录</Button>
					</Spin>
				</Form>
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
