import React from 'react';
import { Button } from '@/common';
import { navigate } from '@reach/router';

export default class InquiryList extends React.Component {
	constructor(props) {
		document.title = '列表-画像查询';
		super(props);
		this.state = {};
	}

	render() {
		return [
			<Button onClick={() => navigate('#/inquiry')}>返回</Button>,
			<div className="yc-inquiry-view">
				<span>列表查询页面</span>
			</div>,
		];
	}
}
