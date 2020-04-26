import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';
import LoginPage from './login';

export default class BaseRouter extends React.PureComponent {
	render() {
		return (
			<Router mode="hash" className="yc-router">
				<MainScreen path="/*" remark="主路由" />
				<LoginPage path="login/*" remark="登录页面" />
			</Router>
		);
	}
}
