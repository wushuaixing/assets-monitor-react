import React from 'react';
import { Tabs } from '@/common';
import { Pledge, Mortgage } from '@/views/asset-excavate/financial-assets/table-version';

export default class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			config: [
				{ id: 1, name: '股权出质', total: 4 },
				{ id: 2, name: '股权质权', total: 12 }],
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const { config, sourceType } = this.state;
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					prefix={<div className="yc-tabs-simple-prefix">股权质押</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 1 ? <Pledge /> : null}
					{sourceType === 2 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
