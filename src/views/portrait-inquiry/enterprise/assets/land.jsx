import React from 'react';
import { Tabs } from '@/common';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{ id: 1, name: '出让结果', total: 4 },
				{ id: 2, name: '土地转让', total: 12 },
				{ id: 3, name: '土地抵押', total: 8 }],
		};
	}

	render() {
		const { config } = this.state;
		return (
			<div className="yc-inquiry-public-table">
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">土地信息</div>}
				/>
				<div className="inquiry-public-table">
					{'default Text'}
				</div>
			</div>
		);
	}
}
