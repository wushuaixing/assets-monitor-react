import React from 'react';
import { Tabs } from '@/common';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [{
				id: 1, name: '智能精准匹配', total: 12,
			}],
		};
	}

	render() {
		const { config } = this.state;
		return (
			<div className="yc-inquiry-public-table">
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">资产拍卖</div>}
				/>
				<div className="inquiry-public-table">
					{'default Text'}
				</div>
			</div>
		);
	}
}
