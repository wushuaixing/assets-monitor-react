import React from 'react';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/assets-auction/table-version';
import { toGetNumber } from '@/utils/promise';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: [{
				id: 10801,
				name: ' ',
				number: toGetNumber(props.data, 10801),
				showNumber: true,
				disabled: !toGetNumber(props.data, 10801),
			}],
		};
	}

	render() {
		const { config } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					prefix={<div className="yc-tabs-simple-prefix">招投标</div>}
				/>
				<div className="inquiry-public-table">
					<Table />
				</div>
			</div>
		);
	}
}
