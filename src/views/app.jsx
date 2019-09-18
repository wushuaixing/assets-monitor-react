import React from 'react';
import { Router } from '@reach/router';
import { message } from 'antd';
import MainScreen from './main-screen';
import LoginScreen from './login';
import NoPermission from './noPermission';
import './main.scss';

message.config({
	top: 300,
});
const BaseRouter = () => (
	<Router mode="hash" className="yc-router">
		<MainScreen path="/*" />
		<LoginScreen path="login/*" />
		<NoPermission path="noPermission/*" />
	</Router>
);
export default BaseRouter;
