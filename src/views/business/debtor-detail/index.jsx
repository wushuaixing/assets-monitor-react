import React from 'react';
import { navigate } from '@reach/router';
import { Breadcrumb, Button } from 'antd';

import './style.scss';


export default class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="yc-debtor-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><p style={{ fontSize: 14 }} className="click-p" onClick={() => navigate('/business/debtor')}>债务人</p></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 100 }}>债务人详情</span></Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="yc-item-ob">
					<div className="yc-item-icon" />
					<div className="yc-search-content">
						<span className="yc-item-title">p</span>
						<div className="search-item-text">
							<span className="search-item-text-header">身份证号/统一社会信用代码：</span>
							<span className="search-item-text-msg">2222</span>
						</div>
						<div className="search-item-text">
							<span className="search-item-text-header">曾用名：</span>
							<span className="search-item-text-msg">－</span>
						</div>
					</div>
					<div className="yc-search-right">
						<Button className="yc-btn">
							<span className="yc-icon-export" />
                            下载
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
