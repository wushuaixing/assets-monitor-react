import React from 'react';
import { navigate } from '@reach/router';
import QueryView from './common/queryView';
import { Button } from '@/common';

export default class InquiryList extends React.Component {
	constructor(props) {
		document.title = '列表-画像查询';
		super(props);
		this.state = {
			total: 5,
		};
	}

	render() {
		const { total } = this.state;
		return (
			<div className="yc-inquiry-list">
				<QueryView />
				<div className="mark-line" />
				<div className="inquiry-list-content">
					<div className="list-content-total">
						<span>源诚为您找到以下</span>
						<span style={{ fontWeight: 'bold', margin: '0 5px' }}>{total || 0}</span>
						<span>家可能符合条件的企业</span>
					</div>
					<div className="content-list">
						<Button onClick={() => navigate('/inquiry/enterprise')}>{'=> 企业查询详情'}</Button>
					</div>

				</div>
			</div>
		);
	}
}
