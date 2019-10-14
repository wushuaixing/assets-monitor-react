/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form } from 'antd';
import Header from './header';
import Footer from './footer';
import Register from './register';
import VerifyAccount from './forgetPassword/verifyAccount';
import WriteCode from './forgetPassword/writeCode';
import ChangePassword from './forgetPassword/changePassword';
import {
	bankConf, // 个性配置
} from '@/utils/api/user';
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
			btnColor: '#384482',
			imgUrl: undefined,
		};
	}

	componentDidMount() {
		bankConf().then((_res) => {
			if (_res.code === 200) {
				this.setState({
					btnColor: _res.data.btnColor,
					imgUrl: _res.data.url,
				});
			}
		});
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
		const {
			type, phoneNum, btnColor, imgUrl,
		} = this.state;

		return (
			<div>
				<div className="yc-login">
					<Header imgUrl={imgUrl} />
					<div className="yc-login-wapper">
						<div className="yc-login-content">
							{/* 登录页面 */}
							{
							type === 1 && <Register btnColor={btnColor} changeType={this.changeType} />
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
							type === 4 && <ChangePassword changeType={this.changeType} />
						}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default createForm()(Login);
