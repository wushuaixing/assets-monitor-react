import React from 'react';
import { Tabs } from '@/common';
import Table from '@/views/asset-excavate/assets-auction/table-detail';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';

export default class Auction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetDefaultId(props.data),
			config: [{
				id: 10101,
				name: '精准匹配',
				number: toGetNumber(props.data, 10101),
				showNumber: true,
				disabled: !toGetNumber(props.data, 10101),
			}, {
				id: 10102,
				name: '模糊匹配',
				number: toGetNumber(props.data, 10102),
				showNumber: true,
				disabled: !toGetNumber(props.data, 10102),
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
		const { id, portrait } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">资产拍卖</div>}
				/>
				<div className="inquiry-public-table">
					<Table portrait={portrait} sourceType={sourceType} />
				</div>
			</div>
		);
	}
}
