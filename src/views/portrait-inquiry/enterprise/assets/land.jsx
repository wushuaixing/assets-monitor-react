import React from 'react';
import { Tabs } from '@/common';
import { Result, Mortgage, Transfer } from '@/views/asset-excavate/land-data/table-version';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';

export default class Land extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetDefaultId(props.data),
			config: [
				{
					id: 10301,
					name: '出让结果',
					number: toGetNumber(props.data, 10301),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10201)),
				},
				{
					id: 10302,
					name: '土地转让',
					number: toGetNumber(props.data, 10302),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10201)),
				},
				{
					id: 10303,
					name: '土地抵押',
					number: toGetNumber(props.data, 10303),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 10201)),
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
