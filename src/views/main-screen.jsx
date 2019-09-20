import React from 'react';
import { Router, navigate } from '@reach/router';
import Cookies from 'universal-cookie';
/* 子路由模块  */
import Home from './home';
import Monitor from './asset-excavate';
import Risk from './risk-mointor';
import Business from './business';
// import Company from './company';
import Search from './search';
import Organization from './organization';
import Message from './message';
import ChangePassword from './changPassword';
import { Spin, Button } from '@/common';
import { Header, Container, Footer } from '@/views/_layoutView';
import { authRule } from '@/utils/api';
import { handleRule } from '@/utils';
import Error500 from '@/assets/img/error/500@2x.png';

const cookie = new Cookies();

// 返回路由表
const ruleList = (props) => {
	const l = [];
	const { rule } = props;
	if (rule.menu_sy)l.push(<Home path="/*" rule={rule.menu_sy} />);
	if (rule.menu_jkxx)l.push(<Monitor path="monitor/*" rule={rule.menu_jkxx} />);
	if (rule.menu_ywgl)l.push(<Business path="business/*" rule={rule.menu_ywgl} />);
	if (rule.menu_xxss)l.push(<Search path="search/*" rule={rule.menu_xxss} />);
	if (rule.menu_jjgl)l.push(<Organization path="organization/*" rule={rule.menu_jjgl} />);
	l.push(<Message path="message/*" />);
	l.push(<Risk path="risk/*" />);
	l.push(<ChangePassword path="change/password/*" />);
	return l;
};

const MainScreen = props => (
	<React.Fragment>
		<Header {...props} />
		<Container>
			<Router mode="hash">
				{ ruleList(props).map(item => item) }
			</Router>
		</Container>
		<Footer />
	</React.Fragment>
);

export default class Screen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: 'show',
			rule: [],
			errorCode: '',
		};
	}

	componentWillMount() {
		// 判断是否是第一次登录
		const firstLogin = cookie.get('firstLogin');
		if (firstLogin === 'true') {
			navigate('/change/password');
		}
		this.clientHeight = 500 || document.body.clientHeight;
		// console.log('componentWillMount:', document.body.clientHeight);
		authRule().then((res) => {
			if (res.code === 200) {
				this.setState({
					loading: 'hidden',
					rule: handleRule(res.data.orgPageGroups),
					errorCode: res.code,
				});
			} else {
				this.setState({
					loading: 'error',
					errorCode: res.code,
				});
			}
		}).catch(() => {
			this.setState({
				loading: 'error',
				errorCode: 500,
			});
		});
	}

	componentWillReceiveProps(props) {
		// 判断是否是第一次登录
		// console.log('main-screen:componentWillReceiveProps');
		const firstLogin = cookie.get('firstLogin');
		if (props.location.hash !== '#/change/password' && firstLogin === 'ture') {
			navigate('/change/password');
		}
	}

	render() {
		const { loading, rule, errorCode } = this.state;
		if (loading === 'show') {
			return <Spin visible={loading} text=" " transparent><div style={{ height: this.clientHeight || 500 }} /></Spin>;
		}
		if (loading === 'hidden') {
			return <MainScreen rule={rule} />;
		}
		if (loading === 'error') {
			return (
				<div style={{ padding: 150 }} className="yc-error-page">
					<div className="yc-error-content">
						<img src={Error500} alt="" className="yc-error-img" />
						<div className="yc-error-text">
							<li className="error-code">{errorCode}</li>
							<li className="error-text">抱歉，服务器出错了</li>
							<Button title="返回登录页面" style={{ width: 120 }} onClick={() => navigate('/login')} />
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
