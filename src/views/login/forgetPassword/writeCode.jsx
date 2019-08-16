/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import PhoneModal from './noPhoneModal';
import {
	sendVerificationSms, // login
} from '@/utils/api/user';
import './style.scss';

const FormItem = Form.Item;
const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			btnDisabled: false,
			phoneCode: '获取验证码',
			noPhoneModalVisible: false,
		};
	}

getCode = () => {
	let time = 60;
	this.setState({
		btnDisabled: true,
	});
	const {
		phoneNum,
	} = this.props;
	if (phoneNum) {
		sendVerificationSms(`phone: ${phoneNum}`); // 发送验证码
	} else {
		message.warning('手机号错误');
	}
	const timer = setInterval(() => {
		time -= 1;
		this.setState({
			phoneCode: `${time}s后重新发送`,
		});
		if (time === -1) {
			this.setState({
				phoneCode: '获取验证码',
				btnDisabled: false,
			});
			clearInterval(timer);
		}
	}, 1000);
};

openModal = () => {
	console.log(1);

	this.setState({
		noPhoneModalVisible: true,
	});
};

	handleSubmit = () => {
		const {
			form, changeType,
		} = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();
		form.validateFields((errors) => {
			console.log(errors);

			if (!fields.phoneCode) {
				message.error('请输入验证码');
				return;
			}
			console.log(fields);
			changeType(4);
		});
	};

	render() {
		const {
			loading, phoneCode, btnDisabled, noPhoneModalVisible,
		} = this.state;
		const {
			form: { getFieldProps }, phoneNum,
		} = this.props; // 会提示props is not defined

		return (

			<div className="yc-verifyAccount-main">
				<Form>
					<Spin spinning={loading}>
						<li className="yc-card-title">填写验证码</li>
						<div className="yc-form-wapper writeCode">
							<span className="yc-form-lable">手机号</span>
							<FormItem>
								<span className="yc-writeCode-phone">{phoneNum && phoneNum}</span>
								<Button disabled={btnDisabled} onClick={this.getCode} className="yc-form-writeCode">{phoneCode}</Button>
							</FormItem>
						</div>
						<div className="yc-form-wapper">
							<span className="yc-form-lable">验证码</span>
							<FormItem style={{ marginBottom: 16 }}>
								<Input
									className="yc-login-input"
									placeholder="请输入验证码"
									{...getFieldProps('phoneCode', {
										// rules: [
										// 	{
										// 		required: true,
										// 		message: '请输入验证码',
										// 	},
										// ],
									})}
								/>
							</FormItem>
						</div>
						<div onClick={this.openModal} className="yc-from-noPhone">手机号不可用?</div>
						<Button type="primary" className="yc-login-btn" onClick={this.handleSubmit}>下一步</Button>
					</Spin>
				</Form>
				{/** 新增跟进Modal */}
				{
                    noPhoneModalVisible && (
                    <PhoneModal noPhoneModalVisible={noPhoneModalVisible} onCancel={() => this.setState({ noPhoneModalVisible: false })} />
                    )}
			</div>
		);
	}
}

export default createForm()(Login);
