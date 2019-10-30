import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/chattel-mortgage/table-version';

export default class Chattel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			config: [
				{ id: 1, name: '抵押', total: 12 },
				{ id: 2, name: '抵押权', total: 12 }],
		};
	}

	onChangeType=(val) => {
		const { type } = this.state;
		if (val !== type) {
			this.setState({ type: val });
		}
	};


	render() {
		const { config, type } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onChangeType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">动产抵押</div>}
				/>
				<div className="inquiry-public-table">
					{type === 1 ? <Pledge /> : null}
					{type === 2 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
