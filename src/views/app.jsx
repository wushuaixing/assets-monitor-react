import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';

const LoginScreen = () => (
	<div>登录页面</div>
);


const BaseRouter = () => (
	<Router mode="hash">
		<MainScreen path="/*" />
		<LoginScreen path="login/*" />
	</Router>
);
export default BaseRouter;
