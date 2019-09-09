import React from 'react';
import { navigate } from '@reach/router';

import HeaderMessage from './headerMessage/header-message';
import HeaderCenter from './headerCenter/header-center';
import Badge from '@/common/badge';
import logoImg from '@/assets/img/logo_white.png';
import {
	unreadCount,
} from '@/utils/api/inform';

const logoText = '源诚资产监控平台';
const toStatus = (rule, field) => {
	if (rule) {
		if (typeof field === 'string') {
			return Boolean(rule.children[field]);
		}
		let r = false;
		field.forEach((item) => {
			r = r || rule.children[item];
		});
		return Boolean(r);
	}
	return false;
};

const dataSource = (rule) => {
	const _RES = [];
	const base = [
		{
			id: 1,
			name: '首页',
			url: '/',
			status: rule.menu_sy,
		},
		{
			id: 2,
			name: '监控信息',
			url: '/monitor',
			status: rule.menu_jkxx,
			dot: false,
			children: [
				{
					id: 21,
					name: '资产拍卖',
					url: '/monitor',
					param: '?process=-1',
					status: toStatus(rule.menu_jkxx, 'jkxxzcpm'),
				},
				{
					id: 22,
					name: '代位权',
					url: '/monitor/subrogation',
					status: toStatus(rule.menu_jkxx, 'jkxxdwq'),
				},
				{
					id: 23,
					name: '金融资产',
					url: '/monitor/financial',
					status: toStatus(rule.menu_jkxx, ['jkxxjrzcgsxm', 'jkxxjrzcjjxm']),
				},
				{
					id: 24,
					name: '涉诉监控',
					url: '/monitor/lawsuits',
					status: toStatus(rule.menu_jkxx, 'jkxxssjk'),
				},
				{
					id: 25,
					name: '企业破产重组',
					url: '/monitor/bankruptcy',
					status: toStatus(rule.menu_jkxx, 'jkxxpccz'),
				},
				{
					id: 26,
					name: '公示公告',
					url: '/monitor/public',
					status: toStatus(rule.menu_jkxx, ['gsgg_tendering', 'gsgg_tax', 'gsgg_epb']),
				},
			],
		},
		{
			id: 3,
			name: '业务管理',
			url: '/business',
			status: rule.menu_ywgl,
			dot: false,
			children: [
				{
					id: 31,
					name: '业务视图',
					url: '/business',
					status: toStatus(rule.menu_ywgl, 'ywglywst'),
				},
				{
					id: 32,
					name: '债务人',
					url: '/business/debtor',
					status: toStatus(rule.menu_ywgl, 'ywglzwr'),
				},
			],
		},
		// {
		// 	id: 4,
		// 	name: '企业查询',
		// 	url: '/company',
		// 	status: rule.menu_qycx,
		// },
		{
			id: 5,
			name: '信息搜索',
			url: '/search',
			status: rule.menu_xxss,
		},
		{
			id: 6,
			name: '机构管理',
			url: '/organization',
			status: rule.menu_jjgl,
			dot: false,
			children: [
				{
					id: 61,
					name: '推送设置',
					url: '/organization',
					status: toStatus(rule.menu_jjgl, 'jggltssz'),
				},
				{
					id: 62,
					name: '账户列表',
					url: '/organization/user',
					status: toStatus(rule.menu_jjgl, 'jgglzhlb'),
				},
			],
		},
	// { id: 7, name: '登录页面', url: '/login' },
	];
	base.forEach((item) => {
		if (item.status) {
			const _item = {
				id: item.id,
				name: item.name,
				url: item.url,
				status: true,
				dot: item.dot,
			};
			if (item.children) {
				_item.children = item.children.filter(it => it.status);
				_item.url = `${_item.children[0].url}${_item.children[0].param}`;
			}
			_RES.push(_item);
		}
	});
	return _RES;
};

// 导航项目
const Item = (props) => {
	const {
		name, children, id, dot,
	} = props;
	const { set, active } = props;
	/**
	 * 点击路由跳转方法
	 * @param event 点击元素
	 * @param items 当前项参数
	 * @param parent 父项参数
	 */
	const toNavigate = (event, items, parent) => {
		navigate(`${items.url}${items.param ? items.param : ''}`);
		const _childId = children ? children[0].id : '';
		set({
			p: parent ? parent.id : items.id,
			c: parent ? items.id : _childId,
		});
		event.stopPropagation();
	};
	const parentChoose = active.p === id ? 'header-item-active' : 'header-item-normal';
	return (
		<li className={`header-item header-item-${id} ${parentChoose}`} onClick={e => toNavigate(e, props)}>
			<Badge dot={dot}>
				<span>{name}</span>
			</Badge>
			<ul className="header-child-item">
				{
					children && children.map(item =>	(
						<li
							className={`child-item ${active.c === item.id ? 'child-item-active' : 'child-item-normal'}`}
							key={item.id}
							onClick={e => toNavigate(e, item, props)}
						>
							{item.name}
						</li>
					))
					}
			</ul>
		</li>
	);
};

const defaultRouter = (source) => {
	const { hash } = window.location;
	const res = { p: '', c: '' };
	source.forEach((item) => {
		if (new RegExp(item.url).test(hash)) {
			if (item.children) {
				res.p = item.id;
				item.children.forEach((itemChild) => {
					if (new RegExp(itemChild.url).test(hash))res.c = itemChild.id;
				});
			} else {
				res.p = item.id;
			}
		}
	});
	if (new RegExp('/message').test(hash))res.p = 101;
	return res;
};

// Header 样式需求
export default class Headers extends React.Component {
	constructor(props) {
		super(props);
		this.source = dataSource(props.rule);
		this.state = {
			active: defaultRouter(this.source),
			config: dataSource(props.rule),
			num: '',
			data: [],
			Surplus: '', // 剩余未读数
		};
	}


	componentDidMount() {
		// const { hash } = window.location;
		// console.log(hash);

		window.scrollTo(0, 0);
		unreadCount().then((res) => {
			if (res.code === 200) {
				this.setState({
					Surplus: res.data,
				});
			}
		});
	}

	componentWillReceiveProps() {
		const { active } = this.state;
		const _active = defaultRouter(this.source);
		if (active !== _active) {
			this.setState({ active: _active });
		}
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
	}


	componentWillUnmount() {
		window.scrollTo(0, 0);
	}

	// 获取消息数量
	getNoticeNum = (data) => {
		this.setState({
			num: data,
		});
	};

	// 获取当前机构
	getData = (data) => {
		this.setState({
			data,
		});
	};

	render() {
		const {
			active, config, num, data, Surplus,
		} = this.state;

		return (
			<div className="yc-header-wrapper">
				<div
					className="yc-header-default"
					onClick={(e) => {
						// 禁止点击事件
						e.preventDefault();
						e.stopPropagation();
						return false;
					}}
				/>
				<div className="yc-header-content">
					<div className="header-logo">
						<img src={logoImg} alt="" />
						<span>{logoText}</span>
					</div>
					<div className="header-menu">
						{ config.map(items => (
							<Item
								key={items.id}
								{...items}
								set={val => this.setState({ active: val })}
								active={active}
							/>
						)) }
					</div>
					<div className="header-else">
						{
							data && data.expire && data.expire > 0 && (
							<div style={{ float: 'left' }}>
								<div className="yc-leftTime">
									帐号到期还剩：
									{data.expire}
									天
								</div>
								<div className="else-child else-line" />

							</div>
							)

						}
						<div
							className={`else-child else-notice ${active.p === 101 ? 'header-item-active' : 'header-item-normal'}`}
							onClick={(event) => {
								this.setState({ active: { p: 101, c: '' } });
								navigate('/message');
								event.stopPropagation();
							}}
						>
							<Badge dot={Surplus && Surplus > 0} style={{ top: 0, right: 0 }}>
								<div className="notice-icon yc-notice-img" />
							</Badge>
							<span className="notice-number">{num && num > 0 ? `(${num})` : ''}</span>
							<HeaderMessage getNoticeNum={this.getNoticeNum} mark="消息中心大概预览" />
						</div>
						{/* <HeaderMessage mark="消息中心大概预览" /> */}
						<div className="else-child else-line" />
						<div className="else-child else-username header-item-normal">
							<li className="else-child-li">
								您好，
								{data && data.name}
							</li>
							<li className="else-child-li">{data && data.orgName}</li>
							<HeaderCenter getData={this.getData} mark="个人中心大概" />
						</div>
						{/* <HeaderCenter mark="个人中心大概" /> */}
					</div>
				</div>
			</div>
		);
	}
}
// const Header = (props) => {
// 	const { rule } = props;
// 	const source = dataSource(rule);
// 	const [active, setActive] = useState(defaultRouter(source));
// 	useEffect(() => {
// 		// 滚动条手动置顶
// 		window.scrollTo(0, 0);
// 	});
// 	// const { rule } = props;
//
// 	return (
// 		<div className="yc-header-wrapper">
// 			<div className="yc-header-content">
// 				<div className="header-logo">
// 					<img src={logoImg} alt="" />
// 					<span>{logoText}</span>
// 				</div>
// 				<div className="header-menu">
// 					{ source.map(items => <Item key={items.id} {...items} set={setActive} active={active} />) }
// 				</div>
// 				<div className="header-else">
// 					<div
// 						className={`else-child else-notice ${active.p === 101 ? 'header-item-active' : 'header-item-normal'}`}
// 						onClick={(event) => {
// 							setActive({ p: 101, c: '' });
// 							navigate('/message');
// 							event.stopPropagation();
// 						}}
// 					>
// 						<Badge dot style={{ top: 0, right: 0 }}>
// 							<div className="notice-icon yc-notice-img" />
// 						</Badge>
// 						<span className="notice-number">(3226)</span>
// 						<HeaderMessage mark="消息中心大概预览" />
// 					</div>
// 					{/* <HeaderMessage mark="消息中心大概预览" /> */}
// 					<div className="else-child else-line" />
// 					<div className="else-child else-username header-item-normal">
// 						<li className="else-child-li">您好，崔九九</li>
// 						<li className="else-child-li"> 崔金鑫测试机构121</li>
// 						<HeaderCenter mark="个人中心大概" />
// 					</div>
// 					{/* <HeaderCenter mark="个人中心大概" /> */}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
//  Header;
