import React from 'react';
// { useState }
import { navigate } from '@reach/router';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

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
			{ id: 21, name: '资产拍卖', url: '/monitor' },
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
			{ id: 21, name: '业务视图', url: '/business' },
			{ id: 22, name: '债务人', url: '/business/debtor' },
			{ id: 23, name: '资产信息', url: '/business/asset' },
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
			{ id: 21, name: '推送设置', url: '/organization' },
			{ id: 22, name: '账户列表', url: '/organization/user' },
		],
	},
	{ id: 7, name: '登录页面', url: '/login' },

];

// 下拉列表
const ItemList = data => (
	<Menu onSelect={e => navigate(e.key)}>
		{
			data.map(item => (
				<Menu.Item key={item.url}>
					<span className="yc-span-padding">{item.name}</span>
				</Menu.Item>
			))
		}
	</Menu>
);

// 导航项目
const Item = (props) => {
	const { name, children, url } = props;
	if (children) {
		const itemList = ItemList(children);
		// onVisibleChange={visible => console.log(res, visible)}
		return (
			<Dropdown overlay={itemList}>
				<li className="header-item" onClick={() => navigate(url)}>
					<span>{name}</span>
				</li>
			</Dropdown>
		);
	}
	return (
		<li className="header-item" onClick={() => navigate(url)}>
			<span>{name}</span>
		</li>
	);
};
// const toGetDefaultActive = (data) => {
// 	const res = { p: 1, c: 0 };
// 	const { hash } = window.location;
// 	data.forEach((item) => {
//
// 	});
// };
// const [active, setActive] = useState(toGetDefaultActive(dataSource));

// 头部
const Header = () => (
	<div className="yc-header-wrapper">
		<div className="yc-header-content">
			<div className="header-logo">
				<img src={logoImg} alt="" />
				<span>{logoText}</span>
			</div>
			<div className="header-menu">
				{
						dataSource.map(items => <Item key={items.id} {...items} />)
					}
			</div>
			<div className="header-else">
				<div className="else-child else-notice ">
					<Badge dot style={{ top: 0, right: 0 }}>
						<div className="notice-icon yc-notice-img" />
					</Badge>
					<span className="notice-number">(3226)</span>
				</div>
				<div className="else-child else-line" />
				<div className="else-child else-username">
					<li>您好，崔九九</li>
					<li>崔金鑫测试机构121</li>
				</div>
			</div>
		</div>
	</div>
);
export default Header;
