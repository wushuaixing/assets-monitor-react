import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';
import LoginScreen from './login';

const BaseRouter = () => (
	<Router mode="hash">
		<MainScreen path="/*" />
		<LoginScreen path="login/*" />
	</Router>
);
export default BaseRouter;
