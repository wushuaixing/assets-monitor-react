import React from 'react';
import { Tabs } from '@/common';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [
				{ id: 1, name: '立案', total: 4 },
				{ id: 2, name: '开庭', total: 3 },
				{ id: 3, name: '裁判文书', total: 9 }],
		};
	}

	render() {
		const { config } = this.state;
		return (
			<div className="yc-inquiry-public-table">
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">代位权</div>}
				/>
				<div className="inquiry-public-table">
					{'default Text'}
				</div>
			</div>
		);
	}
}
