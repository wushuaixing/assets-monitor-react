import React from 'react';
import { Router, navigate } from '@reach/router';
import Cookies from 'universal-cookie';
/* 子路由模块  */
import Home from './home';
import Monitor from './monitor';
import Business from './business';
// import Company from './company';
import Search from './search';
import Organization from './organization';
import Message from './message';
import Changepassword from './changPassword';
import { Spin, Button } from '@/common';
import { Header, Container, Footer } from '@/common/layout';
import { authRule } from '@/utils/api';
import { handleRule } from '@/utils';
// import Error403 from '@/assets/img/error/404@2x.png';
// import Error404 from '@/assets/img/error/404@2x.png';
import Error500 from '@/assets/img/error/500@2x.png';

const cookie = new Cookies();

// // 处理路由数据
// const handleRule = (source) => {
// 	const res = {};
// 	source.forEach((item) => {
// 		switch (item.groupName) {
// 		case 'menu_sy':
// 			res.menu_sy = {
// 				id: 1,
// 				groupName: item.groupName,
// 				title: '首页',
// 				rule: item.rule,
// 			};
// 			break;
// 		case 'menu_jkxx':
// 			if (res.menu_jkxx) {
// 				res.menu_jkxx.children[item.rule] = item;
// 			} else {
// 				res.menu_jkxx = {
// 					id: 2,
// 					groupName: item.groupName,
// 					title: '监控信息',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 			break;
// 		case 'menu_gsgg':
// 			if (res.menu_jkxx) {
// 				res.menu_jkxx.children[item.rule] = item;
// 			} else {
// 				res.menu_jkxx = {
// 					id: 2,
// 					groupName: item.groupName,
// 					title: '监控信息',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 			break;
// 		case 'menu_ywgl':
// 			if (res.menu_ywgl) {
// 				res.menu_ywgl.children[item.rule] = item;
// 			} else {
// 				res.menu_ywgl = {
// 					id: 3,
// 					groupName: item.groupName,
// 					title: '业务管理',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 			break;
// 		case 'menu_qycx':
// 			res.menu_qycx = {
// 				id: 'menu_qycx',
// 				groupName: item.groupName,
// 				title: '企业查询',
// 				rule: item.rule,
// 			};
// 			break;
// 		case 'menu_xxss':
// 			if (res.menu_xxss) {
// 				res.menu_xxss.children[item.rule] = item;
// 			} else {
// 				res.menu_xxss = {
// 					id: 5,
// 					groupName: item.groupName,
// 					title: '信息查询',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 			break;
// 		case 'menu_jjgl':
// 			if (res.menu_jjgl) {
// 				res.menu_jjgl.children[item.rule] = item;
// 			} else {
// 				res.menu_jjgl = {
// 					id: 6,
// 					groupName: item.groupName,
// 					title: '机构管理',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 			break;
// 		default:
// 			if (res.else) {
// 				res.else.children[item.rule] = item;
// 			} else {
// 				res.else = {
// 					id: 7,
// 					title: '其他',
// 					children: {
// 						[item.rule]: item,
// 					},
// 				};
// 			}
// 		}
// 	});
// 	return res;
// };

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
	l.push(<Changepassword path="changepassword/*" />);
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
			navigate('/changepassword');
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
		if (props.location.hash !== '#/changepassword' && firstLogin === 'ture') {
			navigate('/changepassword');
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
