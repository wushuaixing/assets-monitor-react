import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeQuickStart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="quick-start-container">
				<div className="quick-start-container-header">
						快速开始
				</div>
				<div className="quick-start-container-content">
					<div className="quick-start-container-content-btn">
						<Icon type="icon-home-user" className="quick-start-container-content-btn-icon" />
						<span className="quick-start-container-content-btn-name">添加/管理监控债务人名单</span>
					</div>
					<div className="quick-start-container-content-btn">
						<Icon type="icon-home-user" className="quick-start-container-content-btn-icon" />
						<span className="quick-start-container-content-btn-name">未监控债务人临时查询</span>
					</div>
					<div className="quick-start-container-content-btn">
						<Icon type="icon-home-user" className="quick-start-container-content-btn-icon" />
						<span className="quick-start-container-content-btn-name">设置推送消息接收人</span>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeQuickStart;
