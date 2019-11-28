import React from 'react';
import { navigate } from '@reach/router';
import Badge from '@/common/badge';
import logoImg from '@/assets/img/logo_white.png';
import { unreadCount } from '@/utils/api/inform';
import HeaderCenter from './headerCenter/header-center';
import HeaderMessage from './headerMessage/header-message';
import { toGetRuleSource } from '@/utils';

const logoText = '源诚资产监控平台';

/* 导航项目 */
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

/* 获取默认路由 */
const defaultRouter = (source) => {
	const { hash } = window.location;
	const res = { p: '', c: '' };
	// console.log('source:', source);
	// console.log('hash:', hash);
	source.forEach((item) => {
		// console.log('item.url:', item.url, hash);
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
	if (new RegExp('/my/attention').test(hash))res.p = '';
	if (new RegExp('/message').test(hash))res.p = 101;
	return res;
};

// Header 样式需求
export default class Headers extends React.Component {
	constructor(props) {
		super(props);
		this.source = toGetRuleSource(props.rule);
		this.state = {
			active: defaultRouter(this.source),
			config: this.source,
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
						<span className="yc-public-white-large-bold">{logoText}</span>
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
							<div className="header-else-left">
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