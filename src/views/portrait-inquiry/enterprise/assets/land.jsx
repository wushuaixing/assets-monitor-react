import React from 'react';
import { Tabs } from '@/common';
import { Result, Mortgage, Transfer } from '@/views/asset-excavate/land-data/table-version';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			config: [
				{ id: 1, name: '出让结果', total: 4 },
				{ id: 2, name: '土地转让', total: 12 },
				{ id: 3, name: '土地抵押', total: 8 }],
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
					prefix={<div className="yc-tabs-simple-prefix">土地信息</div>}
				/>
				<div className="inquiry-public-table">

					{sourceType === 1 ? <Result /> : null}
					{sourceType === 2 ? <Transfer /> : null}
					{sourceType === 3 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
