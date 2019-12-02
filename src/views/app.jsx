import React from 'react';
import { Router } from '@reach/router';
import MainScreen from './main-screen';
import LoginScreen from './login';
import NoPermission from './noPermission';
import placeholderFun from '@/utils/placeholder';

export default class BaseRouter extends React.PureComponent {
	componentDidMount() {
		placeholderFun();
	}

	componentWillReceiveProps() {
		placeholderFun();
	}

	render() {
		return (
			<Router mode="hash" className="yc-router">
				<MainScreen path="/*" />
				<LoginScreen path="login/*" />
				<NoPermission path="noPermission/*" />
			</Router>
		);
	}
}

// const BaseRouter = () => (
// 	<Router mode="hash" className="yc-router">
// 		<MainScreen path="/*" />
// 		<LoginScreen path="login/*" />
// 		<NoPermission path="noPermission/*" />
// 	</Router>
// );
// export default BaseRouter;
