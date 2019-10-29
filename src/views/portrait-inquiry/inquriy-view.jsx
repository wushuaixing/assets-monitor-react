import React from 'react';
import { navigate } from '@reach/router';
import { Button } from '@/common';

export default class InitView extends React.Component {
	constructor(props) {
		document.title = '画像查询';
		super(props);
		this.state = {};
	}

	toNavigate=(path) => {
		navigate(`/inquiry/${path}`);
	};

	render() {
		return (
			<div className="yc-inquiry-view">
				<div className="yc-public-title-large-bold">画像查询</div>
				<div className="yc-to-go-list">
					<Button onClick={() => this.toNavigate('list')}>{'=> 查询列表'}</Button>
					<Button onClick={() => this.toNavigate('enterprise')}>{'=> 企业查询详情'}</Button>
					<Button onClick={() => this.toNavigate('personal')}>{'=> 个人查询详情'}</Button>
				</div>
			</div>
		);
	}
}
