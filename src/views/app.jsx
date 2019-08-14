import React from 'react';
import { Router } from '@reach/router';
// import Router from '@/utils/Router';
import LoginScreen from './login';
import Monitor from './monitor';
import { Header, Container, Footer } from '../common/layout';

const MainScreen = () => (
	<React.Fragment>
		<Header />
		<Container>
			<Monitor />
		</Container>
		<Footer />
	</React.Fragment>
);


const BaseRouter = () => (
	<Router mode="hash">
		<MainScreen path="/*" />
		<LoginScreen path="login/*" />
	</Router>
);
export default BaseRouter;


// const hashCheck = () => {
// 	const { hash } = window.location;
// 	return /#\/login/i.test(hash);
// };

// class Screen extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			regStatus: hashCheck(),
// 		};
// 	}
//
// 	componentDidMount() {
// 		window._addEventListener(window, 'hashchange', () => {
// 			const { hash } = window.location;
// 			console.log(hash);
// 			const regStatus = /#\/login/i.test(hash);
// 			this.setState({
// 				regStatus,
// 			});
// 			console.log('come from login!');
// 		});
// 	}
//
//
// 	render() {
// 		const { regStatus } = this.state;
// 		console.log('render:', regStatus);
// 		return regStatus ? <LoginScreen /> : <MainScreen />;
// 	}
// }
