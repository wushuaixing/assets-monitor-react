import React from 'react';
import { Router } from '@reach/router';

/* 子路由模块  */
import Home from './home';
import Monitor from './monitor';
import Business from './business';
// import Company from './company';
import Search from './search';
import Organization from './organization';
import Message from './message';
import { Spin } from '@/common';
import { Header, Container, Footer } from '@/common/layout';
import { authRule } from '@/utils/api';

const toRule = (props, tag) => {
	const { rule } = props;
	let res = false;
	rule.forEach((item) => {
		if (item.groupName === tag)res = true;
	});
	return res;
};

const ruleList = (props) => {
	const l = [];
	if (toRule(props, 'menu_jkxx'))l.push(<Monitor path="monitor/*" rule="menu_jkxx" />);
	if (toRule(props, 'menu_ywgl'))l.push(<Business path="business/*" rule="menu_ywgl" />);
	if (toRule(props, 'menu_xxss'))l.push(<Search path="search/*" rule="menu_xxss" />);
	if (toRule(props, 'menu_jjgl'))l.push(<Organization path="organization/*" rule="menu_jjgl" />);
	l.push(<Message path="message/*" />);
	return l;
};

const MainScreen = props => (
	<React.Fragment>
		<Header {...props} />
		<Container>
			<Router mode="hash">
				<Home path="/*" />
				{
					ruleList(props).map(item => item)
				}
			</Router>
		</Container>
		<Footer />
	</React.Fragment>
);

export default class Screen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			rule: [],
		};
	}

	componentWillMount() {
		authRule().then((res) => {
			if (res.code === 200) {
				this.setState({
					loading: false,
					rule: res.data.orgPageGroups,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}

	componentWillUnmount() {
		const { loading } = this.state;
		console.log('componentWillUnmount:', loading);
	}

	render() {
		const { loading, rule } = this.state;
		if (!loading) {
			return <MainScreen rule={rule} />;
		}
		return <Spin visible={loading} text=" "><div style={{ height: 500 }} /></Spin>;
	}
}
