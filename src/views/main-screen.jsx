import React from 'react';
import { Router, navigate } from '@reach/router';
import Cookies from 'universal-cookie';
/* 子路由模块  */
import Loadable from '@/common/loadable';
import Home from './home';
// import Monitor from '@/views/asset-excavate';
// import Risk from './risk-monitor';
// import Business from './business';
// import Company from './company';
// import Search from './search';
import Message from './message';
import ChangePassword from './changPassword';
import { Spin, Button } from '@/common';
import { Header, Container, Footer } from '@/views/_layoutView';
import { authRule } from '@/utils/api';
import { handleRule } from '@/utils';
import Error500 from '@/assets/img/error/500@2x.png';

// 新的引用方式，分割代码，懒加载
const Monitor = Loadable(() => import('./asset-excavate'));
const Risk = Loadable(() => import('./risk-monitor'));
const Business = Loadable(() => import('./business'));
const Search = Loadable(() => import('./search'));
const Organization = Loadable(() => import('./organization'));
const Attention = Loadable(() => import('./my-attention'));
const Inquiry = Loadable(() => import('./portrait-inquiry'));

const cookie = new Cookies();

// 返回路由表
const ruleList = (props) => {
	const l = [];
	const { rule } = props;
	if (rule.menu_sy)l.push(<Home path="/*" rule={rule.menu_sy} baseRule={rule} />);
	if (rule.menu_zcwj)l.push(<Monitor path="monitor/*" rule={rule.menu_zcwj} baseRule={rule} />);
	if (rule.menu_fxjk)l.push(<Risk path="risk/*" rule={rule.menu_fxjk} baseRule={rule} />);
	if (rule.menu_ywgl)l.push(<Business path="business/*" rule={rule.menu_ywgl} baseRule={rule} />);
	if (rule.menu_hxcx)l.push(<Inquiry path="inquiry/*" rule={rule.menu_hxcx} baseRule={rule} />);
	if (rule.menu_xxss)l.push(<Search path="search/*" rule={rule.menu_xxss} baseRule={rule} />);
	if (rule.menu_jjgl)l.push(<Organization path="organization/*" rule={rule.menu_jjgl} baseRule={rule} />);
	l.push(<Attention path="my/attention/*" />);
	l.push(<Message path="message/*" />);
	l.push(<ChangePassword path="change/password/*" />);
	if (!rule.menu_sy) {
		l[0].props.path = '/*';
	}
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
			beforeToken: null,
			tokenText: '',
		};
	}

	componentWillMount() {
		// 判断是否是第一次登录
		const firstLogin = cookie.get('firstLogin');
		if (firstLogin === 'true') {
			navigate('/change/password');
		}
		const token = cookie.get('token');
		this.setState({
			beforeToken: token,
		});
		// if (!token) { navigate('/login'); return; }

		this.clientHeight = 500 || document.body.clientHeight;
		// console.log('componentWillMount:', document.body.clientHeight);
		authRule().then((res) => {
			if (res.code === 200) {
				const rule = handleRule(res.data.orgPageGroups);
				this.setState({
					loading: 'hidden',
					rule,
					errorCode: res.code,
					tokenText: res.message,
				});
				global.ruleSource = rule;
			} else {
				this.setState({
					loading: 'error',
					errorCode: res.code,
					tokenText: res.message,
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
		const { beforeToken } = this.state;
		const token = cookie.get('token');
		if (token !== beforeToken) {
			this.setState({
				loading: 'error',
				errorCode: '401',
				tokenText: '您的登录已过期，请重新登录',
			});
		}
		// 判断是否是第一次登录
		// console.log('main-screen:componentWillReceiveProps');
		const firstLogin = cookie.get('firstLogin');
		if (props.location && props.location.hash !== '#/change/password' && firstLogin === 'true') {
			this.setState({
				loading: 'hidden',
			});
			navigate('/change/password');
		}
	}

	render() {
		const {
			loading, rule, errorCode, tokenText,
		} = this.state;
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
							<li className="error-text">{tokenText || '抱歉，服务器出错了'}</li>
							<Button
								title="返回登录页面"
								style={{ width: 120 }}
								onClick={() => {
									navigate('/login');
									window.location.reload(); // 退出登录刷新页面
								}}
							/>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
