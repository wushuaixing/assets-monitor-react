import React from 'react';
import { Button } from '@/common';
import { navigate } from '@reach/router';

export default class Personal extends React.Component {
	constructor(props) {
		document.title = '个人详情-画像查询';
		super(props);
		this.state = {};
	}

	render() {
		return [
			<Button onClick={() => navigate('#/inquiry')}>返回</Button>,
			<div className="yc-inquiry-view">
				<span>个人查询页面</span>
			</div>,
		];
	}
}
