import React from 'react';
import { Tabs } from '@/common';
import { Result, Mortgage, Transfer } from '@/views/asset-excavate/land-data/table-version';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 10301,
			config: [
				{
					id: 10301, name: '出让结果', number: 3, showNumber: true,
				},
				{
					id: 10302, name: '土地转让', number: 12, showNumber: true,
				},
				{
					id: 10303, name: '土地抵押', number: 9, showNumber: true,
				}],
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
					symbol="none"
					prefix={<div className="yc-tabs-simple-prefix">土地信息</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10301 ? <Result /> : null}
					{sourceType === 10302 ? <Transfer /> : null}
					{sourceType === 10303 ? <Mortgage /> : null}
				</div>
			</div>
		);
	}
}
