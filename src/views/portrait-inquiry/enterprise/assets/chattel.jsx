import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/chattel-mortgage/table-version';

export default class Chattel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 10601,
			config: [
				{
					id: 10601, name: '抵押', number: 12, showNumber: true,
				},
				{
					id: 10602, name: '抵押权', number: 12, showNumber: true,
				}],
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
					symbol="none"
					prefix={<div className="yc-tabs-simple-prefix">动产抵押</div>}
				/>
				<div className="inquiry-public-table">
					{type === 10601 ? <Pledge /> : null}
					{type === 10602 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
