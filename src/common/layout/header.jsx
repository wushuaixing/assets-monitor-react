import React from 'react';
import { navigate } from '@reach/router';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

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
			{ id: 21, name: '资产拍卖', url: '/' },
			{ id: 22, name: '代位权', url: '/' },
			{ id: 23, name: '金融资产', url: '/' },
			{ id: 24, name: '涉诉监控', url: '/' },
			{ id: 25, name: '企业破产重组', url: '/' },
			{ id: 26, name: '公示公告', url: '/' },
		],
	},
	{
		id: 3,
		name: '业务管理',
		url: '/business',
		warning: false,
		children: [
			{ id: 21, name: '业务视图', url: '/' },
			{ id: 22, name: '债务人', url: '/' },
			{ id: 23, name: '资产信息', url: '/' },
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
			{ id: 21, name: '推送设置', url: '/' },
			{ id: 22, name: '账户列表', url: '/' },
		],
	},
];

// 下拉列表
const ItemList = data => (
	<Menu>
		{
			data.map(item => (
				<Menu.Item key={item.id}>
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
			<div className="header-else">YX</div>
		</div>
	</div>
);
export default Header;
