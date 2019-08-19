/** 登录页 * */

import React from 'react';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
// ==================
// 所需的所有组件
// ==================
import Spin from 'antd/lib/spin';
import {
	Form, Input, Button, Checkbox, message,
} from 'antd';
import {
	login, // login
} from '@/utils/api/user';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const cookie = new Cookies();
const FormItem = Form.Item;
const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			rememberPassword: cookie.get('rememberPassword'),
			userName: '',
			errorNum: 0,
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
		cookie.set('rememberPassword', e.target.checked);
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
		const params = {
			...fields,
			// password: rsaEncrypt(fields.password),
			validCode: 123,
		};
		form.validateFields((errors) => {
			if (errors) {
				return;
			}
			this.setState({
				loading: true,
			});
			login(params).then((res) => {
				if (res.code === 200) {
					if (rememberPassword === 'false') {
						cookie.remove('userName');
					} else {
						cookie.set('userName', fields.username);
					}
					message.success('登陆成功');
					cookie.set('token', res.data.token);
					cookie.set('name', res.data.userName);
					cookie.set('roleCode', res.data.roleCode);
					navigate('/monitor');
				} else {
					message.error(res.message);
					this.setState({
						loading: false,
					});
				}
			}).catch(() => {
				message.error('服务器出错');
				this.setState({
					loading: false,
				});
			});
		});
	};

	render() {
		const {
			loading, userName, rememberPassword, errorNum,
		} = this.state;
		const {
			form: { getFieldProps }, changeType,
		} = this.props; // 会提示props is not defined

		return (

			<div className="yc-login-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">用户登录</li>
						<div className="yc-form-wapper">
							<FormItem>
								<Input
									className="yc-login-input"
									placeholder="请输入11位数字"
												// addonBefore={<img style={{ height: 20, width: 18 }} src={imgTel} alt="" />}
									maxlength="11"
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
								<span className="yc-form-userName yc-form-icon" />
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<FormItem>
								<Input
									className="yc-login-input"
									type="password"
									placeholder="请输入密码"
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
							</FormItem>
						</div>
						{
							errorNum >= 3 && (
							<div className="yc-form-wapper">
								<FormItem>
									<Input
										className="yc-login-input"
										placeholder="请输入验证码"
										{...getFieldProps('resetImg', {
											rules: [
												{
													required: true,
													message: '请输入验证码',
												},
											],
										})}
									/>
									<span className="yc-form-resetImg yc-form-icon" />
								</FormItem>
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
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit}>登录</Button>
					</Spin>
				</Form>
			</div>
		);
	}
}

export default createForm()(Login);
