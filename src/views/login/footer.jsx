/** 登录页 * */

import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form,
} from 'antd';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import './style.scss';

const createForm = Form.create;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div className="yc-login-footer">
				<div className="yc-footer-content">
					<span className="yc-footer-text">
						<span className="yc-footer-img" />
							杭州源诚科技有限公司  技术支持
					</span>
					<span className="yc-footer-text">
							Copyright © 2018 杭州源诚科技有限公司 浙ICP备17030014号
					</span>
				</div>
			</div>
		);
	}
}

export default createForm()(Login);
