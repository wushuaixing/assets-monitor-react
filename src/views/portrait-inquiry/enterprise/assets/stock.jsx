import React from 'react';
import { Tabs } from '@/common';

export default class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{ id: 1, name: '股权出质', total: 4 },
				{ id: 2, name: '股权质权', total: 12 }],
		};
	}

	render() {
		const { config } = this.state;
		return (
			<div className="yc-inquiry-public-table">
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">股权质权</div>}
				/>
				<div className="inquiry-public-table">
					{'default Text'}
				</div>
			</div>
		);
	}
}
