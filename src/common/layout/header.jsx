import React, { useState } from 'react';
import { navigate } from '@reach/router';

import HeaderMessage from './header-message';
import HeaderCenter from './header-center';

import Badge from '@/common/badge';
import logoImg from '@/assets/img/logo.png';

const logoText = '源诚资产监控平台';
const dataSource = [
	{ id: 1, name: '首页', url: '/' },
	{
		id: 2,
		name: '监控信息',
		url: '/monitor',
		warning: false,
		children: [
			{ id: 21, name: '资产拍卖', url: '/monitor?process=2' },
			{ id: 22, name: '代位权', url: '/monitor/subrogation' },
			{ id: 23, name: '金融资产', url: '/monitor/financial' },
			{ id: 24, name: '涉诉监控', url: '/monitor/lawsuits' },
			{ id: 25, name: '企业破产重组', url: '/monitor/bankruptcy' },
			{ id: 26, name: '公示公告', url: '/monitor/public' },
		],
	},
	{
		id: 3,
		name: '业务管理',
		url: '/business',
		warning: false,
		children: [
			{ id: 31, name: '业务视图', url: '/business' },
			{ id: 32, name: '债务人', url: '/business/debtor' },
			// { id: 33, name: '资产信息', url: '/business/asset' },
		],
	},
	{ id: 4, name: '企业查询', url: '/company' },
	{ id: 5, name: '信息查询', url: '/search' },
	{
		id: 6,
		name: '机构管理',
		url: '/organization',
		warning: false,
		children: [
			{ id: 61, name: '推送设置', url: '/organization' },
			{ id: 62, name: '账户列表', url: '/organization/user' },
		],
	},
	{ id: 7, name: '登录页面', url: '/login' },

];

// 导航项目
const Item = (props) => {
	const { name, children, id } = props;
	const { set, active } = props;
	/**
	 * 点击路由跳转方法
	 * @param event 点击元素
	 * @param items 当前项参数
	 * @param parent 父项参数
	 */
	const toNavigate = (event, items, parent) => {
		navigate(items.url);
		// setTimeout(() => {
		// 	window.scrollTo(0, 0);
		// });
		// document.body.scrollTo(0, 0);
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
			<span>{name}</span>
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

// Header 样式需求
const Header = () => {
	const [active, setActive] = useState({ p: '', c: '' });
	return (
		<div className="yc-header-wrapper">
			<div className="yc-header-content">
				<div className="header-logo">
					<img src={logoImg} alt="" />
					<span>{logoText}</span>
				</div>
				<div className="header-menu">
					{ dataSource.map(items => <Item key={items.id} {...items} set={setActive} active={active} />) }
				</div>
				<div className="header-else">
					<div
						className={`else-child else-notice ${active.p === 101 ? 'header-item-active' : 'header-item-normal'}`}
						onClick={(event) => {
							setActive({ p: 101, c: '' });
							navigate('/message');
							event.stopPropagation();
						}}
					>
						<Badge dot style={{ top: 0, right: 0 }}>
							<div className="notice-icon yc-notice-img" />
						</Badge>
						<span className="notice-number">(3226)</span>
						<HeaderMessage mark="消息中心大概预览" />
					</div>
					<div className="else-child else-line" />
					<div className="else-child else-username header-item-normal">
						<li>您好，崔九九</li>
						<li>崔金鑫测试机构121</li>
						<HeaderCenter mark="个人中心大概" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
