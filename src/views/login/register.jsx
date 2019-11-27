/** 登录页 * */

import React from 'react';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Input, Button, Checkbox, message, Spin, Icon,
} from 'antd';
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

		};
	}

	componentDidMount() {
		const rememberPassword = cookie.get('rememberPassword');
		if (rememberPassword === 'true') {
			const userName = cookie.get('userName');
			this.setState({
				userName,
			});
		}
	}

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
								cookie.set('userName', fields.username, { SameSite: 'none' });
							}
							message.success('登陆成功');
							cookie.set('token', res.data.token, { SameSite: 'none' });
							cookie.set('firstLogin', res.data.firstLogin, { SameSite: 'none' });
							const rule = handleRule(res.data.rules);

							// 判断是否是第一次登录
							if (res.data.firstLogin === true) {
								navigate('/changepassword');
							} else {
								this.setState({
									loading: false,
								});
								if (rule.menu_jkxx) {
									navigate('/monitor?process=-1');
								} else if (rule.menu_xxss) {
									navigate('/search');
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

	onKeyup = (e) => {
		if (e.keyCode === 13) {
			this.handleSubmit();
		}
	};

	render() {
		const {
			loading, userName, rememberPassword, codeImg, passwordModalVisible, errorTime,
		} = this.state;
		const {
			form: { getFieldProps }, changeType, btnColor,
		} = this.props; // 会提示props is not defined

		return (

			<div className="yc-login-main">

				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">用户登录</li>
						<div className="yc-form-wapper">
							<Form.Item>
								<Input
									className="yc-login-input"
									placeholder="请输入11位数字"
									// addonBefore={<img style={{ height: 20, width: 18 }} src={imgTel} alt="" />}
									maxlength="11"
									// onInput={e => this.changeValue(e)}
									// onFocus={e => this.changeValue(e)}
									// onBlur={e => this.PasswordBlur(e)}

									{...getFieldProps('username', {
										initialValue: userName && userName.length > 0 ? userName : '',
										rules: [
											{
												required: true,
												message: '请输入用户名',
											},
										],
									})}
								/>
								<Icon className="yc-login-clearIcon" type="cross-circle" clearInputValue={() => this.clearInputValue('first')} />
								<span className="yc-form-userName yc-form-icon" />
							</Form.Item>
						</div>
						<div className="yc-form-wapper">
							<Form.Item>
								<Input
									className="yc-login-input"
									type="password"
									placeholder="请输入密码"
									onKeyUp={this.onKeyup}
									// onBlur={e => this.PasswordBlur(e)}
									// onFocus={e => this.PasswordFoucs(e)}
									{...getFieldProps('password', {
										// initialValue: true,
										rules: [
											{
												required: true,
												message: '请输入密码',
											},
										],
									})}
								/>
								<span className="yc-form-passWord yc-form-icon" />
							</Form.Item>
						</div>
						{
							errorTime >= 2 && errorTime < 10 && (
							<div className="yc-form-wapper">
								<Form.Item>
									<Input
										className="yc-login-input"
										placeholder="请输入验证码"
										{...getFieldProps('imageVerifyCode', {
											rules: [
												{
													required: true,
													message: '请输入验证码',
												},
											],
										})}
									/>
									<span className="yc-form-resetImg yc-form-icon" />
									<img onClick={this.verificationCode} className="yc-verificationCode" src={codeImg} alt="" referrerPolicy="no-referrer" />
								</Form.Item>
							</div>
							)
									}
						<div className="yc-login-clearfix">
							<li className="yc-checked">
								<div className="yc-checked-left">
									<Checkbox defaultChecked={rememberPassword === 'true'} onChange={this.checkboxChange}>
										下次自动登录
									</Checkbox>
								</div>
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
