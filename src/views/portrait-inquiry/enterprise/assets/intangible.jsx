import React from 'react';
import { Tabs } from '@/common';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{ id: 1, name: '抵押', total: 12 },
				{ id: 2, name: '抵押权', total: 12 }],
		};
	}

	render() {
		const { config } = this.state;
		return (
			<div className="yc-inquiry-public-table">
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">动产抵押</div>}
				/>
				<div className="inquiry-public-table">
					default Text
				</div>
			</div>
		);
	}
}
