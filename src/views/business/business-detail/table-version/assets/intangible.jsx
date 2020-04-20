import React from 'react';
import { Tabs } from '@/common';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';
import IntAssets from '@/views/asset-excavate/intangible-assets/table-version';

export default class Intangible extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: toGetDefaultId(props.data),
			config: [
				{
					id: 10401,
					name: '排污权',
					number: toGetNumber(props.data, 10401),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10401),
				},
				{
					id: 10402,
					name: '矿业权',
					number: toGetNumber(props.data, 10402),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10402),
				},
				{
					id: 10403,
					name: '商标专利',
					number: toGetNumber(props.data, 10403),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10403),
				},
				{
					id: 10404,
					name: '建筑建造资质',
					number: toGetNumber(props.data, 10404),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10404),
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
		const { config, type: sourceType } = this.state;
		const { id, portrait } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onChangeType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">无形资产</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10401 ? <IntAssets.YC020701 portrait={portrait} /> : null}
					{sourceType === 10402 ? <IntAssets.YC020702 portrait={portrait} /> : null}
					{sourceType === 10403 ? <IntAssets.YC020703 portrait={portrait} /> : null}
					{sourceType === 10404 ? <IntAssets.YC020704 portrait={portrait} /> : null}
				</div>
			</div>
		);
	}
}
