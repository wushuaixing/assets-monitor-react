import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';
import LoginScreen from './login';
import NoPermission from './noPermission';

const BaseRouter = () => (
	<Router mode="hash" className="yc-router">
		<MainScreen path="/*" />
		<LoginScreen path="login/*" />
		<NoPermission path="noPermission/*" />
	</Router>
);
export default BaseRouter;
