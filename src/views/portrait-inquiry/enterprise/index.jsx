import React from 'react';
import { navigate } from '@reach/router';
import { Button } from '@/common';

export default class Enterprise extends React.Component {
	constructor(props) {
		document.title = '企业详情-画像查询';
		super(props);
		this.state = {};
	}

	render() {
		return [
			<Button onClick={() => navigate('#/inquiry')}>返回</Button>,
			<div className="yc-inquiry-view">
				<span>企业查询页面</span>
			</div>,
		];
	}
}
