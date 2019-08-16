/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import Form from 'antd/lib/form';
import Header from './header';
import Footer from './footer';
import Register from './register';
import VerifyAccount from './forgetPassword/verifyAccount';
import WriteCode from './forgetPassword/writeCode';
import ChangePassword from './forgetPassword/changePassword';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			phoneNum: '',
		};
	}

	changeType = (childType) => {
		console.log(childType);

		this.setState({
			type: childType,
		});
	};

	inputPhoneNum = (num) => {
		this.setState({
			phoneNum: num,
		});
	}

	render() {
		const { type, phoneNum } = this.state;
		return (
			<div className="yc-login">
				<Header />
				<div className="yc-login-wapper">
					<div className="yc-login-content">
						{/* 登录页面 */}
						{
							type === 1 && <Register changeType={this.changeType} />
						}
						{/* 忘记密码验证吗界面 */}
						{
							type === 2 && <VerifyAccount inputPhoneNum={this.inputPhoneNum} changeType={this.changeType} />
						}
						{/* 填写手机验证码 */}
						{
							type === 3 && <WriteCode phoneNum={phoneNum} changeType={this.changeType} />
						}
						{/* 修改密码 */}
						{
							type === 4 && <ChangePassword />
						}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default createForm()(Login);
