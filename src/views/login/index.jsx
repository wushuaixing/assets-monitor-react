/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { navigate } from '@reach/router';
import { Form, Modal } from 'antd';
import Cookies from 'universal-cookie';
import {
	bankConf, // 个性配置
} from '@/utils/api/user';
import CustomAgency from '@/common/custom/agency';
// import leftBackground from '@/assets/img/login/left_background.png';
import { getQueryByName } from '@/utils';
import { checkSpecialIp, specialLogin } from '@/utils/api';
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
const cookie = new Cookies();

function closeWindow() {
	if (navigator.userAgent.indexOf('MSIE') > 0) {
		if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
			window.opener = null;
			window.close();
		} else {
			window.open('', '_top');
			window.top.close();
		}
	} else if (navigator.userAgent.indexOf('Firefox') > 0) {
		window.location.href = 'about:blank ';
	} else {
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
	cookie.remove('isSpecial');
}

function ModalWarning(text) {
	Modal.warning({
		title: '提示',
		className: 'yc-close-waring',
		content: text,
		okText: '我知道了',
		onOk() {
			closeWindow();
		},
	});
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			phoneNum: '',
			btnColor: '#1C80E1',
			imgUrl: undefined,
			imgLoading: false,
			isShow: false,
		};
	}

	componentWillMount() {
		const orgId = getQueryByName(window.location.href, 'orgId');
		this.onRequestLogin(orgId);
		window.onhashchange = this.changeUrl;
	}

	componentDidMount() {
		global.REQ_STATUS = '';
		bankConf().then((_res) => {
			if (_res.code === 200) {
				this.setState({
					btnColor: _res.data.btnColor,
					imgUrl: _res.data.url,
				});
			} else {
				this.setState({
					imgLoading: true,
				});
			}
		});
	}

	changeUrl = (e) => {
		const orgId = getQueryByName(e.newURL, 'orgId');
		if ((e.newURL !== e.oldURL) && orgId) {
			this.onRequestLogin(orgId);
		}
	};

	changeType = (childType) => {
		this.setState({
			type: childType,
		});
	};

	inputPhoneNum = (num) => {
		this.setState({
			phoneNum: num,
		});
	};

	onRequestLogin = (orgId) => {
		checkSpecialIp().then((res) => {
			const { code, data } = res;
			if (code === 200 && data) {
				cookie.set('isSpecial', true);
				this.handleLogin(orgId);
			} else {
				this.setState({
					isShow: true,
				});
				cookie.remove('isSpecial');
			}
		}).catch((error) => {
			console.log(error);
		});

		// if (orgId) {
		// 	cookie.remove('token');
		// 	checkSpecialIp().then((res) => {
		// 		// 判断是否是专线
		// 		if (res.code === 200 && res.data) {
		// 			cookie.set('isSpecial', true);
		// 			this.handleLogin(orgId);
		// 		} else {
		// 			this.setState({
		// 				isShow: true,
		// 			});
		// 			cookie.set('isSpecial', false);
		// 			ModalWarning('权限不足，未开通专线');
		// 		}
		// 	}).catch(() => this.setState({
		// 		isShow: true,
		// 	}));
		// } else {
		// 	cookie.remove('isSpecial');
		// 	this.setState({
		// 		isShow: true,
		// 	});
		// }
	};

	// 手动登录
	handleLogin = (orgId) => {
		specialLogin({ idList: [orgId] }).then((res) => {
			if (res.code === 200 && res.data.token) {
				// message.success('登录成功');
				cookie.set('token', res.data.token);
				global.PORTRAIT_INQUIRY_ALLOW = res.data.isPortraitLimit;
				if (res.data.rules && res.data.rules.length) {
					navigate('/');
				} else {
					this.setState({
						isShow: true,
					});
				}
			} else {
				this.setState({
					isShow: true,
				});
			}
		}).catch(() => {
			this.setState({
				isShow: true,
			});
		});
	};

	render() {
		const {
			type, phoneNum, btnColor, imgUrl, imgLoading, isShow,
		} = this.state;
		return isShow && (
			<div className="yc-login">
				<Header imgLoading={imgLoading} imgUrl={imgUrl} />
				<div className="yc-login-wapper">
					<div className="yc-login-content">
						<CustomAgency nodeName="loginPic" />
						{/* <img className="yc-login-left-img" src={leftBackground} alt="" /> */}
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
				<Footer />
			</div>
		);
	}
}

export default createForm()(Login);
