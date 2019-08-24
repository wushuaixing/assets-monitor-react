/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================

import {
	Form, Input, Button, Spin, Popover, message,
} from 'antd';
import CommonIcon from './compontent/commonIcon';
import {
	forgetPasswordStep3, // 修改密码
} from '@/utils/api/user';
import './style.scss';

const FormItem = Form.Item;
const createForm = Form.create;
const regx = /^[ \x21-\x7E]{6,20}$/; // 判断6到20的字符
const numAndWorld = /^(?=[a-zA-Z]*.*[0-9])(?=[0-9]*.*[a-zA-Z])[a-zA-Z0-9 \x21-\x7E]{2,}$/; // 必须包涵数字和字母
const regx1 = /^[\x21-\x7Ea-zA-Z0-9]{1,}$/; // 无标点空格

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			PopoverVisible: false,
			againPasswordVisible: false,
			firstClearIcon: false,
			secondClearIcon: false,
			firstVali: null, // 第一次～第四次验证判断
			secondVali: null,
			thirdVali: null,
			fouthVali: null,
			againText: '请再次输入密码',
		};
	}

	// ===========
	// 新密码验证

	// 第一个输入框
	handleNewPassword= () => {
		this.setState({
			PopoverVisible: true,
		});
	};

	// 实时输入新密码
	changeValue = (e) => {
		const newWorld = e.target.value;
		// 第1个节点变化，判断是否正确
		if (!regx.test(newWorld)) {
			this.setState({
				firstVali: false,
			});
		} else {
			this.setState({
				firstVali: true,
			});
		}
		// 第2个节点变化，判断是否正确
		if (!numAndWorld.test(newWorld)) {
			this.setState({
				secondVali: false,
			});
		} else {
			this.setState({
				secondVali: true,
			});
		}
		// 第3个节点变化，判断是否正确
		if (!regx1.test(newWorld)) {
			this.setState({
				thirdVali: false,
			});
		} else {
			this.setState({
				thirdVali: true,
			});
		}
		// 重置输入样式
		if (newWorld.length === 0) {
			this.setState({
				firstVali: null, // 第一次～第四次验证判断
				secondVali: null,
				thirdVali: null,
				firstClearIcon: false,
			});
		} else {
			this.setState({
				firstClearIcon: true,
			});
		}
	};

	onBlurValue = (e) => {
		const newWorld = e.target.value;
		setTimeout(() => {
			this.setState({
				firstClearIcon: false,
			});
		}, 200);

		// 三个都输入正确时
		if (regx.test(newWorld) && numAndWorld.test(newWorld) && regx1.test(newWorld)) {
			this.setState({
				PopoverVisible: false,
			});
		}
	};

	newPasswordFoucs = (e) => {
		const newWorld = e.target.value;
		if (!newWorld) {
			this.setState({
				PopoverVisible: false,
			});
		}
		// 三个都输入正确时
		if (newWorld.length === 0) {
			this.setState({
				firstVali: null, // 第一次～第四次验证判断
				secondVali: null,
				thirdVali: null,
			});
		} else {
			this.setState({
				firstClearIcon: true,
			});
		}
	};
	// ============


	// ============
	// 再次输入密码
	// 第二个
	handleAgainPassword = () => {
		this.setState({
			againPasswordVisible: true,
		});
	};

	againPasswordValue = (e) => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				fouthVali: true,
				againText: '两次密码输入一致',
			});
		} else {
			this.setState({
				fouthVali: false,
				againText: '密码不一致，请重新输入',
			});
		}
		// 重置输入样式
		if (e.target.value.length === 0) {
			this.setState({
				fouthVali: null,
			});
		} else {
			this.setState({
				secondClearIcon: true,
			});
		}
	};

	onAgainBlurValue = () => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		setTimeout(() => {
			this.setState({
				secondClearIcon: false,
			});
		}, 200);
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				againPasswordVisible: false,
			});
		}
	};

	againPasswordFoucs = (e) => {
		const {
			form: { getFieldsValue },
		} = this.props; // 会提示props is not defined
		const fields = getFieldsValue();
		if (fields.newPassword === fields.newPasswordAgain) {
			this.setState({
				fouthVali: true,
				againText: '两次密码输入一致',
			});
		} else {
			this.setState({
				fouthVali: false,
				againText: '密码不一致，请重新输入',
			});
		}

		if (e.target.value.length === 0) {
			this.setState({
				fouthVali: null,
				againText: '请再次输入密码',
			});
		} else {
			this.setState({
				secondClearIcon: true,
			});
		}
	};

	// ============

	clearInputValue = (type) => {
		const {
			form,
		} = this.props; // 会提示props is not defined
		const { resetFields, getFieldsValue } = form;
		const fields = getFieldsValue();
		if (type === 'first') {
			if (fields.newPassword && fields.newPassword.length) {
				resetFields(['newPassword']);
				this.setState({
					firstVali: null, // 第一次～第四次验证判断
					secondVali: null,
					thirdVali: null,
					PopoverVisible: false,
				});
			}
		}

		if (type === 'second') {
			if (fields.newPasswordAgain && fields.newPasswordAgain.length) {
				resetFields(['newPasswordAgain']);
				this.setState({
					fouthVali: null,
					againText: '请再次输入密码',
					againPasswordVisible: false,
				});
			}
		}
	};

	handleSubmit = () => {
		const {
			form, changeType,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			if (errors) {
				return;
			}
			const firstWorld = fields.newPassword;
			const newWorld = fields.newPasswordAgain;
			// && numAndWorld.test(newWorld) && regx1.test(newWorld)
			console.log(regx, newWorld, regx.test(newWorld));

			// 两次密码要输入一致
			if (firstWorld !== newWorld) {
				message.error('两次密码不一致');
				return;
			}
			if (!regx.test(newWorld)) {
				message.error('长度6-20位字符');
				return;
			}
			if (!numAndWorld.test(newWorld)) {
				message.error('同时包含数字、字母');
				return;
			}
			if (!regx1.test(newWorld)) {
				message.error('不支持空格');
				return;
			}
			const params = {
				newPassword: fields.newPasswordAgain,
			};
			forgetPasswordStep3(params).then((res) => {
				if (res.code === 200) {
					const hide = message.loading('验证成功,两秒后跳转跳转登录页面...', 0);
					// 异步手动移除
					setTimeout(() => {
						changeType(1);
					}, 2000);
					setTimeout(hide, 2000);
				} else {
					message.error(res.message);
				}
			});
		});
	};

	render() {
		const {
			loading, userName, PopoverVisible, againPasswordVisible, firstVali, secondVali, thirdVali, fouthVali, againText, firstClearIcon, secondClearIcon,
		} = this.state;
		const {
			form: { getFieldProps },
		} = this.props; // 会提示props is not defined
		const popverTypes = (type) => {
			let popverType;
			if (type === true) {
				popverType = 'yc-poprver-true';
			} else if (type === false) {
				popverType = 'yc-poprver-false';
			} else {
				popverType = null;
			}
			return popverType;
		};
		// ===========
		// 新密码验证
		const newPassword = (
			<div>
				<p className={popverTypes(firstVali)}>• 长度6-20位字符 </p>
				<p className={popverTypes(secondVali)}>• 同时包含数字、字母</p>
				<p className={popverTypes(thirdVali)}>• 不支持空格</p>
			</div>
		);
		// ============

		// ============
		// 再次输入密码
		const newAgainPassword = (
			<div>
				<p className={popverTypes(fouthVali)}>{againText}</p>
			</div>
		);
		// ==========
		return (

			<div className="yc-changePassword-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">设置新密码</li>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">新密码</span>
							<FormItem>
								<Popover
									content={newPassword}
									trigger="click"
									visible={PopoverVisible}
									onVisibleChange={this.handleNewPassword}
									placement="right"
									className="yc-form-popover"
								>
									<Input
										type="password"
										autocomplete="off"
										className="yc-login-input"
										placeholder="请输入新密码"
										maxlength="20"
										onInput={e => this.changeValue(e)}
										onBlur={e => this.onBlurValue(e)}
										onFocus={e => this.newPasswordFoucs(e)}
										// onFocus={e => this.newPasswordFoucs(e)}
										{...getFieldProps('newPassword', {
											initialValue: userName && userName.length > 0 ? userName : '',
										// rules: [
										// 	{
										// 		required: true,
										// 		message: '请输入账号',
										// 	},
										// ],
										})}
									/>
								</Popover>
								{firstClearIcon && <CommonIcon clearInputValue={() => this.clearInputValue('first')} />}
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">确认新密码</span>
							<FormItem>
								<Popover
									content={newAgainPassword}
									trigger="click"
									visible={againPasswordVisible}
									onVisibleChange={this.handleAgainPassword}
									placement="right"
									className="yc-form-popover"
								>
									<Input
										type="password"
										autocomplete="off"
										className="yc-login-input"
										placeholder="请再次输入新密码"
										maxlength="20"
										onInput={e => this.againPasswordValue(e)}
										onBlur={e => this.onAgainBlurValue(e)}
										onFocus={e => this.againPasswordFoucs(e)}
										{...getFieldProps('newPasswordAgain', {
										// rules: [
										// 	{
										// 		required: true,
										// 		message: '请输入验证码',
										// 	},
										// ],
										})}
									/>
								</Popover>
								{secondClearIcon && <CommonIcon clearInputValue={() => this.clearInputValue('second')} />}
							</FormItem>
						</div>
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit}>确定</Button>
					</Spin>
				</Form>
			</div>
		);
	}
}

export default createForm()(Login);
