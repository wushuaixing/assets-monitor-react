import React from 'react';
import Query from './query';
import './style.scss';
import { Button } from '@/common';
import imgExport from '@/assets/img/icon/icon_export.png';

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="yc-assets-auction">
				<Query />
				<div className="assets-auction-action">
					<Button>批量管理</Button>
					<div className="assets-tabs-right" style={{ float: 'right' }}>
						<li style={{ padding: 4 }}>
							<img src={imgExport} alt="" />
							<span>一键导出</span>
						</li>
					</div>
				</div>
			</div>
		);
	}
}
