import React from 'react';
import { navigate } from '@reach/router';
import { Icon } from '@/common';
import './style.scss';

class HomeQuickStart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleNavigate = (url) => {
		navigate(url);
	};

	render() {
		const { rule } = this.props;
		return (
			<div className="quick-start-container">
				<div className="quick-start-container-header">
						快速开始
				</div>
				<div className="quick-start-container-content">
					{rule.menu_ywgl && rule.menu_ywgl.children.ywglywst ? (
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/business')}>
							<Icon type="icon-append" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">添加/管理监控债务人名单</span>
						</div>
					) : null}
					{rule.menu_hxcx ?	(
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/info/search/portrait')}>
							<Icon type="icon-query" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">未监控债务人临时查询</span>
						</div>
					) : null}
					{rule.menu_jjgl && rule.menu_jjgl.children.jggltssz ? (
						<div className="quick-start-container-content-btn" onClick={() => this.handleNavigate('/organization/setting')}>
							<Icon type="icon-setting" className="quick-start-container-content-btn-icon" />
							<span className="quick-start-container-content-btn-name">设置推送消息接收人</span>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default HomeQuickStart;