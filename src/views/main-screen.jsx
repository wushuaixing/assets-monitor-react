import React from 'react';
import { Router } from '@reach/router';

/* 子路由模块  */
import Home from './home';
import Monitor from './monitor';
import Business from './business';
import Company from './company';
import Search from './search';
import Organization from './organization';
import Message from './message';

import { Header, Container, Footer } from '@/common/layout';

const MainScreen = () => (
	<React.Fragment>
		<Header />
		<Container>
			<Router mode="hash">
				<Home path="/*" />
				<Monitor path="monitor/*" />
				<Business path="business/*" />
				<Company path="company/*" />
				<Search path="search/*" />
				<Organization path="organization/*" />
				<Message path="message/*" />
			</Router>
		</Container>
		<Footer />
	</React.Fragment>

);

export default MainScreen;
